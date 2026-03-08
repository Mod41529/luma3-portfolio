'use client'

import { motion } from 'framer-motion'
import { Brain, GitBranch, Eye, Layers, Cpu, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// ── Orchestration data ────────────────────────────────────────────────────────
const STATS = [
  { value: '65', label: 'Tasks Delegated' },
  { value: '3',  label: 'AI Agents' },
  { value: '9',  label: 'Months Active' },
]

const AGENTS = [
  { name: 'Gemini', role: 'Research & Analysis', tasks: 45, pct: 69, color: '#059669' },
  { name: 'Codex',  role: 'Code Generation',     tasks: 15, pct: 23, color: '#D97706' },
  { name: 'Claude', role: 'Orchestration',        tasks: 5,  pct: 8,  color: '#475569' },
]

// ── Competencies ──────────────────────────────────────────────────────────────
interface Competency {
  icon: LucideIcon
  name: string
  evidence: string
}

const COMPETENCIES: Competency[] = [
  {
    icon: Brain,
    name: 'Judgment & Oversight',
    evidence: 'Every AI output goes through human review. Direction, final call, and taste stay with me.',
  },
  {
    icon: Layers,
    name: 'Context Framing',
    evidence: 'Dedicated instruction files brief each agent on its role, constraints, and memory before every session.',
  },
  {
    icon: GitBranch,
    name: 'Task Decomposition',
    evidence: '65 tasks structured with goal, scope, constraints, and done criteria — written before delegation.',
  },
  {
    icon: Cpu,
    name: 'Multi-Agent Orchestration',
    evidence: 'Claude, Codex, and Gemini assigned by task type and quota, running concurrently on one project.',
  },
  {
    icon: Eye,
    name: 'Observability',
    evidence: 'Every agent action logged in real time. Task queue persists across sessions with full status tracking.',
  },
  {
    icon: Zap,
    name: 'Adaptability',
    evidence: 'Switched models and toolchains multiple times as the AI landscape evolved — without losing momentum.',
  },
]

const EXPERT_SOURCES = ['Ethan Mollick', 'McKinsey Global Institute', 'World Economic Forum', 'ODSC', 'Flowkater']

// ── Component ─────────────────────────────────────────────────────────────────
export default function AISection() {
  return (
    <section id="ai" className="border-t border-border">
      {/* Section header */}
      <div className="px-6 md:px-12 py-5 border-b border-border flex items-baseline gap-4">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-fg">AI Capabilities</h2>
        <span className="text-[10px] font-mono text-fg-subtle">Agentic Engineering</span>
      </div>

      {/* ── Data panel ─────────────────────────────────────────────────────── */}
      <div className="px-6 md:px-12 py-8 border-b border-border flex flex-col md:flex-row gap-8 md:gap-16">

        {/* Stats */}
        <div className="flex items-center gap-8 shrink-0">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-black tracking-tight text-fg">{value}</p>
              <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-fg-subtle mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Agent bar chart */}
        <div className="flex-1 flex flex-col justify-center gap-3">
          {AGENTS.map((agent, i) => (
            <div key={agent.name} className="flex items-center gap-3">
              <span className="text-[10px] font-mono w-14 shrink-0 text-fg-muted">{agent.name}</span>
              <div className="flex-1 h-1.5 bg-bg-subtle rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: agent.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${agent.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                />
              </div>
              <span className="text-[10px] font-mono text-fg-faint w-16 shrink-0">
                {agent.tasks} tasks · {agent.pct}%
              </span>
            </div>
          ))}
          <p className="text-[9px] font-mono text-fg-faint mt-1">{agent_role_labels()}</p>
        </div>
      </div>

      {/* ── Competency cards ───────────────────────────────────────────────── */}
      <div className="px-6 md:px-12 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {COMPETENCIES.map((comp, i) => {
          const Icon = comp.icon
          return (
            <motion.div
              key={comp.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
              className="flex flex-col gap-3 p-4 border border-border hover:bg-bg-subtle transition-colors duration-150"
            >
              <Icon size={18} strokeWidth={1.5} style={{ color: '#1978e5' }} />
              <p className="text-sm font-semibold text-fg">{comp.name}</p>
              <p className="text-xs text-fg-muted leading-relaxed">{comp.evidence}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Footer attribution */}
      <div className="px-6 md:px-12 py-4 border-t border-border flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-fg-faint">Referenced from</span>
        {EXPERT_SOURCES.map((name, i) => (
          <span key={name} className="text-[9px] font-mono text-fg-faint">
            {name}{i < EXPERT_SOURCES.length - 1 ? ' ·' : ''}
          </span>
        ))}
      </div>
    </section>
  )
}

function agent_role_labels() {
  return AGENTS.map(a => `${a.name} — ${a.role}`).join('  ·  ')
}
