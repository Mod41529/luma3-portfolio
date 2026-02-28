'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { WorkItem, CategoryConfig } from '@/types'
import WorkDetailModal from './WorkDetailModal'

interface WorkGalleryProps {
  works: WorkItem[]
  category: CategoryConfig
}

export default function WorkGallery({ works, category }: WorkGalleryProps) {
  const [selected, setSelected] = useState<WorkItem | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {works.map((work, index) => (
          <motion.div
            key={work.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.button
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              onClick={() => setSelected(work)}
              className="group w-full text-left rounded-2xl overflow-hidden bg-bg-subtle hover:shadow-lg transition-shadow duration-300"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
            >
              {/* Thumbnail */}
              <div
                className="aspect-video flex items-center justify-center"
                style={{ backgroundColor: category.bg }}
              >
                <span className="text-xs text-fg-subtle font-mono">{work.thumbnailAlt}</span>
              </div>

              {/* Info */}
              <div className="p-4 border-t border-border">
                <h3 className="text-sm font-medium leading-tight">{work.title}</h3>
                <p className="text-xs text-fg-muted mt-0.5">{work.titleKo}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[11px] font-mono text-fg-subtle">{work.year}</span>
                  <div className="flex gap-1 flex-wrap justify-end">
                    {work.tools.slice(0, 2).map((tool) => (
                      <span
                        key={tool}
                        className="text-[10px] px-1.5 py-0.5 bg-bg rounded"
                        style={{ color: category.accent }}
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
