'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, Compass, BarChart2, Megaphone, Workflow } from 'lucide-react'
import { works, categories } from '@/data/works'
import { CategoryId } from '@/types'

const ACCENT: Record<string, string> = {
  design:      '#E11D48',
  development: '#475569',
  strategy:    '#B45309',
}

// ── Shared section header strip ───────────────────────────────────────────────
function SectionHeader({ categoryId }: { categoryId: CategoryId }) {
  const cat      = categories[categoryId]
  const catWorks = works.filter((w) => w.category === categoryId)
  const accent   = ACCENT[categoryId]
  return (
    <div className="px-6 md:px-12 py-5 flex items-baseline justify-between border-b border-[#e5e5e5]">
      <div className="flex items-baseline gap-4">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1a1a1a]">{cat.nameEn}</h2>
        <span className="text-[10px] text-[#a3a3a3] font-mono">
          {String(catWorks.length).padStart(2, '0')} works
        </span>
      </div>
      <Link
        href={`/work/${categoryId}`}
        className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.25em]
                   text-[#a3a3a3] hover:text-[#1a1a1a] transition-colors duration-200"
        style={{ color: accent }}
      >
        View all <ArrowUpRight size={10} strokeWidth={2} />
      </Link>
    </div>
  )
}

// ── Design / Development section body ────────────────────────────────────────
function CategoryBody({ categoryId, index }: { categoryId: CategoryId; index: number }) {
  const cat      = categories[categoryId]
  const catWorks = works.filter((w) => w.category === categoryId)
  const featured = catWorks.find((w) => w.featured) ?? catWorks[0]
  const accent   = ACCENT[categoryId]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="px-6 md:px-12 py-10"
    >
      <div className="max-w-7xl grid md:grid-cols-3 gap-8">
        {/* Description column */}
        <div>
          <p className="text-sm text-[#737373] font-light leading-relaxed">{cat.description}</p>
        </div>

        {/* Featured work */}
        {featured && (
          <Link href={`/work/${categoryId}`} className="group col-span-2">
            <div className="border border-[#e5e5e5] hover:border-[#c3c3c3] bg-[#FAFAFA]
                            hover:bg-white transition-all duration-200 p-6">
              <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#a3a3a3] mb-3">Featured</p>
              <p className="text-base font-black uppercase tracking-tight text-[#1a1a1a]
                            group-hover:text-[#1978e5] transition-colors duration-200 leading-tight mb-1">
                {featured.title}
              </p>
              <p className="text-[10px] text-[#a3a3a3] font-mono mb-4">
                {featured.titleKo} · {featured.year}
              </p>
              <p className="text-xs text-[#737373] leading-relaxed mb-5 line-clamp-2">
                {featured.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {featured.tools.slice(0, 4).map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider
                                             text-[#a3a3a3] border border-[#e5e5e5]">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="w-7 h-7 flex items-center justify-center border border-[#e5e5e5]
                                group-hover:border-[#1978e5] group-hover:bg-[#1978e5] transition-all duration-200 shrink-0">
                  <ArrowUpRight size={12} className="text-[#a3a3a3] group-hover:text-white transition-colors duration-200" />
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>
    </motion.div>
  )
}

// ── Business / Strategy section ───────────────────────────────────────────────
const BUSINESS_DOMAINS = [
  {
    id:          'business-전략',
    label:       '전략',
    labelEn:     'Strategy',
    Icon:        Compass,
    color:       '#B45309',
    description: 'Frameworks and hypotheses applied to real decisions — from OKR systems to AI adoption roadmaps.',
    workIds:     ['s1', 's2'],
  },
  {
    id:          'business-재무',
    label:       '재무',
    labelEn:     'Finance',
    Icon:        BarChart2,
    color:       '#0369A1',
    description: 'Financial models, personal finance systems, and valuation frameworks built on accounting principles.',
    workIds:     ['s3'],
  },
  {
    id:          'business-마케팅',
    label:       '마케팅',
    labelEn:     'Marketing',
    Icon:        Megaphone,
    color:       '#7C3AED',
    description: 'Positioning, go-to-market strategies, and content systems designed for growth.',
    workIds:     [],
  },
  {
    id:          'business-생산',
    label:       '생산',
    labelEn:     'Operations',
    Icon:        Workflow,
    color:       '#059669',
    description: 'Process design and execution systems that translate strategy into measurable outcomes.',
    workIds:     [],
  },
]

function BusinessBody() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="px-6 md:px-12 py-10"
    >
      <div className="max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#e5e5e5] border border-[#e5e5e5]">
          {BUSINESS_DOMAINS.map(({ id, label, labelEn, Icon, color, description, workIds }) => {
            const domainWorks = works.filter((w) => workIds.includes(w.id))
            return (
              <div key={id} id={id} className="bg-[#FAFAFA] p-6 flex flex-col gap-4 scroll-mt-8">
                <div>
                  <div
                    className="w-10 h-10 flex items-center justify-center mb-3"
                    style={{ backgroundColor: color + '10', border: `1px solid ${color}25` }}
                  >
                    <Icon size={20} strokeWidth={1.4} style={{ color }} />
                  </div>
                  <p className="text-sm font-black text-[#1a1a1a]">{label}</p>
                  <p className="text-[8px] font-mono uppercase tracking-wider text-[#a3a3a3] mt-0.5">{labelEn}</p>
                </div>

                <p className="text-[11px] text-[#737373] leading-relaxed flex-1">{description}</p>

                {domainWorks.length > 0 ? (
                  <div className="space-y-2">
                    {domainWorks.map((w) => (
                      <Link key={w.id} href="/work/strategy" className="group flex items-start gap-1.5">
                        <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: color }} />
                        <span className="text-[10px] text-[#1a1a1a] font-medium group-hover:text-[#1978e5]
                                         transition-colors duration-150 leading-snug">
                          {w.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-[9px] font-mono text-[#c3c3c3] uppercase tracking-wider">In progress</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

// ── Exported sections ─────────────────────────────────────────────────────────
export function DesignSection() {
  return (
    <section id="design" className="border-t border-[#e5e5e5]">
      <SectionHeader categoryId="design" />
      <CategoryBody categoryId="design" index={0} />
    </section>
  )
}

export function DevelopmentSection() {
  return (
    <section id="development" className="border-t border-[#e5e5e5]">
      <SectionHeader categoryId="development" />
      <CategoryBody categoryId="development" index={1} />
    </section>
  )
}

export function BusinessSection() {
  return (
    <section id="strategy" className="border-t border-[#e5e5e5]">
      <SectionHeader categoryId="strategy" />
      <BusinessBody />
    </section>
  )
}
