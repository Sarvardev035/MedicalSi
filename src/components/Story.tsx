import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import {
  ArrowRight, BadgeCheck, Brain, Camera, ClipboardCheck, Clock, FileSearch, FileStack, Globe2, HeartPulse, Languages,
  Link2, LineChart, Lock, ScanLine, ShieldCheck, Sparkles, Stethoscope, TestTubes, Wand2, Workflow, AlertTriangle, Users, Plane,
} from 'lucide-react'
import { useLang } from '../i18n'
import ProductShot from './ProductShot'

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0.15, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Section({ id, children, className = '' }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`gutter relative scroll-mt-20 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

function Head({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <Reveal className="mb-10 max-w-3xl sm:mb-14">
      <div className="eyebrow mb-3">{eyebrow}</div>
      <h2 className="h2">{title}</h2>
      {sub && <p className="lead mt-4 max-w-2xl">{sub}</p>}
    </Reveal>
  )
}

/* ---------------- HERO ---------------- */
export function Hero() {
  const { t } = useLang()
  return (
    <section className="gutter relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36">
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 inline-flex items-center gap-2 rounded-md border border-white/10 px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-aqua" />
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/85">{t.hero.eyebrow}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }} className="font-display text-[34px] font-semibold leading-[1.04] tracking-tight sm:text-5xl lg:text-[64px]">
            {t.hero.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8 }} className="lead mt-6 max-w-xl">
            {t.hero.sub}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8 flex flex-wrap gap-3">
            <a href="#demo" className="btn-primary">{t.hero.cta1} <ArrowRight size={16} /></a>
            <a href="#problem" className="btn-ghost">{t.hero.cta2}</a>
          </motion.div>
          <p className="mt-5 font-mono text-[11px] text-muted">{t.hero.note}</p>
        </div>
        <HeroVisual />
      </div>
    </section>
  )
}

function HeroVisual() {
  const { lang } = useLang()
  const label = { en: 'Open the demo clinic portal', ru: 'Открыть демо-портал клиники', uz: 'Demo klinika portalini ochish' }[lang]
  return (
    <a href="#portal" aria-label={label} className="group relative block rounded-xl outline-offset-4 transition hover:-translate-y-1">
      <ProductShot />
      <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg bg-[#14212B] px-3 py-2 text-xs font-semibold text-white shadow-lg ring-1 ring-white/10 transition group-hover:bg-teal sm:bottom-4 sm:right-4 sm:text-sm">{label}<ArrowRight size={14} /></span>
    </a>
  )
}

/* ---------------- WHAT MSi STANDS FOR ---------------- */
export function NameSection() {
  const { t } = useLang()
  const icons = [HeartPulse, Brain, Sparkles]
  return (
    <Section id="about">
      <Head eyebrow={t.name.eyebrow} title={t.name.title} />
      <div className="grid gap-4 md:grid-cols-3">
        {t.name.letters.map((x, i) => {
          const Icon = icons[i]
          return (
            <Reveal key={x.l} delay={i * 0.1}>
              <div className="glass group relative h-full overflow-hidden rounded-3xl p-6">
                <div className="pointer-events-none absolute -right-4 -top-10 font-display text-[150px] font-semibold leading-none text-white/[0.06] transition group-hover:text-aqua/10">{x.l}</div>
                <Icon className="mb-6 text-aqua" size={26} />
                <div className="font-display text-2xl font-bold"><span className="text-aqua">{x.l}</span>{x.w.slice(1)}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{x.d}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
      <Reveal delay={0.2}><p className="glass mt-6 rounded-2xl px-5 py-4 text-base text-white/90 sm:text-lg">{t.name.line}</p></Reveal>
    </Section>
  )
}

/* ---------------- PROBLEM (sticky scroll scene) ---------------- */
export function Problem() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return (
    <section id="problem" ref={ref} className="relative h-[300vh]">
      <div className="gutter sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-2">
          <div className="relative min-h-[260px] sm:min-h-[300px]">
            <div className="eyebrow mb-4">{t.problem.eyebrow}</div>
            {t.problem.beats.map((b, i) => <Beat key={i} i={i} p={scrollYProgress} t={b.t} d={b.d} />)}
            <ProgressDots p={scrollYProgress} />
          </div>
          <ChaosVisual p={scrollYProgress} />
        </div>
      </div>
    </section>
  )
}

function Beat({ i, p, t, d }: { i: number; p: MotionValue<number>; t: string; d: string }) {
  const a = i / 3
  const b = (i + 1) / 3
  const opacity = useTransform(p, i === 0 ? [0, b - 0.06, b] : i === 2 ? [a, a + 0.06, 1] : [a, a + 0.06, b - 0.06, b], i === 0 ? [1, 1, 0] : i === 2 ? [0, 1, 1] : [0, 1, 1, 0])
  const y = useTransform(p, [a, b], [20, -20])
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0 top-10">
      <h2 className="font-display text-3xl font-bold leading-tight sm:text-5xl">{t}</h2>
      <p className="lead mt-5 max-w-lg">{d}</p>
    </motion.div>
  )
}

function ProgressDots({ p }: { p: MotionValue<number> }) {
  const w = useTransform(p, [0, 1], ['0%', '100%'])
  return (
    <div className="absolute bottom-0 left-0 h-1 w-40 overflow-hidden rounded-full bg-white/10">
      <motion.div style={{ width: w }} className="h-full bg-gradient-to-r from-aqua to-amber" />
    </div>
  )
}

function ChaosVisual({ p }: { p: MotionValue<number> }) {
  const items = [
    { txt: 'Глюкоза 6,8', x: -120, y: -110, r: -12, hand: false },
    { txt: 'Qandli diabet 2-tur', x: 110, y: -90, r: 10, hand: true },
    { txt: 'HbA1c 7,1 %', x: -150, y: 40, r: 7, hand: false },
    { txt: 'Аллергия: пенициллин', x: 120, y: 60, r: -9, hand: true },
    { txt: 'Lisinopril 10 mg', x: -30, y: 150, r: 4, hand: false },
    { txt: "Allergiya: yo'q", x: 30, y: -170, r: -5, hand: true },
  ]
  const clock = useTransform(p, [0.62, 0.8], [0, 1])
  return (
    <div className="relative mx-auto h-[300px] w-full max-w-[460px] sm:h-[420px]">
      <div className="glass absolute inset-6 rounded-[40px] sm:inset-10" />
      {items.map((it, i) => <Chip key={i} it={it} i={i} p={p} />)}
      <motion.div style={{ opacity: clock, scale: clock }} className="glass-strong absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-3xl px-6 py-5">
        <Clock className="mb-1 text-amber" size={30} />
        <div className="tabular font-display text-4xl font-semibold">15:00</div>
        <Stethoscope className="mt-1 text-white/70" size={18} />
      </motion.div>
    </div>
  )
}

function Chip({ it, i, p }: { it: { txt: string; x: number; y: number; r: number; hand: boolean }; i: number; p: MotionValue<number> }) {
  const k = 0.55 + (i % 3) * 0.12
  const x = useTransform(p, [0, 0.33, 0.66, 1], [it.x * 0.35, it.x * k, it.x * 1.05, it.x * 1.15])
  const y = useTransform(p, [0, 0.33, 0.66, 1], [it.y * 0.35, it.y * k, it.y * 1.0, it.y * 1.1])
  const rot = useTransform(p, [0, 1], [0, it.r * 2])
  const op = useTransform(p, [0, 0.66, 0.9], [1, 1, 0.35])
  return (
    <motion.div style={{ x, y, rotate: rot, opacity: op }} className="absolute left-1/2 top-1/2 -ml-[70px] -mt-[22px] w-[140px] rounded-md bg-[#FBFAF5] px-2.5 py-2 text-center text-[#1B2733] shadow-2xl">
      <div className={it.hand ? 'font-hand text-lg leading-none' : 'font-mono text-[11px]'}>{it.txt}</div>
    </motion.div>
  )
}

/* ---------------- STAKES ---------------- */
export function Stakes() {
  const { t } = useLang()
  const icons = [TestTubes, AlertTriangle, Clock, Plane]
  return (
    <Section id="stakes">
      <Head eyebrow={t.stakes.eyebrow} title={t.stakes.title} />
      <div className="grid gap-4 sm:grid-cols-2">
        {t.stakes.items.map((x, i) => {
          const Icon = icons[i]
          return (
            <Reveal key={x.t} delay={i * 0.08}>
              <div className="glass h-full rounded-3xl p-6">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl border border-white/15 bg-white/10"><Icon size={20} className="text-amber" /></div>
                <h3 className="font-display text-lg font-bold">{x.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{x.d}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
      <Reveal delay={0.2}><p className="mt-8 max-w-3xl border-l-2 border-aqua pl-5 text-base leading-relaxed text-white/90 sm:text-lg">{t.stakes.closing}</p></Reveal>
    </Section>
  )
}

/* ---------------- WHY NOW ---------------- */
export function WhyNow() {
  const { t } = useLang()
  return (
    <Section id="why">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Reveal>
            <div className="eyebrow mb-3">{t.now.eyebrow}</div>
            <h2 className="h2 mb-8">{t.now.title}</h2>
          </Reveal>
          <div className="space-y-5">
            {t.now.p.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className={i === 0 ? 'font-display text-xl font-medium leading-snug text-white sm:text-2xl' : 'text-base leading-relaxed text-white/80 sm:text-[17px]'}>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={0.15} className="lg:pt-24">
          <div className="glass-strong rounded-3xl p-6">
            <div className="mb-6 font-mono text-[10px] uppercase tracking-wider text-muted">{t.now.illustrative}</div>
            <ThenNow label={t.now.thenLabel} text={t.now.thenText} n={120} color="bg-white/30" />
            <div className="h-6" />
            <ThenNow label={t.now.nowLabel} text={t.now.nowText} n={8} color="bg-aqua" />
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

function ThenNow({ label, text, n, color }: { label: string; text: string; n: number; color: string }) {
  return (
    <div>
      <div className="mb-2 font-display text-lg font-bold">{label}</div>
      <div className="mb-3 flex flex-wrap gap-[3px]">
        {Array.from({ length: n }).map((_, i) => (
          <motion.span key={i} className={`h-2.5 w-2.5 rounded-[3px] ${color}`} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.008 }} />
        ))}
      </div>
      <p className="text-sm text-muted">{text}</p>
    </div>
  )
}

/* ---------------- FOUNDER ---------------- */
export function Founder() {
  const { t } = useLang()
  return (
    <Section id="founder">
      <div className="glass-strong relative overflow-hidden rounded-[32px] p-6 sm:p-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-aqua/20 blur-3xl" />
        <div className="grid gap-10 lg:grid-cols-[auto_1fr]">
          <Reveal>
            <div className="relative grid h-28 w-28 place-items-center rounded-[28px] border border-white/20 bg-gradient-to-br from-aqua/40 via-white/10 to-amber/30 font-display text-5xl font-semibold sm:h-36 sm:w-36">S</div>
          </Reveal>
          <div>
            <Reveal>
              <div className="eyebrow mb-3">{t.founder.eyebrow}</div>
              <h2 className="font-display text-2xl font-bold leading-tight sm:text-4xl">{t.founder.title}</h2>
            </Reveal>
            <div className="mt-6 max-w-2xl space-y-4">
              {t.founder.p.map((p, i) => <Reveal key={i} delay={i * 0.06}><p className="text-base leading-relaxed text-white/80">{p}</p></Reveal>)}
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {t.founder.stats.map((s, i) => (
                <Reveal key={s.k} delay={0.1 + i * 0.08}>
                  <div className="h-full rounded-2xl border border-white/15 bg-white/5 p-4">
                    <div className="font-display text-xl font-bold text-aqua">{s.k}</div>
                    <div className="mt-1 text-sm text-muted">{s.v}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ---------------- CAPABILITIES ---------------- */
export function Capabilities() {
  const { t } = useLang()
  const icons = [ScanLine, Wand2, Link2, LineChart, Languages, AlertTriangle]
  return (
    <Section id="capabilities">
      <Head eyebrow={t.caps.eyebrow} title={t.caps.title} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.caps.items.map((x, i) => {
          const Icon = icons[i]
          return (
            <Reveal key={x.t} delay={(i % 3) * 0.08}>
              <div className="glass flex h-full flex-col rounded-3xl p-6 transition hover:-translate-y-1 hover:bg-white/[0.09]">
                <div className="mb-4 rounded-xl border border-amber/25 bg-amber/[0.07] px-3 py-2 text-xs text-amber/90">
                  <span className="font-mono uppercase tracking-wider">{t.caps.problemLabel}:</span> {x.p}
                </div>
                <div className="mb-2 flex items-center gap-2"><Icon size={18} className="text-aqua" /><h3 className="font-display text-base font-bold">{x.t}</h3></div>
                <p className="text-sm leading-relaxed text-muted">{x.d}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

/* ---------------- HOW (pipeline + tech) ---------------- */
export function How() {
  const { t } = useLang()
  const icons = [Camera, ScanLine, Lock, FileSearch, Brain, Link2, ClipboardCheck, FileStack]
  return (
    <Section id="how">
      <Head eyebrow={t.how.eyebrow} title={t.how.title} sub={t.how.sub} />
      <div className="relative">
        <div className="pointer-events-none absolute left-[27px] top-0 h-full w-px bg-gradient-to-b from-aqua/60 via-white/15 to-amber/60 md:left-0 md:top-[27px] md:h-px md:w-full md:bg-gradient-to-r" />
        <motion.div className="pointer-events-none absolute left-[23px] top-0 hidden h-2 w-2 rounded-full bg-aqua shadow-[0_0_14px_4px_rgba(94,230,207,.6)] md:left-0 md:top-[24px] md:block" animate={{ left: ['0%', '100%'] }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }} />
        <ol className="grid gap-4 md:grid-cols-4 md:gap-x-4 md:gap-y-8">
          {t.how.steps.map((s, i) => {
            const Icon = icons[i]
            return (
              <Reveal key={s.t} delay={(i % 4) * 0.08}>
                <li className="relative flex gap-4 md:block">
                  <div className="glass-strong relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl">
                    <Icon size={22} className="text-aqua" />
                    <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-amber font-mono text-[10px] font-bold text-night">{i + 1}</span>
                  </div>
                  <div className="md:mt-4">
                    <h3 className="font-display text-base font-bold">{s.t}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{s.d}</p>
                    <div className="mt-2 inline-block rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-white/75">{s.tech}</div>
                  </div>
                </li>
              </Reveal>
            )
          })}
        </ol>
      </div>
      <div className="mt-12 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="glass h-full rounded-3xl p-6">
            <div className="mb-4 flex items-center gap-2 font-display text-base font-bold"><Workflow size={18} className="text-aqua" />{t.how.stackTitle}</div>
            <div className="flex flex-wrap gap-2">{t.how.stack.map((s) => <span key={s} className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs text-white/85">{s}</span>)}</div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full rounded-3xl border border-dashed border-white/20 p-6">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-wider text-amber">{t.how.futureTitle}</div>
            <p className="text-sm leading-relaxed text-muted">{t.how.future}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

/* ---------------- DOCTORS ---------------- */
export function Doctors() {
  const { t } = useLang()
  const icons = [ClipboardCheck, ShieldCheck, LineChart, Link2, Globe2, Users]
  const bars = [
    { l: t.doctors.today, v: 12, tag: t.doctors.estimate, c: 'from-white/40 to-white/20' },
    { l: t.doctors.withMsi, v: 2, tag: t.doctors.target, c: 'from-aqua to-aqua/60' },
  ]
  return (
    <Section id="doctors">
      <Head eyebrow={t.doctors.eyebrow} title={t.doctors.title} />
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="grid gap-3 sm:grid-cols-2">
          {t.doctors.items.map((x, i) => {
            const Icon = icons[i]
            return (
              <Reveal key={x.t} delay={(i % 2) * 0.08}>
                <div className="glass flex h-full gap-3 rounded-2xl p-4">
                  <Icon size={18} className="mt-0.5 shrink-0 text-aqua" />
                  <div><h3 className="text-sm font-semibold">{x.t}</h3><p className="mt-1 text-sm text-muted">{x.d}</p></div>
                </div>
              </Reveal>
            )
          })}
        </div>
        <Reveal delay={0.1}>
          <div className="glass-strong h-full rounded-3xl p-6">
            <div className="font-display text-base font-bold">{t.doctors.chartTitle}</div>
            <div className="mt-6 space-y-6">
              {bars.map((b) => (
                <div key={b.l}>
                  <div className="mb-2 flex items-baseline justify-between gap-2 text-sm"><span className="text-white/85">{b.l}</span><span className="tabular font-display text-2xl font-bold">{b.v}<span className="ml-1 text-xs font-normal text-muted">{t.doctors.min}</span></span></div>
                  <div className="h-4 overflow-hidden rounded-full bg-white/10">
                    <motion.div className={`h-full rounded-full bg-gradient-to-r ${b.c}`} initial={{ width: 0 }} whileInView={{ width: `${(b.v / 12) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1.1, ease: 'easeOut' }} />
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">{b.tag}</div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs leading-relaxed text-muted">{t.doctors.chartNote}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

