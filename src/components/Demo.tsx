import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AlertTriangle, Check, FileText, Play, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react'
import { DOCS, FACTS, LABS, fmtDate, fmtNum, type Cat, type Fact } from '../data'
import { useLang } from '../i18n'
import Paper from './Paper'
import LabChart from './LabChart'

const CAT_STYLE: Record<Cat, string> = {
  encounter: 'bg-sky-300/15 text-sky-200 border-sky-300/30',
  condition: 'bg-violet-300/15 text-violet-200 border-violet-300/30',
  medication: 'bg-emerald-300/15 text-emerald-200 border-emerald-300/30',
  allergy: 'bg-rose-300/15 text-rose-200 border-rose-300/30',
  lab: 'bg-aqua/10 text-aqua border-aqua/30',
  vital: 'bg-amber/10 text-amber border-amber/30',
}

type Tab = 'timeline' | 'labs' | 'summary'
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export default function Demo() {
  const { lang, t } = useLang()
  const d = t.demo
  const [stage, setStage] = useState(-1) // -1 idle, 0..3 running, 4 ready
  const [docIdx, setDocIdx] = useState(0)
  const [shown, setShown] = useState(0)
  const [masked, setMasked] = useState(false)
  const [sel, setSel] = useState<{ doc: string; line: string } | null>(null)
  const [tab, setTab] = useState<Tab>('timeline')
  const [lab, setLab] = useState('a1c')
  const [verified, setVerified] = useState<Set<string>>(() => new Set(FACTS.filter((f) => f.conf >= 0.8).map((f) => f.id)))
  const run = useRef(0)
  const viewerRef = useRef<HTMLDivElement>(null)

  const reset = () => {
    run.current++
    setStage(-1); setDocIdx(0); setShown(0); setMasked(false); setSel(null); setTab('timeline')
    setVerified(new Set(FACTS.filter((f) => f.conf >= 0.8).map((f) => f.id)))
  }

  const start = async () => {
    const id = ++run.current
    const alive = () => run.current === id
    setSel(null); setShown(0); setMasked(false)
    setStage(0)
    for (let i = 0; i < DOCS.length; i++) {
      if (!alive()) return
      setDocIdx(i)
      await sleep(380)
    }
    if (!alive()) return
    setStage(1); setMasked(true); setDocIdx(0)
    await sleep(600)
    if (!alive()) return
    setStage(2)
    for (let i = 1; i <= FACTS.length; i++) {
      if (!alive()) return
      setShown(i)
      setDocIdx(DOCS.findIndex((x) => x.id === FACTS[i - 1].doc))
      await sleep(80)
    }
    if (!alive()) return
    setStage(3)
    await sleep(400)
    if (!alive()) return
    setStage(4)
    pick('D2', 'D2-4', false)
  }

  useEffect(() => () => { run.current++ }, [])

  const pick = (doc: string, line: string, scroll = true) => {
    setSel({ doc, line })
    setDocIdx(DOCS.findIndex((x) => x.id === doc))
    if (scroll && window.innerWidth < 1024) viewerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const doc = DOCS[docIdx]
  const ready = stage === 4
  const running = stage >= 0 && stage < 4

  return (
    <div className="glass-strong rounded-[28px] p-3 sm:p-5">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1 pb-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 font-display text-sm font-bold">AK</div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{d.patient}</div>
            <div className="truncate font-mono text-[11px] text-muted">{d.docsMeta}</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-amber/40 bg-amber/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-amber">{d.badge}</span>
          {stage === -1 && (
            <button onClick={start} className="btn-primary"><Play size={16} /> {d.process}</button>
          )}
          {stage >= 0 && (
            <button onClick={reset} className="btn-ghost"><RotateCcw size={15} /> {d.reset}</button>
          )}
        </div>
      </div>

      {/* pipeline progress */}
      <div className="mb-4 grid grid-cols-5 gap-1.5 px-1">
        {d.stages.map((s, i) => {
          const done = stage > i || ready
          const active = stage === i
          return (
            <div key={s} className="min-w-0">
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div className="h-full bg-aqua" initial={false} animate={{ width: done || (i === 4 && ready) ? '100%' : active ? '60%' : '0%' }} transition={{ duration: 0.5 }} />
              </div>
              <div className={`mt-1.5 hidden truncate text-[11px] sm:block ${active ? 'text-white' : done ? 'text-aqua' : 'text-muted'}`}>{s}</div>
            </div>
          )
        })}
      </div>
      <div className="mb-3 px-1 text-xs text-white/80 sm:hidden">{stage >= 0 ? d.stages[Math.min(stage, 4)] : d.idleHint}</div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* source viewer */}
        <div ref={viewerRef} className="glass min-w-0 scroll-mt-24 self-start rounded-2xl p-3 sm:p-4 lg:sticky lg:top-24">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="font-mono text-[11px] uppercase tracking-wider text-muted">{d.source}</div>
            {sel && <div className="font-mono text-[11px] text-amber">{sel.doc} · {d.page} 1</div>}
          </div>
          <div className="mb-3 grid grid-cols-5 gap-1.5">
            {DOCS.map((x, i) => (
              <button
                key={x.id}
                onClick={() => !running && setDocIdx(i)}
                className={`min-w-0 rounded-lg border px-1.5 py-1.5 text-left transition ${i === docIdx ? 'border-aqua/60 bg-aqua/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
              >
                <div className="flex items-center gap-1 font-mono text-[10px] text-white"><FileText size={11} />{x.id}</div>
                <div className="truncate text-[10px] text-muted">{x.date.slice(0, 4)}</div>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={doc.id} initial={{ opacity: 0, y: 12, rotate: -1 }} animate={{ opacity: 1, y: 0, rotate: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
              <Paper doc={doc} highlight={sel?.doc === doc.id ? sel.line : null} scanning={stage === 0} masked={masked} boxes={stage === 2 || stage === 3} />
            </motion.div>
          </AnimatePresence>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted">
            <span>{doc.kind[lang]}</span><span>·</span><span>{doc.lang}</span>
            {doc.handwritten && (<><span>·</span><span className="text-amber">{d.handwritten}</span></>)}
          </div>
        </div>

        {/* right panel */}
        <div className="glass min-w-0 rounded-2xl p-3 sm:p-4">
          {stage === -1 && <Idle onStart={start} />}
          {running && <Feed shown={shown} stage={stage} />}
          {ready && (
            <div>
              <Stats />
              <div className="mb-4 flex gap-1 rounded-full border border-white/10 bg-black/20 p-1">
                {(['timeline', 'labs', 'summary'] as Tab[]).map((k) => (
                  <button key={k} onClick={() => setTab(k)} className={`relative flex-1 rounded-full px-2 py-2 text-xs font-semibold transition sm:text-sm ${tab === k ? 'text-[#062019]' : 'text-white/80 hover:text-white'}`}>
                    {tab === k && <motion.span layoutId="tab" className="absolute inset-0 rounded-full bg-aqua" transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} />}
                    <span className="relative">{d.tabs[k]}</span>
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
                  {tab === 'timeline' && <Timeline sel={sel} pick={pick} verified={verified} confirm={(id) => setVerified((s) => new Set(s).add(id))} />}
                  {tab === 'labs' && <Labs lab={lab} setLab={setLab} pick={pick} />}
                  {tab === 'summary' && <Summary pick={pick} verified={verified} />}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Idle({ onStart }: { onStart: () => void }) {
  const { lang, t } = useLang()
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 py-6 text-center">
      <div className="relative h-40 w-56">
        {DOCS.map((x, i) => (
          <motion.div
            key={x.id}
            className="absolute left-1/2 top-1/2 h-28 w-20 -translate-x-1/2 -translate-y-1/2 rounded bg-[#FBFAF5] p-2 shadow-xl"
            initial={false}
            animate={{ rotate: (i - 2) * 9, x: (i - 2) * 26 - 40, y: Math.abs(i - 2) * 6 - 56 }}
            whileHover={{ y: -70 }}
          >
            <div className="font-mono text-[8px] text-[#1B2733]/70">{x.id} · {x.date.slice(0, 4)}</div>
            <div className="mt-1 space-y-1">
              {Array.from({ length: 6 }).map((_, j) => <div key={j} className="h-[3px] rounded bg-[#1B2733]/20" style={{ width: `${60 + ((j * 13 + i * 7) % 40)}%` }} />)}
            </div>
            <div className="mt-2 truncate text-[8px] text-[#1B2733]/60">{x.kind[lang]}</div>
          </motion.div>
        ))}
      </div>
      <p className="max-w-sm text-sm text-muted">{t.demo.sub}</p>
      <button onClick={onStart} className="btn-primary"><Play size={16} /> {t.demo.process}</button>
    </div>
  )
}

function Feed({ shown, stage }: { shown: number; stage: number }) {
  const { lang, t } = useLang()
  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-sm text-white">
        <Sparkles size={16} className="animate-pulse text-aqua" /> {t.demo.stages[stage]}…
      </div>
      <div className="space-y-1.5">
        <AnimatePresence initial={false}>
          {FACTS.slice(0, shown).slice(-9).map((f) => (
            <motion.div key={f.id} layout initial={{ opacity: 0, x: -20, filter: 'blur(6px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} exit={{ opacity: 0 }} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] ${CAT_STYLE[f.cat]}`}>{t.demo.cats[f.cat]}</span>
              <span className="min-w-0 flex-1 truncate text-sm">{f.label[lang]}</span>
              <span className="shrink-0 font-mono text-[10px] text-muted">{f.doc} · {Math.round(f.conf * 100)}%</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {stage < 2 && <div className="space-y-1.5">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-9 animate-pulse rounded-lg bg-white/5" />)}</div>}
      </div>
    </div>
  )
}

function Stats() {
  const { t } = useLang()
  const s = [
    { k: '5', v: t.demo.stats.docs },
    { k: String(FACTS.length), v: t.demo.stats.facts },
    { k: '2', v: t.demo.stats.flags },
    { k: '9.4', v: t.demo.stats.time },
  ]
  return (
    <div className="mb-4 grid grid-cols-4 gap-2">
      {s.map((x) => (
        <div key={x.v} className="rounded-xl border border-white/10 bg-white/5 px-2 py-2 text-center">
          <div className="tabular font-display text-lg font-bold text-white sm:text-xl">{x.k}</div>
          <div className="truncate text-[10px] text-muted sm:text-[11px]">{x.v}</div>
        </div>
      ))}
    </div>
  )
}

function Timeline({ sel, pick, verified, confirm }: { sel: { line: string } | null; pick: (d: string, l: string) => void; verified: Set<string>; confirm: (id: string) => void }) {
  const { lang, t } = useLang()
  const groups = useMemo(() => {
    const m = new Map<string, Fact[]>()
    FACTS.forEach((f) => m.set(f.date, [...(m.get(f.date) ?? []), f]))
    return [...m.entries()]
  }, [])
  return (
    <div>
      <div className="mb-4 rounded-xl border border-amber/30 bg-amber/10 p-3">
        <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-amber"><AlertTriangle size={14} /> {t.demo.flagsTitle}</div>
        <ul className="space-y-1 text-xs text-white/85">
          <li>• {t.demo.flags.allergy}</li>
          <li>• {t.demo.flags.nostop}</li>
        </ul>
      </div>
      <p className="mb-3 text-xs text-muted">{t.demo.hint}</p>
      <ol className="relative max-h-[520px] space-y-4 overflow-y-auto pr-1">
        {groups.map(([date, facts]) => (
          <li key={date} className="relative pl-6">
            <span className="absolute left-[5px] top-1.5 h-full w-px bg-white/15" />
            <span className="absolute left-0 top-1 h-3 w-3 rounded-full border-2 border-aqua bg-night" />
            <div className="mb-1.5 font-mono text-[11px] text-aqua">{fmtDate(date, lang)} · {facts[0].doc}</div>
            <div className="space-y-1.5">
              {facts.map((f) => {
                const ok = verified.has(f.id)
                const active = sel?.line === f.line
                return (
                  <div key={f.id} className={`group flex flex-wrap items-center gap-2 rounded-lg border px-2.5 py-2 transition ${active ? 'border-marker/60 bg-marker/10' : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.08]'}`}>
                    <button onClick={() => pick(f.doc, f.line)} className="flex min-w-0 flex-1 items-center gap-2 text-left">
                      <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] ${CAT_STYLE[f.cat]}`}>{t.demo.cats[f.cat]}</span>
                      <span className="min-w-0 flex-1 text-[13px] leading-snug">{f.label[lang]}{f.flag && <AlertTriangle size={12} className="ml-1 inline text-amber" />}</span>
                    </button>
                    <span className="font-mono text-[10px] text-muted">{Math.round(f.conf * 100)}%</span>
                    {ok ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-aqua/10 px-2 py-0.5 text-[10px] text-aqua"><Check size={11} />{t.demo.verified}</span>
                    ) : (
                      <button onClick={() => confirm(f.id)} className="inline-flex items-center gap-1 rounded-full border border-amber/50 bg-amber/10 px-2 py-0.5 text-[10px] text-amber hover:bg-amber/20">
                        {t.demo.review} · {t.demo.confirm}
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Labs({ lab, setLab, pick }: { lab: string; setLab: (k: string) => void; pick: (d: string, l: string) => void }) {
  const { lang, t } = useLang()
  const test = LABS.find((x) => x.key === lab)!
  const dates = LABS[0].points.map((p) => p.date)
  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-1.5">
        {LABS.map((x) => (
          <button key={x.key} onClick={() => setLab(x.key)} className={`rounded-full border px-3 py-1 text-xs transition ${x.key === lab ? 'border-aqua bg-aqua/15 text-white' : 'border-white/15 bg-white/5 text-white/75 hover:bg-white/10'}`}>{x.name[lang]}</button>
        ))}
      </div>
      <div className="mb-1 flex items-baseline justify-between gap-2">
        <div className="text-sm font-semibold">{test.name[lang]} <span className="font-mono text-xs text-muted">{test.unit}</span></div>
        <div className="flex items-center gap-1.5 text-[11px] text-amber"><span className="h-2 w-2 rounded-full bg-amber" />{t.demo.labs.out}</div>
      </div>
      <LabChart test={test} onPick={pick} />
      <p className="mt-1 text-[11px] text-muted">{t.demo.flags.range}</p>
      <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
        <table className="tabular w-full min-w-[420px] text-left text-xs">
          <thead className="bg-white/5 font-mono text-[10px] uppercase tracking-wider text-muted">
            <tr>
              <th className="px-3 py-2">{t.demo.labs.test}</th>
              {dates.map((dt) => <th key={dt} className="px-3 py-2">{fmtDate(dt, lang)}</th>)}
              <th className="px-3 py-2">{t.demo.labs.range}</th>
            </tr>
          </thead>
          <tbody>
            {LABS.map((x) => (
              <tr key={x.key} className="border-t border-white/5">
                <td className="px-3 py-2 text-white/90">{x.name[lang]} <span className="text-muted">{x.unit}</span></td>
                {x.points.map((p) => {
                  const out = p.v > x.hi || (x.lo !== null && p.v < x.lo)
                  return (
                    <td key={p.date} className="px-1 py-1">
                      <button onClick={() => pick(p.doc, p.line)} className={`w-full rounded px-2 py-1 text-left font-mono transition hover:bg-white/10 ${out ? 'text-amber' : 'text-white'}`}>{fmtNum(p.v, lang)}{out ? ' ↑' : ''}</button>
                    </td>
                  )
                })}
                <td className="px-3 py-2 font-mono text-muted">{x.lo !== null ? `${fmtNum(x.lo, lang)}–` : '< '}{fmtNum(x.hi, lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Cite({ doc, line, pick }: { doc: string; line: string; pick: (d: string, l: string) => void }) {
  const { t } = useLang()
  return (
    <button onClick={() => pick(doc, line)} className="ml-1 inline-flex items-center rounded bg-[#0E7C6B]/10 px-1.5 py-[1px] align-middle font-mono text-[10px] text-[#0A5C50] hover:bg-[#0E7C6B]/20">
      {doc}·{t.demo.page}1
    </button>
  )
}

function Summary({ pick, verified }: { pick: (d: string, l: string) => void; verified: Set<string> }) {
  const { lang, t } = useLang()
  const s = t.demo.sum
  const f = (id: string) => FACTS.find((x) => x.id === id)!
  const show = (id: string) => verified.has(id)
  const hidden = FACTS.filter((x) => !verified.has(x.id)).length
  const Item = ({ id }: { id: string }) => show(id) ? (<li>{f(id).label[lang]}<span className="text-[#1B2733]/50"> · {fmtDate(f(id).date, lang)}</span><Cite doc={f(id).doc} line={f(id).line} pick={pick} /></li>) : null
  return (
    <div className="rounded-xl bg-[#FBFAF5] p-4 text-[#1B2733] shadow-xl sm:p-5">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2 border-b border-[#1B2733]/15 pb-3">
        <div>
          <div className="font-display text-base font-bold">{s.title}</div>
          <div className="text-xs text-[#1B2733]/70">{t.demo.patient}</div>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-[#0E7C6B]/10 px-2 py-1 text-[10px] font-semibold text-[#0A5C50]"><ShieldCheck size={12} /> {s.generated}</div>
      </div>
      <div className="space-y-3 text-[13px] leading-relaxed">
        <Sec title={s.problems}><ul className="space-y-0.5"><Item id="f5" /><Item id="f12" /></ul></Sec>
        <Sec title={s.meds}><ul className="space-y-0.5"><Item id="f7" /><Item id="f13" /></ul></Sec>
        <Sec title={s.allergies}><ul className="space-y-0.5"><Item id="f8" /><Item id="f14" /></ul></Sec>
        <Sec title={s.labs}>
          <ul className="space-y-0.5">
            {LABS.map((x) => {
              const last = x.points[x.points.length - 1]
              const prev = x.points[x.points.length - 2]
              const arrow = last.v > prev.v ? '↑' : last.v < prev.v ? '↓' : '→'
              const out = last.v > x.hi || (x.lo !== null && last.v < x.lo)
              return (
                <li key={x.key}>{x.name[lang]}: <b className={out ? 'text-[#B45309]' : ''}>{fmtNum(last.v, lang)} {x.unit}</b> {arrow} <span className="text-[#1B2733]/50">({fmtNum(prev.v, lang)} → {fmtNum(last.v, lang)}) · {fmtDate(last.date, lang)}</span><Cite doc={last.doc} line={last.line} pick={pick} /></li>
              )
            })}
          </ul>
        </Sec>
        <Sec title={s.questions}><ul className="list-disc space-y-0.5 pl-4">{s.q.map((q) => <li key={q}>{q}</li>)}</ul></Sec>
        <Sec title={s.docs}><div className="flex flex-wrap gap-1.5">{DOCS.map((x) => <span key={x.id} className="rounded border border-[#1B2733]/15 px-1.5 py-0.5 font-mono text-[10px]">{x.id} · {x.kind[lang]} · {fmtDate(x.date, lang)}</span>)}</div></Sec>
        {hidden > 0 && <div className="rounded-lg bg-[#FDEBDD] px-3 py-2 text-xs text-[#9A3412]">{s.unverifiedNote} ({hidden})</div>}
      </div>
      <div className="mt-4 border-t border-[#1B2733]/15 pt-2 text-[10px] text-[#1B2733]/60">{s.footer}</div>
    </div>
  )
}

function Sec({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h4 className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#0A5C50]">{title}</h4>
      {children}
    </section>
  )
}
