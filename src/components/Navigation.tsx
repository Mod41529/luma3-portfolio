'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

const sections = [
  { label: 'Video',       id: 'video' },
  { label: 'Music',       id: 'music' },
  { label: 'Design',      id: 'design' },
  { label: 'Development', id: 'development' },
  { label: 'Business',    id: 'business' },
  { label: 'About',       id: 'about' },
]

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (pathname !== '/') return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => {
            const aD = Math.abs(a.boundingClientRect.top + a.boundingClientRect.height / 2 - window.innerHeight / 2)
            const bD = Math.abs(b.boundingClientRect.top + b.boundingClientRect.height / 2 - window.innerHeight / 2)
            return aD - bD
          })
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-25% 0px -25% 0px', threshold: 0 }
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [pathname])

  const goTo = (id: string) => {
    setOpen(false)
    if (pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push(`/#${id}`)
    }
  }

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex items-center justify-between md:hidden"
        style={{ backdropFilter: 'blur(12px)', backgroundColor: 'var(--overlay)' }}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-sm font-medium tracking-tight hover:opacity-50 transition-opacity duration-200"
          >
            luma3
          </Link>
          {/* Current section indicator */}
          <AnimatePresence mode="wait">
            {activeId && (
              <motion.span
                key={activeId}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 4 }}
                transition={{ duration: 0.18 }}
                className="text-[10px] font-mono uppercase tracking-[0.25em] text-fg-subtle"
              >
                {sections.find(s => s.id === activeId)?.label}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen(o => !o)}
            className="flex items-center justify-center w-8 h-8
                       text-fg-muted hover:text-fg transition-colors duration-150"
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
                         backdrop-blur-md border border-border shadow-lg"
              style={{ backgroundColor: 'var(--overlay-strong)' }}
            >
              {/* Section links */}
              <div className="p-3">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-fg-subtle px-3 py-2">
                  Sections
                </p>
                {sections.map(({ label, id }) => {
                  const isActive = activeId === id
                  return (
                    <button
                      key={id}
                      onClick={() => goTo(id)}
                      className="w-full text-left px-3 py-2.5 text-sm transition-colors duration-150
                                 flex items-center gap-2.5 rounded-sm"
                      style={{
                        backgroundColor: isActive ? 'var(--bg-hover)' : 'transparent',
                        color: isActive ? '#1978e5' : 'var(--fg-muted)',
                      }}
                    >
                      <span
                        className="w-1 h-1 rounded-full shrink-0 transition-colors duration-150"
                        style={{ backgroundColor: isActive ? '#1978e5' : 'var(--border)' }}
                      />
                      <span className={isActive ? 'font-semibold' : ''}>
                        {label}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Divider + external links */}
              <div className="border-t border-border p-3 flex gap-2">
                <a
                  href="mailto:yusung8307@gmail.com"
                  className="flex-1 text-center py-2.5 text-sm text-fg-muted
                             hover:text-fg border border-border hover:border-fg-faint
                             transition-colors duration-150"
                >
                  Contact
                </a>
                <a
                  href="https://github.com/Mod41529"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2.5 text-sm text-fg-muted
                             hover:text-fg border border-border hover:border-fg-faint
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
