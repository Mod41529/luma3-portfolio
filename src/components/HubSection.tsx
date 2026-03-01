'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, Compass, BarChart2, Megaphone, Workflow, ChevronDown } from 'lucide-react'
import { works, categories } from '@/data/works'
import { CategoryId } from '@/types'

const ACCENT: Record<string, string> = {
  design:      '#E11D48',
  development: '#475569',
  strategy:    '#B45309',
}

// ── Shared section header strip ───────────────────────────────────────────────
function SectionHeader({ categoryId }: { categoryId: CategoryId }) {
  const cat      = categories[categoryId]
  const catWorks = works.filter((w) => w.category === categoryId)
  const accent   = ACCENT[categoryId]
  return (
    <div className="px-6 md:px-12 py-5 flex items-baseline justify-between border-b border-[#e5e5e5]">
      <div className="flex items-baseline gap-4">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1a1a1a]">{cat.nameEn}</h2>
        <span className="text-[10px] text-[#a3a3a3] font-mono">
          {String(catWorks.length).padStart(2, '0')} works
        </span>
      </div>
      <Link
        href={`/work/${categoryId}`}
        className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.25em] transition-colors duration-200"
        style={{ color: accent }}
      >
        View all <ArrowUpRight size={10} strokeWidth={2} />
      </Link>
    </div>
  )
}

// ── Design section body ───────────────────────────────────────────────────────
function DesignBody() {
  const cat      = categories['design']
  const catWorks = works.filter((w) => w.category === 'design')
  const featured = catWorks.find((w) => w.featured) ?? catWorks[0]
  const accent   = ACCENT['design']

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="px-6 md:px-12 py-10"
    >
      <div className="max-w-7xl grid md:grid-cols-3 gap-8">
        <div>
          <p className="text-sm text-[#737373] font-light leading-relaxed">{cat.description}</p>
        </div>
        {featured && (
          <Link href="/work/design" className="group col-span-2">
            <div className="border border-[#e5e5e5] hover:border-[#c3c3c3] bg-[#FAFAFA] hover:bg-white transition-all duration-200 p-6">
              <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#a3a3a3] mb-3">Featured</p>
              <p className="text-base font-black uppercase tracking-tight text-[#1a1a1a] group-hover:text-[#1978e5] transition-colors duration-200 leading-tight mb-1">
                {featured.title}
              </p>
              <p className="text-[10px] text-[#a3a3a3] font-mono mb-4">{featured.titleKo} · {featured.year}</p>
              <p className="text-xs text-[#737373] leading-relaxed mb-5 line-clamp-2">{featured.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {featured.tools.slice(0, 4).map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#a3a3a3] border border-[#e5e5e5]">{t}</span>
                  ))}
                </div>
                <div className="w-7 h-7 flex items-center justify-center border border-[#e5e5e5] group-hover:border-[#1978e5] group-hover:bg-[#1978e5] transition-all duration-200 shrink-0">
                  <ArrowUpRight size={12} className="text-[#a3a3a3] group-hover:text-white transition-colors duration-200" />
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>
    </motion.div>
  )
}

