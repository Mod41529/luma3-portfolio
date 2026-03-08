'use client'

import { motion } from 'framer-motion'
import { Brain, GitBranch, Eye, Layers, Cpu, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const SOURCE_COLOR: Record<string, string> = {
  Mollick:   '#7C3AED',
  McKinsey:  '#1978e5',
  WEF:       '#059669',
  ODSC:      '#D97706',
  Flowkater: '#E11D48',
}

interface Competency {
  icon: LucideIcon
  name: string
  sources: string[]
  evidence: string
  stat?: string
}

const COMPETENCIES: Competency[] = [
  {
    icon: Brain,
    name: 'Judgment & Oversight',
    sources: ['Mollick', 'McKinsey', 'WEF'],
    evidence: 'Review, direction, taste — always human. AI executes; human decides.',
  },
  {
    icon: Layers,
    name: 'Context Framing',
    sources: ['Mollick', 'ODSC'],
    evidence: 'CLAUDE.md + SHARED_MEMORY.md — structured context preserved across sessions.',
  },
  {
    icon: GitBranch,
    name: 'Task Decomposition',
    sources: ['McKinsey', 'ODSC', 'Flowkater'],
    evidence: 'Problems broken into agent-sized briefs with explicit Done Criteria.',
    stat: '65 tasks',
  },
  {
    icon: Cpu,
    name: 'Multi-Agent Orchestration',
    sources: ['McKinsey', 'ODSC', 'Flowkater'],
    evidence: 'Claude · Codex · Gemini running concurrently on a single production project.',
    stat: '3 agents',
  },
  {
    icon: Eye,
    name: 'Observability',
    sources: ['ODSC', 'Flowkater'],
    evidence: 'activity.jsonl real-time event log with persistent queue and state tracking.',
  },
  {
    icon: Zap,
    name: 'Adaptability',
    sources: ['WEF', 'McKinsey'],
    evidence: 'Actively switched toolchains across GPT, Claude, and Gemini as the landscape evolved.',
  },
]

const EXPERT_SOURCES = [
  { name: 'Ethan Mollick',           note: 'Co-Intelligence (2024 · 2025 ed.)' },
  { name: 'McKinsey Global Institute', note: 'Agents, Robots, and Us (2025)' },
  { name: 'World Economic Forum',    note: 'Future of Jobs Report (2025)' },
  { name: 'ODSC',                    note: 'Agentic AI Skills (2026)' },
  { name: 'Flowkater',               note: '에이전틱 엔지니어링 시대의 생존 스킬 9가지 (2026)' },
]

export default function AISection() {
  return (
    <section id="ai" className="border-t border-border">
      {/* Section header */}
      <div className="px-6 md:px-12 py-5 flex items-baseline border-b border-border">
        <div className="flex items-baseline gap-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-fg">AI Capabilities</h2>
          <span className="text-[10px] text-fg-subtle font-mono">{COMPETENCIES.length} competencies</span>
        </div>
      </div>

      {/* Source attribution strip */}
      <div className="px-6 md:px-12 py-3 border-b border-border flex flex-wrap items-center gap-x-4 gap-y-1.5">
        <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-fg-faint shrink-0">
          Referenced from
        </span>
        {EXPERT_SOURCES.map(({ name, note }) => (
          <span
            key={name}
            title={note}
            className="text-[10px] font-mono text-fg-subtle hover:text-fg transition-colors duration-150 cursor-default"
          >
            {name}
          </span>
        ))}
      </div>

      {/* Competency grid */}
      <div className="px-6 md:px-12 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {COMPETENCIES.map((comp, i) => {
          const Icon = comp.icon
          return (
            <motion.div
              key={comp.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              className="flex flex-col gap-3 p-4 border border-border hover:bg-bg-subtle transition-colors duration-150"
            >
              {/* Icon row */}
              <div className="flex items-center justify-between">
                <Icon size={13} className="text-fg-faint" strokeWidth={1.5} />
                {comp.stat && (
                  <span className="text-[11px] font-mono font-bold" style={{ color: '#1978e5' }}>
                    {comp.stat}
                  </span>
                )}
              </div>

              {/* Name */}
              <p className="text-sm font-semibold text-fg leading-tight">{comp.name}</p>

              {/* Evidence */}
              <p className="text-xs text-fg-muted leading-relaxed flex-1">{comp.evidence}</p>

              {/* Source tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {comp.sources.map(src => (
                  <span
                    key={src}
                    className="text-[9px] font-mono px-1.5 py-0.5"
                    style={{
                      color: SOURCE_COLOR[src],
                      backgroundColor: SOURCE_COLOR[src] + '18',
                    }}
                  >
                    {src}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
