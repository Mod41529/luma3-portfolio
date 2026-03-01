'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, Github } from 'lucide-react'

const LINKS = [
  {
    label:   'Email',
    handle:  'hello@luma3.dev',
    href:    'mailto:hello@luma3.dev',
    Icon:    Mail,
    accent:  '#1a1a1a',
  },
  {
    label:   'GitHub',
    handle:  'Mod41529',
    href:    'https://github.com/Mod41529',
    Icon:    Github,
    accent:  '#1a1a1a',
    external: true,
  },
  {
    label:   'LinkedIn',
    handle:  'yusung-jun',
    href:    'https://www.linkedin.com/in/yusung-jun-b09952279/',
    // LinkedIn icon via SVG path
    Icon:    null,
    accent:  '#0A66C2',
    external: true,
  },
]

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

export default function ContactSection() {
  return (
    <section className="border-t border-[#e5e5e5]">
      {/* Section header */}
      <div className="px-6 md:px-12 py-5 border-b border-[#e5e5e5]">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1a1a1a]">Contact</h2>
      </div>

      <div className="px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-7xl flex flex-col md:flex-row gap-16 md:gap-24">
          {/* Left — CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#a3a3a3] mb-6">Get in touch</p>
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-[#1a1a1a] leading-[0.95] mb-6">
              Let&apos;s work<br />together.
            </h3>
            <p className="text-sm text-[#737373] font-light leading-relaxed max-w-sm mb-8">
              Open to collaboration in strategy, design, and development.
              Whether it&apos;s a project, a conversation, or an idea worth building —
              reach out.
            </p>

            {/* Primary email CTA */}
            <a
              href="mailto:hello@luma3.dev"
              className="group inline-flex items-center gap-3 border border-[#1a1a1a] px-6 py-3.5
                         hover:bg-[#1a1a1a] transition-colors duration-200"
            >
              <span className="text-sm font-bold uppercase tracking-[0.15em] text-[#1a1a1a] group-hover:text-white transition-colors duration-200">
                hello@luma3.dev
              </span>
              <ArrowUpRight
                size={14}
                className="text-[#1a1a1a] group-hover:text-white transition-colors duration-200"
              />
            </a>
          </motion.div>

          {/* Right — links + meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-72 flex flex-col gap-10"
          >
            {/* Social links */}
            <div>
              <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#a3a3a3] mb-4">Links</p>
              <div className="space-y-1">
                {LINKS.map(({ label, handle, href, Icon, accent, external }) => (
                  <a
                    key={label}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="group flex items-center justify-between py-3 border-b border-[#e5e5e5]
                               hover:border-[#c3c3c3] transition-colors duration-150"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 flex items-center justify-center border border-[#e5e5e5]
                                       group-hover:border-[#c3c3c3] transition-colors duration-150"
                            style={{ color: accent }}>
                        {Icon
                          ? <Icon size={13} strokeWidth={1.8} />
                          : <LinkedInIcon size={13} />
                        }
                      </span>
                      <div>
                        <p className="text-[9px] font-mono uppercase tracking-wider text-[#a3a3a3]">{label}</p>
                        <p className="text-sm font-medium text-[#1a1a1a] leading-tight">{handle}</p>
                      </div>
                    </div>
                    <ArrowUpRight
                      size={12}
                      className="text-[#c3c3c3] group-hover:text-[#1a1a1a] transition-colors duration-150"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Meta */}
            <div className="space-y-4">
              <div>
                <p className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#c3c3c3] mb-1">Location</p>
                <p className="text-sm text-[#737373]">Seoul, Korea</p>
              </div>
              <div>
                <p className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#c3c3c3] mb-1">Response time</p>
                <p className="text-sm text-[#737373]">Usually within 24h</p>
              </div>
              <div>
                <p className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#c3c3c3] mb-1">Status</p>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
                  <p className="text-sm text-[#059669] font-medium">Open to collaboration</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
