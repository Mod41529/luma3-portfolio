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
    chars: [
      '즉흥과 편곡의 균형이 장르의 중심',
      '스윙·싱코페이션이 리듬의 생동감을 만든다',
      '베이스의 움직임이 있어야 전체 코드가 숨 쉰다',
    ],
    refs: ['Miles Davis — So What', 'John Coltrane — Giant Steps', 'Ella Fitzgerald — Summertime'],
    sunoPrompt: 'jazz, upright bass, brushed drums, warm horn section, swinging groove, subtle room reverb',
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
    chars: [
      '보컬 플로우와 리듬의 결합으로 감정을 전달',
      '라임이 박자 안을 이동할 때 장르 정체성이 드러남',
      '베이스 타격감과 보컬 가시성의 균형이 핵심',
    ],
    refs: ['Kendrick Lamar — HUMBLE.', 'Jay-Z — 99 Problems', 'Nas — N.Y. State of Mind'],
    sunoPrompt: 'hip-hop, crisp hi-hats, deep 808 bass, punchy snare, hard-hitting kicks, lyrical flow',
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
    chars: [
      '완성도보다 질감과 여백이 먼저 전달되는 음악',
      '작고 둔한 드럼 스냅이 중심, 노이즈가 감성 보강',
      '반복 루프가 안정적으로 유지되어야 편안함이 유지',
    ],
    refs: ['Nujabes — Luv(sic) Part 3', 'Tomppabeats — Far', 'Jinsang — Life'],
    sunoPrompt: 'lo-fi, vinyl crackle, gentle boom-bap drums, warm jazzy chords, soft bass, ambient city textures',
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
    chars: [
      '보컬 감정선이 베이스와 코드 진행을 이끈다',
      '저역은 포근하고 둥글게, 보컬 떨림을 강조',
      '장식음·호흡의 뉘앙스가 장르 정체성을 완성',
    ],
    refs: ['Frank Ocean — Thinkin Bout You', 'The Weeknd — Die For You', 'Daniel Caesar — Get You'],
    sunoPrompt: 'smooth R&B, warm electric piano, velvet bassline, intimate vocal processing, soft drums, late-night atmosphere',
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
    chars: [
      '라이브 악기와 전자음의 물리적 밀도가 공존',
      '리프 반복이 감정적 클라이맥스를 형성한다',
      '긴장-폭발-잔향 패턴이 록 특유의 몰입을 만든다',
    ],
    refs: ['Arctic Monkeys — Do I Wanna Know?', 'Radiohead — Idioteque', 'M83 — Midnight City'],
    sunoPrompt: 'rock, distorted guitar layers, punchy drum bus, atmospheric pads, dynamic vocals, live-to-digital blend',
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

  // Pause when another card takes over (pause() doesn't need user gesture)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || isPlaying) return
    audio.pause()
  }, [isPlaying])

  // play() must be called directly inside the click handler (browser autoplay policy)
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      onToggle(genre.id)
    } else {
      onToggle(genre.id)
      const p = audio.play()
      if (p) p.catch(() => onToggle(genre.id))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden flex flex-col cursor-pointer"
      style={{ backgroundColor: genre.bg, minHeight: '260px' }}
      onClick={handleClick}
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

        {/* Mobile inline description — md:hidden (desktop uses bottom panel) */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden border-t"
              style={{ borderColor: `${genre.accent}20` }}
            >
              <div className="pt-4 space-y-4">
                {/* 장르 특징 */}
                <div>
                  <p className="text-[9px] font-mono uppercase tracking-[0.3em] mb-2" style={{ color: `${genre.accent}60` }}>장르 특징</p>
                  <div className="space-y-2">
                    {genre.chars.map((c, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-[9px] font-mono mt-0.5 shrink-0" style={{ color: `${genre.accent}50` }}>{String(i + 1).padStart(2, '0')}</span>
                        <p className="text-[11px] text-white/60 leading-snug">{c}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* 참고 트랙 */}
                <div>
                  <p className="text-[9px] font-mono uppercase tracking-[0.3em] mb-2" style={{ color: `${genre.accent}60` }}>참고 트랙</p>
                  <div className="space-y-1.5">
                    {genre.refs.map((r, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-px h-3 shrink-0" style={{ backgroundColor: `${genre.accent}40` }} />
                        <p className="text-[11px] text-white/60">{r}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Suno Prompt */}
                <div>
                  <p className="text-[9px] font-mono uppercase tracking-[0.3em] mb-2" style={{ color: `${genre.accent}60` }}>Suno Prompt</p>
                  <pre className="text-[10px] font-mono leading-relaxed whitespace-pre-wrap break-words p-2"
                    style={{ color: `${genre.accent}80`, backgroundColor: `${genre.accent}08`, border: `1px solid ${genre.accent}18` }}>
                    {genre.sunoPrompt}
                  </pre>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hidden audio */}
      <audio
        ref={audioRef}
        src={genre.audioSrc}
        preload="auto"
        onLoadedMetadata={() => { setDuration(audioRef.current?.duration ?? 0) }}
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

  // Stop when BentoCard starts playing
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail
      if (!detail.startsWith('music-')) setPlayingId(null)
    }
    window.addEventListener('audio:play', handler)
    return () => window.removeEventListener('audio:play', handler)
  }, [])

  const handleToggle = useCallback((id: GenreId) => {
    setPlayingId(cur => {
      const next = cur === id ? null : id
      if (next !== null) {
        setTimeout(() => window.dispatchEvent(new CustomEvent('audio:play', { detail: `music-${id}` })), 0)
      }
      return next
    })
  }, [])

  return (
    <section id="music" className="border-t border-border">
      {/* Header */}
      <div className="px-6 md:px-12 py-5 flex items-center border-b border-border">
        <div className="flex items-baseline gap-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-fg">Music</h2>
          <span className="text-[10px] text-fg-subtle font-mono">{String(GENRES.length).padStart(2, '0')} genres</span>
          <span className="text-[10px] text-fg-subtle italic hidden md:inline">AI-generated · Suno</span>
        </div>
      </div>

      {/* Mobile: two independent flex columns — expanding a card never affects the other column */}
      <div className="md:hidden flex gap-px bg-border">
        <div className="flex-1 flex flex-col gap-px">
          {GENRES.filter((_, i) => i % 2 === 0).map((genre) => (
            <GenreCard key={genre.id} genre={genre} isPlaying={playingId === genre.id} onToggle={handleToggle} />
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-px">
          {GENRES.filter((_, i) => i % 2 === 1).map((genre) => (
            <GenreCard key={genre.id} genre={genre} isPlaying={playingId === genre.id} onToggle={handleToggle} />
          ))}
        </div>
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-px bg-border items-start">
        {GENRES.map((genre) => (
          <GenreCard key={genre.id} genre={genre} isPlaying={playingId === genre.id} onToggle={handleToggle} />
        ))}
      </div>

      {/* View more button */}
      <div className="flex justify-center py-8">
        <Link href="/work/music" className="group flex flex-col items-center gap-2">
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

      {/* Detail panel — desktop only (mobile uses inline expansion inside GenreCard) */}
      <AnimatePresence>
        {playingId && (() => {
          const g = GENRES.find(g => g.id === playingId)!
          return (
            <motion.div
              key={playingId}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="hidden md:block overflow-hidden border-t border-border"
              style={{ backgroundColor: g.bg }}
            >
              {/* Header */}
              <div className="px-6 md:px-12 pt-6 pb-4 flex items-center gap-3 border-b"
                style={{ borderColor: `${g.accent}20` }}>
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: g.accent }} />
                <span className="text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: g.accent }}>
                  {g.label}
                </span>
                <span style={{ color: `${g.accent}30` }}>—</span>
                <p className="text-[11px] text-white/40 font-light">{g.desc}</p>
              </div>

              {/* Body — 3 columns */}
              <div className="px-6 md:px-12 py-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:divide-x"
                style={{ '--tw-divide-opacity': 0.12, borderColor: `${g.accent}20` } as React.CSSProperties}>

                {/* Col 1 — Characteristics */}
                <div className="md:pr-8">
                  <p className="text-[9px] font-mono uppercase tracking-[0.3em] mb-4"
                    style={{ color: `${g.accent}60` }}>
                    장르 특징
                  </p>
                  <div className="space-y-3">
                    {g.chars.map((c, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-[9px] font-mono mt-0.5 shrink-0" style={{ color: `${g.accent}50` }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <p className="text-[11px] text-white/60 leading-snug">{c}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Col 2 — Reference tracks */}
                <div className="md:px-8">
                  <p className="text-[9px] font-mono uppercase tracking-[0.3em] mb-4"
                    style={{ color: `${g.accent}60` }}>
                    참고 트랙
                  </p>
                  <div className="space-y-3">
                    {g.refs.map((r, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-px h-3 shrink-0" style={{ backgroundColor: `${g.accent}40` }} />
                        <p className="text-[11px] text-white/60 font-light">{r}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Col 3 — Suno prompt */}
                <div className="md:pl-8">
                  <p className="text-[9px] font-mono uppercase tracking-[0.3em] mb-4"
                    style={{ color: `${g.accent}60` }}>
                    Suno Prompt
                  </p>
                  <pre className="text-[10px] font-mono leading-relaxed whitespace-pre-wrap break-words p-3"
                    style={{
                      color: `${g.accent}80`,
                      backgroundColor: `${g.accent}08`,
                      border: `1px solid ${g.accent}18`,
                    }}>
                    {g.sunoPrompt}
                  </pre>
                </div>
              </div>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </section>
  )
}
