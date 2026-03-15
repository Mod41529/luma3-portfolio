'use client'

import { motion } from 'framer-motion'

const BACKGROUND = [
  { label: 'University',   value: 'Sungkyunkwan University — Global Business Administration' },
  { label: 'Field',        value: 'AI Systems / Finance & Business Automation' },
  { label: 'Operations',   value: 'AI-powered Finance & Business Operations' },
  { label: 'Location',     value: 'Seoul, Korea' },
]

const DISCIPLINES = [
  { name: 'Video',       accent: '#D97706' },
  { name: 'Music',       accent: '#2563EB' },
  { name: 'Design',      accent: '#E11D48' },
  { name: 'Development', accent: '#475569' },
  { name: 'Business',    accent: '#B45309' },
]

export default function AboutSection() {
  return (
    <section id="about" className="border-t border-border">
      {/* Section header */}
      <div className="px-6 md:px-12 py-5 border-b border-border">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-fg">About</h2>
      </div>

      {/* Split layout */}
      <div className="flex flex-col md:flex-row">
        {/* Left — photo + status */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:w-2/5 border-b md:border-b-0 md:border-r border-border p-8 md:p-12 flex flex-col gap-8"
        >
          {/* Photo */}
          <div className="w-full max-w-[240px] border border-border" style={{ aspectRatio: '3/4' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about-photo.jpg"
              alt="Jun Yusung"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name + status */}
          <div>
            <p className="text-xl font-black tracking-tight text-fg">Jun Yusung</p>
            <p className="text-[10px] font-mono text-fg-subtle mt-0.5 mb-4">전유성</p>
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 border border-border px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#059669]">
                Open to Collaboration
              </span>
            </div>
          </div>

          {/* Disciplines */}
          <div>
            <p className="text-[8px] font-mono uppercase tracking-[0.3em] text-fg-subtle mb-3">Disciplines</p>
            <div className="flex flex-wrap gap-1.5">
              {DISCIPLINES.map(({ name, accent }) => (
                <span
                  key={name}
                  className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider border"
                  style={{ borderColor: accent + '60', color: accent }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right — philosophy + background */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:w-3/5 p-8 md:p-12 flex flex-col gap-10"
        >
          {/* Philosophy */}
          <div>
            <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-fg-subtle mb-5">Philosophy</p>
            <blockquote className="text-3xl md:text-4xl font-black tracking-tighter text-fg leading-[1.05] mb-6">
              Think in systems,<br />create in layers.
            </blockquote>
            <p className="text-sm text-fg-muted font-light leading-relaxed max-w-lg">
              Strategic designer and systems builder at the intersection of business thinking,
              creative craft, and AI-powered operations. I build frameworks that connect
              analysis to execution — across disciplines, not within one.
            </p>
          </div>

          {/* What I'm working on */}
          <div>
            <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-fg-subtle mb-4">Currently</p>
            <div className="space-y-2.5">
              {[
                'Operating a 4-machine AI orchestration system — Claude, Codex, and Gemini as specialized worker agents with blueprint templates and cross-device sync',
                'Building an Expert AI persona network in Obsidian vault — domain specialists across finance, tax, law, and business strategy with linked knowledge graphs',
                'Automating a law compliance pipeline — legal API + PDF ingestion + scheduled discovery, bridging Korean legal registry with local vault search',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[8px] font-mono text-fg-faint mt-0.5 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm text-fg leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Background */}
          <div>
            <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-fg-subtle mb-4">Background</p>
            <div className="space-y-3">
              {BACKGROUND.map(({ label, value }) => (
                <div key={label} className="flex gap-6">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-fg-subtle w-24 shrink-0 pt-0.5">
                    {label}
                  </span>
                  <span className="text-sm text-fg-muted">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
