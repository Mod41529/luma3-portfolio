'use client'

import { motion } from 'framer-motion'
import { Brain, GitBranch, Eye, Layers, Cpu, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import orchStats from '@/data/orchestration.json'

// ── Orchestration data (auto-generated at build time) ────────────────────────
const STATS = [
  { value: String(orchStats.total),     label: 'Tasks Delegated' },
  { value: String(orchStats.agents.length), label: 'AI Agents' },
  { value: String(orchStats.completed), label: 'Completed' },
]

const AGENT_META: Record<string, { role: string; color: string }> = {
  Gemini: { role: 'Research & Analysis', color: '#059669' },
  Codex:  { role: 'Code Generation',     color: '#D97706' },
  Claude: { role: 'Orchestration',       color: '#475569' },
}

const AGENTS = orchStats.agents.map(a => ({
  ...a,
  ...(AGENT_META[a.name] ?? { role: 'Agent', color: '#737373' }),
}))

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
          <p className="text-[9px] font-mono text-fg-faint mt-1">
          {AGENTS.map(a => `${a.name} — ${a.role}`).join('  ·  ')}
        </p>
        </div>
      </div>

      {/* ── Workflow diagram ───────────────────────────────────────────────── */}
      <div className="border-b border-border bg-bg-subtle relative flex items-center justify-center px-6 md:px-10 py-14 md:py-20 min-h-[320px] overflow-hidden">
        {/* grid background */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <p className="absolute top-4 left-6 text-[8px] font-mono uppercase tracking-[0.25em] text-fg-subtle">
          Workflow — luma3 포트폴리오 빌드
        </p>
        <div className="absolute top-4 right-6 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
          <span className="text-[8px] font-mono uppercase tracking-[0.25em] text-[#059669]">Live System</span>
        </div>

        {/* Mobile vertical SVG */}
        <svg viewBox="0 0 300 430" className="md:hidden relative w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="90" y="10" width="120" height="44" fill="#1a1a1a"/>
          <text x="150" y="26" textAnchor="middle" fill="#6b7280" fontSize="7.5" fontFamily="monospace" letterSpacing="1.5">TASK</text>
          <text x="150" y="44" textAnchor="middle" fill="white" fontSize="12" fontFamily="sans-serif" fontWeight="900">luma3 빌드</text>
          <line x1="150" y1="54" x2="150" y2="74" stroke="#cbd5e1" strokeWidth="1"/>
          <polygon points="150,74 146,68 154,68" fill="#cbd5e1"/>
          <rect x="20" y="74" width="260" height="68" fill="white" stroke="#475569" strokeWidth="1.5"/>
          <text x="150" y="91" textAnchor="middle" fill="#475569" fontSize="7.5" fontFamily="monospace" letterSpacing="1">ORCHESTRATOR</text>
          <text x="150" y="112" textAnchor="middle" fill="#1a1a1a" fontSize="15" fontFamily="sans-serif" fontWeight="900">Claude Code</text>
          <text x="150" y="130" textAnchor="middle" fill="#a3a3a3" fontSize="8" fontFamily="monospace">판단 · 위임 결정</text>
          <line x1="150" y1="142" x2="150" y2="158" stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="80" y1="158" x2="220" y2="158" stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="80" y1="158" x2="80" y2="174" stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="220" y1="158" x2="220" y2="174" stroke="#cbd5e1" strokeWidth="1"/>
          <polygon points="80,174 76,168 84,168" fill="#cbd5e1"/>
          <polygon points="220,174 216,168 224,168" fill="#cbd5e1"/>
          <rect x="14" y="174" width="132" height="56" fill="white" stroke="#059669" strokeWidth="1" strokeOpacity="0.7"/>
          <text x="80" y="191" textAnchor="middle" fill="#059669" fontSize="7.5" fontFamily="monospace" letterSpacing="1">RESEARCH</text>
          <text x="80" y="211" textAnchor="middle" fill="#1a1a1a" fontSize="14" fontFamily="sans-serif" fontWeight="900">Gemini</text>
          <text x="80" y="226" textAnchor="middle" fill="#a3a3a3" fontSize="7.5" fontFamily="monospace">리서치 · 분석</text>
          <rect x="154" y="174" width="132" height="56" fill="white" stroke="#D97706" strokeWidth="1" strokeOpacity="0.7"/>
          <text x="220" y="191" textAnchor="middle" fill="#D97706" fontSize="7.5" fontFamily="monospace" letterSpacing="1">CODE</text>
          <text x="220" y="211" textAnchor="middle" fill="#1a1a1a" fontSize="14" fontFamily="sans-serif" fontWeight="900">Codex</text>
          <text x="220" y="226" textAnchor="middle" fill="#a3a3a3" fontSize="7.5" fontFamily="monospace">코드 구현</text>
          <line x1="80" y1="230" x2="80" y2="252" stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="220" y1="230" x2="220" y2="252" stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="80" y1="252" x2="220" y2="252" stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="150" y1="252" x2="150" y2="272" stroke="#cbd5e1" strokeWidth="1"/>
          <polygon points="150,272 146,266 154,266" fill="#cbd5e1"/>
          <rect x="20" y="272" width="260" height="68" fill="white" stroke="#475569" strokeWidth="1.5"/>
          <text x="150" y="289" textAnchor="middle" fill="#475569" fontSize="7.5" fontFamily="monospace" letterSpacing="1">REVIEW</text>
          <text x="150" y="310" textAnchor="middle" fill="#1a1a1a" fontSize="15" fontFamily="sans-serif" fontWeight="900">Claude Code</text>
          <text x="150" y="328" textAnchor="middle" fill="#a3a3a3" fontSize="8" fontFamily="monospace">검토 · 재위임 or 승인</text>
          <line x1="150" y1="340" x2="150" y2="358" stroke="#cbd5e1" strokeWidth="1"/>
          <polygon points="150,358 146,352 154,352" fill="#cbd5e1"/>
          <rect x="90" y="358" width="120" height="44" fill="#1a1a1a"/>
          <text x="150" y="374" textAnchor="middle" fill="#6b7280" fontSize="7.5" fontFamily="monospace" letterSpacing="1.5">OUTPUT</text>
          <text x="150" y="392" textAnchor="middle" fill="white" fontSize="12" fontFamily="sans-serif" fontWeight="900">luma3.dev</text>
          <path d="M 280,306 H 292 V 211 H 286" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3"/>
          <polygon points="286,211 282,218 290,218" fill="#cbd5e1"/>
          <text x="292" y="262" textAnchor="middle" fill="#c3c3c3" fontSize="7" fontFamily="monospace" transform="rotate(90 292 262)">iterate</text>
        </svg>

        {/* Desktop horizontal SVG */}
        <svg viewBox="0 0 840 205" className="hidden md:block relative w-full max-w-7xl" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="120" y1="100" x2="148" y2="100" stroke="#cbd5e1" strokeWidth="1"/>
          <polygon points="148,100 142,96 142,104" fill="#cbd5e1"/>
          <line x1="308" y1="100" x2="330" y2="100" stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="330" y1="57" x2="330" y2="143" stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="330" y1="57" x2="352" y2="57" stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="330" y1="143" x2="352" y2="143" stroke="#cbd5e1" strokeWidth="1"/>
          <polygon points="352,57 346,53 346,61" fill="#cbd5e1"/>
          <polygon points="352,143 346,139 346,147" fill="#cbd5e1"/>
          <line x1="478" y1="57" x2="500" y2="57" stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="478" y1="143" x2="500" y2="143" stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="500" y1="57" x2="500" y2="143" stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="500" y1="100" x2="522" y2="100" stroke="#cbd5e1" strokeWidth="1"/>
          <polygon points="522,100 516,96 516,104" fill="#cbd5e1"/>
          <line x1="682" y1="100" x2="722" y2="100" stroke="#cbd5e1" strokeWidth="1"/>
          <polygon points="722,100 716,96 716,104" fill="#cbd5e1"/>
          <path d="M 602,132 V 185 H 415 V 170" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3"/>
          <polygon points="415,170 411,177 419,177" fill="#cbd5e1"/>
          <text x="508" y="196" textAnchor="middle" fill="#c3c3c3" fontSize="8" fontFamily="monospace">iterate</text>
          <rect x="10" y="78" width="110" height="44" fill="#1a1a1a"/>
          <text x="65" y="93" textAnchor="middle" fill="#6b7280" fontSize="7.5" fontFamily="monospace" letterSpacing="1.5">TASK</text>
          <text x="65" y="111" textAnchor="middle" fill="white" fontSize="12" fontFamily="sans-serif" fontWeight="900">luma3 빌드</text>
          <rect x="148" y="68" width="160" height="64" fill="white" stroke="#475569" strokeWidth="1.5"/>
          <text x="228" y="85" textAnchor="middle" fill="#475569" fontSize="7.5" fontFamily="monospace" letterSpacing="1">ORCHESTRATOR</text>
          <text x="228" y="105" textAnchor="middle" fill="#1a1a1a" fontSize="15" fontFamily="sans-serif" fontWeight="900">Claude Code</text>
          <text x="228" y="122" textAnchor="middle" fill="#a3a3a3" fontSize="8" fontFamily="monospace">판단 · 위임 결정</text>
          <rect x="352" y="32" width="126" height="50" fill="white" stroke="#059669" strokeWidth="1" strokeOpacity="0.7"/>
          <text x="415" y="48" textAnchor="middle" fill="#059669" fontSize="7.5" fontFamily="monospace" letterSpacing="1">RESEARCH</text>
          <text x="415" y="68" textAnchor="middle" fill="#1a1a1a" fontSize="14" fontFamily="sans-serif" fontWeight="900">Gemini</text>
          <rect x="352" y="118" width="126" height="50" fill="white" stroke="#D97706" strokeWidth="1" strokeOpacity="0.7"/>
          <text x="415" y="134" textAnchor="middle" fill="#D97706" fontSize="7.5" fontFamily="monospace" letterSpacing="1">CODE</text>
          <text x="415" y="154" textAnchor="middle" fill="#1a1a1a" fontSize="14" fontFamily="sans-serif" fontWeight="900">Codex</text>
          <rect x="522" y="68" width="160" height="64" fill="white" stroke="#475569" strokeWidth="1.5"/>
          <text x="602" y="85" textAnchor="middle" fill="#475569" fontSize="7.5" fontFamily="monospace" letterSpacing="1">REVIEW</text>
          <text x="602" y="105" textAnchor="middle" fill="#1a1a1a" fontSize="15" fontFamily="sans-serif" fontWeight="900">Claude Code</text>
          <text x="602" y="122" textAnchor="middle" fill="#a3a3a3" fontSize="8" fontFamily="monospace">검토 · 재위임 or 승인</text>
          <rect x="722" y="78" width="110" height="44" fill="#1a1a1a"/>
          <text x="777" y="93" textAnchor="middle" fill="#6b7280" fontSize="7.5" fontFamily="monospace" letterSpacing="1.5">OUTPUT</text>
          <text x="777" y="111" textAnchor="middle" fill="white" fontSize="12" fontFamily="sans-serif" fontWeight="900">luma3.dev</text>
        </svg>
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

