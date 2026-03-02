'use client'

export default function BackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#a3a3a3]
                 hover:text-[#1a1a1a] transition-colors duration-150 flex items-center gap-2"
    >
      <span>↑</span>
      <span>Back to top</span>
    </button>
  )
}
