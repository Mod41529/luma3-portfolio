'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, ArrowUpRight } from 'lucide-react'
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
  const videoRef  = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  // Check file exists, then autoplay via IntersectionObserver
  useEffect(() => {
    if (!work.videoSrc) return
    fetch(work.videoSrc, { method: 'HEAD' })
      .then((r) => { if (r.ok) setReady(true) })
      .catch(() => {})
  }, [work.videoSrc])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !ready) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.15 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [ready])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: (index % 8) * 0.03 }}
      onClick={() => onClick(work)}
      className="group relative aspect-[9/16] overflow-hidden cursor-pointer bg-[#111]"
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
                 bg-[#FAFAFA] border-t border-[#e5e5e5] max-h-[60vh] overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 bg-[#FAFAFA]/95 backdrop-blur-sm border-b border-[#e5e5e5]
                      px-6 md:px-10 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4 min-w-0">
          <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#D97706] shrink-0">Video</span>
          <span className="text-[#e5e5e5] shrink-0">—</span>
          <h2 className="text-sm font-black uppercase tracking-tight text-[#1a1a1a] truncate">{work.title}</h2>
          <span className="text-[10px] text-[#a3a3a3] font-mono shrink-0">{work.year}</span>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center text-[#a3a3a3]
                     hover:text-[#1a1a1a] hover:bg-[#f0f0f0] transition-colors ml-4 shrink-0"
        >
          <X size={14} />
        </button>
      </div>

      {/* Body */}
      <div className="px-6 md:px-10 py-6 grid md:grid-cols-2 gap-8 max-w-4xl">
        <div className="space-y-5">
          <p className="text-sm text-[#737373] font-light leading-relaxed">{work.description}</p>
          <p className="text-sm text-[#a3a3a3] leading-relaxed">{work.descriptionKo}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            {work.tools.map((t) => (
              <span key={t} className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider
                                       text-[#737373] border border-[#e5e5e5] bg-[#f4f4f2]">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          <button
            onClick={() => setHowOpen((o) => !o)}
            className="w-full flex items-center justify-between py-3 border-b border-[#e5e5e5] text-left"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">
              How I made this
            </span>
            <motion.div animate={{ rotate: howOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={14} className="text-[#a3a3a3]" />
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
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#a3a3a3] mb-2">Prompt</p>
                      <pre className="bg-[#111821] text-[#94a3b8] text-[11px] font-mono
                                      leading-relaxed p-4 whitespace-pre-wrap break-words">
                        <span className="text-[#1978e5] italic block mb-1">// AI Prompt</span>
                        {work.howIMadeThis.prompt}
                      </pre>
                    </div>
                  )}
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#a3a3a3] mb-2">Process</p>
                    <p className="text-xs text-[#737373] leading-relaxed">{work.howIMadeThis.processNotes}</p>
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
    <section id="video" className="border-t border-[#e5e5e5]">
      {/* Header */}
      <div className="px-6 md:px-12 py-5 flex items-center justify-between border-b border-[#e5e5e5]">
        <div className="flex items-baseline gap-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1a1a1a]">Video</h2>
          <span className="text-[10px] text-[#a3a3a3] font-mono">
            {String(videoWorks.length).padStart(2, '0')} works
          </span>
          <span className="text-[10px] text-[#a3a3a3] italic hidden md:inline">Autoplay · muted</span>
        </div>
        <Link
          href="/work/video"
          className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.25em]
                     text-[#D97706] transition-colors duration-150"
        >
          View all <ArrowUpRight size={10} strokeWidth={2} />
        </Link>
      </div>

      {/* Uniform 4-col grid — Midjourney explore style */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#e5e5e5]">
        {videoWorks.map((work, i) => (
          <VideoCard key={work.id} work={work} index={i} onClick={setSelected} />
        ))}
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
