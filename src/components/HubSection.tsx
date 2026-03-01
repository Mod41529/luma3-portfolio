'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, Compass, BarChart2, Megaphone, Workflow } from 'lucide-react'
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
const DEV_AGENTS = [
  { role: 'Research', name: 'Gemini',  color: '#059669', model: 'Flash · 1,500/day',  flag: '--yolo'                         },
  { role: 'Judgment', name: 'Claude',  color: '#475569', model: 'Opus 4.6 · Max plan', flag: '--dangerously-skip-permissions' },
  { role: 'Code',     name: 'Codex',   color: '#D97706', model: 'gpt-5.3-codex',       flag: '--full-auto'                    },
]

const ROUTING_RULES = [
  { condition: '≤5 min · 1–3 files',       agent: 'Self',              color: '#475569' },
  { condition: 'Pure research / docs',      agent: 'Gemini',            color: '#059669' },
  { condition: 'Heavy code · no research',  agent: 'Codex',             color: '#D97706' },
  { condition: 'Research + small code',     agent: 'Claude + Gemini',   color: '#7C3AED' },
  { condition: 'Research + heavy code',     agent: 'Full system',        color: '#E11D48' },
]

function DevelopmentBody() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col md:flex-row min-h-[520px]"
    >
      {/* Left: architecture diagram */}
      <div className="w-full md:w-3/5 border-b md:border-b-0 md:border-r border-[#e5e5e5] bg-[#F8F8F8] relative flex items-center justify-center p-8 md:p-16 min-h-[360px] md:min-h-0">
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right, #e5e5e5 1px, transparent 1px), linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Live indicator */}
        <div className="absolute top-5 right-5 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
          <span className="text-[8px] font-mono uppercase tracking-[0.25em] text-[#059669]">Live System</span>
        </div>

        <div className="relative w-full max-w-[420px] font-mono">
          {/* Orchestrator node */}
          <div className="flex justify-center mb-1">
            <div className="border-2 border-[#475569] bg-white px-6 py-3 text-center">
              <p className="text-[8px] uppercase tracking-[0.3em] text-[#475569] mb-0.5">Orchestrator</p>
              <p className="text-sm font-black text-[#1a1a1a]">Claude Code</p>
              <p className="text-[8px] text-[#a3a3a3] mt-0.5">Opus 4.6 · Max plan</p>
            </div>
          </div>

          {/* SVG connectors */}
          <svg className="w-full" height="52" viewBox="0 0 420 52" preserveAspectRatio="none">
            <line x1="210" y1="0"   x2="210" y2="26"  stroke="#cbd5e1" strokeWidth="1" />
            <line x1="56"  y1="26"  x2="364" y2="26"  stroke="#cbd5e1" strokeWidth="1" />
            <line x1="56"  y1="26"  x2="56"  y2="52"  stroke="#cbd5e1" strokeWidth="1" />
            <line x1="210" y1="26"  x2="210" y2="52"  stroke="#cbd5e1" strokeWidth="1" />
            <line x1="364" y1="26"  x2="364" y2="52"  stroke="#cbd5e1" strokeWidth="1" />
          </svg>

          {/* Worker nodes */}
          <div className="flex justify-between gap-2">
            {DEV_AGENTS.map(({ role, name, color, model, flag }) => (
              <div key={name} className="flex-1 border bg-white px-2.5 py-2.5" style={{ borderColor: color + '60' }}>
                <p className="text-[8px] uppercase tracking-[0.2em] mb-0.5" style={{ color }}>{role}</p>
                <p className="text-xs font-black text-[#1a1a1a]">{name}</p>
                <p className="text-[8px] text-[#a3a3a3] mt-1 leading-snug">{model}</p>
                <code className="text-[7px] text-[#c3c3c3] block mt-1.5 truncate">{flag}</code>
              </div>
            ))}
          </div>

          {/* Fallback chain */}
          <div className="mt-5 border border-[#e5e5e5] bg-white px-4 py-3">
            <p className="text-[7px] uppercase tracking-[0.25em] text-[#a3a3a3] mb-2.5">Fallback Chain</p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[8px] font-bold w-12 shrink-0" style={{ color: '#D97706' }}>Code</span>
                <div className="flex items-center gap-1 text-[8px]">
                  {['Codex', 'Sonnet', 'Gemini'].map((a, i, arr) => (
                    <span key={a} className="flex items-center gap-1">
                      <span className="text-[#475569] font-medium">{a}</span>
                      {i < arr.length - 1 && <span className="text-[#d4d4d4]">→</span>}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[8px] font-bold w-12 shrink-0" style={{ color: '#059669' }}>Research</span>
                <div className="flex items-center gap-1 text-[8px]">
                  {['Gemini', 'Haiku', 'Codex'].map((a, i, arr) => (
                    <span key={a} className="flex items-center gap-1">
                      <span className="text-[#475569] font-medium">{a}</span>
                      {i < arr.length - 1 && <span className="text-[#d4d4d4]">→</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Queue states */}
          <div className="mt-3 border border-[#e5e5e5] bg-white px-4 py-2 flex items-center justify-between">
            <span className="text-[7px] uppercase tracking-[0.25em] text-[#a3a3a3]">Queue</span>
            <div className="flex gap-1.5">
              {(['dispatched', 'in_progress', 'complete'] as const).map((s, i) => (
                <span
                  key={s}
                  className="text-[7px] font-bold px-1.5 py-0.5 uppercase tracking-wide"
                  style={{
                    color:           ['#D97706', '#475569', '#059669'][i],
                    backgroundColor: ['#D97706', '#475569', '#059669'][i] + '18',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right: routing decision table */}
      <div className="w-full md:w-2/5 flex flex-col bg-[#FAFAFA]">
        <div className="flex items-center justify-between px-8 py-5 border-b border-[#e5e5e5]">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]">Routing Decision Flow</span>
          <Link
            href="/work/development"
            className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#475569] hover:opacity-70 transition-opacity flex items-center gap-1"
          >
            View all <ArrowUpRight size={9} />
          </Link>
        </div>

        <div className="flex flex-col px-8 py-7 gap-0 flex-1">
          <p className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#a3a3a3] mb-4">
            Task type → Agent assignment
          </p>

          {ROUTING_RULES.map(({ condition, agent, color }, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 border-b border-[#f0f0f0]"
            >
              <div className="flex items-center gap-3">
                <span className="text-[8px] font-mono text-[#d4d4d4] w-4 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[11px] text-[#737373] leading-snug">{condition}</span>
              </div>
              <span
                className="text-[8px] font-bold uppercase tracking-wide px-2 py-0.5 ml-3 shrink-0"
                style={{ color, backgroundColor: color + '14' }}
              >
                {agent}
              </span>
            </div>
          ))}

          {/* System meta */}
          <div className="mt-auto pt-7 space-y-3 border-t border-[#f0f0f0] mt-6">
            {[
              { label: 'Status',  value: 'Active · ~60% complete' },
              { label: 'Devices', value: 'Windows PC + Mac mini'  },
              { label: 'Goal',    value: 'Ebook on multi-agent ops' },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-baseline justify-between gap-4">
                <span className="text-[8px] font-mono uppercase tracking-[0.25em] text-[#a3a3a3] shrink-0">{label}</span>
                <span className="text-[10px] text-[#737373] text-right">{value}</span>
              </div>
            ))}
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
