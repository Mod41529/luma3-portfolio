'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const workLinks = [
  { label: 'Video',       sectionId: 'video' },
  { label: 'Music',       sectionId: 'music' },
  { label: 'Design',      sectionId: 'design' },
  { label: 'Development', sectionId: 'development' },
  { label: 'Business',    sectionId: 'strategy' },
]

const ALL_SECTIONS = [...workLinks.map(l => l.sectionId), 'about']

export default function SideNav() {
  const [visible, setVisible]       = useState(false)
  const [activeId, setActiveId]     = useState<string | null>(null)
  const pathname = usePathname()

  const scrollTo = (sectionId: string) => {
    if (pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = `/#${sectionId}`
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
        // Pick the entry closest to the center that's intersecting
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
                 bg-[#FAFAFA]/95 backdrop-blur-md border-r border-[#e5e5e5]"
    >
      {/* Brand */}
      <div className="px-6 py-7 border-b border-[#e5e5e5]">
        <Link href="/" className="text-base font-black tracking-tighter hover:opacity-50 transition-opacity">
          luma3<span className="text-[#1978e5]">.</span>
        </Link>
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
                     text-[#1a1a1a] hover:bg-[#f4f4f2] rounded-sm transition-colors duration-150 mb-1"
        >
          Main
        </button>

        <div className="h-px bg-[#e5e5e5] mx-2 mb-3" />

        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#a3a3a3] px-2 mb-2">
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
                backgroundColor: isActive ? '#F0F0F0' : 'transparent',
                color: isActive ? '#1978e5' : '#737373',
              }}
            >
              <span
                className="w-1 h-1 rounded-full shrink-0 transition-colors duration-150"
                style={{ backgroundColor: isActive ? '#1978e5' : '#e5e5e5' }}
              />
              <span className={`transition-colors duration-150 ${isActive ? 'font-semibold' : 'group-hover:text-[#1a1a1a]'}`}>
                {label}
              </span>
            </button>
          )
        })}

        {/* Divider */}
        <div className="h-px bg-[#e5e5e5] my-3 mx-2" />

        <Link
          href="/#about"
          className={`flex items-center gap-2.5 px-2 py-2 text-sm rounded-sm transition-colors duration-150
                      ${activeId === 'about' ? 'text-[#1978e5] font-semibold bg-[#F0F0F0]' : 'text-[#737373] hover:text-[#1a1a1a] hover:bg-[#f4f4f2]'}`}
        >
          About
        </Link>
        <a
          href="mailto:yusung8307@gmail.com"
          className="flex items-center gap-2.5 px-2 py-2 text-sm text-[#737373]
                     hover:text-[#1a1a1a] hover:bg-[#f4f4f2] rounded-sm transition-colors duration-150"
        >
          Contact
        </a>
      </nav>

      {/* Bottom */}
      <div className="px-6 py-5 border-t border-[#e5e5e5]">
        <span className="text-[9px] font-mono text-[#c3c3c3] uppercase tracking-widest">
          © 2026 luma3
        </span>
      </div>
    </motion.aside>
  )
}
