#!/usr/bin/env node
/**
 * gen-orch-stats.js
 * Reads activity.jsonl from the agent-orchestration queue and writes
 * src/data/orchestration.json for use in the portfolio build.
 *
 * Run automatically via `prebuild` in package.json.
 * Safe to re-run — always overwrites the output file.
 */

const fs = require('fs')
const path = require('path')

const ACTIVITY_PATH = path.join(
  process.env.HOME || process.env.USERPROFILE || 'C:/Users/1',
  'Desktop/agent-orchestration/queue/activity.jsonl'
)

const OUT_PATH = path.join(__dirname, '../src/data/orchestration.json')

// ── Parse activity.jsonl ──────────────────────────────────────────────────────
function parseActivity(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`[gen-orch-stats] activity.jsonl not found at ${filePath} — skipping`)
    return null
  }

  const lines = fs.readFileSync(filePath, 'utf-8').split('\n').filter(Boolean)
  const tasks = {}

  for (const line of lines) {
    try {
      const e = JSON.parse(line)
      const { id, event, detail, ts } = e

      if (event === 'created') {
        const raw = (detail || '').replace('agent=', '').trim()
        tasks[id] = { agent: normalizeAgent(raw || 'unknown'), status: 'pending', createdAt: ts }
      } else if (event === 'completed' && tasks[id]) {
        tasks[id].status = 'completed'
        tasks[id].completedAt = ts
      }
    } catch { /* skip malformed lines */ }
  }

  return tasks
}

// Normalize variant agent names to canonical groups
function normalizeAgent(raw) {
  if (raw.startsWith('gemini')) return 'gemini'
  if (raw.startsWith('codex'))  return 'codex'
  if (raw === 'claude')         return 'claude'
  return 'other'
}

// ── Build stats object ────────────────────────────────────────────────────────
function buildStats(tasks) {
  const agentCounts = { gemini: 0, codex: 0, claude: 0, other: 0 }
  let completed = 0

  for (const t of Object.values(tasks)) {
    const a = t.agent in agentCounts ? t.agent : 'other'
    agentCounts[a]++
    if (t.status === 'completed') completed++
  }

  const total = Object.keys(tasks).length
  const agents = ['gemini', 'codex', 'claude'].map(name => {
    const count = agentCounts[name] + (name === 'claude' ? agentCounts.other : 0)
    return {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      tasks: count,
      pct: total > 0 ? Math.round((count / total) * 100) : 0,
    }
  })

  // Normalize percentages to always sum to 100
  const sum = agents.reduce((s, a) => s + a.pct, 0)
  if (sum !== 100 && agents.length > 0) agents[0].pct += (100 - sum)

  return { total, completed, agents, generatedAt: new Date().toISOString() }
}

// ── Main ──────────────────────────────────────────────────────────────────────
const tasks = parseActivity(ACTIVITY_PATH)

if (!tasks) {
  console.log('[gen-orch-stats] Skipped — using existing orchestration.json')
  process.exit(0)
}

const stats = buildStats(tasks)

fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true })
fs.writeFileSync(OUT_PATH, JSON.stringify(stats, null, 2))

console.log(`[gen-orch-stats] Written → ${OUT_PATH}`)
console.log(`  total=${stats.total} completed=${stats.completed}`)
stats.agents.forEach(a => console.log(`  ${a.name}: ${a.tasks} tasks (${a.pct}%)`))