/* ---------------- BUSINESS ---------------- */
export function Business() {
  const { t } = useLang()
  const b = t.biz
  const icons = [Stethoscope, FileStack, Plane]
  return (
    <Section id="business">
      <Head eyebrow={b.eyebrow} title={b.title} sub={b.sub} />
      <div className="grid gap-4 md:grid-cols-3">
        {b.streams.map((s, i) => {
          const Icon = icons[i]
          return (
            <Reveal key={s.t} delay={i * 0.08}>
              <div className={`h-full rounded-3xl p-6 ${i === 0 ? 'glass-strong' : 'glass'}`}>
                <Icon size={20} className="mb-4 text-aqua" />
                <div className="text-sm font-semibold text-white/85">{s.t}</div>
                <div className="mt-2 font-display text-2xl font-bold sm:text-3xl">{s.price}</div>
                <div className="font-mono text-[11px] text-amber">{s.unit}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.d}</p>
              </div>
            </Reveal>
          )
        })}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Reveal className="lg:col-span-1">
          <div className="glass h-full rounded-3xl p-6">
            <div className="mb-4 font-display text-base font-bold">{b.loopTitle}</div>
            <Loop steps={b.loop} />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="glass h-full rounded-3xl p-6">
            <div className="mb-4 font-display text-base font-bold">{b.marketTitle}</div>
            <div className="space-y-3">
              {b.market.map((m, i) => (
                <div key={m.k}>
                  <div className="flex items-baseline gap-2"><span className="tabular font-display text-xl font-bold text-white">{m.k}</span></div>
                  <motion.div className="my-1 h-2 rounded-full bg-gradient-to-r from-aqua to-aqua/30" initial={{ width: 0 }} whileInView={{ width: ['100%', '45%', '70%'][i] }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.15 }} />
                  <div className="text-xs text-muted">{m.v}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-white/70">{b.marketNote}</p>
          </div>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="glass h-full rounded-3xl p-6">
            <div className="mb-4 font-display text-base font-bold">{b.costTitle}</div>
            <RangeBars cost={b.cost} price={b.price} />
            <p className="mt-4 text-xs leading-relaxed text-muted">{b.costNote}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

function Loop({ steps }: { steps: string[] }) {
  return (
    <div className="relative">
      <ol className="space-y-2">
        {steps.map((s, i) => (
          <li key={s} className="relative">
            <motion.div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2.5 text-sm text-white/90" initial={{ opacity: 0.2, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-amber/90 font-mono text-[11px] font-bold text-night">{i + 1}</span>
              {s}
            </motion.div>
            {i < steps.length - 1 && <div className="ml-[23px] h-2 w-px bg-aqua/50" />}
          </li>
        ))}
      </ol>
      <div className="mt-3 flex items-center gap-2 font-mono text-[11px] text-aqua">
        <motion.span animate={{ rotate: -360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} className="inline-block">↻</motion.span>
        4 → 1
      </div>
    </div>
  )
}

function RangeBars({ cost, price }: { cost: string; price: string }) {
  const max = 45
  const rows = [
    { l: cost, a: 1.5, b: 6, c: 'bg-white/40' },
    { l: price, a: 15, b: 40, c: 'bg-aqua' },
  ]
  return (
    <div className="space-y-5">
      {rows.map((r) => (
        <div key={r.l}>
          <div className="mb-1.5 flex justify-between text-xs"><span className="text-white/85">{r.l}</span><span className="tabular font-mono text-white">${r.a}–{r.b}</span></div>
          <div className="relative h-3 rounded-full bg-white/10">
            <motion.div className={`absolute top-0 h-3 rounded-full ${r.c}`} style={{ left: `${(r.a / max) * 100}%` }} initial={{ width: 0 }} whileInView={{ width: `${((r.b - r.a) / max) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1 }} />
          </div>
        </div>
      ))}
      <div className="flex justify-between font-mono text-[10px] text-muted"><span>$0</span><span>$15</span><span>$30</span><span>$45</span></div>
    </div>
  )
}

/* ---------------- TRUST ---------------- */
export function Trust() {
  const { t } = useLang()
  const icons = [Link2, BadgeCheck, Stethoscope, Lock]
  return (
    <Section id="trust">
      <Head eyebrow={t.trust.eyebrow} title={t.trust.title} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.trust.items.map((x, i) => {
          const Icon = icons[i]
          return (
            <Reveal key={x.t} delay={i * 0.07}>
              <div className="glass h-full rounded-3xl p-5">
                <Icon size={20} className="mb-3 text-aqua" />
                <h3 className="font-display text-sm font-bold">{x.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{x.d}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

/* ---------------- NEXT ---------------- */
export function Next() {
  const { t } = useLang()
  return (
    <Section id="next">
      <Head eyebrow={t.next.eyebrow} title={t.next.title} />
      <ol className="grid gap-4 md:grid-cols-4">
        {t.next.steps.map((s, i) => (
          <Reveal key={s.k} delay={i * 0.08}>
            <li className={`h-full rounded-3xl p-5 ${i === 0 ? 'glass-strong ring-1 ring-aqua/40' : 'glass'}`}>
              <div className={`font-mono text-[11px] uppercase tracking-wider ${i === 0 ? 'text-aqua' : 'text-amber'}`}>{s.k}</div>
              <div className="mt-2 font-display text-lg font-bold">{s.t}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
            </li>
          </Reveal>
        ))}
      </ol>
      <Reveal delay={0.2}>
        <div className="glass-strong mt-10 flex flex-col items-start justify-between gap-4 rounded-3xl p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="font-display text-xl font-bold sm:text-2xl">{t.next.cta}</div>
          <a href="#demo" className="btn-primary">{t.next.ctaBtn} <ArrowRight size={16} /></a>
        </div>
      </Reveal>
    </Section>
  )
}
