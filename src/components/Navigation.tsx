'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

const sections = [
  { label: 'Video',       id: 'video' },
  { label: 'Music',       id: 'music' },
  { label: 'Design',      id: 'design' },
  { label: 'Development', id: 'development' },
  { label: 'Strategy',    id: 'strategy' },
  { label: 'About',       id: 'about' },
]

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const goTo = (id: string) => {
    setOpen(false)
    if (pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = `/#${id}`
    }
  }

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between"
        style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(250,250,250,0.85)' }}
      >
        <Link
          href="/"
          className="text-sm font-medium tracking-tight hover:opacity-50 transition-opacity duration-200"
        >
          luma3
        </Link>

        <div className="flex items-center gap-4">
          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 text-sm text-fg-muted">
            <a href="mailto:yusung8307@gmail.com" className="hover:text-fg transition-colors duration-200">
              Contact
            </a>
            <a
              href="https://github.com/Mod41529"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fg transition-colors duration-200"
            >
              GitHub
            </a>
          </div>

          {/* Mobile menu toggle — only on md: hidden (i.e. small screens) */}
          <button
            onClick={() => setOpen(o => !o)}
            className="md:hidden flex items-center justify-center w-8 h-8
                       text-[#737373] hover:text-[#1a1a1a] transition-colors duration-150"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile dropdown panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 md:hidden bg-black/20 backdrop-blur-[2px]"
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-[64px] left-4 right-4 z-50 md:hidden
                         bg-[#FAFAFA]/97 backdrop-blur-md border border-[#e5e5e5] shadow-lg"
            >
              {/* Section links */}
              <div className="p-3">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#a3a3a3] px-3 py-2">
                  Sections
                </p>
                {sections.map(({ label, id }) => (
                  <button
                    key={id}
                    onClick={() => goTo(id)}
                    className="w-full text-left px-3 py-2.5 text-sm text-[#737373]
                               hover:text-[#1a1a1a] hover:bg-[#f4f4f2] transition-colors duration-150
                               flex items-center gap-2.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#e5e5e5] shrink-0" />
                    {label}
                  </button>
                ))}
              </div>

              {/* Divider + external links */}
              <div className="border-t border-[#e5e5e5] p-3 flex gap-2">
                <a
                  href="mailto:yusung8307@gmail.com"
                  className="flex-1 text-center py-2.5 text-sm text-[#737373]
                             hover:text-[#1a1a1a] border border-[#e5e5e5] hover:border-[#c3c3c3]
                             transition-colors duration-150"
                >
                  Contact
                </a>
                <a
                  href="https://github.com/Mod41529"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2.5 text-sm text-[#737373]
                             hover:text-[#1a1a1a] border border-[#e5e5e5] hover:border-[#c3c3c3]
                             transition-colors duration-150"
                >
                  GitHub
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
