'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

// ── Genre config ─────────────────────────────────────────────────────────────
const GENRES = [
  {
    id: 'jazz',
    label: 'Jazz',
    labelKo: '재즈',
    track: 'Skyline Coffee Loop',
    audioSrc: '/audio/g-jazz.mp3',
    accent: '#D97706',
    bg: '#1C1408',
    desc: 'Jazz hip-hop groove with warm vinyl texture and upright bass.',
  },
  {
    id: 'hiphop',
    label: 'Hip-Hop',
    labelKo: '힙합',
    track: 'Titan Circuit',
    audioSrc: '/audio/g-hiphop.mp3',
    accent: '#94A3B8',
    bg: '#0E1118',
    desc: 'High-energy trap beat with crisp hi-hats and deep 808 bass.',
  },
  {
    id: 'lofi',
    label: 'Lo-Fi',
    labelKo: '로파이',
    track: 'Sun on the Desk',
    audioSrc: '/audio/g-lofi.mp3',
    accent: '#A78BFA',
    bg: '#120D1C',
    desc: 'Chill beat with soft vinyl crackle and mellow piano loop.',
  },
  {
    id: 'rnb',
    label: 'R&B',
    labelKo: 'R&B',
    track: 'Midnight Sidewalk',
    audioSrc: '/audio/g-rnb.mp3',
    accent: '#FB7185',
    bg: '#1C0810',
    desc: 'Contemporary R&B with groovy bassline and smooth electric piano.',
  },
  {
    id: 'rock',
    label: 'Rock',
    labelKo: '록',
    track: 'Bright Horizon Run',
    audioSrc: '/audio/g-rock.mp3',
    accent: '#E5E5E5',
    bg: '#111111',
    desc: 'Upbeat modern rock with driving electric guitars and punchy drums.',
  },
] as const

type GenreId = typeof GENRES[number]['id']

// ── Format seconds ────────────────────────────────────────────────────────────
function fmt(s: number) {
  if (!isFinite(s) || s === 0) return '—:——'
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

// ── Waveform bars ─────────────────────────────────────────────────────────────
function WaveformBars({ playing, accent }: { playing: boolean; accent: string }) {
  const heights = [0.3, 0.6, 1, 0.7, 0.4, 0.9, 0.5, 0.8, 0.6, 1, 0.4, 0.7, 0.3, 0.85, 0.55]
  return (
    <div className="flex items-end gap-[2px] h-8">
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className="w-[2px] rounded-full origin-bottom"
          animate={playing
            ? { scaleY: [h, h * 0.4 + 0.1, h * 1.2 > 1 ? 1 : h * 1.2, h], transition: { duration: 0.6 + i * 0.05, repeat: Infinity, ease: 'easeInOut' } }
            : { scaleY: 0.15 }
          }
          transition={{ duration: 0.3 }}
          style={{ height: '100%', backgroundColor: accent, opacity: playing ? 0.9 : 0.3 }}
        />
      ))}
    </div>
  )
}