// ── Development section body — orchestration diagram ─────────────────────────
function DevelopmentBody() {
  const [howIMadeOpen, setHowIMadeOpen] = useState(false)
  const [specsOpen, setSpecsOpen]       = useState(false)

  const featured = works.find((w) => w.featured && w.category === 'development')
  if (!featured) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col md:flex-row min-h-[520px]"
    >
      {/* Left: orchestration diagram */}
      <div className="w-full md:w-3/5 border-b md:border-b-0 md:border-r border-[#e5e5e5] bg-[#F0F0F0] relative flex items-center justify-center p-8 md:p-16 min-h-[320px] md:min-h-0">
        <div
          className="absolute inset-0 opacity-60 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right, #e5e5e5 1px, transparent 1px), linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative w-full max-w-lg font-mono">
          {/* Orchestrator */}
          <div className="border border-[#475569] bg-white px-5 py-3 mb-8 mx-auto w-fit">
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#475569] mb-0.5">Orchestrator</p>
            <p className="text-sm font-black text-[#1a1a1a]">Claude Code</p>
          </div>
          {/* Connectors */}
          <div className="flex justify-center gap-0 mb-0 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-4 bg-[#cbd5e1]" />
            <div className="absolute top-4 left-[20%] right-[20%] h-px bg-[#cbd5e1]" />
            <div className="absolute top-4 left-[20%] w-px h-4 bg-[#cbd5e1]" />
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-[#cbd5e1]" />
            <div className="absolute top-4 right-[20%] w-px h-4 bg-[#cbd5e1]" />
          </div>
          {/* Worker nodes */}
          <div className="flex justify-between gap-3 mt-8 pt-1">
            {[
              { label: 'Research', name: 'Gemini', color: '#059669', note: '1,500 req/day' },
              { label: 'Judgment', name: 'Claude', color: '#475569', note: 'Max plan' },
              { label: 'Code',     name: 'Codex',  color: '#D97706', note: 'Heavy quota' },
            ].map(({ label, name, color, note }) => (
              <div key={name} className="flex-1 border px-3 py-2.5" style={{ borderColor: color }}>
                <p className="text-[8px] uppercase tracking-[0.25em] mb-0.5" style={{ color }}>{label}</p>
                <p className="text-xs font-black text-[#1a1a1a]">{name}</p>
                <p className="text-[8px] text-[#a3a3a3] mt-1">{note}</p>
              </div>
            ))}
          </div>
          {/* Queue status */}
          <div className="mt-8 border border-[#e5e5e5] px-4 py-2 flex items-center justify-between">
            <span className="text-[8px] uppercase tracking-[0.25em] text-[#a3a3a3]">Queue</span>
            <div className="flex gap-1.5">
              {['dispatched', 'in_progress', 'complete'].map((s, i) => (
                <span key={s} className="text-[8px] font-bold px-2 py-0.5 uppercase tracking-wide"
                  style={{ color: ['#D97706','#475569','#059669'][i], backgroundColor: ['#D97706','#475569','#059669'][i] + '18' }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right: project details */}
      <div className="w-full md:w-2/5 flex flex-col bg-[#FAFAFA]">
        <div className="flex items-center justify-between px-8 py-5 border-b border-[#e5e5e5]">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]">luma3 / Portfolio</span>
          <Link href="/work/development" className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#475569] hover:opacity-70 transition-opacity flex items-center gap-1">
            View all <ArrowUpRight size={9} />
          </Link>
        </div>

        <div className="flex flex-col p-8 md:p-10 gap-7">
          <div>
            <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-[#1a1a1a] uppercase leading-[0.9]">
              {featured.title.split(' ').map((word, i, arr) => (
                <span key={i}>{word}{i < arr.length - 1 && <br />}</span>
              ))}
            </h3>
            <div className="flex items-center gap-4 mt-4">
              <span className="text-xs font-medium text-[#737373] uppercase tracking-widest">Year: {featured.year}</span>
              <div className="h-px w-8 bg-[#e5e5e5]" />
              <span className="text-xs font-medium text-[#737373] uppercase tracking-widest">Status: Active</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {featured.tools.map((tool) => (
              <span key={tool} className="px-3 py-1 bg-[#f4f4f2] text-[10px] font-bold uppercase tracking-wider text-[#737373] border border-[#e5e5e5]">
                {tool}
              </span>
            ))}
          </div>

          <p className="text-sm leading-relaxed text-[#737373] font-light">{featured.description}</p>

          {/* Accordions */}
          <div className="border-t border-[#e5e5e5]">
            <div className="border-b border-[#e5e5e5]">
              <button
                onClick={() => setHowIMadeOpen((o) => !o)}
                className="w-full flex items-center justify-between py-4 text-left"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">How I made this</span>
                <motion.div animate={{ rotate: howIMadeOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={15} className="text-[#a3a3a3]" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {howIMadeOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-[#737373] leading-relaxed pb-6">
                      {featured.howIMadeThis.processNotes}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="border-b border-[#e5e5e5]">
              <button
                onClick={() => setSpecsOpen((o) => !o)}
                className="w-full flex items-center justify-between py-4 text-left"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">Technical Specs</span>
                <motion.div animate={{ rotate: specsOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={15} className="text-[#a3a3a3]" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {specsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 text-sm text-[#737373] leading-loose">
                      {featured.howIMadeThis.tools.map((t) => <div key={t}>— {t}</div>)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Business / Strategy section ───────────────────────────────────────────────
const BUSINESS_DOMAINS = [
  {
    id:       'business-전략',
    label:    '전략',
    labelEn:  'Strategy',
    Icon:     Compass,
    color:    '#B45309',
    description: '무엇을 할지를 정하는 판단 체계 — 시장·고객·운영 제약을 함께 고려해 실행 우선순위를 정렬합니다.',
    points: [
      '가설 설정 & 중단 기준 — PoC마다 중단 기준을 사전 명시해 리소스 낭비를 줄인다',
      '실험 정밀 설계 — 전환율·시간절감·반복사용 3지표 중심으로 핵심 판단지표를 고정한다',
      '탐색/활용 분리 — 주간 운영을 탐색 2건 + 활용 2건 트랙으로 분리해 학습효율을 높인다',
    ],
    workIds: ['s1', 's2'],
  },
  {
    id:       'business-재무',
    label:    '재무',
    labelEn:  'Finance',
    Icon:     BarChart2,
    color:    '#0369A1',
    description: '자원을 어디에 묶을지 결정하는 핵심 판단 축 — 매출·비용·현금흐름을 분기 단위로 점검합니다.',
    points: [
      'PoC 손익 기준 도입 — 저효율 프로젝트 중단 기준과 손실 한도를 사전 설정한다',
      '가격·할인 가드레일 — 일괄 할인 관행을 제거해 마진 변동성을 축소한다',
      '반복매출 고객군 집중 — 런웨이 안정성 개선을 위해 전환·마진·반복사용 지표를 우선한다',
    ],
    workIds: ['s3'],
  },
  {
    id:       'business-마케팅',
    label:    '마케팅',
    labelEn:  'Marketing',
    Icon:     Megaphone,
    color:    '#7C3AED',
    description: '유입·전환·재방문을 잇는 실무 실행 체계 — 좋은 감각보다 가설 검증이 우선인 판단 규칙을 유지합니다.',
    points: [
      '기능 카피 제거 — 결정 장면 중심 메시지로 전환해 상담 전환율을 개선한다',
      '역할별 랜딩 분리 — 고객군·역할별 랜딩 페이지를 분리해 데모 신청 전환율을 높인다',
      '성공 장면 카피 — 결과 중심 카피 도입으로 PoC 전환 개선을 검증한다',
    ],
    workIds: [],
  },
  {
    id:       'business-생산',
    label:    '생산',
    labelEn:  'Operations',
    Icon:     Workflow,
    color:    '#059669',
    description: '납기·품질·비용의 균형을 설계하는 운영 체계 — 병목과 재작업의 원인을 데이터로 분해합니다.',
    points: [
      '데모·실서비스 구분 명확화 — 노출 기준을 표준화해 초기 신뢰도를 개선한다',
      '노출 기준표 적용 — 품질 클레임 감소를 위한 승인 체크리스트를 SOP로 고정한다',
      '종료조건 도입 — 종료 기준 없는 반복 생성을 중단해 재작업률을 감소시킨다',
    ],
    workIds: [],
  },
]

function DomainPanel({
  id, label, labelEn, Icon, color, description, points, workIds, delay,
}: typeof BUSINESS_DOMAINS[number] & { delay: number }) {
  const domainWorks = works.filter((w) => workIds.includes(w.id))
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#FAFAFA] p-8 md:p-10 flex flex-col gap-6 scroll-mt-8"
    >
      {/* Icon + label */}
      <div className="flex items-start gap-5">
        <div
          className="w-12 h-12 flex items-center justify-center shrink-0"
          style={{ backgroundColor: color + '12', border: `1px solid ${color}30` }}
        >
          <Icon size={24} strokeWidth={1.3} style={{ color }} />
        </div>
        <div>
          <p className="text-xl font-black tracking-tight text-[#1a1a1a]">{label}</p>
          <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#a3a3a3] mt-0.5">{labelEn}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-[#737373] leading-relaxed">{description}</p>

      {/* 3 key points */}
      <div className="space-y-3 flex-1">
        {points.map((point, i) => {
          const [title, ...rest] = point.split(' — ')
          return (
            <div key={i} className="flex items-start gap-3">
              <span
                className="text-[9px] font-bold font-mono mt-0.5 shrink-0 w-5 text-right"
                style={{ color }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="text-xs font-bold text-[#1a1a1a] leading-tight">{title}</p>
                <p className="text-[10px] text-[#a3a3a3] leading-snug mt-0.5">{rest.join(' — ')}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Works */}
      {domainWorks.length > 0 && (
        <div className="pt-4 border-t border-[#e5e5e5] space-y-2">
          {domainWorks.map((w) => (
            <Link key={w.id} href="/work/strategy" className="group flex items-center gap-2">
              <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: color }} />
              <span className="text-xs text-[#1a1a1a] font-medium group-hover:text-[#1978e5] transition-colors duration-150">
                {w.title}
              </span>
              <ArrowUpRight size={10} className="text-[#c3c3c3] group-hover:text-[#1978e5] transition-colors duration-150 ml-auto" />
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function BusinessBody() {
  const rows = [BUSINESS_DOMAINS.slice(0, 2), BUSINESS_DOMAINS.slice(2, 4)]
  return (
    <div className="space-y-px border-b border-[#e5e5e5] bg-[#e5e5e5]">
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#e5e5e5]">
          {row.map((domain, colIdx) => (
            <DomainPanel
              key={domain.id}
              {...domain}
              delay={rowIdx * 0.1 + colIdx * 0.06}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

// ── Exported sections ─────────────────────────────────────────────────────────
export function DesignSection() {
  return (
    <section id="design" className="border-t border-[#e5e5e5]">
      <SectionHeader categoryId="design" />
      <DesignBody />
    </section>
  )
}

export function DevelopmentSection() {
  return (
    <section id="development" className="border-t border-[#e5e5e5]">
      <SectionHeader categoryId="development" />
      <DevelopmentBody />
    </section>
  )
}

export function BusinessSection() {
  return (
    <section id="strategy" className="border-t border-[#e5e5e5]">
      <SectionHeader categoryId="strategy" />
      <BusinessBody />
    </section>
  )
}
