'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

const workLinks = [
  { label: 'Video',       sectionId: 'video' },
  { label: 'Music',       sectionId: 'music' },
  { label: 'Design',      sectionId: 'design' },
  { label: 'Development', sectionId: 'development' },
  { label: 'Business',    sectionId: 'business' },
]

const ALL_SECTIONS = [...workLinks.map(l => l.sectionId), 'about', 'contact']

export default function SideNav() {
  const [visible, setVisible]       = useState(false)
  const [activeId, setActiveId]     = useState<string | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  const scrollTo = (sectionId: string) => {
    if (pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push(`/#${sectionId}`)
    }
  }

  // ── Visibility on scroll ────────────────────────────────────────────────
  useEffect(() => {
    if (pathname !== '/') { setVisible(true); return }
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.75)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  // ── Intersection Observer — active section ──────────────────────────────
  useEffect(() => {
    if (pathname !== '/') return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => {
            const aCenter = Math.abs(a.boundingClientRect.top + a.boundingClientRect.height / 2 - window.innerHeight / 2)
            const bCenter = Math.abs(b.boundingClientRect.top + b.boundingClientRect.height / 2 - window.innerHeight / 2)
            return aCenter - bCenter
          })
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-25% 0px -25% 0px', threshold: 0 }
    )

    ALL_SECTIONS.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [pathname])

  return (
    <motion.aside
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -12 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
      className="fixed left-0 top-0 bottom-0 w-[200px] z-50 hidden md:flex flex-col
                 bg-bg/95 backdrop-blur-md border-r border-border"
    >
      {/* Brand */}
      <div className="px-6 py-7 border-b border-border flex items-center justify-between">
        <Link href="/" className="text-base font-black tracking-tighter hover:opacity-50 transition-opacity">
          luma3<span className="text-[#1978e5]">.</span>
        </Link>
        <ThemeToggle />
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-0.5">
        {/* Main */}
        <button
          onClick={() => {
            if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' })
            else window.location.href = '/'
          }}
          className="flex items-center gap-2.5 px-2 py-2 text-sm font-medium w-full text-left
                     text-fg hover:bg-bg-hover rounded-sm transition-colors duration-150 mb-1"
        >
          Main
        </button>

        <div className="h-px bg-border mx-2 mb-3" />

        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-fg-subtle px-2 mb-2">
          Work
        </p>

        {workLinks.map(({ label, sectionId }) => {
          const isActive = activeId === sectionId
          return (
            <button
              key={sectionId}
              onClick={() => scrollTo(sectionId)}
              className="flex items-center gap-2.5 px-2 py-2 text-sm rounded-sm w-full text-left
                         transition-colors duration-150 group"
              style={{
                backgroundColor: isActive ? 'var(--bg-hover)' : 'transparent',
                color: isActive ? '#1978e5' : 'var(--fg-muted)',
              }}
            >
              <span
                className="w-1 h-1 rounded-full shrink-0 transition-colors duration-150"
                style={{ backgroundColor: isActive ? '#1978e5' : 'var(--border)' }}
              />
              <span className={`transition-colors duration-150 ${isActive ? 'font-semibold' : 'group-hover:text-fg'}`}>
                {label}
              </span>
            </button>
          )
        })}

        {/* Divider */}
        <div className="h-px bg-border my-3 mx-2" />

        <Link
          href="/#about"
          className={`flex items-center gap-2.5 px-2 py-2 text-sm rounded-sm transition-colors duration-150
                      ${activeId === 'about' ? 'text-[#1978e5] font-semibold bg-bg-hover' : 'text-fg-muted hover:text-fg hover:bg-bg-hover'}`}
        >
          About
        </Link>
        <button
          onClick={() => scrollTo('contact')}
          className={`flex items-center gap-2.5 px-2 py-2 text-sm rounded-sm w-full text-left transition-colors duration-150
                      ${activeId === 'contact' ? 'text-[#1978e5] font-semibold bg-bg-hover' : 'text-fg-muted hover:text-fg hover:bg-bg-hover'}`}
        >
          Contact
        </button>
      </nav>

      {/* Bottom */}
      <div className="px-6 py-5 border-t border-border">
        <span className="text-[9px] font-mono text-fg-faint uppercase tracking-widest">
          &copy; 2026 luma3
        </span>
      </div>
    </motion.aside>
  )
}
