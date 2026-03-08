'use client'

import { motion } from 'framer-motion'

const SKILLS = [
  { num: '01', en: 'Decomposition',          evidence: 'Break problems into agent-sized task briefs' },
  { num: '02', en: 'Context Architecture',   evidence: 'CLAUDE.md + SHARED_MEMORY.md cross-session state' },
  { num: '03', en: 'Definition of Done',     evidence: 'Done criteria defined before every delegation' },
  { num: '04', en: 'Failure Recovery',       evidence: '--resume flag auto-retries failed tasks' },
  { num: '05', en: 'Observability',          evidence: 'activity.jsonl real-time event log + state tracking' },
  { num: '06', en: 'Memory Architecture',    evidence: 'Long-term context structured in SHARED_MEMORY.md' },
  { num: '07', en: 'Parallel Orchestration', evidence: 'Claude · Codex · Gemini running concurrently' },
  { num: '08', en: 'Abstraction Layering',   evidence: 'Recurring workflows extracted into reusable skills' },
  { num: '09', en: 'Taste',                  evidence: 'Review, judgment, direction — always human' },
]

export default function AISection() {
  return (
    <section id="ai" className="border-t border-border">
      {/* Section header */}
      <div className="px-6 md:px-12 py-5 flex items-baseline border-b border-border">
        <div className="flex items-baseline gap-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-fg">AI Capabilities</h2>
          <span className="text-[10px] text-fg-subtle font-mono">9 skills</span>
        </div>
      </div>

      {/* Skills grid */}
      <div className="px-6 md:px-12 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {SKILLS.map((skill, i) => (
          <motion.div
            key={skill.num}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
            className="flex flex-col gap-1.5"
          >
            <span className="text-[9px] font-mono text-fg-faint">{skill.num}</span>
            <p className="text-sm font-semibold text-fg">{skill.en}</p>
            <p className="text-xs text-fg-muted leading-relaxed">{skill.evidence}</p>
          </motion.div>
        ))}
      </div>

      {/* Footer attribution */}
      <div className="px-6 md:px-12 py-4 border-t border-border">
        <p className="text-[9px] font-mono text-fg-faint uppercase tracking-[0.25em]">
          Based on — 에이전틱 엔지니어링 시대의 생존 스킬 9가지 (Flowkater.io · 2026-03)
        </p>
      </div>
    </section>
  )
}
