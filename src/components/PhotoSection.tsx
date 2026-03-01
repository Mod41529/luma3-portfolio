'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, ImageIcon, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { works } from '@/data/works'
import { WorkItem } from '@/types'

const photoWorks = works.filter((w) => w.category === 'photography')

// ── Photo Card ──────────────────────────────────────────────────────────────
function PhotoCard({
  work,
  index,
  onClick,
}: {
  work: WorkItem
  index: number
  onClick: (w: WorkItem) => void
}) {
  const [loaded, setLoaded] = useState(false)
  const [hasFile, setHasFile] = useState(false)

  useEffect(() => {
    if (!work.imageSrc) return
    fetch(work.imageSrc, { method: 'HEAD' })
      .then((r) => setHasFile(r.ok))
      .catch(() => setHasFile(false))
  }, [work.imageSrc])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onClick(work)}
      // break-inside-avoid keeps masonry cells intact
      className="break-inside-avoid mb-px cursor-pointer group relative overflow-hidden bg-[#F0F0F0]"
    >
      {hasFile ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={work.imageSrc}
            alt={work.thumbnailAlt}
            onLoad={() => setLoaded(true)}
            className={`w-full h-auto block transition-all duration-700
                        group-hover:scale-[1.02]
                        ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
          {/* Skeleton while loading */}
          {!loaded && (
            <div className="absolute inset-0 bg-[#F0F0F0] animate-pulse" />
          )}
        </>
      ) : (
        /* Placeholder */
        <div className="w-full flex items-center justify-center bg-[#F4F4F2] aspect-[4/3] relative">
          <div
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{
              backgroundImage:
                'linear-gradient(to right, #e5e5e5 1px, transparent 1px), linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <div className="relative flex flex-col items-center gap-2 text-[#c3c3c3]">
            <ImageIcon size={20} strokeWidth={1} />
            <span className="text-[9px] font-mono uppercase tracking-widest">
              {work.imageSrc ?? 'no path set'}
            </span>
          </div>
        </div>
      )}

      {/* Hover overlay */}
      <div
        className="absolute inset-0 bg-black/0 group-hover:bg-black/40
                   transition-colors duration-300 pointer-events-none"
      />

      {/* Top-left: index number */}
      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-[9px] font-mono text-white/50 uppercase tracking-widest">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Bottom: title + meta */}
      <div
        className="absolute bottom-0 left-0 right-0 p-3
                   translate-y-1.5 opacity-0
                   group-hover:translate-y-0 group-hover:opacity-100
                   transition-all duration-300"
      >
        <h3 className="text-[11px] font-black uppercase tracking-tight text-white leading-tight mb-0.5">
          {work.title}
        </h3>
        <p className="text-[8px] font-mono text-white/50 uppercase tracking-[0.2em]">
          {work.year} · {work.tools[0]}
        </p>
      </div>
    </motion.div>
  )
}

// ── Detail Panel ────────────────────────────────────────────────────────────
function DetailPanel({
  work,
  onClose,
}: {
  work: WorkItem
  onClose: () => void
}) {
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
                 bg-[#FAFAFA] border-t border-[#e5e5e5]
                 max-h-[58vh] overflow-y-auto"
    >
      {/* Header */}
      <div
        className="sticky top-0 bg-[#FAFAFA]/95 backdrop-blur-sm border-b border-[#e5e5e5]
                   px-6 md:px-10 py-4 flex items-center justify-between z-10"
      >
        <div className="flex items-center gap-4 min-w-0">
          <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#059669] shrink-0">
            Photography
          </span>
          <span className="text-[#e5e5e5] shrink-0">—</span>
          <h2 className="text-sm font-black uppercase tracking-tight text-[#1a1a1a] truncate">
            {work.title}
          </h2>
          <span className="text-[10px] text-[#a3a3a3] font-mono shrink-0">{work.year}</span>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center text-[#a3a3a3]
                     hover:text-[#1a1a1a] hover:bg-[#f0f0f0] transition-colors ml-4 shrink-0"
          aria-label="Close"
        >
          <X size={14} />
        </button>
      </div>

      {/* Body */}
      <div className="px-6 md:px-10 py-6 grid md:grid-cols-2 gap-10 max-w-4xl">
        {/* Left */}
        <div className="space-y-5">
          <p className="text-sm text-[#737373] font-light leading-relaxed">
            {work.description}
          </p>
          <p className="text-sm text-[#a3a3a3] leading-relaxed">{work.descriptionKo}</p>

          <div className="flex flex-wrap gap-2 pt-1">
            {work.tools.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider
                           text-[#737373] border border-[#e5e5e5] bg-[#f4f4f2]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right: How I made this */}
        <div>
          <button
            onClick={() => setHowOpen((o) => !o)}
            className="w-full flex items-center justify-between py-3
                       border-b border-[#e5e5e5] text-left"
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
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="py-5 space-y-4">
                  {work.howIMadeThis.prompt && (
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#a3a3a3] mb-2">
                        Prompt
                      </p>
                      <pre
                        className="bg-[#111821] text-[#94a3b8] text-[11px] font-mono
                                   leading-relaxed p-4 whitespace-pre-wrap break-words"
                      >
                        <span className="text-[#059669] italic block mb-1">// AI Prompt</span>
                        {work.howIMadeThis.prompt}
                      </pre>
                    </div>
                  )}
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#a3a3a3] mb-2">
                      Process
                    </p>
                    <p className="text-xs text-[#737373] leading-relaxed">
                      {work.howIMadeThis.processNotes}
                    </p>
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

const INITIAL_PHOTO_COUNT = 4

// ── Section ─────────────────────────────────────────────────────────────────
export default function PhotoSection() {
  const [selected, setSelected] = useState<WorkItem | null>(null)
  const [showMore, setShowMore] = useState(false)
  const handleClose = useCallback(() => setSelected(null), [])

  const visible = showMore ? photoWorks : photoWorks.slice(0, INITIAL_PHOTO_COUNT)
  const remaining = photoWorks.length - INITIAL_PHOTO_COUNT

  return (
    <section id="photography" className="border-t border-[#e5e5e5]">
      {/* Header */}
      <div className="px-6 md:px-12 py-5 flex items-center justify-between border-b border-[#e5e5e5]">
        <div className="flex items-baseline gap-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1a1a1a]">
            Photography
          </h2>
          <span className="text-[10px] text-[#a3a3a3] font-mono">
            {String(photoWorks.length).padStart(2, '0')} works
          </span>
          <span className="text-[10px] text-[#a3a3a3] italic hidden md:inline">Click to explore</span>
        </div>
        <Link
          href="/work/photography"
          className="flex items-center gap-1.5 text-[10px] text-[#737373] hover:text-[#059669]
                     transition-colors duration-150 group"
        >
          <span className="uppercase tracking-[0.2em] font-bold">View all</span>
          <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
        </Link>
      </div>

      {/* Masonry grid — 3 CSS columns */}
      <div
        className="p-px bg-[#e5e5e5]"
        style={{ columns: '3 180px', columnGap: '1px' }}
      >
        {visible.map((work, i) => (
          <PhotoCard key={work.id} work={work} index={i} onClick={setSelected} />
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
