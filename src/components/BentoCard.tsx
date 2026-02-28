'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { CategoryConfig } from '@/types'

interface BentoCardProps {
  category: CategoryConfig
  index: number
  className?: string
}

export default function BentoCard({ category, index, className = '' }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      <Link href={`/work/${category.id}`} className="block h-full">
        {/*
          Stitch design tokens applied:
          - border-radius: 0px (sharp corners)
          - bg: #FAFAFA uniform
          - hover: bg #F0F0F0 (CSS transition, no y-lift)
          - content: bottom-aligned with absolute positioning
        */}
        <div
          className="group relative h-full overflow-hidden cursor-pointer transition-colors duration-200"
          style={{ backgroundColor: '#FAFAFA' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0F0F0')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#FAFAFA')}
        >
          {/* Category label — top-left, accent color */}
          <div className="absolute top-5 left-5 right-5 flex items-start justify-between z-10">
            <p
              className="text-[10px] tracking-[0.22em] uppercase font-medium font-mono"
              style={{ color: category.accent }}
            >
              {category.nameEn}
            </p>

            {/* Arrow — appears on hover */}
            <div
              className="w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0"
              style={{ color: category.accent }}
            >
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </div>
          </div>

          {/* Bottom block — Korean name + description */}
          <div className="absolute bottom-5 left-5 right-5">
            <p className="text-base font-medium text-[#1a1a1a] leading-tight mb-1.5">
              {category.nameKo}
            </p>
            <p className="text-xs text-[#737373] leading-relaxed line-clamp-2">
              {category.description}
            </p>
          </div>

          {/* Accent tint — barely visible, stays on hover */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{
              backgroundImage: `radial-gradient(circle at 80% 20%, ${category.accent}0f 0%, transparent 60%)`,
            }}
          />
        </div>
      </Link>
    </motion.div>
  )
}