// ── Genre Card ────────────────────────────────────────────────────────────────
function GenreCard({
  genre,
  isPlaying,
  onToggle,
}: {
  genre: typeof GENRES[number]
  isPlaying: boolean
  onToggle: (id: GenreId) => void
}) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [loaded, setLoaded] = useState(false)

  // Play / pause
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !loaded) return
    if (isPlaying) audio.play().catch(() => {})
    else audio.pause()
  }, [isPlaying, loaded])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onToggle(genre.id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden flex flex-col"
      style={{ backgroundColor: genre.bg, minHeight: '260px' }}
    >
      {/* Accent glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          backgroundImage: `radial-gradient(ellipse at 50% 100%, ${genre.accent}18 0%, transparent 65%)`,
          opacity: isPlaying ? 1 : 0,
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col h-full p-6 gap-4">
        {/* Genre label */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[9px] font-mono uppercase tracking-[0.4em] mb-1" style={{ color: genre.accent }}>
              {genre.labelKo}
            </p>
            <h3 className="text-2xl font-black uppercase tracking-tighter leading-none text-white">
              {genre.label}
            </h3>
          </div>
          {/* Play state indicator */}
          <div
            className="w-2 h-2 rounded-full mt-1 transition-all duration-300"
            style={{ backgroundColor: isPlaying ? genre.accent : 'transparent', boxShadow: isPlaying ? `0 0 8px ${genre.accent}` : 'none', border: `1px solid ${genre.accent}40` }}
          />
        </div>

        {/* Waveform */}
        <div className="flex-1 flex items-center">
          <WaveformBars playing={isPlaying} accent={genre.accent} />
        </div>

        {/* Track name */}
        <div>
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-0.5">Track</p>
          <p className="text-sm font-semibold text-white/80 leading-tight">{genre.track}</p>
        </div>

        {/* Play button + progress */}
        <div className="space-y-3">
          <button
            onClick={handleClick}
            className="flex items-center gap-2.5 group/btn"
            aria-label={isPlaying ? `Pause ${genre.label}` : `Play ${genre.label}`}
          >
            <div
              className="w-8 h-8 flex items-center justify-center border transition-colors duration-150"
              style={{ borderColor: `${genre.accent}60`, backgroundColor: isPlaying ? genre.accent : 'transparent' }}
            >
              {isPlaying
                ? <Pause size={12} className="text-black" />
                : <Play size={12} className="ml-0.5" style={{ color: genre.accent }} />
              }
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: `${genre.accent}80` }}>
              {isPlaying ? 'Playing' : 'Play'}
            </span>
          </button>

          {/* Progress bar */}
          <div>
            <div className="h-[1px] w-full" style={{ backgroundColor: `${genre.accent}20` }}>
              <div
                className="h-full transition-none"
                style={{ width: `${progress * 100}%`, backgroundColor: genre.accent }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[9px] font-mono" style={{ color: `${genre.accent}50` }}>
                {fmt(progress * duration)}
              </span>
              <span className="text-[9px] font-mono" style={{ color: `${genre.accent}50` }}>
                {fmt(duration)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden audio */}
      <audio
        ref={audioRef}
        src={genre.audioSrc}
        preload="metadata"
        onLoadedMetadata={() => { setDuration(audioRef.current?.duration ?? 0); setLoaded(true) }}
        onTimeUpdate={() => {
          const a = audioRef.current
          if (a) setProgress(a.duration ? a.currentTime / a.duration : 0)
        }}
        onEnded={() => onToggle(genre.id)}
      />
    </motion.div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function MusicSection() {
  const [playingId, setPlayingId] = useState<GenreId | null>(null)

  const handleToggle = useCallback((id: GenreId) => {
    setPlayingId(cur => cur === id ? null : id)
  }, [])

  return (
    <section id="music" className="border-t border-[#e5e5e5]">
      {/* Header */}
      <div className="px-6 md:px-12 py-5 flex items-center justify-between border-b border-[#e5e5e5]">
        <div className="flex items-baseline gap-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1a1a1a]">Music</h2>
          <span className="text-[10px] text-[#a3a3a3] font-mono">{String(GENRES.length).padStart(2, '0')} genres</span>
          <span className="text-[10px] text-[#a3a3a3] italic hidden md:inline">AI-generated · Suno</span>
        </div>
        <Link
          href="/work/music"
          className="flex items-center gap-1.5 text-[10px] text-[#737373] hover:text-[#2563EB] transition-colors duration-150 group"
        >
          <span className="uppercase tracking-[0.2em] font-bold">View all</span>
          <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
        </Link>
      </div>

      {/* 5-genre grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-[#e5e5e5]">
        {GENRES.map((genre) => (
          <GenreCard
            key={genre.id}
            genre={genre}
            isPlaying={playingId === genre.id}
            onToggle={handleToggle}
          />
        ))}
      </div>

      {/* Description strip */}
      <AnimatePresence>
        {playingId && (() => {
          const g = GENRES.find(g => g.id === playingId)!
          return (
            <motion.div
              key={playingId}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-[#e5e5e5]"
            >
              <div className="px-6 md:px-12 py-4 flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: g.accent }} />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: g.accent }}>
                  {g.label}
                </span>
                <span className="text-[#e5e5e5]">—</span>
                <p className="text-[11px] text-[#737373]">{g.desc}</p>
              </div>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </section>
  )
}
