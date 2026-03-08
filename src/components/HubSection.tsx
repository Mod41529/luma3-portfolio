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
      {/* Top: project info */}
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

      {/* Bottom: full-width horizontal flowchart */}
      <div className="bg-bg-subtle relative flex items-center justify-center px-6 md:px-10 py-16 md:py-24 min-h-[380px] overflow-hidden">
        {/* grid background */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* panel labels */}
        <p className="absolute top-5 left-6 text-[8px] font-mono uppercase tracking-[0.25em] text-fg-subtle">
          Example — luma3 포트폴리오 빌드
        </p>
        <div className="absolute top-5 right-6 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
          <span className="text-[8px] font-mono uppercase tracking-[0.25em] text-[#059669]">Live System</span>
        </div>

        {/* SVG: vertical flowchart — mobile only */}
        <svg
          viewBox="0 0 300 430"
          className="md:hidden relative w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Task */}
          <rect x="90" y="10" width="120" height="44" fill="#1a1a1a"/>
          <text x="150" y="26" textAnchor="middle" fill="#6b7280" fontSize="7.5" fontFamily="monospace" letterSpacing="1.5">TASK</text>
          <text x="150" y="44" textAnchor="middle" fill="white" fontSize="12" fontFamily="sans-serif" fontWeight="900">luma3 빌드</text>

          {/* Task → Claude */}
          <line x1="150" y1="54" x2="150" y2="74" stroke="#cbd5e1" strokeWidth="1"/>
          <polygon points="150,74 146,68 154,68" fill="#cbd5e1"/>

          {/* Claude 판단 */}
          <rect x="20" y="74" width="260" height="68" fill="white" stroke="#475569" strokeWidth="1.5"/>
          <text x="150" y="91" textAnchor="middle" fill="#475569" fontSize="7.5" fontFamily="monospace" letterSpacing="1">ORCHESTRATOR</text>
          <text x="150" y="112" textAnchor="middle" fill="#1a1a1a" fontSize="15" fontFamily="sans-serif" fontWeight="900">Claude Code</text>
          <text x="150" y="130" textAnchor="middle" fill="#a3a3a3" fontSize="8" fontFamily="monospace">판단 · 위임 결정</text>

          {/* Split */}
          <line x1="150" y1="142" x2="150" y2="158" stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="80"  y1="158" x2="220" y2="158" stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="80"  y1="158" x2="80"  y2="174" stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="220" y1="158" x2="220" y2="174" stroke="#cbd5e1" strokeWidth="1"/>
          <polygon points="80,174  76,168  84,168"  fill="#cbd5e1"/>
          <polygon points="220,174 216,168 224,168" fill="#cbd5e1"/>

          {/* Gemini */}
          <rect x="14" y="174" width="132" height="56" fill="white" stroke="#059669" strokeWidth="1" strokeOpacity="0.7"/>
          <text x="80" y="191" textAnchor="middle" fill="#059669" fontSize="7.5" fontFamily="monospace" letterSpacing="1">RESEARCH</text>
          <text x="80" y="211" textAnchor="middle" fill="#1a1a1a" fontSize="14" fontFamily="sans-serif" fontWeight="900">Gemini</text>
          <text x="80" y="226" textAnchor="middle" fill="#a3a3a3" fontSize="7.5" fontFamily="monospace">리서치 · 분석</text>

          {/* Codex */}
          <rect x="154" y="174" width="132" height="56" fill="white" stroke="#D97706" strokeWidth="1" strokeOpacity="0.7"/>
          <text x="220" y="191" textAnchor="middle" fill="#D97706" fontSize="7.5" fontFamily="monospace" letterSpacing="1">CODE</text>
          <text x="220" y="211" textAnchor="middle" fill="#1a1a1a" fontSize="14" fontFamily="sans-serif" fontWeight="900">Codex</text>
          <text x="220" y="226" textAnchor="middle" fill="#a3a3a3" fontSize="7.5" fontFamily="monospace">코드 구현</text>

          {/* Merge */}
          <line x1="80"  y1="230" x2="80"  y2="252" stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="220" y1="230" x2="220" y2="252" stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="80"  y1="252" x2="220" y2="252" stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="150" y1="252" x2="150" y2="272" stroke="#cbd5e1" strokeWidth="1"/>
          <polygon points="150,272 146,266 154,266" fill="#cbd5e1"/>

          {/* Claude 리뷰 */}
          <rect x="20" y="272" width="260" height="68" fill="white" stroke="#475569" strokeWidth="1.5"/>
          <text x="150" y="289" textAnchor="middle" fill="#475569" fontSize="7.5" fontFamily="monospace" letterSpacing="1">REVIEW</text>
          <text x="150" y="310" textAnchor="middle" fill="#1a1a1a" fontSize="15" fontFamily="sans-serif" fontWeight="900">Claude Code</text>
          <text x="150" y="328" textAnchor="middle" fill="#a3a3a3" fontSize="8" fontFamily="monospace">검토 · 재위임 or 승인</text>

          {/* Review → Output */}
          <line x1="150" y1="340" x2="150" y2="358" stroke="#cbd5e1" strokeWidth="1"/>
          <polygon points="150,358 146,352 154,352" fill="#cbd5e1"/>

          {/* Output */}
          <rect x="90" y="358" width="120" height="44" fill="#1a1a1a"/>
          <text x="150" y="374" textAnchor="middle" fill="#6b7280" fontSize="7.5" fontFamily="monospace" letterSpacing="1.5">OUTPUT</text>
          <text x="150" y="392" textAnchor="middle" fill="white" fontSize="12" fontFamily="sans-serif" fontWeight="900">luma3.dev</text>

          {/* Iterate dashed */}
          <path d="M 280,306 H 292 V 211 H 286" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3"/>
          <polygon points="286,211 282,218 290,218" fill="#cbd5e1"/>
          <text x="292" y="262" textAnchor="middle" fill="#c3c3c3" fontSize="7" fontFamily="monospace" transform="rotate(90 292 262)">iterate</text>
        </svg>

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
          className="hidden md:block relative w-full max-w-7xl"
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

      {/* ── Orchestration Records panel ── */}
      <OrchRecords />
    </motion.div>
  )
}

