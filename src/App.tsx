import { useEffect, useState } from 'react'
import { LANGS, useLang } from './i18n'
import Demo from './components/Demo'
import { Edge, Explorer, Global, Journey, Platform, Station, Twin } from './components/Vision'
import { Business, Capabilities, Doctors, Founder, Hero, How, NameSection, Next, Problem, Reveal, Section, Stakes, Trust, WhyNow } from './components/Story'

function Aurora() {
  return (
    <div className="aurora pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0F2A36_0%,#07131C_60%)]" />
      <span style={{ width: '46vw', height: '46vw', left: '-10vw', top: '-12vw', background: '#0E7C6B' }} />
      <span style={{ width: '38vw', height: '38vw', right: '-8vw', top: '20vh', background: '#1E5A8C', animationDelay: '-8s' }} />
      <span style={{ width: '30vw', height: '30vw', left: '30vw', bottom: '-12vw', background: '#B7791F', opacity: 0.32, animationDelay: '-15s' }} />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
    </div>
  )
}

function Nav() {
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const extra = { en: ['Platform', 'Treatment map', 'Global'], ru: ['Платформа', 'Карта лечения', 'Глобально'], uz: ['Platforma', 'Davolash xaritasi', 'Global'] }[lang]
  const links: [string, string][] = [['#problem', t.nav.problem], ['#platform', extra[0]], ['#demo', t.nav.demo], ['#explorer', extra[1]], ['#global', extra[2]], ['#founder', t.nav.founder]]
  return (
    <header className="gutter fixed inset-x-0 z-50" style={{ top: 'calc(env(safe-area-inset-top, 0px) + 12px)' }}>
      <nav className={`mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full px-3 py-2 transition ${scrolled ? 'glass-strong' : 'border border-transparent'}`}>
        <a href="#top" className="flex items-center gap-2 pl-1">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-aqua to-teal font-display text-xs font-extrabold text-night">M</span>
          <span className="font-display text-base font-bold">MSi</span>
        </a>
        <div className="hidden items-center gap-0.5 lg:flex">
          {links.map(([h, l]) => <a key={h} href={h} className="rounded-full px-2.5 py-1.5 text-[13px] text-white/75 transition hover:bg-white/10 hover:text-white">{l}</a>)}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-full border border-white/15 bg-white/5 p-0.5">
            {LANGS.map((l) => (
              <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={`rounded-full px-2.5 py-1 font-mono text-[11px] uppercase transition ${lang === l ? 'bg-white text-night' : 'text-white/70 hover:text-white'}`}>{l}</button>
            ))}
          </div>
          <a href="#demo" className="hidden rounded-full bg-aqua px-4 py-2 text-sm font-semibold text-night sm:inline-block">{t.nav.try}</a>
        </div>
      </nav>
    </header>
  )
}

export default function App() {
  const { t } = useLang()
  return (
    <div id="top" className="relative">
      <Aurora />
      <Nav />
      <main>
        <Hero />
        <NameSection />
        <Problem />
        <Journey />
        <Stakes />
        <WhyNow />
        <Founder />
        <Platform />
        <Capabilities />
        <How />
        <Station />
        <Section id="demo">
          <Reveal className="mb-10 max-w-3xl">
            <div className="eyebrow mb-3">{t.demo.eyebrow}</div>
            <h2 className="h2">{t.demo.title}</h2>
            <p className="lead mt-4">{t.demo.sub}</p>
          </Reveal>
          <Demo />
        </Section>
        <Explorer />
        <Twin />
        <Edge />
        <Doctors />
        <Business />
        <Global />
        <Trust />
        <Next />
      </main>
      <footer className="gutter border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 text-xs text-muted sm:flex-row">
          <div><span className="font-display font-bold text-white">MSi</span> · msi.ooou.uz</div>
          <div className="max-w-xl">{t.footer}</div>
        </div>
      </footer>
    </div>
  )
}
