'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  r: number
  alpha: number
  denseFrames: number
  dying: boolean
}

// ── Fixed physics ratios (viewport-independent) ──────────────────────────────
const REPEL_F       = 3.8
const DAMP          = 0.92
const MAX_SPEED     = 4.0
const DRIFT         = 0.055
const CLUSTER_THRESH = 4
const DENSE_TTL     = 35
const FADE_SPEED    = 0.020

// ── Reference diagonal (1440×900) ────────────────────────────────────────────
const REF_DIAG = Math.hypot(1440, 900) // ≈ 1693 px

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef  = useRef({ x: -9999, y: -9999 })
  const rafRef    = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    if (!ctx) return

    let W = window.innerWidth
    let H = window.innerHeight

    // ── Viewport-adaptive sizing (recomputed on every resize) ───────────────
    let dynN         = 68
    let dynLinkDist  = 140
    let dynRepelR    = 170
    let dynClusterR  = 48
    let dynSpawnGap  = 110
    let dynSpawnMouse = 190
    let dynRMin      = 1.4
    let dynRMax      = 2.5
    let dynTextRepelR = 220  // exclusion zone around center text block

    const computeSizes = () => {
      const s = Math.hypot(W, H) / REF_DIAG          // 0.25 (mobile) → 1.0 (1440p) → 1.6 (4K)
      dynN          = Math.round(Math.max(30, Math.min(200, 68 * s)))
      dynLinkDist   = Math.round(Math.max(80,  140 * s))
      dynRepelR     = Math.round(Math.max(100, 170 * s))
      dynClusterR   = Math.round(Math.max(28,   48 * s))
      dynSpawnGap   = Math.round(Math.max(70,  110 * s))
      dynSpawnMouse = Math.round(Math.max(120, 190 * s))
      dynRMin       = Math.max(0.8, 1.4 * Math.min(s, 1.8))
      dynRMax       = dynRMin + Math.max(0.8, 1.1 * Math.min(s, 1.8))
      dynTextRepelR = Math.round(Math.max(140, 220 * s))
    }

    // ── Particle factories (use dynamic values) ──────────────────────────────
    const mkParticle = (x: number, y: number, fadingIn = true): Particle => ({
      x, y,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r:  dynRMin + Math.random() * (dynRMax - dynRMin),
      alpha: fadingIn ? 0 : 1,
      denseFrames: 0,
      dying: false,
    })

    const initialParticles = (): Particle[] => {
      const arr: Particle[] = []
      let tries = 0
      while (arr.length < dynN && tries < dynN * 10) {
        tries++
        const x = Math.random() * W
        const y = Math.random() * H
        const dt2 = (x - W / 2) ** 2 + (y - H / 2) ** 2
        if (dt2 < dynTextRepelR ** 2) continue
        arr.push(mkParticle(x, y, false))
      }
      return arr
    }

    const findSpawnPoint = (): { x: number; y: number } | null => {
      const { x: mx, y: my } = mouseRef.current
      for (let attempt = 0; attempt < 30; attempt++) {
        const x = Math.random() * W
        const y = Math.random() * H
        const dm2 = (x - mx) ** 2 + (y - my) ** 2
        if (dm2 < dynSpawnMouse ** 2) continue
        // Exclude center text zone
        const dt2 = (x - W / 2) ** 2 + (y - H / 2) ** 2
        if (dt2 < dynTextRepelR ** 2) continue
        let ok = true
        for (const p of pts) {
          if ((x - p.x) ** 2 + (y - p.y) ** 2 < dynSpawnGap ** 2) { ok = false; break }
        }
        if (ok) return { x, y }
      }
      return null
    }

    // ── Init ────────────────────────────────────────────────────────────────
    let pts: Particle[] = []

    const resize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width  = W
      canvas.height = H
      computeSizes()
      pts = initialParticles()
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Input — mouse + touch ───────────────────────────────────────────────
    const onMove  = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 } }
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) mouseRef.current = { x: t.clientX, y: t.clientY }
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('touchmove',  onTouch,  { passive: true })
    window.addEventListener('touchend',   onLeave,  { passive: true })

    // ── Scroll fade + RAF pause ─────────────────────────────────────────────
    const onScroll = () => {
      const t = Math.max(0, Math.min(1, (window.scrollY / H - 0.30) / 0.55))
      canvas.style.opacity = String(1 - t)
      if (t >= 1 && rafRef.current) {
        cancelAnimationFrame(rafRef.current); rafRef.current = 0
      } else if (t < 1 && !rafRef.current) {
        rafRef.current = requestAnimationFrame(draw)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // ── Main render loop ────────────────────────────────────────────────────
    function draw() {
      const { x: mx, y: my } = mouseRef.current
      ctx.clearRect(0, 0, W, H)

      // Physics
      for (const p of pts) {
        if (p.dying) {
          p.alpha = Math.max(0, p.alpha - FADE_SPEED)
          continue
        }
        if (p.alpha < 1) p.alpha = Math.min(1, p.alpha + FADE_SPEED)

        p.vx += (Math.random() - 0.5) * DRIFT
        p.vy += (Math.random() - 0.5) * DRIFT

        const mdx = p.x - mx, mdy = p.y - my
        const md2 = mdx ** 2 + mdy ** 2
        if (md2 < dynRepelR ** 2 && md2 > 0.25) {
          const md = Math.sqrt(md2)
          const f  = (1 - md / dynRepelR) * REPEL_F
          p.vx += (mdx / md) * f; p.vy += (mdy / md) * f
        }

        // Static text zone repulsion — push particles away from viewport center
        const tdx = p.x - W / 2, tdy = p.y - H / 2
        const td2 = tdx ** 2 + tdy ** 2
        if (td2 < dynTextRepelR ** 2 && td2 > 0.25) {
          const td = Math.sqrt(td2)
          const tf = (1 - td / dynTextRepelR) * 1.2
          p.vx += (tdx / td) * tf; p.vy += (tdy / td) * tf
        }

        p.vx *= DAMP; p.vy *= DAMP
        const spd = Math.hypot(p.vx, p.vy)
        if (spd > MAX_SPEED) { p.vx = p.vx / spd * MAX_SPEED; p.vy = p.vy / spd * MAX_SPEED }

        p.x += p.vx; if (p.x < 0) p.x += W; if (p.x > W) p.x -= W
        p.y += p.vy; if (p.y < 0) p.y += H; if (p.y > H) p.y -= H

        // Cluster detection
        let neighbours = 0
        const cr2 = dynClusterR ** 2
        for (const q of pts) {
          if (q === p || q.dying) continue
          if ((p.x - q.x) ** 2 + (p.y - q.y) ** 2 < cr2) neighbours++
        }
        if (neighbours >= CLUSTER_THRESH) {
          if (++p.denseFrames > DENSE_TTL) p.dying = true
        } else {
          p.denseFrames = Math.max(0, p.denseFrames - 2)
        }
      }

      // Remove fully faded, spawn replacements in empty areas
      const before = pts.length
      pts = pts.filter(p => p.alpha > 0)
      const removed = before - pts.length
      for (let i = 0; i < removed; i++) {
        const pos = findSpawnPoint()
        if (pos) pts.push(mkParticle(pos.x, pos.y, true))
      }
      while (pts.length < dynN) {
        const pos = findSpawnPoint()
        if (!pos) break
        pts.push(mkParticle(pos.x, pos.y, true))
      }

      // Draw links — alpha follows dimmer endpoint
      const LINK_SQ = dynLinkDist ** 2
      ctx.lineWidth = Math.max(0.6, 0.8 * (Math.hypot(W, H) / REF_DIAG))
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const sq = dx * dx + dy * dy
          if (sq >= LINK_SQ) continue
          const pairA  = Math.min(pts[i].alpha, pts[j].alpha)
          const distF  = 1 - Math.sqrt(sq) / dynLinkDist
          const base   = sq < LINK_SQ * 0.3 ? 0.18 : 0.07
          ctx.beginPath()
          ctx.moveTo(pts[i].x, pts[i].y)
          ctx.lineTo(pts[j].x, pts[j].y)
          ctx.strokeStyle = `rgba(26,26,26,${(base * distF * pairA).toFixed(3)})`
          ctx.stroke()
        }
      }

      // Draw dots
      for (const p of pts) {
        const near = (p.x - mx) ** 2 + (p.y - my) ** 2 < dynRepelR ** 2
        ctx.beginPath()
        ctx.arc(p.x, p.y, near ? p.r * 1.5 : p.r, 0, Math.PI * 2)
        ctx.fillStyle   = near ? '#1978e5' : '#1a1a1a'
        ctx.globalAlpha = p.alpha * (near ? 0.65 : 0.28)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize',     resize)
      window.removeEventListener('mousemove',  onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('touchmove',  onTouch)
      window.removeEventListener('touchend',   onLeave)
      window.removeEventListener('scroll',     onScroll)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-8 md:px-16 overflow-hidden">
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300"
      />

      <div className="relative z-10 max-w-5xl w-full text-center">
        <motion.div initial="initial" animate="animate" transition={{ staggerChildren: 0.1 }}>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono uppercase tracking-[0.28em] text-[#a3a3a3] mb-10
                       text-[10px] xl:text-[11px] 2xl:text-[12px]"
          >
            Portfolio — 2026
          </motion.p>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="font-black leading-[0.88] tracking-tight text-[#1a1a1a] select-none
                       text-[clamp(4.5rem,16vw,18rem)]"
          >
            luma3<span className="text-[#1978e5]">.</span>
          </motion.h1>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-px bg-[#e5e5e5] mt-6"
          />

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center mt-5 gap-3"
          >
            <p className="font-light leading-relaxed text-[#737373]
                          text-xl md:text-2xl 2xl:text-3xl">
              Think in systems, create in layers.
            </p>
            <div className="flex flex-col items-center gap-1.5">
              <span className="uppercase font-bold text-[#a3a3a3]
                               tracking-[0.3em] text-[10px] xl:text-[11px] 2xl:text-[13px]">
                Based in Seoul / Creative Designer
              </span>
              <div className="h-px w-28 bg-[#e5e5e5]" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#a3a3a3]"
      >
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={13} strokeWidth={1.5} />
        </motion.div>
        <span className="font-mono uppercase tracking-[0.25em] text-[9px] 2xl:text-[11px]">Scroll</span>
      </motion.div>
    </section>
  )
}
