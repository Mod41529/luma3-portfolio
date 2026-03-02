'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Play, Music2 } from 'lucide-react'
import { WorkItem, CategoryConfig } from '@/types'
import WorkDetailModal from './WorkDetailModal'

interface WorkGalleryProps {
  works: WorkItem[]
  category: CategoryConfig
}

// Background colors matched to each design image's dominant tone (mirrors HubSection)
const DESIGN_IMG_BG: Record<string, string> = {
  d2: '#0a0a0a',
  d3: '#0a0a0a',
  d4: '#1a2744',
  d5: '#f5f0e8',
  d6: '#0d0d0d',
  d7: '#0d0d0d',
  d8: '#ede8e0',
}

// ── Thumbnail area — picks the right visual per category ──────────────────
function WorkThumbnail({ work, accent, bg }: { work: WorkItem; accent: string; bg: string }) {
  // Image: design works → portrait + object-contain; others → landscape + object-cover
  if (work.imageSrc) {
    const isDesign = work.category === 'design'
    const cardBg   = isDesign ? (DESIGN_IMG_BG[work.id] ?? '#F4F4F2') : undefined
    return (
      <div
        className={`${isDesign ? 'aspect-[3/4]' : 'aspect-video'} relative overflow-hidden`}
        style={cardBg ? { backgroundColor: cardBg } : undefined}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={work.imageSrc}
          alt={work.thumbnailAlt}
          className={`w-full h-full ${isDesign ? 'object-contain p-4' : 'object-cover'} group-hover:scale-[1.03] transition-transform duration-500`}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
      </div>
    )
  }

  // Video: show poster thumbnail + play icon overlay
  if (work.thumbnailSrc) {
    return (
      <div className="aspect-video relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={work.thumbnailSrc}
          alt={work.thumbnailAlt}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center
                          group-hover:bg-white/35 transition-colors duration-200">
            <Play size={14} className="text-white ml-0.5" fill="white" />
          </div>
        </div>
      </div>
    )
  }

  // Music: dark waveform placeholder
  if (work.category === 'music') {
    return (
      <div className="aspect-video flex flex-col items-center justify-center gap-3" style={{ backgroundColor: '#111821' }}>
        <Music2 size={22} style={{ color: accent }} className="opacity-60" />
        {/* Fake waveform bars */}
        <div className="flex items-center gap-[3px] h-8">
          {[0.4, 0.7, 1.0, 0.6, 0.9, 0.5, 0.8, 0.3, 0.7, 0.5, 0.9, 0.4, 0.6, 1.0, 0.5].map((h, i) => (
            <div
              key={i}
              className="w-[3px] rounded-full opacity-40"
              style={{ height: `${h * 100}%`, backgroundColor: accent }}
            />
          ))}
        </div>
        <span className="text-[9px] font-mono uppercase tracking-[0.2em] opacity-40" style={{ color: accent }}>
          {work.year}
        </span>
      </div>
    )
  }

  // Design / Development / Strategy: accent-tinted placeholder
  return (
    <div
      className="aspect-video flex flex-col items-end justify-between p-5"
      style={{ backgroundColor: bg }}
    >
      <span
        className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-60"
        style={{ color: accent }}
      >
        {work.year}
      </span>
      <p
        className="text-sm font-black uppercase tracking-tight leading-tight text-right max-w-[80%]"
        style={{ color: accent }}
      >
        {work.title}
      </p>
    </div>
  )
}

// ── Main Gallery ──────────────────────────────────────────────────────────
export default function WorkGallery({ works, category }: WorkGalleryProps) {
  const [selected, setSelected] = useState<WorkItem | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e5e5e5] border border-[#e5e5e5]">
        {works.map((work, index) => (
          <motion.div
            key={work.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.button
              whileHover={{ scale: 1.0 }}
              onClick={() => setSelected(work)}
              className="group w-full text-left overflow-hidden bg-[#FAFAFA] hover:bg-white
                         transition-colors duration-200 block"
            >
              {/* Thumbnail */}
              <WorkThumbnail
                work={work}
                accent={category.accent}
                bg={category.bg}
              />

              {/* Info bar */}
              <div className="px-5 py-4 border-t border-[#e5e5e5]">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold leading-tight text-[#1a1a1a] truncate">
                      {work.title}
                    </h3>
                    <p className="text-[10px] text-[#a3a3a3] font-mono mt-0.5 truncate">
                      {work.titleKo} · {work.year}
                    </p>
                  </div>
                  <div className="flex gap-1.5 flex-wrap justify-end shrink-0 mt-0.5">
                    {work.tools.slice(0, 2).map((tool) => (
                      <span
                        key={tool}
                        className="text-[9px] px-2 py-0.5 font-bold uppercase tracking-wider border border-[#e5e5e5] text-[#a3a3a3] whitespace-nowrap"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.button>
          </motion.div>
        ))}
      </div>

      <WorkDetailModal work={selected} onClose={() => setSelected(null)} />
    </>
  )
}
