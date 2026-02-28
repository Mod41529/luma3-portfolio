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
}

function fmt(s: number) {
  if (!isFinite(s) || s === 0) return '—:——'
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

export default function BentoCard({
  category, index, className = '',
  videoSrc, audioSrc, audioTitle, audioTitleKo,
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
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().catch(() => {})
      setPlaying(true)
    }
  }

  const isVideo = !!videoSrc
  const isMusic = !!audioSrc

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
          onMouseEnter={e => { if (!isVideo) e.currentTarget.style.backgroundColor = '#F0F0F0' }}
          onMouseLeave={e => { if (!isVideo) e.currentTarget.style.backgroundColor = '#FAFAFA' }}
        >
          {/* ── Video background ── */}
          {isVideo && (
            <>
              <video
                src={videoSrc}
                autoPlay muted loop playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
            </>
          )}

          {/* ── Category label — top-left ── */}
          <div className="absolute top-5 left-5 right-5 flex items-start justify-between z-10">
            <p
              className="text-[10px] tracking-[0.22em] uppercase font-medium font-mono"
              style={{ color: isVideo ? 'rgba(255,255,255,0.75)' : category.accent }}
            >
              {category.nameEn}
            </p>
            <div
              className="w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0"
              style={{ color: isVideo ? 'white' : category.accent }}
            >
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </div>
          </div>

          {/* ── Music player (center) ── */}
          {isMusic && (
            <div className="absolute inset-0 flex flex-col justify-center items-center z-10 px-6 gap-4">
              <button
                onClick={togglePlay}
                className="w-12 h-12 border flex items-center justify-center
                           hover:opacity-70 transition-opacity duration-150"
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
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#1a1a1a] leading-tight">
                    {audioTitle}
                  </p>
                  {audioTitleKo && (
                    <p className="text-[9px] text-[#a3a3a3] font-mono mt-0.5">{audioTitleKo}</p>
                  )}
                </div>
              )}

              <div className="w-full">
                <div className="h-[2px] bg-[#e5e5e5] w-full">
                  <div
                    className="h-full transition-none"
                    style={{ width: `${progress * 100}%`, backgroundColor: category.accent }}
                  />
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-[9px] font-mono text-[#a3a3a3]">{fmt(progress * duration)}</span>
                  <span className="text-[9px] font-mono text-[#a3a3a3]">{fmt(duration)}</span>
                </div>
              </div>

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
            </div>
          )}

          {/* ── Bottom text block ── */}
          <div className="absolute bottom-5 left-5 right-5 z-10">
            <p className={`text-base font-medium leading-tight mb-1.5
                          ${isVideo ? 'text-white' : 'text-[#1a1a1a]'}`}>
              {category.nameKo}
            </p>
            <p className={`text-xs leading-relaxed line-clamp-2
                          ${isVideo ? 'text-white/70' : 'text-[#737373]'}`}>
              {category.description}
            </p>
          </div>

          {/* ── Accent tint on hover (default cards only) ── */}
          {!isVideo && !isMusic && (
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{
                backgroundImage: `radial-gradient(circle at 80% 20%, ${category.accent}0f 0%, transparent 60%)`,
              }}
            />
          )}
        </div>
      </Link>
    </motion.div>
  )
}
