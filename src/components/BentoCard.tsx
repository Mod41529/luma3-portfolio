'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Play, Pause, Target, TrendingUp, Megaphone, Settings2 } from 'lucide-react'
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

// ── Design thumbnail: MOD logo on plain background ───────────────────────────
function DesignThumb() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/mod-logo.png" alt="MOD" className="w-20 h-auto" style={{ opacity: 0.88 }} />
    </div>
  )
}

// ── Development thumbnail: AI Agent triangle ─────────────────────────────────
function DevThumb() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: '#0F172A' }}>
      {/* Triangle layout: Claude top-center, Gemini bottom-left, Codex bottom-right */}
      <div className="relative w-36 h-32">
        {/* Connector lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 144 128" aria-hidden="true">
          <line x1="72" y1="24" x2="20" y2="104" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="72" y1="24" x2="124" y2="104" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="20" y1="104" x2="124" y2="104" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
        </svg>

        {/* Claude — top center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D97706' }}>
            {/* Anthropic "A" */}
            <svg viewBox="0 0 20 20" width="18" height="18" fill="white" aria-hidden="true">
              <polygon points="10,2 17,16 14.5,16 10,7 5.5,16 3,16" />
            </svg>
          </div>
          <p className="text-[7px] font-mono text-[#94A3B8]">Claude</p>
        </div>

        {/* Gemini — bottom left */}
        <div className="absolute bottom-0 left-0 flex flex-col items-center gap-1">
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1A73E8' }}>
            {/* Gemini star */}
            <svg viewBox="0 0 20 20" width="17" height="17" fill="white" aria-hidden="true">
              <path d="M10 2 Q10.6 10 18 10 Q10.6 10 10 18 Q9.4 10 2 10 Q9.4 10 10 2Z" />
            </svg>
          </div>
          <p className="text-[7px] font-mono text-[#94A3B8]">Gemini</p>
        </div>

        {/* Codex — bottom right */}
        <div className="absolute bottom-0 right-0 flex flex-col items-center gap-1">
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1a1a1a', border: '1px solid #334155' }}>
            {/* OpenAI swirl simplified */}
            <svg viewBox="0 0 20 20" width="16" height="16" fill="white" aria-hidden="true">
              <path d="M10 3a7 7 0 1 1 0 14A7 7 0 0 1 10 3zm0 2a5 5 0 1 0 0 10A5 5 0 0 0 10 5zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
            </svg>
          </div>
          <p className="text-[7px] font-mono text-[#94A3B8]">Codex</p>
        </div>
      </div>
    </div>
  )
}

// ── Business thumbnail: 4-domain icon grid ───────────────────────────────────
function StrategyThumb() {
  const domains = [
    { label: '전략', labelEn: 'Strategy',    Icon: Target,    color: '#B45309' },
    { label: '재무', labelEn: 'Finance',     Icon: TrendingUp, color: '#0369A1' },
    { label: '마케팅', labelEn: 'Marketing', Icon: Megaphone, color: '#7C3AED' },
    { label: '생산', labelEn: 'Operations',  Icon: Settings2, color: '#059669' },
  ]
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: '#FAFAFA' }}>
      <div className="grid grid-cols-2 gap-5">
        {domains.map(({ label, labelEn, Icon, color }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <div
              className="w-10 h-10 flex items-center justify-center"
              style={{ backgroundColor: color + '12', border: `1px solid ${color}30` }}
            >
              <Icon size={18} strokeWidth={1.5} style={{ color }} />
            </div>
            <div className="text-center">
              <p className="text-[9px] font-bold" style={{ color }}>{label}</p>
              <p className="text-[7px] font-mono text-[#a3a3a3] uppercase tracking-wider">{labelEn}</p>
            </div>
          </div>
        ))}
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
