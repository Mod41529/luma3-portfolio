'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const workLinks = [
  { label: 'Video',       sectionId: 'video' },
  { label: 'Photography', sectionId: 'photography' },
  { label: 'Music',       sectionId: 'music' },
  { label: 'Design',      sectionId: 'design' },
  { label: 'Development', sectionId: 'development' },
  { label: 'Strategy',    sectionId: 'strategy' },
]

export default function SideNav() {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  const scrollTo = (sectionId: string) => {
    if (pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = `/#${sectionId}`
    }
  }

  useEffect(() => {
    // On sub-pages, always visible
    if (pathname !== '/') {
      setVisible(true)
      return
    }

    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.75)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    // Run once to handle refresh position
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
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
            if (pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            } else {
              window.location.href = '/'
            }
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

        {workLinks.map(({ label, sectionId }) => (
          <button
            key={sectionId}
            onClick={() => scrollTo(sectionId)}
            className="flex items-center gap-2.5 px-2 py-2 text-sm rounded-sm w-full text-left
                       text-[#737373] hover:text-[#1a1a1a] hover:bg-[#f4f4f2]
                       transition-colors duration-150 group"
          >
            <span className="w-1 h-1 rounded-full shrink-0 bg-[#e5e5e5] group-hover:bg-[#a3a3a3] transition-colors" />
            {label}
          </button>
        ))}

        {/* Divider */}
        <div className="h-px bg-[#e5e5e5] my-3 mx-2" />

        <Link
          href="/#about"
          className="flex items-center gap-2.5 px-2 py-2 text-sm text-[#737373]
                     hover:text-[#1a1a1a] hover:bg-[#f4f4f2] rounded-sm transition-colors duration-150"
        >
          About
        </Link>
        <a
          href="mailto:hello@luma3.dev"
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
