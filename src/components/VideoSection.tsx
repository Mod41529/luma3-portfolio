'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, ArrowUpRight, ArrowDown } from 'lucide-react'
import Link from 'next/link'
import { works } from '@/data/works'
import { WorkItem } from '@/types'

const videoWorks = works.filter((w) => w.category === 'video')

// ── Video Card ───────────────────────────────────────────────────────────────
function VideoCard({
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
  const [ready, setReady] = useState(false)

  // Step 1: observe container — load video only when near viewport (rootMargin 200px)
  useEffect(() => {
    if (!work.videoSrc) return
    const container = containerRef.current
    if (!container) return
    const loader = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        loader.disconnect()
        fetch(work.videoSrc!, { method: 'HEAD' })
          .then((r) => { if (r.ok) setReady(true) })
          .catch(() => {})
      },
      { rootMargin: '200px' }
    )
    loader.observe(container)
    return () => loader.disconnect()
  }, [work.videoSrc])

  // Step 2: once loaded, play/pause on visibility
  useEffect(() => {
    const video = videoRef.current
    if (!video || !ready) return
    const player = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.15 }
    )
    player.observe(video)
    return () => player.disconnect()
  }, [ready])

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: (index % 12) * 0.03 }}
      onClick={() => onClick(work)}
      className="group relative w-full overflow-hidden cursor-pointer bg-[#111]"
      style={{ aspectRatio: work.aspectRatio ?? '16/9' }}
    >
      {/* Video / thumbnail */}
      {ready ? (
        <video
          ref={videoRef}
          src={work.videoSrc}
          poster={work.thumbnailSrc}
          muted loop playsInline preload="metadata"
          className="w-full h-full object-cover"
        />
      ) : work.thumbnailSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={work.thumbnailSrc}
          alt={work.thumbnailAlt}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-[#1a1a1a]" />
      )}

      {/* Hover overlay — title only, slides up */}
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

// ── Detail Panel (slide-up from bottom) ─────────────────────────────────────
function DetailPanel({ work, onClose }: { work: WorkItem; onClose: () => void }) {
  const [howOpen, setHowOpen] = useState(true)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      // Focus trap
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    // Auto-focus panel
    panelRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      ref={panelRef}
      tabIndex={-1}
      className="fixed bottom-0 left-0 right-0 z-[200] md:left-[200px]
                 bg-bg border-t border-border max-h-[60vh] overflow-y-auto outline-none"
    >
      {/* Header */}
      <div className="sticky top-0 bg-bg/95 backdrop-blur-sm border-b border-border
                      px-6 md:px-10 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4 min-w-0">
          <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#D97706] shrink-0">Video</span>
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

      {/* Body */}
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

// ── Section ──────────────────────────────────────────────────────────────────
export default function VideoSection() {
  const [selected, setSelected] = useState<WorkItem | null>(null)
  const handleClose = useCallback(() => setSelected(null), [])

  return (
    <section id="video" className="border-t border-border">
      {/* Header */}
      <div className="px-6 md:px-12 py-5 flex items-center border-b border-border">
        <div className="flex items-baseline gap-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-fg">Video</h2>
          <span className="text-[10px] text-fg-subtle font-mono">
            {String(videoWorks.length).padStart(2, '0')} works
          </span>
          <span className="text-[10px] text-fg-subtle italic hidden md:inline">Autoplay · muted</span>
        </div>
      </div>

      {/* Masonry — CSS columns, natural aspect ratios */}
      <div className="relative">
        {/* pb-40 creates space at bottom so short columns' grey bg is covered by fade */}
        <div
          className="bg-border pb-40"
          style={{
            columns: '4 180px',
            columnGap: '1px',
            padding: '1px',
            paddingBottom: '160px',
          }}
        >
          {videoWorks.map((work, i) => (
            <div key={work.id} className="break-inside-avoid mb-px">
              <VideoCard work={work} index={i} onClick={setSelected} />
            </div>
          ))}
        </div>

        {/* Fade — solid #fafafa at bottom covers grey gaps, fades into content above */}
        <div
          className="absolute bottom-0 left-0 right-0 h-72 pointer-events-none"
          style={{ background: 'linear-gradient(to top, var(--bg) 0%, var(--bg) 30%, transparent 75%)' }}
        />

        {/* View more button */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <Link href="/work/video" className="group flex flex-col items-center gap-2">
            <div className="flex items-center gap-4">
              <div className="h-px w-10 bg-fg-faint group-hover:w-16 transition-all duration-300" />
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-fg-muted
                               group-hover:text-fg transition-colors duration-200">
                View more
              </span>
              <div className="h-px w-10 bg-fg-faint group-hover:w-16 transition-all duration-300" />
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
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 z-[199] bg-black/20 backdrop-blur-[2px]"
            />
            <DetailPanel key="panel" work={selected} onClose={handleClose} />
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
