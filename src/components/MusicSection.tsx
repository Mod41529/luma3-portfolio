'use client'

import {
  useRef, useState, useEffect, useCallback, useId,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, X, ChevronDown, Music2, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { works } from '@/data/works'
import { WorkItem } from '@/types'

const musicWorks = works.filter((w) => w.category === 'music')

// ── Equalizer bars — animated when playing ─────────────────────────────────
function EqBars({ playing }: { playing: boolean }) {
  const bars = [
    { height: [0.3, 1.0, 0.5], duration: 0.7 },
    { height: [0.6, 0.3, 1.0], duration: 0.55 },
    { height: [1.0, 0.5, 0.3], duration: 0.9 },
    { height: [0.4, 0.9, 0.6], duration: 0.65 },
  ]
  return (
    <div className="flex items-end gap-[2px] h-4 w-5">
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          className="w-[3px] bg-[#1978e5] origin-bottom"
          animate={playing
            ? { scaleY: bar.height, transition: { duration: bar.duration, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' } }
            : { scaleY: 0.25 }}
          transition={{ duration: 0.3 }}
          style={{ height: '100%' }}
        />
      ))}
    </div>
  )
}

// ── Format seconds → m:ss ──────────────────────────────────────────────────
function fmt(s: number) {
  if (!isFinite(s)) return '—'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${String(sec).padStart(2, '0')}`
}

// ── Track Row ───────────────────────────────────────────────────────────────
function TrackRow({
  work,
  index,
  isPlaying,
  onToggle,
  onDetail,
}: {
  work: WorkItem
  index: number
  isPlaying: boolean
  onToggle: (id: string) => void
  onDetail: (w: WorkItem) => void
}) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)   // 0–1
  const [duration, setDuration] = useState(0)
  const [current, setCurrent] = useState(0)
  const [hasFile, setHasFile] = useState(false)
  const progressId = useId()

  // Check file existence
  useEffect(() => {
    if (!work.audioSrc) return
    fetch(work.audioSrc, { method: 'HEAD' })
      .then((r) => setHasFile(r.ok))
      .catch(() => setHasFile(false))
  }, [work.audioSrc])

  // Play / pause based on parent state
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !hasFile) return
    if (isPlaying) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }, [isPlaying, hasFile])

  const handleTimeUpdate = () => {
    const audio = audioRef.current
    if (!audio) return
    setCurrent(audio.currentTime)
    setProgress(audio.duration ? audio.currentTime / audio.duration : 0)
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !hasFile) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    audio.currentTime = ratio * audio.duration
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={`group border-b border-[#e5e5e5] transition-colors duration-150
                  ${isPlaying ? 'bg-[#f4f4f2]' : 'hover:bg-[#f9f9f9]'}`}
    >
      {/* Main row */}
      <div className="flex items-center gap-4 px-6 md:px-12 py-4">
        {/* Track number / eq bars */}
        <div className="w-8 shrink-0 flex items-center justify-center">
          {isPlaying
            ? <EqBars playing={isPlaying} />
            : <span className="text-[11px] font-mono text-[#c3c3c3] group-hover:hidden">
                {String(index + 1).padStart(2, '0')}
              </span>
          }
          {!isPlaying && (
            <button
              onClick={() => onToggle(work.id)}
              disabled={!hasFile}
              className="hidden group-hover:flex w-8 h-8 items-center justify-center
                         text-[#1978e5] disabled:text-[#c3c3c3]"
              aria-label={`Play ${work.title}`}
            >
              <Play size={14} className="ml-0.5" />
            </button>
          )}
        </div>

        {/* Play/Pause when active */}
        {isPlaying && (
          <button
            onClick={() => onToggle(work.id)}
            className="w-8 h-8 flex items-center justify-center text-[#1978e5] shrink-0 -ml-8"
            aria-label="Pause"
          >
            <Pause size={14} />
          </button>
        )}

        {/* Title + meta */}
        <div
          className="flex-1 min-w-0 cursor-pointer"
          onClick={() => onDetail(work)}
        >
          <p className={`text-sm font-medium leading-tight truncate transition-colors
                         ${isPlaying ? 'text-[#1978e5]' : 'text-[#1a1a1a] group-hover:text-[#1978e5]'}`}>
            {work.title}
          </p>
          <p className="text-[10px] text-[#a3a3a3] mt-0.5 truncate">
            {work.titleKo} · {work.year}
          </p>
        </div>

        {/* Tools (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-1.5 shrink-0">
          {work.tools.slice(0, 2).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider
                         text-[#a3a3a3] border border-[#e5e5e5]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Duration */}
        <span className="text-[11px] font-mono text-[#a3a3a3] shrink-0 w-10 text-right">
          {hasFile ? fmt(duration || 0) : '—:——'}
        </span>

        {/* Hidden audio element */}
        {hasFile && (
          <audio
            ref={audioRef}
            src={work.audioSrc}
            preload="metadata"
            onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => onToggle(work.id)}
          />
        )}
      </div>

      {/* Progress bar — only shown when this track is active */}
      <AnimatePresence>
        {isPlaying && hasFile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-12 pb-4 flex items-center gap-3">
              <span className="text-[10px] font-mono text-[#a3a3a3] w-8 text-right shrink-0">
                {fmt(current)}
              </span>
              {/* Seek bar */}
              <div
                id={progressId}
                onClick={handleSeek}
                className="flex-1 h-[3px] bg-[#e5e5e5] cursor-pointer relative"
              >
                <div
                  className="h-full bg-[#1978e5] transition-none"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-[#a3a3a3] w-8 shrink-0">
                {fmt(duration)}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No-file notice */}
      {!hasFile && (
        <div className="px-6 md:px-12 pb-3 flex items-center gap-2 text-[#c3c3c3]">
          <Music2 size={10} />
          <span className="text-[9px] font-mono">
            {work.audioSrc ?? 'audioSrc not set'} — file not found
          </span>
        </div>
      )}
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
                 bg-[#FAFAFA] border-t border-[#e5e5e5] max-h-[58vh] overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 bg-[#FAFAFA]/95 backdrop-blur-sm border-b border-[#e5e5e5]
                      px-6 md:px-10 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4 min-w-0">
          <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#2563EB] shrink-0">
            Music
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
        >
          <X size={14} />
        </button>
      </div>

      {/* Body */}
      <div className="px-6 md:px-10 py-6 grid md:grid-cols-2 gap-10 max-w-4xl">
        <div className="space-y-5">
          <p className="text-sm text-[#737373] font-light leading-relaxed">{work.description}</p>
          <p className="text-sm text-[#a3a3a3] leading-relaxed">{work.descriptionKo}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            {work.tools.map((t) => (
              <span key={t}
                className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider
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
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="py-5 space-y-4">
                  {work.howIMadeThis.prompt && (
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#a3a3a3] mb-2">
                        Prompt
                      </p>
                      <pre className="bg-[#111821] text-[#94a3b8] text-[11px] font-mono
                                      leading-relaxed p-4 whitespace-pre-wrap break-words">
                        <span className="text-[#2563EB] italic block mb-1">// AI Prompt</span>
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

// ── Section ─────────────────────────────────────────────────────────────────
export default function MusicSection() {
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [detail, setDetail] = useState<WorkItem | null>(null)

  const handleToggle = useCallback((id: string) => {
    setPlayingId((cur) => (cur === id ? null : id))
  }, [])

  const handleDetail = useCallback((w: WorkItem) => setDetail(w), [])
  const handleClose = useCallback(() => setDetail(null), [])

  return (
    <section id="music" className="border-t border-[#e5e5e5]">
      {/* Header */}
      <div className="px-6 md:px-12 py-5 flex items-center justify-between border-b border-[#e5e5e5]">
        <div className="flex items-baseline gap-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1a1a1a]">
            Music
          </h2>
          <span className="text-[10px] text-[#a3a3a3] font-mono">
            {String(musicWorks.length).padStart(2, '0')} tracks
          </span>
          <span className="text-[10px] text-[#a3a3a3] italic hidden md:inline">Click title for details</span>
        </div>
        <Link
          href="/work/music"
          className="flex items-center gap-1.5 text-[10px] text-[#737373] hover:text-[#2563EB]
                     transition-colors duration-150 group"
        >
          <span className="uppercase tracking-[0.2em] font-bold">View all</span>
          <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
        </Link>
      </div>

      {/* Track list */}
      <div>
        {musicWorks.map((work, i) => (
          <TrackRow
            key={work.id}
            work={work}
            index={i}
            isPlaying={playingId === work.id}
            onToggle={handleToggle}
            onDetail={handleDetail}
          />
        ))}
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {detail && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 z-[199] bg-black/20 backdrop-blur-[2px]"
            />
            <DetailPanel key="panel" work={detail} onClose={handleClose} />
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
