'use client'

import { motion } from 'framer-motion'

const BACKGROUND = [
  { label: 'University',   value: 'Sungkyunkwan University — Global Business Administration' },
  { label: 'Field',        value: 'Business Strategy & Finance' },
  { label: 'Operations',   value: 'AI-powered Creative Operations' },
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
    <section id="about" className="border-t border-[#e5e5e5]">
      {/* Section header */}
      <div className="px-6 md:px-12 py-5 border-b border-[#e5e5e5]">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1a1a1a]">About</h2>
      </div>

      {/* Split layout */}
      <div className="flex flex-col md:flex-row">
        {/* Left — photo + status */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:w-2/5 border-b md:border-b-0 md:border-r border-[#e5e5e5] p-8 md:p-12 flex flex-col gap-8"
        >
          {/* Photo placeholder */}
          <div
            className="w-full aspect-square max-w-[280px] bg-[#F4F4F2] border border-[#e5e5e5] flex flex-col items-center justify-center gap-2"
          >
            <div className="w-12 h-12 rounded-full bg-[#e5e5e5]" />
            <p className="text-[8px] font-mono uppercase tracking-widest text-[#c3c3c3]">Photo — Soon</p>
          </div>

          {/* Name + status */}
          <div>
            <p className="text-xl font-black tracking-tight text-[#1a1a1a]">Jun Yusung</p>
            <p className="text-[10px] font-mono text-[#a3a3a3] mt-0.5 mb-4">전유성</p>
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 border border-[#e5e5e5] px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#059669]">
                Open to Collaboration
              </span>
            </div>
          </div>

          {/* Disciplines */}
          <div>
            <p className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#a3a3a3] mb-3">Disciplines</p>
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
            <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#a3a3a3] mb-5">Philosophy</p>
            <blockquote className="text-3xl md:text-4xl font-black tracking-tighter text-[#1a1a1a] leading-[1.05] mb-6">
              Think in systems,<br />create in layers.
            </blockquote>
            <p className="text-sm text-[#737373] font-light leading-relaxed max-w-lg">
              Strategic designer and systems builder at the intersection of business thinking,
              creative craft, and AI-powered operations. I build frameworks that connect
              analysis to execution — across disciplines, not within one.
            </p>
          </div>

          {/* What I'm working on */}
          <div>
            <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#a3a3a3] mb-4">Currently</p>
            <div className="space-y-2.5">
              {[
                'Building luma3 — a multi-discipline creative portfolio',
                'Deepening financial modeling and business analysis frameworks',
                'Developing a multi-agent orchestration system (Claude + Codex + Gemini)',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[8px] font-mono text-[#c3c3c3] mt-0.5 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm text-[#1a1a1a] leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Background */}
          <div>
            <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#a3a3a3] mb-4">Background</p>
            <div className="space-y-3">
              {BACKGROUND.map(({ label, value }) => (
                <div key={label} className="flex gap-6">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#a3a3a3] w-24 shrink-0 pt-0.5">
                    {label}
                  </span>
                  <span className="text-sm text-[#737373]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
