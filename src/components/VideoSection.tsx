'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, Play, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { works } from '@/data/works'
import { WorkItem } from '@/types'

const videoWorks = works.filter((w) => w.category === 'video')
const INITIAL_COUNT = 3

// alternating wide pattern: index 0,2,4… = col-span-2; 1,3,5… = col-span-1
const isWide = (i: number) => i % 2 === 0

// ── Video Card ──────────────────────────────────────────────────────────────
function VideoCard({
  work,
  index,
  wide,
  onClick,
}: {
  work: WorkItem
  index: number
  wide: boolean
  onClick: (w: WorkItem) => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasFile, setHasFile] = useState(false)

  useEffect(() => {
    if (!work.videoSrc) return
    fetch(work.videoSrc, { method: 'HEAD' })
      .then((r) => setHasFile(r.ok))
      .catch(() => setHasFile(false))
  }, [work.videoSrc])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !hasFile) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.3 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [hasFile])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onClick(work)}
      className={`relative overflow-hidden cursor-pointer bg-[#F0F0F0] group
                  ${wide ? 'md:col-span-2' : 'md:col-span-1'}`}
      style={{ aspectRatio: wide ? '16/9' : '1/1' }}
    >
      {hasFile ? (
        <video
          ref={videoRef}
          src={work.videoSrc}
          poster={work.thumbnailSrc}
          muted loop playsInline preload="metadata"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-end p-4 relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, #e5e5e5 1px, transparent 1px), linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)',
              backgroundSize: '28px 28px',
              opacity: 0.6,
            }}
          />
          <div className="relative flex items-center gap-2">
            <div className="w-8 h-8 border border-[#e5e5e5] flex items-center justify-center bg-white">
              <Play size={12} className="text-[#a3a3a3] ml-0.5" />
            </div>
            <p className="text-[9px] font-mono text-[#a3a3a3] uppercase tracking-widest">No file</p>
          </div>
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

      {/* Labels */}
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-1 group-hover:translate-y-0
                      opacity-0 group-hover:opacity-100 transition-all duration-300">
        <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/60 mb-0.5">
          {work.year} — {work.tools[0]}
        </p>
        <h3 className="text-sm font-black text-white uppercase tracking-tight leading-tight">
          {work.title}
        </h3>
      </div>
    </motion.div>
  )
}

// ── Detail Panel ────────────────────────────────────────────────────────────
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
      <div className="sticky top-0 bg-[#FAFAFA]/95 backdrop-blur-sm border-b border-[#e5e5e5]
                      px-6 md:px-10 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#1978e5]">Video</span>
          <span className="text-[#e5e5e5]">—</span>
          <h2 className="text-sm font-black uppercase tracking-tight text-[#1a1a1a]">{work.title}</h2>
          <span className="text-[10px] text-[#a3a3a3] font-mono">{work.year}</span>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center text-[#a3a3a3]
                     hover:text-[#1a1a1a] hover:bg-[#f0f0f0] transition-colors"
        >
          <X size={14} />
        </button>
      </div>

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

// ── Section ─────────────────────────────────────────────────────────────────
export default function VideoSection() {
  const [selected, setSelected] = useState<WorkItem | null>(null)
  const [showMore, setShowMore] = useState(false)
  const handleClose = useCallback(() => setSelected(null), [])

  const visible = showMore ? videoWorks : videoWorks.slice(0, INITIAL_COUNT)
  const remaining = videoWorks.length - INITIAL_COUNT

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
          className="flex items-center gap-1.5 text-[10px] text-[#737373] hover:text-[#1978e5]
                     transition-colors duration-150 group"
        >
          <span className="uppercase tracking-[0.2em] font-bold">View all</span>
          <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
        </Link>
      </div>

      {/* 3-col masonry-style grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#e5e5e5] p-px">
        {visible.map((work, i) => (
          <VideoCard
            key={work.id}
            work={work}
            index={i}
            wide={isWide(i)}
            onClick={setSelected}
          />
        ))}
      </div>

      {/* View More */}
      {!showMore && remaining > 0 && (
        <div className="flex justify-center py-6 border-t border-[#e5e5e5]">
          <button
            onClick={() => setShowMore(true)}
            className="flex items-center gap-3 px-7 py-2.5 border border-[#e5e5e5]
                       text-[10px] font-bold uppercase tracking-[0.3em] text-[#737373]
                       hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-colors duration-150"
          >
            View More
            <span className="text-[#a3a3a3] font-mono">+{remaining}</span>
          </button>
        </div>
      )}

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
