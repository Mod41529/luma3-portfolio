'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { works, categories } from '@/data/works'

// Pull the first featured work (Multi-Agent Orchestration)
const featured = works.find((w) => w.featured && w.category === 'development')!
const category = categories[featured.category]

export default function FeaturedWork() {
  const [howIMadeOpen, setHowIMadeOpen] = useState(false)
  const [specsOpen, setSpecsOpen] = useState(false)

  const featuredIndex = works.filter((w) => w.featured).findIndex((w) => w.id === featured.id) + 1
  const featuredTotal = works.filter((w) => w.featured).length

  return (
    <section className="border-t border-[#e5e5e5]">
      {/* Section header — editorial label */}
      <div className="px-6 md:px-12 lg:px-24 py-5 flex items-baseline justify-between border-b border-[#e5e5e5]">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#a3a3a3]">
          Featured / 0{featuredIndex}
        </span>
        <span className="text-[10px] text-[#a3a3a3] italic">Scroll to explore</span>
      </div>

      {/* Split layout — left image / right details */}
      <div className="flex flex-col md:flex-row min-h-[600px] md:min-h-[70vh]">
        {/* Left: visual area with grid background from Stitch */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-3/5 border-b md:border-b-0 md:border-r border-[#e5e5e5] bg-[#F0F0F0] relative flex items-center justify-center p-8 md:p-16 min-h-[45vw] md:min-h-0"
        >
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-60 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, #e5e5e5 1px, transparent 1px), linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Agent orchestration diagram */}
          <div className="relative w-full max-w-lg font-mono">
            {/* Orchestrator node */}
            <div className="border border-[#475569] bg-white px-5 py-3 mb-8 mx-auto w-fit">
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#475569] mb-0.5">Orchestrator</p>
              <p className="text-sm font-black text-[#1a1a1a]">Claude Code</p>
            </div>

            {/* Connector lines */}
            <div className="flex justify-center gap-0 mb-0 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-4 bg-[#cbd5e1]" />
              <div className="absolute top-4 left-[20%] right-[20%] h-px bg-[#cbd5e1]" />
              <div className="absolute top-4 left-[20%] w-px h-4 bg-[#cbd5e1]" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-[#cbd5e1]" />
              <div className="absolute top-4 right-[20%] w-px h-4 bg-[#cbd5e1]" />
            </div>

            {/* Worker nodes */}
            <div className="flex justify-between gap-3 mt-8 pt-1">
              {[
                { label: 'Research', name: 'Gemini', color: '#059669', note: '1,500 req/day' },
                { label: 'Judgment', name: 'Claude', color: '#475569', note: 'Max plan' },
                { label: 'Code', name: 'Codex', color: '#D97706', note: 'Heavy quota' },
              ].map(({ label, name, color, note }) => (
                <div key={name} className="flex-1 border px-3 py-2.5" style={{ borderColor: color }}>
                  <p className="text-[8px] uppercase tracking-[0.25em] mb-0.5" style={{ color }}>{label}</p>
                  <p className="text-xs font-black text-[#1a1a1a]">{name}</p>
                  <p className="text-[8px] text-[#a3a3a3] mt-1">{note}</p>
                </div>
              ))}
            </div>

            {/* Queue status bar */}
            <div className="mt-8 border border-[#e5e5e5] px-4 py-2 flex items-center justify-between">
              <span className="text-[8px] uppercase tracking-[0.25em] text-[#a3a3a3]">Queue</span>
              <div className="flex gap-1.5">
                {['dispatched', 'in_progress', 'complete'].map((s, i) => (
                  <span key={s} className="text-[8px] font-bold px-2 py-0.5 uppercase tracking-wide"
                    style={{ color: ['#D97706','#475569','#059669'][i], backgroundColor: ['#D97706','#475569','#059669'][i] + '18' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: project detail panel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full md:w-2/5 flex flex-col bg-[#FAFAFA]"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-[#e5e5e5] sticky top-0 bg-[#FAFAFA]/95 backdrop-blur-sm z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]">
              luma3 / Portfolio
            </span>
            <span className="text-[10px] text-[#a3a3a3] uppercase tracking-[0.2em] font-mono">
              0{featuredIndex} / 0{featuredTotal}
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-col p-8 md:p-12 gap-8">
            {/* Title + meta */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#1a1a1a] uppercase leading-[0.9]">
                {featured.title.split(' ').map((word, i) => (
                  <span key={i}>
                    {word}
                    {i < featured.title.split(' ').length - 1 && <br />}
                  </span>
                ))}
              </h2>
              <div className="flex items-center gap-4 mt-4">
                <span className="text-xs font-medium text-[#737373] uppercase tracking-widest">
                  Year: {featured.year}
                </span>
                <div className="h-px w-8 bg-[#e5e5e5]" />
                <span className="text-xs font-medium text-[#737373] uppercase tracking-widest">
                  Status: Completed
                </span>
              </div>
            </div>

            {/* Tool tags — square chips per Stitch */}
            <div className="flex flex-wrap gap-2">
              {featured.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 bg-[#f4f4f2] text-[10px] font-bold uppercase tracking-wider text-[#737373] border border-[#e5e5e5]"
                >
                  {tool}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-base md:text-lg leading-relaxed text-[#737373] font-light max-w-md">
              {featured.description}
            </p>

            {/* Accordion — from Stitch */}
            <div className="border-t border-[#e5e5e5]">
              {/* How I made this */}
              <div className="border-b border-[#e5e5e5]">
                <button
                  onClick={() => setHowIMadeOpen((o) => !o)}
                  className="w-full flex items-center justify-between py-5 text-left"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">
                    How I made this
                  </span>
                  <motion.div animate={{ rotate: howIMadeOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={15} className="text-[#a3a3a3]" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {howIMadeOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8">
                        {featured.howIMadeThis.prompt && (
                          <div className="bg-[#111821] p-6 font-mono text-sm leading-relaxed text-[#94a3b8] mb-4">
                            <div className="flex gap-1.5 mb-4">
                              {[0, 1, 2].map((i) => (
                                <div key={i} className="w-2 h-2 rounded-full bg-[#334155]" />
                              ))}
                            </div>
                            <p className="text-[#1978e5] italic mb-2">// Prompt</p>
                            <p className="text-xs whitespace-pre-wrap break-words">
                              {featured.howIMadeThis.prompt}
                            </p>
                          </div>
                        )}
                        <p className="text-sm text-[#737373] leading-relaxed">
                          {featured.howIMadeThis.processNotes}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Technical Specs */}
              <div className="border-b border-[#e5e5e5]">
                <button
                  onClick={() => setSpecsOpen((o) => !o)}
                  className="w-full flex items-center justify-between py-5 text-left"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">
                    Technical Specs
                  </span>
                  <motion.div animate={{ rotate: specsOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={15} className="text-[#a3a3a3]" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {specsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 text-sm text-[#737373] leading-loose">
                        {featured.howIMadeThis.tools.map((t) => (
                          <div key={t}>— {t}</div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom meta — location + links */}
            <div className="flex justify-between items-end pt-2">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-[#a3a3a3] uppercase tracking-widest font-bold">
                  Location
                </span>
                <span className="text-sm font-medium text-[#1a1a1a]">Seoul, Korea</span>
              </div>
              <div className="flex gap-4">
                <a
                  href={`/work/${featured.category}`}
                  className="text-[10px] font-bold uppercase tracking-widest text-[#1978e5] border-b border-[#1978e5] pb-0.5 hover:opacity-70 transition-opacity"
                >
                  View All Work
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
