'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Play, Pause } from 'lucide-react'
import { CategoryConfig } from '@/types'

interface BentoCardProps {
  category: CategoryConfig
  index: number
  className?: string
  videoSrc?: string
  audioSrc?: string
  audioTitle?: string
  audioTitleKo?: string
  imageSrc?: string
  wide?: boolean
}

function fmt(s: number) {
  if (!isFinite(s) || s === 0) return '—:——'
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

// ── Design thumbnail: MOD card back aesthetic ────────────────────────────────
function DesignThumb() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: '#F2EDD7' }}>
      {/* Inset border frame */}
      <div className="absolute inset-5 border border-[#C8BFA0]/50 pointer-events-none" />
      {/* Centered double-chevron logo */}
      <div className="flex flex-col items-center gap-3">
        <svg viewBox="0 0 80 52" width="64" height="42" style={{ color: '#2B3A52' }} aria-hidden="true">
          <polyline points="2,46 40,6 78,46" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <polyline points="10,46 40,14 70,46" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
        <p className="text-[8px] font-mono uppercase tracking-[0.5em]" style={{ color: '#2B3A52' }}>MOD</p>
      </div>
    </div>
  )
}

// ── Development thumbnail: Multi-Agent Orchestration ─────────────────────────
function DevThumb() {
  return (
    <div className="absolute inset-0 p-4 font-mono overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
      {/* Titlebar dots */}
      <div className="flex gap-1.5 mb-3">
        {[0, 1, 2].map((i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#334155]" />)}
      </div>

      {/* Orchestrator node */}
      <div className="border border-[#475569] px-3 py-1.5 mb-2 w-fit">
        <p className="text-[7px] uppercase tracking-[0.25em] text-[#475569]">Orchestrator</p>
        <p className="text-[10px] font-black text-white">Claude Code</p>
      </div>

      {/* Worker nodes */}
      <div className="flex gap-1.5 mb-3">
        {[
          { label: 'Research', name: 'Gemini', color: '#059669' },
          { label: 'Code', name: 'Codex', color: '#D97706' },
        ].map(({ label, name, color }) => (
          <div key={name} className="flex-1 border px-2 py-1" style={{ borderColor: color }}>
            <p className="text-[7px] uppercase tracking-[0.2em]" style={{ color }}>{label}</p>
            <p className="text-[9px] font-bold text-white">{name}</p>
          </div>
        ))}
      </div>

      {/* Queue status */}
      <div className="flex gap-1">
        {[['dispatched', '#D97706'], ['in_progress', '#475569'], ['complete', '#059669']].map(([s, c]) => (
          <span key={s} className="text-[7px] font-bold px-1.5 py-0.5 uppercase tracking-wide"
            style={{ color: c, backgroundColor: c + '18' }}>{s}</span>
        ))}
      </div>
    </div>
  )
}

// ── Strategy thumbnail: Research-driven quarterly review ─────────────────────
function StrategyThumb() {
  const hypotheses = [
    '메시지 → 의사결정 단축',
    'PoC 중단 기준 명시',
    '탐색 / 활용 분리',
  ]
  return (
    <div className="absolute inset-0 p-5 flex flex-col gap-3" style={{ backgroundColor: '#FEFCE8' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[8px] font-mono uppercase tracking-[0.35em] text-[#a3a3a3]">Strategy</p>
        <span className="text-[8px] font-mono uppercase tracking-widest" style={{ color: '#B45309' }}>Q1 2026</span>
      </div>

      {/* Research sources */}
      <div className="flex gap-1.5 flex-wrap">
        {['NBER', 'arXiv', 'SV Cases'].map(tag => (
          <span key={tag} className="px-1.5 py-0.5 text-[7px] font-mono uppercase tracking-wider border"
            style={{ borderColor: '#B45309', color: '#B45309', opacity: 0.6 }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Hypotheses */}
      <div className="flex-1 space-y-1.5">
        {hypotheses.map((h, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-[7px] font-mono mt-0.5 shrink-0" style={{ color: '#B45309' }}>H{i + 1}</span>
            <p className="text-[8px] font-mono leading-tight" style={{ color: '#B45309', opacity: 0.55 }}>{h}</p>
          </div>
        ))}
      </div>

      {/* 2-week gate progress */}
      <div>
        <p className="text-[7px] font-mono uppercase tracking-widest text-[#c3c3c3] mb-1">2-Week Gate</p>
        <div className="h-[2px] bg-[#e5e5e5] w-full">
          <div className="h-full" style={{ width: '60%', backgroundColor: '#B45309' }} />
        </div>
      </div>
    </div>
  )
}

export default function BentoCard({
  category, index, className = '',
  videoSrc, audioSrc, audioTitle, audioTitleKo, imageSrc, wide = false,
}: BentoCardProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const audio = audioRef.current
    if (!audio) return
    if (playing) { audio.pause(); setPlaying(false) }
    else { audio.play().catch(() => {}); setPlaying(true) }
  }

  const isVideo = !!videoSrc
  const isMusic = !!audioSrc
  const isPhoto = !!imageSrc
  const hasSpecialBg = isVideo || isPhoto

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <Link href={`/work/${category.id}`} className="block h-full">
        <div
          className="group relative h-full overflow-hidden cursor-pointer transition-colors duration-200"
          style={{ backgroundColor: '#FAFAFA' }}
          onMouseEnter={e => { if (!hasSpecialBg && !isMusic) e.currentTarget.style.backgroundColor = '#F0F0F0' }}
          onMouseLeave={e => { if (!hasSpecialBg && !isMusic) e.currentTarget.style.backgroundColor = '#FAFAFA' }}
        >
          {/* ── Video background ── */}
          {isVideo && (
            <>
              <video src={videoSrc} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
            </>
          )}

          {/* ── Photo background ── */}
          {isPhoto && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageSrc} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
            </>
          )}

          {/* ── Category-specific static thumbnails ── */}
          {!isVideo && !isMusic && !isPhoto && category.id === 'design'      && <DesignThumb />}
          {!isVideo && !isMusic && !isPhoto && category.id === 'development' && <DevThumb />}
          {!isVideo && !isMusic && !isPhoto && category.id === 'strategy'    && <StrategyThumb />}

          {/* ── Category label — top-left ── */}
          <div className="absolute top-5 left-5 right-5 flex items-start justify-between z-10">
            <p
              className="text-[10px] tracking-[0.22em] uppercase font-medium font-mono"
              style={{ color: hasSpecialBg ? 'rgba(255,255,255,0.75)' : category.accent }}
            >
              {category.nameEn}
            </p>
            <div
              className="w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0"
              style={{ color: hasSpecialBg ? 'white' : category.accent }}
            >
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </div>
          </div>

          {/* ── Shared audio element ── */}
          {isMusic && (
            <audio
              ref={audioRef}
              src={audioSrc}
              preload="metadata"
              onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
              onTimeUpdate={() => {
                const a = audioRef.current
                if (a) setProgress(a.duration ? a.currentTime / a.duration : 0)
              }}
              onEnded={() => setPlaying(false)}
            />
          )}

          {/* ── Music player — wide (horizontal) ── */}
          {isMusic && wide && (
            <div className="absolute inset-0 flex items-center gap-5 z-10 px-6">
              {/* Waveform bars */}
              <div className="flex items-end gap-[3px] h-8 shrink-0">
                {[0.4, 0.7, 1, 0.6, 0.8, 0.5, 0.9, 0.65, 0.4, 0.75].map((h, i) => (
                  <div
                    key={i}
                    className="w-[3px] rounded-full transition-colors duration-300"
                    style={{ height: `${h * 100}%`, backgroundColor: playing ? category.accent : '#d4d4d4' }}
                  />
                ))}
              </div>

              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="w-10 h-10 border flex items-center justify-center shrink-0 hover:opacity-70 transition-opacity"
                style={{ borderColor: category.accent }}
                aria-label={playing ? 'Pause' : 'Play'}
              >
                {playing
                  ? <Pause size={14} style={{ color: category.accent }} />
                  : <Play size={14} style={{ color: category.accent }} className="ml-0.5" />
                }
              </button>

              {/* Track info */}
              <div className="flex-1 min-w-0">
                {audioTitle && (
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#1a1a1a] truncate">{audioTitle}</p>
                )}
                {audioTitleKo && (
                  <p className="text-[9px] text-[#a3a3a3] font-mono mt-0.5">{audioTitleKo}</p>
                )}
              </div>

              {/* Progress + time */}
              <div className="w-28 shrink-0">
                <div className="h-[2px] bg-[#e5e5e5] w-full">
                  <div className="h-full transition-none" style={{ width: `${progress * 100}%`, backgroundColor: category.accent }} />
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-[9px] font-mono text-[#a3a3a3]">{fmt(progress * duration)}</span>
                  <span className="text-[9px] font-mono text-[#a3a3a3]">{fmt(duration)}</span>
                </div>
              </div>
            </div>
          )}

          {/* ── Music player — narrow (vertical, original) ── */}
          {isMusic && !wide && (
            <div className="absolute inset-0 flex flex-col justify-center items-center z-10 px-6 gap-4">
              <button
                onClick={togglePlay}
                className="w-12 h-12 border flex items-center justify-center hover:opacity-70 transition-opacity duration-150"
                style={{ borderColor: category.accent }}
                aria-label={playing ? 'Pause' : 'Play'}
              >
                {playing
                  ? <Pause size={15} style={{ color: category.accent }} />
                  : <Play size={15} style={{ color: category.accent }} className="ml-0.5" />
                }
              </button>

              {audioTitle && (
                <div className="text-center">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#1a1a1a] leading-tight">{audioTitle}</p>
                  {audioTitleKo && <p className="text-[9px] text-[#a3a3a3] font-mono mt-0.5">{audioTitleKo}</p>}
                </div>
              )}

              <div className="w-full">
                <div className="h-[2px] bg-[#e5e5e5] w-full">
                  <div className="h-full transition-none" style={{ width: `${progress * 100}%`, backgroundColor: category.accent }} />
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-[9px] font-mono text-[#a3a3a3]">{fmt(progress * duration)}</span>
                  <span className="text-[9px] font-mono text-[#a3a3a3]">{fmt(duration)}</span>
                </div>
              </div>
            </div>
          )}

          {/* ── Bottom text block ── */}
          <div className="absolute bottom-5 left-5 right-5 z-10">
            <p className={`text-base font-medium leading-tight mb-1.5 ${hasSpecialBg ? 'text-white' : 'text-[#1a1a1a]'}`}>
              {category.nameKo}
            </p>
            <p className={`text-xs leading-relaxed line-clamp-2 ${hasSpecialBg ? 'text-white/70' : 'text-[#737373]'}`}>
              {category.description}
            </p>
          </div>

          {/* ── Accent tint on hover (plain cards only) ── */}
          {!isVideo && !isMusic && !isPhoto && (
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ backgroundImage: `radial-gradient(circle at 80% 20%, ${category.accent}0f 0%, transparent 60%)` }}
            />
          )}
        </div>
      </Link>
    </motion.div>
  )
}
