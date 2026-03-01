'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navigation() {
  return (
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

      <div className="flex items-center gap-6 text-sm text-fg-muted">
        <a
          href="mailto:hello@luma3.dev"
          className="hover:text-fg transition-colors duration-200"
        >
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
    </motion.nav>
  )
}
