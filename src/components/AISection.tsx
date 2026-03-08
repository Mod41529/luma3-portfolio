'use client'

import { motion } from 'framer-motion'

const SKILLS = [
  {
    num: '01',
    ko: '분해 능력',
    en: 'Decomposition',
    evidence: '문제를 에이전트 단위로 분할 → 태스크 브리프 구조화',
  },
  {
    num: '02',
    ko: '컨텍스트 설계',
    en: 'Context Architecture',
    evidence: 'CLAUDE.md + SHARED_MEMORY.md 크로스세션 유지',
  },
  {
    num: '03',
    ko: '완료 정의',
    en: 'Definition of Done',
    evidence: 'Done Criteria 선행 명시 후 위임 — T001~T046',
  },
  {
    num: '04',
    ko: '실패 복구',
    en: 'Failure Recovery',
    evidence: '--resume 플래그로 실패·중단 태스크 자동 재위임',
  },
  {
    num: '05',
    ko: '관찰 가능성',
    en: 'Observability',
    evidence: 'activity.jsonl 실시간 이벤트 로그 + 상태 추적',
  },
  {
    num: '06',
    ko: '메모리 설계',
    en: 'Memory Architecture',
    evidence: 'SHARED_MEMORY.md 장기 컨텍스트 구조화',
  },
  {
    num: '07',
    ko: '병렬 관리',
    en: 'Parallel Orchestration',
    evidence: 'Claude · Codex · Gemini 동시 3에이전트 운영',
  },
  {
    num: '08',
    ko: '추상화 계층',
    en: 'Abstraction Layering',
    evidence: 'orchestrate.sh — 반복 워크플로를 스킬로 추상화',
  },
  {
    num: '09',
    ko: '감각',
    en: 'Taste',
    evidence: '리뷰 · 판단 · 방향 설정은 항상 인간이 수행',
  },
]

export default function AISection() {
  return (
    <section
      id="ai"
      className="border-t border-border"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Section header */}
      <div className="px-6 md:px-12 py-8 md:py-10 border-b flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div>
          <p className="text-[9px] font-mono uppercase tracking-[0.3em] mb-2"
            style={{ color: '#1978e5' }}>
            Agentic Engineering
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.9]"
            style={{ color: '#fafafa' }}>
            AI Capabilities
          </h2>
          <p className="text-sm font-light mt-3" style={{ color: '#737373' }}>
            에이전틱 엔지니어링 시대의 생존 스킬 9가지 — 전부 실증됨
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 shrink-0">
          {[
            { value: '9 / 9', label: 'Skills' },
            { value: '65',    label: 'Tasks' },
            { value: '3',     label: 'Agents' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-black tracking-tight" style={{ color: '#fafafa' }}>
                {value}
              </p>
              <p className="text-[9px] font-mono uppercase tracking-[0.2em] mt-0.5"
                style={{ color: '#525252' }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills grid */}
      <div className="px-6 md:px-12 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
        style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
        {SKILLS.map((skill, i) => (
          <motion.div
            key={skill.num}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
            className="p-6 flex flex-col gap-3"
            style={{ backgroundColor: '#0a0a0a' }}
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-mono" style={{ color: '#525252' }}>
                {skill.num}
              </span>
              {/* check badge */}
              <span className="text-[9px] font-mono px-1.5 py-0.5"
                style={{ color: '#059669', backgroundColor: 'rgba(5,150,105,0.12)' }}>
                ✓ verified
              </span>
            </div>

            <div>
              <p className="text-base font-bold leading-tight" style={{ color: '#fafafa' }}>
                {skill.ko}
              </p>
              <p className="text-[11px] font-mono mt-0.5" style={{ color: '#1978e5' }}>
                {skill.en}
              </p>
            </div>

            <p className="text-xs leading-relaxed" style={{ color: '#737373' }}>
              {skill.evidence}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Footer bar */}
      <div className="px-6 md:px-12 py-4 border-t flex items-center gap-2"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
        <p className="text-[9px] font-mono uppercase tracking-[0.25em]" style={{ color: '#525252' }}>
          Based on — 에이전틱 엔지니어링 시대의 생존 스킬 9가지 (Flowkater.io · 2026-03)
        </p>
      </div>
    </section>
  )
}