// ── Orchestration Records ──────────────────────────────────────────────────────
const ORCH_TASKS = [
  { id: 'T046', name: 'youtube-channel-analysis',    agent: 'gemini', date: 'Mar 8' },
  { id: 'T043', name: 'ai-hub-restructure',          agent: 'codex',  date: 'Mar 6' },
  { id: 'T040', name: 'unity-vibe-coding',           agent: 'gemini', date: 'Mar 6' },
  { id: 'T038', name: 'noren-core-scripts',          agent: 'codex',  date: 'Mar 5' },
  { id: 'T037', name: 'investment-strategy-research',agent: 'gemini', date: 'Mar 5' },
  { id: 'T029', name: 'futsal-app',                  agent: 'codex',  date: 'Mar 4' },
  { id: 'T028', name: 'factor-investment-survey',    agent: 'gemini', date: 'Mar 4' },
  { id: 'T023', name: 'invest-bot-execution',        agent: 'codex',  date: 'Feb 28' },
  { id: 'T019', name: 'invest-bot-skeleton',         agent: 'codex',  date: 'Feb 27' },
  { id: 'T008', name: 'multi-agent-research',        agent: 'gemini', date: 'Feb 24' },
] as const

const AGENT_COLORS = {
  gemini: { dot: '#059669', label: '#059669', bg: 'rgba(5,150,105,0.08)' },
  codex:  { dot: '#D97706', label: '#D97706', bg: 'rgba(217,119,6,0.08)'  },
  claude: { dot: '#475569', label: '#475569', bg: 'rgba(71,85,105,0.08)'  },
} as const

function OrchRecords() {
  return (
    <div className="border-t border-border">
      {/* Header row */}
      <div className="px-6 md:px-12 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border">
        <div className="flex items-center gap-3">
          <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-fg-subtle">
            Orchestration Records
          </p>
          <span className="text-[9px] font-mono text-fg-faint">— 실전 기록</span>
        </div>
        {/* Agent stats */}
        <div className="flex items-center gap-4">
          {(['gemini', 'codex', 'claude'] as const).map((agent) => {
            const count = agent === 'gemini' ? 45 : agent === 'codex' ? 15 : 5
            const pct   = agent === 'gemini' ? 69  : agent === 'codex' ? 23  : 8
            const c = AGENT_COLORS[agent]
            return (
              <div key={agent} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.dot }} />
                <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color: c.label }}>
                  {agent}
                </span>
                <span className="text-[9px] font-mono text-fg-faint">{count}</span>
                <span className="text-[8px] text-fg-subtle">({pct}%)</span>
              </div>
            )
          })}
          <span className="text-[9px] font-mono text-fg-muted ml-2 pl-2 border-l border-border">
            65 total
          </span>
        </div>
      </div>

      {/* Bar chart */}
      <div className="px-6 md:px-12 py-4 border-b border-border flex flex-col gap-2">
        {(['gemini', 'codex', 'claude'] as const).map((agent) => {
          const count = agent === 'gemini' ? 45 : agent === 'codex' ? 15 : 5
          const pct   = agent === 'gemini' ? 69  : agent === 'codex' ? 23  : 8
          const c = AGENT_COLORS[agent]
          return (
            <div key={agent} className="flex items-center gap-3">
              <span className="text-[9px] font-mono uppercase tracking-wider w-14 shrink-0" style={{ color: c.label }}>
                {agent}
              </span>
              <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: c.dot }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                />
              </div>
              <span className="text-[9px] font-mono text-fg-faint w-6 text-right">{count}</span>
            </div>
          )
        })}
      </div>

      {/* Task log */}
      <div className="bg-bg-subtle">
        {ORCH_TASKS.map((task, i) => {
          const c = AGENT_COLORS[task.agent]
          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="flex items-center gap-4 px-6 md:px-12 py-2.5 border-b border-border last:border-0 hover:bg-bg-hover transition-colors duration-100"
            >
              {/* check */}
              <span className="text-[#059669] text-[10px] shrink-0">✓</span>
              {/* id */}
              <span className="text-[9px] font-mono text-fg-faint w-8 shrink-0">{task.id}</span>
              {/* name */}
              <span className="text-[11px] font-mono text-fg-muted flex-1 truncate">{task.name}</span>
              {/* agent badge */}
              <span
                className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 shrink-0"
                style={{ color: c.label, backgroundColor: c.bg }}
              >
                {task.agent}
              </span>
              {/* date */}
              <span className="text-[9px] font-mono text-fg-faint w-12 text-right shrink-0">{task.date}</span>
            </motion.div>
          )
        })}
      </div>
    </div>
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
