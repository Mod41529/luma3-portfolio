'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { works, categories } from '@/data/works'
import { CategoryId } from '@/types'

const HUB_CATEGORIES: CategoryId[] = ['design', 'development', 'strategy']

const ACCENT: Record<CategoryId, string> = {
  design:      '#E11D48',
  development: '#475569',
  strategy:    '#B45309',
  video:       '#D97706',
  music:       '#2563EB',
  photography: '#059669',
}

// ── Hub Card ────────────────────────────────────────────────────────────────
function HubCard({ categoryId, index }: { categoryId: CategoryId; index: number }) {
  const cat      = categories[categoryId]
  const catWorks = works.filter((w) => w.category === categoryId)
  const featured = catWorks.find((w) => w.featured) ?? catWorks[0]
  const accent   = ACCENT[categoryId]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/work/${categoryId}`}
        className="group block border border-[#e5e5e5] hover:border-[#c3c3c3]
                   bg-[#FAFAFA] hover:bg-white transition-all duration-200 h-full"
      >
        {/* Top bar */}
        <div
          className="h-[3px] w-full transition-all duration-300"
          style={{ backgroundColor: accent }}
        />

        <div className="p-6 md:p-8 flex flex-col h-full">
          {/* Category label */}
          <div className="flex items-center justify-between mb-6">
            <span
              className="text-[9px] font-bold uppercase tracking-[0.3em]"
              style={{ color: accent }}
            >
              {cat.nameEn}
            </span>
            <span className="text-[9px] font-mono text-[#a3a3a3]">
              {String(catWorks.length).padStart(2, '0')} works
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-[#737373] font-light leading-relaxed mb-6 flex-1">
            {cat.description}
          </p>

          {/* Featured work */}
          {featured && (
            <div className="border-t border-[#e5e5e5] pt-5 mb-6">
              <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#a3a3a3] mb-3">
                Featured
              </p>
              <p className="text-sm font-black uppercase tracking-tight text-[#1a1a1a]
                            group-hover:text-[#1978e5] transition-colors duration-200 leading-tight mb-1">
                {featured.title}
              </p>
              <p className="text-[10px] text-[#a3a3a3] font-mono mb-3">
                {featured.titleKo} · {featured.year}
              </p>
              {/* Tools */}
              <div className="flex flex-wrap gap-1.5">
                {featured.tools.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider
                               text-[#a3a3a3] border border-[#e5e5e5]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]
                             group-hover:text-[#1978e5] transition-colors duration-200">
              View all
            </span>
            <div
              className="w-7 h-7 flex items-center justify-center border border-[#e5e5e5]
                         group-hover:border-[#1978e5] group-hover:bg-[#1978e5]
                         transition-all duration-200"
            >
              <ArrowUpRight
                size={12}
                className="text-[#a3a3a3] group-hover:text-white transition-colors duration-200"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ── Section ──────────────────────────────────────────────────────────────────
export default function HubSection() {
  return (
    <section className="border-t border-[#e5e5e5]">
      {/* Header */}
      <div className="px-6 md:px-12 py-5 flex items-baseline justify-between border-b border-[#e5e5e5]">
        <div className="flex items-baseline gap-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1a1a1a]">
            Disciplines
          </h2>
          <span className="text-[10px] text-[#a3a3a3] font-mono">
            {String(HUB_CATEGORIES.length).padStart(2, '0')} fields
          </span>
        </div>
        <span className="text-[10px] text-[#a3a3a3] italic">Design · Development · Strategy</span>
      </div>

      {/* Cards grid */}
      <div className="p-px bg-[#e5e5e5]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#e5e5e5]">
          {HUB_CATEGORIES.map((cat, i) => (
            <div key={cat} id={cat} className="bg-[#FAFAFA]">
              <HubCard categoryId={cat} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
