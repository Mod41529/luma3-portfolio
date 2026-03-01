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

// ── Development section body ───────────────────────────────────────────────────
function DevelopmentBody() {
  const featured = works.find((w) => w.featured && w.category === 'development')
  if (!featured) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Top: project info */}
      <div className="px-6 md:px-12 py-8 md:py-10 flex flex-col md:flex-row gap-8 md:gap-20 border-b border-[#e5e5e5]">
        <div className="flex gap-7 items-start shrink-0">
          <span className="text-[10px] font-mono text-[#c3c3c3] mt-1.5 shrink-0">01</span>
          <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-[#1a1a1a] leading-[0.92]">
            {featured.title}
          </h3>
        </div>
        <div>
          <p className="text-sm text-[#737373] font-light leading-relaxed mb-5">
            {featured.description}
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            {featured.tools.map((tool) => (
              <span key={tool} className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#737373] border border-[#e5e5e5]">
                {tool}
              </span>
            ))}
            <span className="text-[9px] font-mono text-[#c3c3c3] ml-3">{featured.year}</span>
          </div>
        </div>
      </div>

      {/* Bottom: full-width horizontal flowchart */}
      <div className="bg-[#F8F8F8] relative flex items-center justify-center px-8 md:px-14 py-12 md:py-14 min-h-[280px] overflow-hidden">
        {/* grid background */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right, #e5e5e5 1px, transparent 1px), linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* panel labels */}
        <p className="absolute top-5 left-6 text-[8px] font-mono uppercase tracking-[0.25em] text-[#a3a3a3]">
          Example — luma3 포트폴리오 빌드
        </p>
        <div className="absolute top-5 right-6 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
          <span className="text-[8px] font-mono uppercase tracking-[0.25em] text-[#059669]">Live System</span>
        </div>

        {/* SVG: horizontal flowchart */}
        <svg
          viewBox="0 0 860 240"
          className="relative w-full max-w-5xl"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ── Connector lines (drawn first, behind nodes) ── */}

          {/* Task → Claude */}
          <line x1="120" y1="120" x2="155" y2="120" stroke="#cbd5e1" strokeWidth="1"/>
          <polygon points="155,120 148,116 148,124" fill="#cbd5e1"/>

          {/* Claude → branch split at x=345 */}
          <line x1="320" y1="120" x2="345" y2="120" stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="345" y1="57"  x2="345" y2="183" stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="345" y1="57"  x2="370" y2="57"  stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="345" y1="183" x2="370" y2="183" stroke="#cbd5e1" strokeWidth="1"/>
          <polygon points="370,57  363,53  363,61"  fill="#cbd5e1"/>
          <polygon points="370,183 363,179 363,187" fill="#cbd5e1"/>

          {/* Workers → merge at x=525 */}
          <line x1="500" y1="57"  x2="525" y2="57"  stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="500" y1="183" x2="525" y2="183" stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="525" y1="57"  x2="525" y2="183" stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="525" y1="120" x2="555" y2="120" stroke="#cbd5e1" strokeWidth="1"/>
          <polygon points="555,120 548,116 548,124" fill="#cbd5e1"/>

          {/* Review → Deploy */}
          <line x1="720" y1="120" x2="740" y2="120" stroke="#cbd5e1" strokeWidth="1"/>
          <polygon points="740,120 733,116 733,124" fill="#cbd5e1"/>

          {/* Iterate: Review bottom → down → left → Codex bottom (dashed) */}
          <path d="M 637,165 V 225 H 435 V 216" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3"/>
          <polygon points="435,216 431,223 439,223" fill="#cbd5e1"/>
          <text x="536" y="236" textAnchor="middle" fill="#c3c3c3" fontSize="8" fontFamily="monospace">iterate</text>

          {/* ── Nodes ── */}

          {/* Task */}
          <rect x="10" y="98" width="110" height="44" fill="#1a1a1a"/>
          <text x="65" y="115" textAnchor="middle" fill="#737373" fontSize="7"  fontFamily="monospace" letterSpacing="2">TASK</text>
          <text x="65" y="132" textAnchor="middle" fill="white"   fontSize="11" fontFamily="sans-serif" fontWeight="900">luma3 빌드</text>

          {/* Claude — Orchestrator */}
          <rect x="155" y="75" width="165" height="90" fill="white" stroke="#475569" strokeWidth="1.5"/>
          <text x="237" y="93"  textAnchor="middle" fill="#475569" fontSize="7"   fontFamily="monospace" letterSpacing="1.5">ORCHESTRATOR · 판단</text>
          <text x="237" y="110" textAnchor="middle" fill="#1a1a1a" fontSize="13"  fontFamily="sans-serif" fontWeight="900">Claude Code</text>
          <text x="237" y="126" textAnchor="middle" fill="#a3a3a3" fontSize="7.5" fontFamily="monospace">Research + Heavy code</text>
          <text x="237" y="139" textAnchor="middle" fill="#a3a3a3" fontSize="7.5" fontFamily="monospace">→ Full orchestration</text>
          <text x="237" y="155" textAnchor="middle" fill="#c3c3c3" fontSize="7"   fontFamily="monospace">Claude Max plan · Opus 4.6</text>

          {/* Gemini */}
          <rect x="370" y="24" width="130" height="66" fill="white" stroke="#059669" strokeWidth="1" strokeOpacity="0.6"/>
          <text x="435" y="41"  textAnchor="middle" fill="#059669" fontSize="7"   fontFamily="monospace" letterSpacing="2">RESEARCH</text>
          <text x="435" y="57"  textAnchor="middle" fill="#1a1a1a" fontSize="12"  fontFamily="sans-serif" fontWeight="900">Gemini</text>
          <text x="435" y="72"  textAnchor="middle" fill="#a3a3a3" fontSize="7.5" fontFamily="monospace">Next.js 14 패턴 · 디자인 레퍼런스</text>
          <text x="435" y="83"  textAnchor="middle" fill="#c3c3c3" fontSize="7"   fontFamily="monospace">Flash 2.5 · 1,500 req/day</text>

          {/* Codex */}
          <rect x="370" y="150" width="130" height="66" fill="white" stroke="#D97706" strokeWidth="1" strokeOpacity="0.6"/>
          <text x="435" y="167" textAnchor="middle" fill="#D97706" fontSize="7"   fontFamily="monospace" letterSpacing="2">CODE</text>
          <text x="435" y="183" textAnchor="middle" fill="#1a1a1a" fontSize="12"  fontFamily="sans-serif" fontWeight="900">Codex</text>
          <text x="435" y="198" textAnchor="middle" fill="#a3a3a3" fontSize="7.5" fontFamily="monospace">Hero · BentoGrid · HubSection…</text>
          <text x="435" y="209" textAnchor="middle" fill="#c3c3c3" fontSize="7"   fontFamily="monospace">gpt-5.3-codex · full-auto</text>

          {/* Claude — Review */}
          <rect x="555" y="75" width="165" height="90" fill="white" stroke="#475569" strokeWidth="1.5"/>
          <text x="637" y="93"  textAnchor="middle" fill="#475569" fontSize="7"   fontFamily="monospace" letterSpacing="1.5">REVIEW · 조정</text>
          <text x="637" y="110" textAnchor="middle" fill="#1a1a1a" fontSize="13"  fontFamily="sans-serif" fontWeight="900">Claude Code</text>
          <text x="637" y="126" textAnchor="middle" fill="#a3a3a3" fontSize="7.5" fontFamily="monospace">결과 검토 · 방향 수정</text>
          <text x="637" y="139" textAnchor="middle" fill="#a3a3a3" fontSize="7.5" fontFamily="monospace">재위임 or 승인</text>
          <text x="637" y="155" textAnchor="middle" fill="#c3c3c3" fontSize="7"   fontFamily="monospace">Sonnet 4.6 subagent</text>

          {/* Deploy / Output */}
          <rect x="740" y="98" width="110" height="44" fill="#1a1a1a"/>
          <text x="795" y="115" textAnchor="middle" fill="#737373" fontSize="7"  fontFamily="monospace" letterSpacing="2">OUTPUT</text>
          <text x="795" y="132" textAnchor="middle" fill="white"   fontSize="11" fontFamily="sans-serif" fontWeight="900">luma3.dev 배포</text>
        </svg>
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
