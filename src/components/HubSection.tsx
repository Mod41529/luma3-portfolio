'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight, X, ChevronDown, Compass, BarChart2, Megaphone, Workflow } from 'lucide-react'
import { works, categories } from '@/data/works'
import { CategoryId, WorkItem } from '@/types'

const ACCENT: Record<string, string> = {
  design:      '#E11D48',
  development: '#475569',
  business:    '#B45309',
}

// ── Shared section header strip ───────────────────────────────────────────────
function SectionHeader({ categoryId }: { categoryId: CategoryId }) {
  const cat      = categories[categoryId]
  const catWorks = works.filter((w) => w.category === categoryId)
  return (
    <div className="px-6 md:px-12 py-5 flex items-baseline border-b border-border">
      <div className="flex items-baseline gap-4">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-fg">{cat.nameEn}</h2>
        <span className="text-[10px] text-fg-subtle font-mono">
          {String(catWorks.length).padStart(2, '0')} works
        </span>
      </div>
    </div>
  )
}

// ── Design section — image card ───────────────────────────────────────────────
const DESIGN_IMG_BG: Record<string, string> = {
  d2: '#0a0a0a',
  d3: '#0a0a0a',
  d4: '#1a2744',
  d5: '#f5f0e8',
  d6: '#0d0d0d',
  d7: '#0d0d0d',
  d8: '#ede8e0',
}

function DesignCard({
  work,
  index,
  onClick,
}: {
  work: WorkItem
  index: number
  onClick: (w: WorkItem) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef     = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)

  // Lazy-load video when near viewport
  useEffect(() => {
    if (!work.videoSrc) return
    const container = containerRef.current
    if (!container) return
    const loader = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        loader.disconnect()
        fetch(work.videoSrc!, { method: 'HEAD' })
          .then((r) => { if (r.ok) setVideoReady(true) })
          .catch(() => {})
      },
      { rootMargin: '200px' }
    )
    loader.observe(container)
    return () => loader.disconnect()
  }, [work.videoSrc])

  // Play/pause on visibility
  useEffect(() => {
    const video = videoRef.current
    if (!video || !videoReady) return
    const player = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.15 }
    )
    player.observe(video)
    return () => player.disconnect()
  }, [videoReady])

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: (index % 8) * 0.04 }}
      onClick={() => onClick(work)}
      className="group relative w-full overflow-hidden cursor-pointer"
      style={{
        aspectRatio: work.aspectRatio ?? '3/4',
        backgroundColor: DESIGN_IMG_BG[work.id] ?? '#F4F4F2',
      }}
    >
      {work.videoSrc ? (
        videoReady ? (
          <video
            ref={videoRef}
            src={work.videoSrc}
            muted loop playsInline preload="metadata"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full" />
        )
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={work.imageSrc}
          alt={work.thumbnailAlt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      )}
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-250" />
      <div className="absolute bottom-0 left-0 right-0 p-3
                      translate-y-2 opacity-0
                      group-hover:translate-y-0 group-hover:opacity-100
                      transition-all duration-250">
        <p className="text-white text-[11px] font-black uppercase tracking-tight leading-tight">
          {work.title}
        </p>
        <p className="text-white/50 text-[9px] font-mono mt-0.5">
          {work.year} · {work.tools[0]}
        </p>
      </div>
    </motion.div>
  )
}

