import { useEffect, useRef } from 'react'

const reduced = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function useCanvas(draw: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void, init?: (w: number, h: number) => void) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current!
    const ctx = c.getContext('2d')!
    let raf = 0, visible = true, w = 0, h = 0
    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      w = c.clientWidth; h = c.clientHeight
      c.width = w * dpr; c.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      init?.(w, h)
    }
    resize()
    const ro = new ResizeObserver(resize); ro.observe(c)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }); io.observe(c)
    const start = performance.now()
    const loop = (now: number) => {
      if (visible) { ctx.clearRect(0, 0, w, h); draw(ctx, w, h, (now - start) / 1000) }
      if (!reduced()) raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect() }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return ref
}

/** A drifting network of nodes with travelling pulses: records connecting into one history. */
export function NetworkBg({ className = '', density = 0.00009 }: { className?: string; density?: number }) {
  const nodes = useRef<{ x: number; y: number; vx: number; vy: number; r: number }[]>([])
  const ref = useCanvas(
    (ctx, w, h, t) => {
      const ns = nodes.current
      for (const n of ns) {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
      }
      const max = 140
      for (let i = 0; i < ns.length; i++) {
        for (let j = i + 1; j < ns.length; j++) {
          const a = ns[i], b = ns[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < max) {
            const o = (1 - d / max) * 0.35
            ctx.strokeStyle = `rgba(94,230,207,${o})`
            ctx.lineWidth = 0.7
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
            if ((i * 7 + j) % 23 === 0) {
              const p = (t * 0.35 + (i % 5) * 0.2) % 1
              ctx.fillStyle = 'rgba(255,200,107,0.9)'
              ctx.beginPath(); ctx.arc(a.x + (b.x - a.x) * p, a.y + (b.y - a.y) * p, 1.6, 0, Math.PI * 2); ctx.fill()
            }
          }
        }
      }
      for (const n of ns) {
        ctx.fillStyle = 'rgba(234,244,242,0.75)'
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill()
      }
    },
    (w, h) => {
      const count = Math.max(24, Math.min(110, Math.round(w * h * density)))
      nodes.current = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 0.6,
      }))
    },
  )
  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden />
}

/** A slowly turning DNA double helix. */
export function HelixBg({ className = '' }: { className?: string }) {
  const ref = useCanvas((ctx, w, h, t) => {
    const steps = 46
    const amp = Math.min(w * 0.28, 90)
    const cx = w / 2
    for (let i = 0; i < steps; i++) {
      const y = (i / (steps - 1)) * h
      const ph = i * 0.38 + t * 0.9
      const x1 = cx + Math.sin(ph) * amp
      const x2 = cx + Math.sin(ph + Math.PI) * amp
      const z1 = (Math.cos(ph) + 1) / 2
      const z2 = (Math.cos(ph + Math.PI) + 1) / 2
      ctx.strokeStyle = `rgba(234,244,242,${0.08 + 0.12 * Math.min(z1, z2)})`
      ctx.lineWidth = 1
      ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke()
      ctx.fillStyle = `rgba(94,230,207,${0.25 + 0.65 * z1})`
      ctx.beginPath(); ctx.arc(x1, y, 2 + 2.5 * z1, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = `rgba(255,200,107,${0.25 + 0.65 * z2})`
      ctx.beginPath(); ctx.arc(x2, y, 2 + 2.5 * z2, 0, Math.PI * 2); ctx.fill()
    }
  })
  return <canvas ref={ref} className={`pointer-events-none h-full w-full ${className}`} aria-hidden />
}

/** Falling "document lines" being read by a scan beam. */
export function ScanBg({ className = '' }: { className?: string }) {
  const cols = useRef<{ x: number; y: number; s: number; w: number }[]>([])
  const ref = useCanvas(
    (ctx, w, h, t) => {
      for (const c of cols.current) {
        c.y += c.s
        if (c.y > h + 20) { c.y = -20; c.x = Math.random() * w }
        const read = Math.abs(c.y - ((t * 120) % (h + 200) - 100)) < 30
        ctx.fillStyle = read ? 'rgba(94,230,207,0.6)' : 'rgba(234,244,242,0.07)'
        ctx.fillRect(c.x, c.y, c.w, 2)
      }
      const by = (t * 120) % (h + 200) - 100
      const g = ctx.createLinearGradient(0, by - 40, 0, by + 40)
      g.addColorStop(0, 'rgba(94,230,207,0)'); g.addColorStop(0.5, 'rgba(94,230,207,0.10)'); g.addColorStop(1, 'rgba(94,230,207,0)')
      ctx.fillStyle = g; ctx.fillRect(0, by - 40, w, 80)
    },
    (w, h) => {
      cols.current = Array.from({ length: Math.round(w / 9) }, () => ({ x: Math.random() * w, y: Math.random() * h, s: 0.2 + Math.random() * 0.5, w: 20 + Math.random() * 70 }))
    },
  )
  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden />
}
