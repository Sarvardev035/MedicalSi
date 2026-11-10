import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState, useEffect } from 'react'
import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import landTopo from 'world-atlas/land-110m.json'
import { AlertTriangle, ArrowRight, Brain, CalendarRange, FileStack, ScanLine, Check, Clock, Dna, Globe2, Hospital, Languages, Minus, Plane, Search, Server, ShieldCheck, Siren, Workflow, X } from 'lucide-react'
import { useT2 } from '../i18n2'
import { CITIES, DISEASES, DRUGS, STING, type Disease } from '../explore'
import { Reveal, Section } from './Story'

function Head({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <Reveal className="mb-10 max-w-3xl sm:mb-14">
      <div className="eyebrow mb-3">{eyebrow}</div>
      <h2 className="h2">{title}</h2>
      {sub && <p className="lead mt-4 max-w-2xl">{sub}</p>}
    </Reveal>
  )
}

/* ---------------- JOURNEY (problem deep-dive) ---------------- */
export function Journey() {
  const { t2 } = useT2()
  const j = t2.journey
  return (
    <section className="gutter relative overflow-hidden py-20 sm:py-28">
      <div className="relative mx-auto max-w-6xl">
        <Head eyebrow={j.eyebrow} title={j.title} sub={j.sub} />
        <div className="relative">
          <motion.div className="absolute bottom-0 left-[19px] top-0 w-px origin-top bg-gradient-to-b from-amber via-amber/40 to-transparent md:hidden" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.4 }} />
          <motion.div className="absolute left-0 right-0 top-[19px] hidden h-px origin-left bg-gradient-to-r from-amber via-amber/40 to-transparent md:block" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.4 }} />
          <ol className="grid gap-5 md:grid-cols-5 md:gap-4">
            {j.steps.map((s, i) => (
              <Reveal key={s.y} delay={i * 0.12}>
                <li className="relative flex gap-4 md:block">
                  <div className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-amber/60 bg-night font-mono text-[11px] text-amber">{s.y.slice(2)}</div>
                  <div className="glass min-w-0 flex-1 rounded-2xl p-4 md:mt-4">
                    <div className="font-mono text-[11px] text-amber">{s.y}</div>
                    <div className="mt-1 font-display text-sm font-bold">{s.place}</div>
                    <p className="mt-1 text-sm text-white/80">{s.what}</p>
                    <div className="mt-3 rounded-lg border border-rose-300/25 bg-rose-300/10 px-2.5 py-2 text-xs text-rose-100">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-rose-200">{j.lostLabel}: </span>{s.lost}
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-[1fr_1.4fr]">
          <div className="grid grid-cols-3 gap-3">
            {j.numbers.map((n, i) => (
              <Reveal key={n.k + i} delay={i * 0.1}>
                <div className="glass h-full rounded-2xl p-4 text-center">
                  <div className="tabular font-display text-4xl font-semibold text-amber">{n.k}</div>
                  <div className="mt-1 text-xs leading-snug text-muted">{n.v}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="glass-strong flex h-full items-center gap-4 rounded-2xl p-5">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-aqua/15"><Check className="text-aqua" /></div>
              <p className="text-base leading-relaxed text-white/90">{j.outcome}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------------- EDGE (comparison) ---------------- */
export function Edge() {
  const { t2 } = useT2()
  const e = t2.edge
  const Mark = ({ v }: { v: number }) =>
    v === 2 ? <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-aqua/20 text-aqua"><Check size={14} /></span>
    : v === 1 ? <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-amber/15 text-amber"><Minus size={14} /></span>
    : <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-white/5 text-white/35"><X size={14} /></span>
  return (
    <Section id="edge">
      <Head eyebrow={e.eyebrow} title={e.title} />
      <Reveal>
        <div className="glass-strong overflow-x-auto rounded-3xl">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4" />
                {e.cols.map((c, i) => (
                  <th key={c} className={`p-4 text-center text-xs font-semibold ${i === 3 ? 'text-night' : 'text-white/70'}`}>
                    {i === 3 ? <span className="rounded-full bg-aqua px-3 py-1 font-display">{c}</span> : c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {e.rows.map((r, ri) => (
                <motion.tr key={r.t} className="border-b border-white/5" initial={{ opacity: 0.2 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: ri * 0.07 }}>
                  <td className="p-4 text-white/90">{r.t}</td>
                  {r.v.map((v, i) => <td key={i} className={`p-4 text-center ${i === 3 ? 'bg-aqua/[0.06]' : ''}`}><Mark v={v} /></td>)}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted">
        {e.legend.map((l, i) => <span key={l} className="flex items-center gap-1.5"><Mark v={i} />{l}</span>)}
        <span>· {e.note}</span>
      </div>
    </Section>
  )
}

/* ---------------- PLATFORM MAP ---------------- */
export function Platform() {
  const { t2 } = useT2()
  const p = t2.platform
  const chip = (s: string) =>
    s === 'live' ? 'border-aqua/50 bg-aqua/15 text-aqua' : s === 'next' ? 'border-sky-300/40 bg-sky-300/10 text-sky-200' : 'border-amber/40 bg-amber/10 text-amber'
  return (
    <Section id="platform">
      <Head eyebrow={p.eyebrow} title={p.title} sub={p.sub} />
      <div className="mb-5 flex flex-wrap gap-2 text-[11px]">
        {(['live', 'next', 'research'] as const).map((s) => <span key={s} className={`rounded-full border px-2.5 py-1 font-mono uppercase tracking-wider ${chip(s)}`}>{p.status[s]}</span>)}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {p.layers.map((l, li) => (
          <Reveal key={l.t} delay={li * 0.1}>
            <div className={`h-full rounded-3xl p-5 ${li === 0 ? 'glass-strong' : 'glass'}`}>
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted">0{li + 1}</div>
              <h3 className="mt-1 font-display text-lg font-bold">{l.t}</h3>
              <p className="mt-1 text-sm text-muted">{l.d}</p>
              <ul className="mt-4 space-y-2">
                {l.mods.map((m) => (
                  <li key={m.t} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-semibold">{m.t}</span>
                      <span className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${chip(m.s)}`}>{p.status[m.s as 'live']}</span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{m.d}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ---------------- EXPLORER + MAP ---------------- */
const land = feature(landTopo as unknown as Topology, (landTopo as unknown as Topology).objects.land as GeometryCollection)
const MW = 640, MH = 360
const projection = geoNaturalEarth1().fitExtent([[0, 0], [MW, MH]], { type: 'MultiPoint', coordinates: [[5, 22], [132, 22], [5, 58], [132, 58]] } as never)
const landPath = geoPath(projection)(land as never) ?? ''

export function Explorer() {
  const { lang, t2 } = useT2()
  const x = t2.explorer
  const [q, setQ] = useState('')
  const [dz, setDz] = useState<Disease>(DISEASES[0])
  const [tab, setTab] = useState<'stages' | 'history' | 'map'>('map')
  const [sort, setSort] = useState<'price' | 'wait'>('price')
  const [city, setCity] = useState<string | null>(null)

  const match = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return null
    return DISEASES.find((d) => d.aliases.some((a) => s.includes(a) || a.includes(s)) || Object.values(d.name).some((n) => n.toLowerCase().includes(s))) ?? 'none'
  }, [q])
  useEffect(() => { if (match && match !== 'none') { setDz(match); setCity(null) } }, [match])

  const opts = [...dz.options].sort((a, b) => (sort === 'price' ? a.lo - b.lo : a.wait - b.wait))
  const fmt = (n: number) => '$' + n.toLocaleString(lang === 'en' ? 'en-US' : 'ru-RU')
  const pt = (id: string) => { const c = CITIES.find((c) => c.id === id)!; return projection([c.lon, c.lat])! }
  const [tx, ty] = pt('tas')

  return (
    <Section id="explorer">
      <Head eyebrow={x.eyebrow} title={x.title} sub={x.sub} />
      <div className="glass-strong rounded-[28px] p-3 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input id="disease-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={x.placeholder} className="w-full rounded-full border border-white/15 bg-black/25 py-3 pl-11 pr-4 text-sm text-white placeholder:text-muted focus:border-aqua/60 focus:outline-none" />
          </label>
          <div className="flex flex-wrap gap-1.5">
            {DISEASES.map((d) => (
              <button key={d.id} onClick={() => { setDz(d); setQ(''); setCity(null) }} className={`rounded-full border px-3 py-1.5 text-xs transition ${dz.id === d.id ? 'border-aqua bg-aqua/15 text-white' : 'border-white/15 bg-white/5 text-white/75 hover:bg-white/10'}`}>{d.name[lang]}</button>
            ))}
          </div>
        </div>
        {match === 'none' && <p className="mt-2 px-2 text-xs text-amber">{x.notFound} {DISEASES.map((d) => d.name[lang]).join(' · ')}</p>}

        <div className="mt-4 flex items-end justify-between gap-3 px-1">
          <div>
            <div className="font-display text-xl font-bold sm:text-2xl">{dz.name[lang]}</div>
            <div className="text-xs text-muted">{dz.procedure[lang]}</div>
          </div>
        </div>

        <div className="my-4 flex gap-1 rounded-full border border-white/10 bg-black/20 p-1">
          {(['map', 'stages', 'history'] as const).map((k) => (
            <button key={k} onClick={() => setTab(k)} className={`relative flex-1 rounded-full px-2 py-2 text-xs font-semibold sm:text-sm ${tab === k ? 'text-night' : 'text-white/80'}`}>
              {tab === k && <motion.span layoutId="xtab" className="absolute inset-0 rounded-full bg-aqua" />}
              <span className="relative">{x.tabs[k]}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab + dz.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            {tab === 'stages' && (
              <div>
                <div className="grid gap-3 md:grid-cols-3">
                  {dz.stages.map((s, i) => (
                    <div key={i} className="glass rounded-2xl p-4">
                      <div className="mb-3 flex gap-1">{dz.stages.map((_, j) => <span key={j} className={`h-1.5 flex-1 rounded-full ${j <= i ? 'bg-gradient-to-r from-aqua to-amber' : 'bg-white/10'}`} />)}</div>
                      <div className="font-display text-sm font-bold">{s.n[lang]}</div>
                      <p className="mt-1 text-sm text-white/80">{s.d[lang]}</p>
                      <div className="mt-3 rounded-lg bg-aqua/10 px-3 py-2 text-xs text-aqua">{s.tx[lang]}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs text-muted">{x.stageNote}</p>
              </div>
            )}
            {tab === 'history' && (
              <div>
                <ol className="relative space-y-3 border-l border-white/15 pl-6">
                  {dz.history.map((h, i) => (
                    <motion.li key={h.y} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12 }} className="relative">
                      <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-amber bg-night" />
                      <div className="font-display text-lg font-bold text-amber">{h.y}</div>
                      <p className="text-sm text-white/85">{h.t[lang]}</p>
                    </motion.li>
                  ))}
                </ol>
                <p className="mt-3 text-xs text-muted">{x.historyNote}</p>
              </div>
            )}
            {tab === 'map' && (
              <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
                <div className="glass relative self-start overflow-hidden rounded-2xl">
                  <span className="absolute left-3 top-3 z-10 rounded-full border border-amber/40 bg-amber/10 px-2 py-0.5 font-mono text-[10px] uppercase text-amber">{x.sample}</span>
                  <svg viewBox={`0 0 ${MW} ${MH}`} className="block h-auto w-full" role="img" aria-label={x.tabs.map}>
                    <defs>
                      <pattern id="dots" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.5" r="1.1" fill="rgba(234,244,242,0.35)" /></pattern>
                    </defs>
                    <path d={landPath} fill="url(#dots)" stroke="rgba(94,230,207,0.25)" strokeWidth="0.6" />
                    {dz.options.filter((o) => o.city !== 'tas').map((o, i) => {
                      const [cx, cy] = pt(o.city)
                      const mx = (tx + cx) / 2, my = Math.min(ty, cy) - 50
                      const active = city === o.city
                      return (
                        <motion.path key={o.city + dz.id} d={`M${tx},${ty} Q${mx},${my} ${cx},${cy}`} fill="none" stroke={active ? '#FFC86B' : '#5EE6CF'} strokeWidth={active ? 2.2 : 1.2} strokeDasharray="4 4" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: active || !city ? 1 : 0.3 }} transition={{ duration: 1, delay: i * 0.12 }} />
                      )
                    })}
                    {CITIES.map((c) => {
                      const [cx, cy] = pt(c.id)
                      const o = dz.options.find((o) => o.city === c.id)
                      const active = city === c.id
                      return (
                        <g key={c.id} className="cursor-pointer" onClick={() => setCity(c.id)}>
                          <circle cx={cx} cy={cy} r="14" fill="transparent" />
                          <circle cx={cx} cy={cy} r={active ? 7 : 5} fill={c.id === 'tas' ? '#FFC86B' : '#5EE6CF'} stroke="#07131C" strokeWidth="2" />
                          <circle cx={cx} cy={cy} r="10" fill="none" stroke={c.id === 'tas' ? '#FFC86B' : '#5EE6CF'} opacity="0.5"><animate attributeName="r" from="6" to="16" dur="2s" repeatCount="indefinite" /><animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" /></circle>
                          <text x={cx} y={cy - 12} textAnchor="middle" fontSize="11" fontWeight="600" fill="#EAF4F2" fontFamily="Onest, sans-serif">{c.name[lang]}</text>
                          {o && <text x={cx} y={cy + 20} textAnchor="middle" fontSize="10" fill="#FFC86B" fontFamily="JetBrains Mono, monospace">{fmt(o.lo)}+</text>}
                        </g>
                      )
                    })}
                  </svg>
                </div>
                <div>
                  <div className="mb-2 flex gap-1.5">
                    {(['price', 'wait'] as const).map((s) => <button key={s} onClick={() => setSort(s)} className={`rounded-full border px-3 py-1 text-xs ${sort === s ? 'border-aqua bg-aqua/15' : 'border-white/15 bg-white/5 text-white/75'}`}>{s === 'price' ? x.sortPrice : x.sortWait}</button>)}
                  </div>
                  <div className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
                    {opts.map((o) => {
                      const c = CITIES.find((c) => c.id === o.city)!
                      const active = city === o.city
                      return (
                        <motion.button layout key={o.city} onClick={() => setCity(o.city)} className={`w-full rounded-2xl border p-3 text-left transition ${active ? 'border-amber/60 bg-amber/10' : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.08]'}`}>
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 text-sm font-semibold"><Hospital size={14} className="text-aqua" />{c.name[lang]}</div>
                              <div className="truncate text-xs text-muted">{o.clinic}</div>
                            </div>
                            <div className="text-right">
                              <div className="tabular font-display text-base font-bold text-amber">{fmt(o.lo)}–{fmt(o.hi)}</div>
                              <div className="font-mono text-[9px] uppercase text-muted">{x.price}</div>
                            </div>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-white/75">
                            <span className="flex items-center gap-1"><Clock size={11} />{x.wait}: {o.wait} {x.weeks}</span>
                            <span>{x.stay}: {o.stay} {x.days}</span>
                            {c.flight > 0 && <span className="flex items-center gap-1"><Plane size={11} />{c.flight} {x.hours}</span>}
                            {o.acc && <span className="flex items-center gap-1 text-aqua"><ShieldCheck size={11} />JCI*</span>}
                          </div>
                          <div className="mt-1 text-[11px] text-muted">{x.stage}: {dz.stages[dz.stages.length - 1].n[lang]}</div>
                        </motion.button>
                      )
                    })}
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-muted">* {x.accredited}. {x.mapNote}</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  )
}

/* ---------------- DIGITAL TWIN CONCEPT ---------------- */
function curve(tmax: number, half: number) {
  const ke = Math.LN2 / half
  let lo = ke * 1.0001, hi = 50
  for (let i = 0; i < 60; i++) {
    const ka = (lo + hi) / 2
    const tm = Math.log(ka / ke) / (ka - ke)
    if (tm > tmax) lo = ka; else hi = ka
  }
  const ka = (lo + hi) / 2
  const f = (t: number) => (Math.exp(-ke * t) - Math.exp(-ka * t))
  const peak = f(tmax)
  return (t: number) => Math.max(0, f(t) / peak)
}

export function Twin() {
  const { lang, t2 } = useT2()
  const w = t2.twin
  const [mode, setMode] = useState<'drug' | 'sting'>('drug')
  const [drugId, setDrugId] = useState('para')
  const drug = DRUGS.find((d) => d.id === drugId)!
  const [time, setTime] = useState(0)
  const T = 24
  useEffect(() => {
    if (mode !== 'drug') return
    setTime(0)
    const id = setInterval(() => setTime((v) => (v >= T ? 0 : +(v + 0.15).toFixed(2))), 60)
    return () => clearInterval(id)
  }, [drugId, mode])
  const c = useMemo(() => curve(drug.tmax, drug.half), [drug])
  const level = c(time)
  const phase = time < drug.tmax ? 'stomach' : time < drug.tmax + drug.half * 1.2 ? 'liver' : 'kidney'
  const CW = 640, CH = 230, pad = 30
  const px = (t: number) => pad + (t / T) * (CW - pad * 2)
  const py = (v: number) => CH - pad - v * (CH - pad * 2)
  const path = Array.from({ length: 97 }, (_, i) => (i / 96) * T).map((t, i) => `${i ? 'L' : 'M'}${px(t).toFixed(1)},${py(c(t)).toFixed(1)}`).join(' ')
  const glow = (o: string) => (drug.organs.includes(o) ? (phase === o || (o === 'heart' && phase === 'liver') ? 1 : 0.35) : 0.08)

  return (
    <Section id="twin">
      <Head eyebrow={w.eyebrow} title={w.title} sub={w.sub} />
      <div className="glass-strong grid gap-5 rounded-[28px] p-4 sm:p-6 lg:grid-cols-[300px_1fr]">
        {/* body */}
        <div className="relative mx-auto w-full max-w-[300px]">
          <svg viewBox="0 0 200 320" className="h-auto w-full">
            <defs>
              <radialGradient id="glow" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#5EE6CF" stopOpacity="0.9" /><stop offset="1" stopColor="#5EE6CF" stopOpacity="0" /></radialGradient>
            </defs>
            <g fill="rgba(255,255,255,0.05)" stroke="rgba(234,244,242,0.35)" strokeWidth="1.2">
              <circle cx="100" cy="36" r="24" />
              <path d="M60 70 Q100 58 140 70 L150 170 Q148 200 132 214 L128 300 L108 300 L102 220 L98 220 L92 300 L72 300 L68 214 Q52 200 50 170 Z" />
              <path d="M60 74 L34 170 L44 174 L66 110" /><path d="M140 74 L166 170 L156 174 L134 110" />
            </g>
            {mode === 'drug' ? (
              <g>
                <motion.ellipse cx="104" cy="104" rx="11" ry="13" fill="#F87171" animate={{ opacity: glow('heart') }} />
                <motion.path d="M70 118 Q92 108 112 120 Q108 138 84 140 Q70 136 70 118Z" fill="#FFC86B" animate={{ opacity: glow('liver') }} />
                <motion.ellipse cx="118" cy="136" rx="13" ry="10" fill="#A78BFA" animate={{ opacity: glow('stomach') }} />
                <motion.ellipse cx="84" cy="160" rx="7" ry="11" fill="#5EE6CF" animate={{ opacity: glow('kidney') }} />
                <motion.ellipse cx="116" cy="160" rx="7" ry="11" fill="#5EE6CF" animate={{ opacity: glow('kidney') }} />
                <motion.circle cx="100" cy="150" r="70" fill="url(#glow)" animate={{ opacity: level * 0.35 }} />
              </g>
            ) : (
              <g>
                <circle cx="160" cy="166" r="6" fill="#FFC86B" />
                <motion.circle cx="160" cy="166" r="10" fill="none" stroke="#F87171" strokeWidth="2" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} animate={{ scale: [0.8, 2.2, 0.8], opacity: [0.9, 0.2, 0.9] }} transition={{ duration: 2, repeat: Infinity }} />
                <motion.ellipse cx="100" cy="52" rx="14" ry="7" fill="#F87171" animate={{ opacity: [0.1, 0.5, 0.1] }} transition={{ duration: 2.4, repeat: Infinity }} />
                <motion.rect x="94" y="62" width="12" height="16" rx="4" fill="#F87171" animate={{ opacity: [0.1, 0.5, 0.1] }} transition={{ duration: 2.4, repeat: Infinity, delay: 0.4 }} />
              </g>
            )}
          </svg>
          <div className="absolute left-0 top-0 rounded-full border border-amber/40 bg-amber/10 px-2 py-0.5 font-mono text-[9px] uppercase text-amber">{w.concept}</div>
        </div>

        {/* controls */}
        <div className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">{w.scenario}:</span>
            {(['drug', 'sting'] as const).map((m) => <button key={m} onClick={() => setMode(m)} className={`rounded-full border px-3 py-1.5 text-xs ${mode === m ? 'border-aqua bg-aqua/15' : 'border-white/15 bg-white/5 text-white/75'}`}>{m === 'drug' ? w.medicine : w.sting}</button>)}
          </div>
          {mode === 'drug' ? (
            <div>
              <div className="mb-3 flex flex-wrap gap-1.5">
                {DRUGS.map((d) => <button key={d.id} onClick={() => setDrugId(d.id)} className={`rounded-full border px-3 py-1 text-xs ${drugId === d.id ? 'border-amber bg-amber/15 text-white' : 'border-white/15 bg-white/5 text-white/75'}`}>{d.name[lang]}</button>)}
              </div>
              <div className="glass overflow-x-auto rounded-2xl p-2">
                <svg viewBox={`0 0 ${CW} ${CH}`} className="block h-auto w-full min-w-[300px]">
                  {[0, 0.5, 1].map((v) => <line key={v} x1={pad} x2={CW - pad} y1={py(v)} y2={py(v)} stroke="rgba(255,255,255,0.08)" />)}
                  {[0, 6, 12, 18, 24].map((h) => <text key={h} x={px(h)} y={CH - 8} textAnchor="middle" fontSize="10" fill="#9FB6B6" fontFamily="JetBrains Mono, monospace">{h}h</text>)}
                  <path d={path} fill="none" stroke="#5EE6CF" strokeWidth="2.2" />
                  <line x1={px(time)} x2={px(time)} y1={pad - 6} y2={CH - pad} stroke="rgba(255,200,107,0.5)" strokeDasharray="3 3" />
                  <circle cx={px(time)} cy={py(level)} r="5" fill="#FFC86B" stroke="#07131C" strokeWidth="2" />
                  <text x={pad} y={14} fontSize="10" fill="#9FB6B6" fontFamily="JetBrains Mono, monospace">{w.level}</text>
                </svg>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl border border-white/10 bg-white/5 p-2"><div className="tabular font-display text-lg font-bold">{drug.tmax}h</div><div className="text-[10px] text-muted">{w.peak}</div></div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-2"><div className="tabular font-display text-lg font-bold">{drug.half}h</div><div className="text-[10px] text-muted">{w.halfLife}</div></div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-2"><div className="tabular font-display text-lg font-bold">{time.toFixed(1)}h</div><div className="text-[10px] text-muted">{w.hoursAfter}</div></div>
              </div>
              <p className="mt-3 text-sm text-white/85">{drug.note[lang]}</p>
              <p className="mt-2 flex items-start gap-2 text-sm text-amber"><AlertTriangle size={15} className="mt-0.5 shrink-0" />{w.caution}: {drug.caution[lang]}</p>
            </div>
          ) : (
            <div>
              <div className="mb-2 font-display text-base font-bold">{w.stingTitle}</div>
              <ol className="space-y-2">
                {STING.steps.map((s, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }} className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                    <span className="shrink-0 font-mono text-xs text-amber">{i < 2 ? s.t : '→'}</span>
                    <span className="text-sm text-white/85">{s.d[lang]}</span>
                  </motion.li>
                ))}
              </ol>
              <div className="mt-4 rounded-2xl border border-rose-400/50 bg-rose-500/15 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-rose-200"><Siren size={16} />{w.danger}</div>
                <ul className="grid gap-1 text-sm text-rose-50 sm:grid-cols-2">{STING.danger.map((d, i) => <li key={i}>• {d[lang]}</li>)}</ul>
              </div>
            </div>
          )}
          <p className="mt-4 text-[11px] leading-relaxed text-muted">{w.disclaimer}</p>
        </div>
      </div>
    </Section>
  )
}

/* ---------------- GLOBAL ---------------- */
export function Global() {
  const { t2 } = useT2()
  const g = t2.global
  const icons = [Workflow, Languages, Server, Dna]
  return (
    <section id="global" className="gutter relative scroll-mt-20 overflow-hidden py-20 sm:py-28">
      <div className="relative mx-auto max-w-6xl">
        <Head eyebrow={g.eyebrow} title={g.title} sub={g.sub} />
        <div className="relative mb-10">
          <div className="pointer-events-none absolute left-0 right-0 top-[22px] hidden h-px bg-gradient-to-r from-aqua via-amber to-white/10 md:block" />
          <ol className="grid gap-3 md:grid-cols-5">
            {g.waves.map((wv, i) => (
              <Reveal key={wv.k} delay={i * 0.1}>
                <li className="relative">
                  <motion.div className="relative z-10 mb-3 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-night" initial={{ scale: 0.6 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.12, type: 'spring' }}>
                    <Globe2 size={18} className={i === 0 ? 'text-aqua' : 'text-white/70'} />
                  </motion.div>
                  <div className={`h-full rounded-2xl p-4 ${i === 0 ? 'glass-strong ring-1 ring-aqua/40' : 'glass'}`}>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-amber">{wv.k}</div>
                    <div className="mt-1 font-display text-sm font-bold">{wv.t}</div>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{wv.d}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="glass h-full rounded-3xl p-6">
              <div className="mb-4 font-display text-base font-bold">{g.builtTitle}</div>
              <div className="grid gap-3 sm:grid-cols-2">
                {g.built.map((b, i) => {
                  const Icon = icons[i]
                  return (
                    <div key={b.t} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <Icon size={18} className="mb-2 text-aqua" />
                      <div className="text-sm font-semibold">{b.t}</div>
                      <p className="mt-1 text-xs leading-relaxed text-muted">{b.d}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass-strong h-full rounded-3xl p-6">
              <div className="mb-4 font-display text-base font-bold">{g.signalsTitle}</div>
              <div className="grid grid-cols-2 gap-3">
                {g.signals.map((s) => (
                  <div key={s.k} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="tabular font-display text-2xl font-semibold text-aqua">{s.k}</div>
                    <p className="mt-1 text-xs leading-snug text-white/80">{s.v}</p>
                    <div className="mt-2 font-mono text-[9px] uppercase tracking-wider text-muted">{s.src}</div>
                  </div>
                ))}
              </div>
              <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted"><ArrowRight size={14} className="mt-0.5 shrink-0 text-amber" />{g.signalsNote}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------------- MSi STATION ---------------- */
export function Station() {
  const { t2 } = useT2()
  const s = t2.station
  const icons = [FileStack, ScanLine, Brain, CalendarRange]
  return (
    <Section id="station">
      <Head eyebrow={s.eyebrow} title={s.title} sub={s.sub} />
      <div className="glass-strong overflow-hidden rounded-[28px] p-4 sm:p-6">
        {/* animated scene */}
        <div className="relative mx-auto h-[260px] w-[680px] max-w-none [zoom:0.5] min-[480px]:[zoom:0.7] md:[zoom:1]">
          {/* folder */}
          <div className="absolute left-[6%] top-1/2 -translate-y-1/2">
            <div className="absolute -left-3 -top-14 h-28 w-28 rounded-lg border border-amber/40 bg-amber/20 shadow-xl" style={{ rotate: '-4deg' }}><div className="absolute -top-2 left-2 h-3 w-10 rounded-t bg-amber/40" /><div className="absolute bottom-2 left-2 font-mono text-[9px] uppercase text-amber">2021–2025</div></div>
            {[0, 1, 2, 3].map((i) => (
              <motion.div key={i} className="absolute h-24 w-20 rounded bg-[#FBFAF5] p-1.5 shadow-xl" style={{ top: -40 + i * 3, left: i * 3, rotate: (i - 1.5) * 4 }}
                animate={{ x: [0, 0, 170, 170, 0, 0], y: [0, 0, -10, -10, 0, 0], opacity: [1, 1, 0, 0, 0, 1] }} transition={{ duration: 6, times: [0, 0.12 + i * 0.05, 0.32 + i * 0.05, 0.85, 0.88, 1], repeat: Infinity }}>
                <div className="space-y-1">{Array.from({ length: 6 }).map((_, j) => <div key={j} className="h-[2px] rounded bg-[#1B2733]/25" style={{ width: `${50 + ((j * 13 + i * 9) % 45)}%` }} />)}</div>
              </motion.div>
            ))}
          </div>
          {/* station */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="h-16 w-44 rounded-t-2xl border border-white/25 bg-gradient-to-b from-white/25 to-white/5" />
              <div className="relative h-10 w-44 overflow-hidden rounded-b-xl border border-t-0 border-white/25 bg-white/10">
                <motion.div className="absolute inset-y-0 w-10 bg-gradient-to-r from-transparent via-aqua/70 to-transparent" animate={{ left: ['-20%', '110%'] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }} />
              </div>
              <div className="absolute -right-14 -top-6 h-20 w-14 rounded-lg border border-white/30 bg-night/80 p-1 shadow-xl">
                <div className="h-full rounded bg-gradient-to-b from-aqua/30 to-transparent p-1">
                  <div className="mb-1 h-1 w-6 rounded bg-white/60" />
                  {[0, 1, 2].map((i) => <motion.div key={i} className="mb-1 h-1.5 rounded bg-aqua/70" animate={{ width: ['0%', '100%'] }} transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity, repeatDelay: 1.5 }} />)}
                </div>
              </div>
              <div className="mt-2 text-center font-mono text-[10px] uppercase tracking-wider text-aqua">MSi Station</div>
            </div>
          </div>
          {/* data particles */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.span key={i} className="absolute top-1/2 h-1.5 w-1.5 rounded-full bg-amber" style={{ left: '62%' }} animate={{ x: [0, 120], y: [(i - 2.5) * 8, (i - 2.5) * 14], opacity: [0, 1, 0] }} transition={{ duration: 1.4, delay: i * 0.22, repeat: Infinity }} />
          ))}
          {/* timeline card */}
          <div className="absolute right-[2%] top-1/2 w-44 -translate-y-1/2 rounded-xl border border-white/20 bg-white/10 p-2 backdrop-blur">
            {['HbA1c 6.6 %', 'Metformin', 'Penicillin ⚠', 'BP 135/85'].map((r, i) => (
              <motion.div key={r} className="mb-1 flex items-center gap-1.5 rounded bg-white/5 px-1.5 py-1 text-[10px]" animate={{ opacity: [0, 0, 1, 1, 0] }} transition={{ duration: 6, times: [0, 0.45 + i * 0.06, 0.55 + i * 0.06, 0.92, 1], repeat: Infinity }}>
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${i === 2 ? 'bg-amber' : 'bg-aqua'}`} />{r}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-2 w-fit rounded-full border border-aqua/30 bg-aqua/10 px-3 py-1 font-mono text-[11px] text-aqua">{s.target}</div>

        {/* flow steps */}
        <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {s.flow.map((f, i) => {
            const Icon = icons[i]
            return (
              <li key={f.t} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10"><Icon size={18} className="text-aqua" /><span className="absolute -right-1.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-amber font-mono text-[9px] font-bold text-night">{i + 1}</span></div>
                <div><div className="text-sm font-semibold">{f.t}</div><p className="mt-0.5 text-xs leading-relaxed text-muted">{f.d}</p></div>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="glass h-full rounded-3xl p-6">
            <div className="mb-4 font-display text-base font-bold">{s.partsTitle}</div>
            <div className="grid gap-3 sm:grid-cols-3">
              {s.parts.map((p) => (
                <div key={p.t} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="text-sm font-semibold">{p.t}</div>
                  <p className="mt-1 text-xs text-muted">{p.d}</p>
                  <div className="tabular mt-2 font-display text-lg font-bold text-amber">{p.p}</div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted">{s.total}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="glass h-full rounded-3xl p-6">
            <ul className="space-y-2.5">
              {s.rules.map((r) => <li key={r} className="flex items-start gap-2 text-sm text-white/85"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-aqua" />{r}</li>)}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