// ── Design detail panel ────────────────────────────────────────────────────────
function DesignDetailPanel({ work, onClose }: { work: WorkItem; onClose: () => void }) {
  const [howOpen, setHowOpen] = useState(true)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-0 left-0 right-0 z-[200] md:left-[200px]
                 bg-bg-card border-t border-border max-h-[60vh] overflow-y-auto"
    >
      <div className="sticky top-0 bg-bg-card/95 backdrop-blur-sm border-b border-border
                      px-6 md:px-10 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4 min-w-0">
          <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#E11D48] shrink-0">Design</span>
          <span className="text-[#e5e5e5] shrink-0">—</span>
          <h2 className="text-sm font-black uppercase tracking-tight text-fg truncate">{work.title}</h2>
          <span className="text-[10px] text-fg-subtle font-mono shrink-0">{work.year}</span>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center text-fg-subtle
                     hover:text-fg hover:bg-bg-hover transition-colors ml-4 shrink-0"
        >
          <X size={14} />
        </button>
      </div>

      <div className="px-6 md:px-10 py-6 grid md:grid-cols-2 gap-8 max-w-4xl">
        <div className="space-y-5">
          <p className="text-sm text-fg-muted font-light leading-relaxed">{work.description}</p>
          <p className="text-sm text-fg-subtle leading-relaxed">{work.descriptionKo}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            {work.tools.map((t) => (
              <span key={t} className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider
                                       text-fg-muted border border-border bg-bg-subtle">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          <button
            onClick={() => setHowOpen((o) => !o)}
            className="w-full flex items-center justify-between py-3 border-b border-border text-left"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-fg">
              How I made this
            </span>
            <motion.div animate={{ rotate: howOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={14} className="text-fg-subtle" />
            </motion.div>
          </button>
          <AnimatePresence initial={false}>
            {howOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                <div className="py-5 space-y-4">
                  {work.howIMadeThis.prompt && (
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-fg-subtle mb-2">Prompt</p>
                      <pre className="bg-[#111821] text-[#94a3b8] text-[11px] font-mono
                                      leading-relaxed p-4 whitespace-pre-wrap break-words">
                        <span className="text-[#1978e5] italic block mb-1">// AI Prompt</span>
                        {work.howIMadeThis.prompt}
                      </pre>
                    </div>
                  )}
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-fg-subtle mb-2">Process</p>
                    <p className="text-xs text-fg-muted leading-relaxed">{work.howIMadeThis.processNotes}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

// ── Design section body ───────────────────────────────────────────────────────
function DesignBody() {
  const [selected, setSelected] = useState<WorkItem | null>(null)
  const handleClose = useCallback(() => setSelected(null), [])
  const imageWorks = works.filter((w) => w.category === 'design' && (w.imageSrc || w.videoSrc))

  return (
    <>
      {/* Masonry — CSS columns, natural aspect ratios */}
      <div className="relative border-b border-border">
        <div
          className="bg-border"
          style={{
            columns: '4 180px',
            columnGap: '1px',
            padding: '1px',
            paddingBottom: '160px',
          }}
        >
          {imageWorks.map((work, i) => (
            <div key={work.id} className="break-inside-avoid mb-px">
              <DesignCard work={work} index={i} onClick={setSelected} />
            </div>
          ))}
        </div>

        {/* Fade — solid #fafafa covers grey column gaps, fades into content above */}
        <div
          className="absolute bottom-0 left-0 right-0 h-72 pointer-events-none"
          style={{ background: 'linear-gradient(to top, var(--bg) 0%, var(--bg) 30%, transparent 75%)' }}
        />

        {/* View more button */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <Link href="/work/design" className="group flex flex-col items-center gap-2">
            <div className="flex items-center gap-4">
              <div className="h-px w-10 bg-[#c3c3c3] group-hover:w-16 transition-all duration-300" />
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-fg-muted
                               group-hover:text-fg transition-colors duration-200">
                View more
              </span>
              <div className="h-px w-10 bg-[#c3c3c3] group-hover:w-16 transition-all duration-300" />
            </div>
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="text-fg-faint group-hover:text-fg transition-colors duration-200"
            >
              <ArrowUpRight size={12} strokeWidth={1.5} className="rotate-90" />
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              key="design-backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 z-[199] bg-black/20 backdrop-blur-[2px]"
            />
            <DesignDetailPanel key="design-panel" work={selected} onClose={handleClose} />
          </>
        )}
      </AnimatePresence>
    </>
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
      {/* Top: featured project info */}
      <div className="px-6 md:px-12 py-8 md:py-10 flex flex-col md:flex-row gap-8 md:gap-20 border-b border-border">
        <div className="flex gap-7 items-start shrink-0">
          <span className="text-[10px] font-mono text-fg-faint mt-1.5 shrink-0">01</span>
          <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-fg leading-[0.92]">
            {featured.title}
          </h3>
        </div>
        <div>
          <p className="text-sm text-fg-muted font-light leading-relaxed mb-5">
            {featured.description}
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            {featured.tools.map((tool) => (
              <span key={tool} className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-fg-muted border border-border">
                {tool}
              </span>
            ))}
            <span className="text-[9px] font-mono text-fg-faint ml-3">{featured.year}</span>
          </div>
        </div>
      </div>

      {/* Rest of dev works — compact list */}
      <div className="border-b border-border">
        {works
          .filter((w) => w.category === 'development' && !w.featured && w.showOnHome !== false)
          .map((w, i) => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              className="flex items-center gap-4 px-6 md:px-12 py-3.5 border-b border-border last:border-0
                         hover:bg-bg-subtle transition-colors duration-150"
            >
              <span className="text-[10px] font-mono text-fg-faint w-5 shrink-0">
                {String(i + 2).padStart(2, '0')}
              </span>
              <span className="text-sm text-fg flex-1 font-medium">{w.title}</span>
              <div className="hidden sm:flex flex-wrap gap-1.5">
                {w.tools.slice(0, 3).map((tool) => (
                  <span key={tool} className="text-[9px] font-mono text-fg-faint px-1.5 py-0.5 bg-bg-subtle border border-border">
                    {tool}
                  </span>
                ))}
              </div>
              <span className="text-[9px] font-mono text-fg-faint shrink-0">{w.year}</span>
            </motion.div>
          ))}
      </div>

      {/* View more */}
      <div className="px-6 md:px-12 py-6 flex justify-center">
        <Link
          href="/work/development"
          className="group flex flex-col items-center gap-2"
        >
          <div className="flex items-center gap-4">
            <div className="h-px w-10 bg-border group-hover:w-16 transition-all duration-300" />
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-fg-muted group-hover:text-fg transition-colors duration-200">
              View more
            </span>
            <div className="h-px w-10 bg-border group-hover:w-16 transition-all duration-300" />
          </div>
          <motion.div
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="text-fg-faint group-hover:text-fg transition-colors duration-200"
          >
            <ArrowUpRight size={12} strokeWidth={1.5} className="rotate-90" />
          </motion.div>
        </Link>
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
      'NBER·SV 사례 파이프라인 — 분기별 학술 논문·스타트업 케이스를 가설로 전환해 실무에 적용한다',
      '탐색/활용 분리 운영 — 주간 업무를 탐색 트랙·활용 트랙으로 구분해 학습 효율을 높인다',
    ],
    workIds: ['s1', 's2', 's5'],
  },
  {
    id:       'business-재무',
    label:    '재무',
    labelEn:  'Finance',
    Icon:     BarChart2,
    color:    '#0369A1',
    description: '자원을 어디에 묶을지 결정하는 핵심 판단 축 — SaaS 핵심 지표와 현금흐름을 기반으로 의사결정 신호를 포착합니다.',
    points: [
      'SaaS 핵심 지표 대시보드 — MRR·번레이트·LTV:CAC 비율을 추적해 런웨이를 관리한다',
      '손익 기준 도입 — 저효율 프로젝트의 중단 기준과 손실 한도를 사전에 설정한다',
      '코호트 기반 분석 — 고객군별 LTV·CAC를 분리해 반복매출 고객군을 집중 육성한다',
    ],
    workIds: ['s3'],
  },
  {
    id:       'business-마케팅',
    label:    '마케팅',
    labelEn:  'Marketing',
    Icon:     Megaphone,
    color:    '#7C3AED',
    description: '유입·전환·재방문을 잇는 실무 실행 체계 — ICP 식별부터 자동화 아웃바운드까지 데이터 기반으로 운영합니다.',
    points: [
      'ICP 식별 & 스코어링 — Clay 데이터 보강으로 이상 고객 프로필을 정의하고 우선순위를 산정한다',
      '2트랙 아웃바운드 — 웜 리드와 콜드 리드를 분리해 시퀀스를 개인화하고 전환율을 개선한다',
      '결과 중심 카피 — 기능 중심에서 결정 장면 중심 메시지로 전환해 상담 전환율을 높인다',
    ],
    workIds: ['s4'],
  },
  {
    id:       'business-운영',
    label:    '운영',
    labelEn:  'Operations',
    Icon:     Workflow,
    color:    '#059669',
    description: '반복 업무를 자동화하고 운영 체계를 설계하는 실행 엔진 — AI 오케스트레이션, 콘텐츠 파이프라인, 자동화 SOP.',
    points: [
      'AI 오케스트레이션 — Claude·Codex·Gemini를 역할 분리해 4기기 멀티에이전트 시스템으로 운영한다',
      '콘텐츠 자동화 파이프라인 — 스크립트 생성·TTS·업로드를 Gemini API로 자동화해 발행 주기를 단축한다',
      '운영 SOP 고정 — 노출 기준·종료조건·품질 게이트를 체크리스트로 표준화해 재작업률을 낮춘다',
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
      className="bg-bg-card p-8 md:p-10 flex flex-col gap-6 scroll-mt-8"
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
          <p className="text-xl font-black tracking-tight text-fg">{label}</p>
          <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-fg-subtle mt-0.5">{labelEn}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-fg-muted leading-relaxed">{description}</p>

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
                <p className="text-xs font-bold text-fg leading-tight">{title}</p>
                <p className="text-[10px] text-fg-subtle leading-snug mt-0.5">{rest.join(' — ')}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Works */}
      {domainWorks.length > 0 && (
        <div className="pt-4 border-t border-border space-y-2">
          {domainWorks.map((w) => (
            <Link key={w.id} href="/work/business" className="group flex items-center gap-2">
              <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: color }} />
              <span className="text-xs text-fg font-medium group-hover:text-[#1978e5] transition-colors duration-150">
                {w.title}
              </span>
              <ArrowUpRight size={10} className="text-fg-faint group-hover:text-[#1978e5] transition-colors duration-150 ml-auto" />
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
    <div className="space-y-px border-b border-border bg-border">
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
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
    <section id="design" className="border-t border-border">
      <SectionHeader categoryId="design" />
      <DesignBody />
    </section>
  )
}

export function DevelopmentSection() {
  return (
    <section id="development" className="border-t border-border">
      <SectionHeader categoryId="development" />
      <DevelopmentBody />
    </section>
  )
}

export function BusinessSection() {
  return (
    <section id="business" className="border-t border-border">
      <SectionHeader categoryId="business" />
      <BusinessBody />
    </section>
  )
}
