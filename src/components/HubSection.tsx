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
// Background colors matched to each image's dominant tone
const DESIGN_IMG_BG: Record<string, string> = {
  d2: '#0a0a0a',   // AI Orchestration — dark/black
  d3: '#0a0a0a',   // Physical AI — dark/black
  d4: '#1a2744',   // IGNITION — dark navy
  d5: '#f5f0e8',   // 종훈 청과 logo — warm cream
}

function DesignBody() {
  const cat        = categories['design']
  const catWorks   = works.filter((w) => w.category === 'design')
  const featured   = catWorks.find((w) => w.featured) ?? catWorks[0]
  const imageWorks = catWorks.filter((w) => w.imageSrc)

  return (
    <div className="border-b border-[#e5e5e5]">
      {/* Top strip — description + MOD featured */}
      <div className="flex flex-col md:flex-row border-b border-[#e5e5e5]">
        {/* Left: category description */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 px-6 md:px-12 py-8 border-b md:border-b-0 md:border-r border-[#e5e5e5]"
        >
          <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#a3a3a3] mb-3">Category</p>
          <p className="text-sm text-[#737373] font-light leading-relaxed">{cat.description}</p>
        </motion.div>

        {/* Right: MOD featured */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            <Link href="/work/design" className="group flex flex-col h-full px-6 md:px-12 py-8 hover:bg-[#FAFAFA] transition-colors duration-200">
              <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#E11D48] mb-3">Featured</p>
              <p className="text-base font-black uppercase tracking-tight text-[#1a1a1a] group-hover:text-[#1978e5] transition-colors duration-200 leading-tight mb-1">
                {featured.title}
              </p>
              <p className="text-[10px] text-[#a3a3a3] font-mono mb-3">{featured.titleKo} · {featured.year}</p>
              <p className="text-xs text-[#737373] leading-relaxed mb-5 line-clamp-2">{featured.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-wrap gap-1.5">
                  {featured.tools.slice(0, 3).map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#a3a3a3] border border-[#e5e5e5]">{t}</span>
                  ))}
                </div>
                <div className="w-7 h-7 flex items-center justify-center border border-[#e5e5e5] group-hover:border-[#1978e5] group-hover:bg-[#1978e5] transition-all duration-200 shrink-0">
                  <ArrowUpRight size={12} className="text-[#a3a3a3] group-hover:text-white transition-colors duration-200" />
                </div>
              </div>
            </Link>
          </motion.div>
        )}
      </div>

      {/* Bottom — image gallery (4 portrait cards) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#e5e5e5]">
        {imageWorks.slice(0, 4).map((work, i) => {
          const isDark = (DESIGN_IMG_BG[work.id] ?? '#fff').startsWith('#0') || DESIGN_IMG_BG[work.id] === '#1a2744'
          return (
            <motion.div
              key={work.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="/work/design"
                className="group relative flex items-center justify-center overflow-hidden aspect-[3/4]"
                style={{ backgroundColor: DESIGN_IMG_BG[work.id] ?? '#F4F4F2' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={work.imageSrc}
                  alt={work.thumbnailAlt}
                  className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
                  style={{ background: isDark ? 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)' : 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)' }}
                >
                  <p className="text-white font-black text-xs leading-tight translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {work.title}
                  </p>
                  <p className="text-white/60 text-[9px] font-mono translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-[40ms]">
                    {work.year}
                  </p>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
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

        {/* SVG: horizontal flowchart
             viewBox  0 0 840 205
             center-y = 100
             Nodes — all text verified to fit within rect bounds

             Task       x=10   w=110  right=120   center=(65,100)
             Claude판단  x=148  w=160  right=308   center=(228,100)
             split at x=330  vertical 57→143
             Gemini     x=352  w=126  right=478   center=(415,57)
             Codex      x=352  w=126  right=478   center=(415,143) bottom=170
             merge at x=500  vertical 57→143
             Claude리뷰  x=522  w=160  right=682   center=(602,100) bottom=132
             Output     x=722  w=110  right=832   center=(777,100)
        */}
        <svg
          viewBox="0 0 840 205"
          className="relative w-full max-w-5xl"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ── Connectors (behind nodes) ── */}

          {/* Task → Claude */}
          <line x1="120" y1="100" x2="148" y2="100" stroke="#cbd5e1" strokeWidth="1"/>
          <polygon points="148,100 142,96 142,104" fill="#cbd5e1"/>

          {/* Claude → split */}
          <line x1="308" y1="100" x2="330" y2="100" stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="330" y1="57"  x2="330" y2="143" stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="330" y1="57"  x2="352" y2="57"  stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="330" y1="143" x2="352" y2="143" stroke="#cbd5e1" strokeWidth="1"/>
          <polygon points="352,57  346,53  346,61"  fill="#cbd5e1"/>
          <polygon points="352,143 346,139 346,147" fill="#cbd5e1"/>

          {/* Workers → merge */}
          <line x1="478" y1="57"  x2="500" y2="57"  stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="478" y1="143" x2="500" y2="143" stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="500" y1="57"  x2="500" y2="143" stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="500" y1="100" x2="522" y2="100" stroke="#cbd5e1" strokeWidth="1"/>
          <polygon points="522,100 516,96 516,104" fill="#cbd5e1"/>

          {/* Review → Output */}
          <line x1="682" y1="100" x2="722" y2="100" stroke="#cbd5e1" strokeWidth="1"/>
          <polygon points="722,100 716,96 716,104" fill="#cbd5e1"/>

          {/* Iterate: Review bottom (602,132) → down → left → Codex bottom (415,170) */}
          <path d="M 602,132 V 185 H 415 V 170" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3"/>
          <polygon points="415,170 411,177 419,177" fill="#cbd5e1"/>
          <text x="508" y="196" textAnchor="middle" fill="#c3c3c3" fontSize="8" fontFamily="monospace">iterate</text>

          {/* ── Nodes ── */}

          {/* Task  center=(65,100) */}
          <rect x="10" y="78" width="110" height="44" fill="#1a1a1a"/>
          <text x="65" y="93"  textAnchor="middle" fill="#6b7280" fontSize="7.5" fontFamily="monospace" letterSpacing="1.5">TASK</text>
          <text x="65" y="111" textAnchor="middle" fill="white"   fontSize="12"  fontFamily="sans-serif" fontWeight="900">luma3 빌드</text>

          {/* Claude — 판단  center=(228,100)  h=64 */}
          <rect x="148" y="68" width="160" height="64" fill="white" stroke="#475569" strokeWidth="1.5"/>
          <text x="228" y="85"  textAnchor="middle" fill="#475569" fontSize="7.5" fontFamily="monospace" letterSpacing="1">ORCHESTRATOR</text>
          <text x="228" y="105" textAnchor="middle" fill="#1a1a1a" fontSize="15"  fontFamily="sans-serif" fontWeight="900">Claude Code</text>
          <text x="228" y="122" textAnchor="middle" fill="#a3a3a3" fontSize="8"   fontFamily="monospace">판단 · 위임 결정</text>

          {/* Gemini  center=(415,57)  h=50 */}
          <rect x="352" y="32" width="126" height="50" fill="white" stroke="#059669" strokeWidth="1" strokeOpacity="0.7"/>
          <text x="415" y="48"  textAnchor="middle" fill="#059669" fontSize="7.5" fontFamily="monospace" letterSpacing="1">RESEARCH</text>
          <text x="415" y="68"  textAnchor="middle" fill="#1a1a1a" fontSize="14"  fontFamily="sans-serif" fontWeight="900">Gemini</text>

          {/* Codex  center=(415,143)  h=50 */}
          <rect x="352" y="118" width="126" height="50" fill="white" stroke="#D97706" strokeWidth="1" strokeOpacity="0.7"/>
          <text x="415" y="134" textAnchor="middle" fill="#D97706" fontSize="7.5" fontFamily="monospace" letterSpacing="1">CODE</text>
          <text x="415" y="154" textAnchor="middle" fill="#1a1a1a" fontSize="14"  fontFamily="sans-serif" fontWeight="900">Codex</text>

          {/* Claude — 리뷰  center=(602,100)  h=64 */}
          <rect x="522" y="68" width="160" height="64" fill="white" stroke="#475569" strokeWidth="1.5"/>
          <text x="602" y="85"  textAnchor="middle" fill="#475569" fontSize="7.5" fontFamily="monospace" letterSpacing="1">REVIEW</text>
          <text x="602" y="105" textAnchor="middle" fill="#1a1a1a" fontSize="15"  fontFamily="sans-serif" fontWeight="900">Claude Code</text>
          <text x="602" y="122" textAnchor="middle" fill="#a3a3a3" fontSize="8"   fontFamily="monospace">검토 · 재위임 or 승인</text>

          {/* Output  center=(777,100) */}
          <rect x="722" y="78" width="110" height="44" fill="#1a1a1a"/>
          <text x="777" y="93"  textAnchor="middle" fill="#6b7280" fontSize="7.5" fontFamily="monospace" letterSpacing="1.5">OUTPUT</text>
          <text x="777" y="111" textAnchor="middle" fill="white"   fontSize="12"  fontFamily="sans-serif" fontWeight="900">luma3.dev</text>
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
