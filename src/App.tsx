import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Menu, X } from 'lucide-react'
import { LANGS, useLang } from './i18n'
import Demo from './components/Demo'
import { Lessons, Lifeline, Roadmap } from './components/Future'
import { UploadSoon } from './components/UploadSoon'
import { Edge, Explorer, Global, Journey, Platform, Station, Twin } from './components/Vision'
import { Business, Capabilities, Doctors, Founder, Hero, How, NameSection, Next, Problem, Reveal, Section, Stakes, Trust, WhyNow } from './components/Story'

function Aurora() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      <div className="absolute inset-0 bg-night" />
      <div className="absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(86,199,179,0.09),transparent)]" />
    </div>
  )
}

type Page = 'home' | 'product' | 'treatment' | 'why-msi' | 'business' | 'team'
const PAGES: Exclude<Page, 'home'>[] = ['product', 'treatment', 'why-msi', 'business', 'team']

const PAGE_TEXT = {
  en: {
    product: ['Product', 'How MSi works: the platform, the pipeline and the clinic scanning station.'],
    treatment: ['Treatment map', 'Where to treat, global case lessons, the personal medical lifeline and the digital twin concept.'],
    'why-msi': ['Why MSi', 'The problem up close, why it matters, and how MSi compares.'],
    business: ['Business', 'Business model, global plan and next steps.'],
    team: ['Team', 'Who is building MSi, and why now.'],
    more: 'Explore MSi', back: 'Home', open: 'Open',
  },
  ru: {
    product: ['Продукт', 'Как работает MSi: платформа, конвейер и станция сканирования.'],
    treatment: ['Карта лечения', 'Где лечиться, мировой опыт, медицинская история жизни и концепт цифрового двойника.'],
    'why-msi': ['Почему MSi', 'Проблема вблизи, почему это важно и сравнение с другими.'],
    business: ['Бизнес', 'Бизнес-модель, глобальный план и следующие шаги.'],
    team: ['Команда', 'Кто строит MSi и почему сейчас.'],
    more: 'Узнать больше', back: 'Главная', open: 'Открыть',
  },
  uz: {
    product: ['Mahsulot', "MSi qanday ishlaydi: platforma, konveyer va skanerlash stansiyasi."],
    treatment: ['Davolash xaritasi', "Qayerda davolanish, global tajriba, umrbod tibbiy tarix va Digital Twin konsepti."],
    'why-msi': ['Nega MSi', "Muammo yaqindan, nega muhim va boshqalar bilan taqqoslash."],
    business: ['Biznes', "Biznes model, global reja va keyingi qadamlar."],
    team: ['Jamoa', "MSi ni kim quryapti va nega aynan hozir."],
    more: "Batafsil", back: 'Bosh sahifa', open: 'Ochish',
  },
}

