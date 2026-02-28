'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { WorkItem } from '@/types'
import { categories } from '@/data/works'

interface WorkDetailModalProps {
  work: WorkItem | null
  onClose: () => void
}

export default function WorkDetailModal({ work, onClose }: WorkDetailModalProps) {
  const [accordionOpen, setAccordionOpen] = useState(false)

  // Reset accordion when a new work opens
  useEffect(() => {
    setAccordionOpen(false)
  }, [work?.id])

  // Keyboard close + scroll lock
  useEffect(() => {
    if (!work) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [work, onClose])

  const category = work ? categories[work.category] : null

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {work && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-fg/15 backdrop-blur-[6px] z-[100]"
          />
        )}
      </AnimatePresence>

      {/* Modal panel */}
      <AnimatePresence>
        {work && category && (
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 16 }}
            transition={{ type: 'spring', stiffness: 360, damping: 32 }}
            className="fixed inset-4 md:inset-8 lg:inset-14 z-[101] bg-bg rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
            style={{ maxHeight: 'calc(100vh - 2rem)' }}
          >
            {/* Left — visual placeholder */}
            <div
              className="md:flex-1 flex items-center justify-center p-8 md:p-12 min-h-[200px] md:min-h-0"
              style={{ backgroundColor: category.bg }}
            >
              <div
                className="w-full aspect-video rounded-xl flex items-center justify-center max-w-lg"
                style={{ backgroundColor: `${category.accent}18` }}
              >
                <span className="text-xs text-fg-subtle font-mono text-center px-4">
                  {work.thumbnailAlt}
                </span>
              </div>
            </div>

            {/* Right — details */}
            <div className="w-full md:w-80 lg:w-96 flex flex-col overflow-y-auto border-t md:border-t-0 md:border-l border-border">
              {/* Header */}
              <div className="flex items-start justify-between p-6 border-b border-border">
                <div>
                  <span
                    className="text-[10px] tracking-[0.18em] uppercase font-mono font-medium"
                    style={{ color: category.accent }}
                  >
                    {category.nameEn} / {category.nameKo}
                  </span>
                  <h2 className="text-lg font-medium mt-1 leading-tight">{work.title}</h2>
                  <p className="text-sm text-fg-muted mt-0.5">{work.titleKo}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-bg-subtle rounded-lg transition-colors -mr-2 -mt-1 ml-2 shrink-0"
                  aria-label="Close"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                {/* Year + tools */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-fg-subtle">{work.year}</span>
                  <span className="text-border text-xs">—</span>
                  {work.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 bg-bg-subtle rounded text-[11px] text-fg-muted"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <p className="text-sm leading-relaxed">{work.description}</p>
                  <p className="text-sm leading-relaxed text-fg-muted">{work.descriptionKo}</p>
                </div>

                {/* How I made this */}
                <div className="border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setAccordionOpen((o) => !o)}
                    className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-bg-subtle transition-colors text-left"
                  >
                    <span className="text-sm font-medium">How I made this</span>
                    <motion.div
                      animate={{ rotate: accordionOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={13} className="text-fg-muted" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {accordionOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-3 space-y-4 border-t border-border">
                          {/* Tools */}
                          <div>
                            <p className="text-[10px] text-fg-subtle uppercase tracking-[0.15em] font-mono mb-2">
                              Tools
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {work.howIMadeThis.tools.map((tool) => (
                                <span
                                  key={tool}
                                  className="px-2 py-0.5 rounded text-[11px] font-mono"
                                  style={{
                                    backgroundColor: `${category.accent}18`,
                                    color: category.textColor,
                                  }}
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Prompt */}
                          {work.howIMadeThis.prompt && (
                            <div>
                              <p className="text-[10px] text-fg-subtle uppercase tracking-[0.15em] font-mono mb-2">
                                Prompt
                              </p>
                              <pre className="text-[11px] font-mono leading-relaxed p-3 bg-fg text-bg rounded-lg overflow-x-auto whitespace-pre-wrap break-words">
                                {work.howIMadeThis.prompt}
                              </pre>
                            </div>
                          )}

                          {/* Process */}
                          <div>
                            <p className="text-[10px] text-fg-subtle uppercase tracking-[0.15em] font-mono mb-2">
                              Process
                            </p>
                            <p className="text-xs leading-relaxed text-fg-muted">
                              {work.howIMadeThis.processNotes}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