function usePage(): Page {
  const read = (): Page | null => {
    const h = window.location.hash.replace('#', '')
    if ((PAGES as string[]).includes(h)) return h as Page
    // section anchors that only exist on home (e.g. #demo) switch back to home
    if (h === 'demo' || h === 'home' || h === 'top' || h === '') return 'home'
    return null
  }
  const [page, setPage] = useState<Page>(() => read() ?? 'home')
  useEffect(() => {
    const on = () => {
      const h = window.location.hash.replace('#', '')
      const next = read()
      let changed = false
      setPage((prev) => {
        const target = next ?? prev
        if (prev !== target) { changed = true; window.scrollTo({ top: 0, behavior: 'auto' }) }
        return target
      })
      if (h && !(PAGES as string[]).includes(h) && h !== 'home') setTimeout(() => document.getElementById(h)?.scrollIntoView({ behavior: changed ? 'auto' : 'smooth' }), changed ? 250 : 60)
    }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return page
}

function Nav({ page }: { page: Page }) {
  const { lang, setLang, t } = useLang()
  const P = PAGE_TEXT[lang]
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => setOpen(false), [page])
  return (
    <header className="gutter fixed inset-x-0 z-50" style={{ top: 'calc(env(safe-area-inset-top, 0px) + 12px)' }}>
      <nav className={`mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full px-3 py-2 transition ${scrolled || open ? 'glass-strong' : 'border border-transparent'}`}>
        <a href="#home" className="flex items-center gap-2 pl-1">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-aqua font-display text-xs font-semibold text-night">M</span>
          <span className="font-display text-base font-bold">MSi</span>
        </a>
        <div className="hidden items-center gap-0.5 lg:flex">
          {PAGES.map((p) => (
            <a key={p} href={`#${p}`} aria-current={page === p ? 'page' : undefined} className={`rounded-full px-3 py-1.5 text-[13px] transition ${page === p ? 'bg-white/15 text-white' : 'text-white/75 hover:bg-white/10 hover:text-white'}`}>{P[p][0]}</a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-full border border-white/15 bg-white/5 p-0.5">
            {LANGS.map((l) => (
              <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={`rounded-full px-2.5 py-1 font-mono text-[11px] uppercase transition ${lang === l ? 'bg-white text-night' : 'text-white/70 hover:text-white'}`}>{l}</button>
            ))}
          </div>
          <a href="#demo" className="hidden rounded-full bg-aqua px-4 py-2 text-sm font-semibold text-night sm:inline-block">{t.nav.try}</a>
          <button onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open} className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 lg:hidden">{open ? <X size={16} /> : <Menu size={16} />}</button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="glass-strong mx-auto mt-2 max-w-6xl rounded-3xl p-2 lg:hidden">
            {PAGES.map((p) => (
              <a key={p} href={`#${p}`} className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm ${page === p ? 'bg-white/10 text-white' : 'text-white/85'}`}>{P[p][0]}<ArrowRight size={14} className="text-aqua" /></a>
            ))}
            <a href="#demo" className="mt-1 flex items-center justify-center rounded-2xl bg-aqua px-4 py-3 text-sm font-semibold text-night">{t.nav.try}</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function PageHead({ page }: { page: Exclude<Page, 'home'> }) {
  const { lang } = useLang()
  const P = PAGE_TEXT[lang]
  return (
    <section className="gutter relative pb-4 pt-32 sm:pt-40">
      <div className="mx-auto max-w-6xl">
        <a href="#home" className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10"><ArrowLeft size={13} />{P.back}</a>
        <motion.h1 key={page} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">{P[page][0]}</motion.h1>
        <p className="lead mt-4 max-w-2xl">{P[page][1]}</p>
      </div>
    </section>
  )
}

function MoreLinks({ except }: { except?: Page }) {
  const { lang } = useLang()
  const P = PAGE_TEXT[lang]
  return (
    <Section id="more">
      <div className="eyebrow mb-4">{P.more}</div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {PAGES.filter((p) => p !== except).map((p, i) => (
          <Reveal key={p} delay={i * 0.05}>
            <a href={`#${p}`} className="glass group flex h-full flex-col justify-between gap-4 rounded-3xl p-5 transition hover:-translate-y-1 hover:bg-white/[0.09]">
              <div>
                <div className="font-display text-lg font-bold">{P[p][0]}</div>
                <p className="mt-1 text-xs leading-relaxed text-muted">{P[p][1]}</p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-aqua">{P.open}<ArrowRight size={13} className="transition group-hover:translate-x-1" /></span>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function DemoSection() {
  const { t } = useLang()
  return (
    <Section id="demo">
      <Reveal className="mb-10 max-w-3xl">
        <div className="eyebrow mb-3">{t.demo.eyebrow}</div>
        <h2 className="h2">{t.demo.title}</h2>
        <p className="lead mt-4">{t.demo.sub}</p>
      </Reveal>
      <Demo />
    </Section>
  )
}

export default function App() {
  const { t } = useLang()
  const page = usePage()
  return (
    <div id="top" className="relative">
      <Aurora />
      <Nav page={page} />
      <main key={page}>
        {page === 'home' && (<><Hero /><Problem /><Capabilities /><Roadmap /><DemoSection /><UploadSoon /><MoreLinks /><Next /></>)}
        {page === 'product' && (<><PageHead page="product" /><Platform /><How /><Station /><MoreLinks except="product" /></>)}
        {page === 'treatment' && (<><PageHead page="treatment" /><Explorer /><Lessons /><Lifeline /><Twin /><MoreLinks except="treatment" /></>)}
        {page === 'why-msi' && (<><PageHead page="why-msi" /><Journey /><Stakes /><Edge /><Doctors /><Trust /><MoreLinks except="why-msi" /></>)}
        {page === 'business' && (<><PageHead page="business" /><Business /><Global /><Next /><MoreLinks except="business" /></>)}
        {page === 'team' && (<><PageHead page="team" /><Founder /><WhyNow /><NameSection /><MoreLinks except="team" /></>)}
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
