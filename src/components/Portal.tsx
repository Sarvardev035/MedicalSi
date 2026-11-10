// Full-page demo of the MSi clinic portal (synthetic patients, no backend, no AI).
// A doctor opens a record by passport; protected data (hereditary conditions, hepatitis,
// family history) opens only with a one-time code the patient generates in their app.
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { AlertTriangle, ArrowLeft, Check, ChevronRight, FileText, KeyRound, Lock, LogOut, Search, ShieldCheck, Smartphone, Unlock } from 'lucide-react'
import { LANGS, useLang, type Lang } from '../i18n'
import { PATIENTS, type Lab, type Patient } from '../portalData'

const T: Record<Lang, Record<string, string>> = {
  en: {
    back: 'Back to site', demo: 'Demo · synthetic patients', doctor: 'Dr. N. Karimova (demo)', clinic: 'Demo Clinic, Tashkent',
    pass: 'Passport series and number', open: 'Open record', notFound: 'No patient with this passport in the demo.',
    today: 'Patients today', emptyT: 'Open a patient record', empty: 'Enter the patient’s passport, or pick a patient from the list. Demo passports:',
    overview: 'Overview', labs: 'Labs', docs: 'Scanned papers', prot: 'Protected',
    cond: 'Illnesses and procedures', meds: 'Medications', allergy: 'Allergies', vacc: 'Immunity and vaccinations', immLabs: 'Immune markers',
    active: 'active', resolved: 'past', now: 'now', none: 'None recorded', src: 'source',
    test: 'Test', ref: 'Range', trend: 'Trend',
    pages: 'pages', facts: 'facts read', review: 'to review', hand: 'handwritten', read: 'Read by MSi reader',
    lockedT: 'Protected data', locked: 'Hereditary conditions, hepatitis results and family history are hidden. The patient must give a one-time code from their MSi app.',
    cats: 'Hereditary conditions · Hepatitis B/C · Family history · Genetic tests',
    ask: 'Request access from patient', code: 'Patient’s 6-digit code', unlock: 'Unlock', wrong: 'Wrong or expired code.',
    phone: 'Patient’s phone (simulation)', req: 'requests access to your protected data', allow: 'Allow and show code', valid: 'Valid for 5 minutes. Tell this code to the doctor.',
    waiting: 'Waiting for the patient…', hered: 'Hereditary conditions', hep: 'Hepatitis', fam: 'Family history', relock: 'Lock again',
    audit: 'Access log', aOpen: 'Record opened by passport', aReq: 'Access requested from patient', aOk: 'Protected data unlocked with patient code', aLock: 'Protected data locked',
    age: 'y', blood: 'Blood', note: 'Synthetic data. No real patient. Passports in the DM series do not exist.',
  },
  ru: {
    back: 'Назад на сайт', demo: 'Демо · синтетические пациенты', doctor: 'Д-р Н. Каримова (демо)', clinic: 'Демо-клиника, Ташкент',
    pass: 'Серия и номер паспорта', open: 'Открыть карту', notFound: 'В демо нет пациента с таким паспортом.',
    today: 'Пациенты сегодня', emptyT: 'Откройте карту пациента', empty: 'Введите паспорт пациента или выберите из списка. Демо-паспорта:',
    overview: 'Обзор', labs: 'Анализы', docs: 'Сканы бумаг', prot: 'Защищено',
    cond: 'Болезни и операции', meds: 'Лекарства', allergy: 'Аллергии', vacc: 'Иммунитет и прививки', immLabs: 'Иммунные показатели',
    active: 'активно', resolved: 'в прошлом', now: 'сейчас', none: 'Нет записей', src: 'источник',
    test: 'Показатель', ref: 'Норма', trend: 'Динамика',
    pages: 'стр.', facts: 'фактов прочитано', review: 'на проверку', hand: 'рукопись', read: 'Прочитано MSi reader',
    lockedT: 'Защищённые данные', locked: 'Наследственные заболевания, результаты на гепатит и семейный анамнез скрыты. Пациент должен дать одноразовый код из приложения MSi.',
    cats: 'Наследственные заболевания · Гепатит B/C · Семейный анамнез · Генетические тесты',
    ask: 'Запросить доступ у пациента', code: '6-значный код пациента', unlock: 'Открыть', wrong: 'Неверный или просроченный код.',
    phone: 'Телефон пациента (симуляция)', req: 'запрашивает доступ к вашим защищённым данным', allow: 'Разрешить и показать код', valid: 'Действует 5 минут. Сообщите код врачу.',
    waiting: 'Ждём пациента…', hered: 'Наследственные заболевания', hep: 'Гепатит', fam: 'Семейный анамнез', relock: 'Закрыть снова',
    audit: 'Журнал доступа', aOpen: 'Карта открыта по паспорту', aReq: 'Запрошен доступ у пациента', aOk: 'Защищённые данные открыты кодом пациента', aLock: 'Защищённые данные закрыты',
    age: 'л', blood: 'Группа', note: 'Синтетические данные. Реальных пациентов нет. Паспортов серии DM не существует.',
  },
  uz: {
    back: 'Saytga qaytish', demo: 'Demo · sintetik bemorlar', doctor: 'Dr. N. Karimova (demo)', clinic: 'Demo klinika, Toshkent',
    pass: 'Pasport seriyasi va raqami', open: 'Kartani ochish', notFound: 'Demoda bunday pasportli bemor yo‘q.',
    today: 'Bugungi bemorlar', emptyT: 'Bemor kartasini oching', empty: 'Bemor pasportini kiriting yoki ro‘yxatdan tanlang. Demo pasportlar:',
    overview: 'Umumiy', labs: 'Tahlillar', docs: 'Skan qog‘ozlar', prot: 'Maxfiy',
    cond: 'Kasalliklar va operatsiyalar', meds: 'Dorilar', allergy: 'Allergiyalar', vacc: 'Immunitet va emlashlar', immLabs: 'Immun ko‘rsatkichlari',
    active: 'faol', resolved: 'o‘tgan', now: 'hozir', none: 'Yozuv yo‘q', src: 'manba',
    test: 'Ko‘rsatkich', ref: 'Me’yor', trend: 'Dinamika',
    pages: 'bet', facts: 'fakt o‘qildi', review: 'tekshirish kerak', hand: 'qo‘lyozma', read: 'MSi reader o‘qigan',
    lockedT: 'Maxfiy ma’lumotlar', locked: 'Irsiy kasalliklar, gepatit natijalari va oilaviy anamnez yashirilgan. Bemor MSi ilovasidan bir martalik kod berishi kerak.',
    cats: 'Irsiy kasalliklar · Gepatit B/C · Oilaviy anamnez · Genetik testlar',
    ask: 'Bemordan ruxsat so‘rash', code: 'Bemorning 6 xonali kodi', unlock: 'Ochish', wrong: 'Kod noto‘g‘ri yoki muddati o‘tgan.',
    phone: 'Bemor telefoni (simulyatsiya)', req: 'maxfiy ma’lumotlaringizga ruxsat so‘ramoqda', allow: 'Ruxsat berish va kodni ko‘rsatish', valid: '5 daqiqa amal qiladi. Kodni shifokorga ayting.',
    waiting: 'Bemor kutilmoqda…', hered: 'Irsiy kasalliklar', hep: 'Gepatit', fam: 'Oilaviy anamnez', relock: 'Qayta yopish',
    audit: 'Kirish jurnali', aOpen: 'Karta pasport orqali ochildi', aReq: 'Bemordan ruxsat so‘raldi', aOk: 'Maxfiy ma’lumot bemor kodi bilan ochildi', aLock: 'Maxfiy ma’lumot yopildi',
    age: 'yosh', blood: 'Qon', note: 'Sintetik ma’lumot. Haqiqiy bemor yo‘q. DM seriyali pasportlar mavjud emas.',
  },
}

const fmtPass = (p: string) => `${p.slice(0, 2)} ${p.slice(2)}`
const maskPass = (p: string) => `${p.slice(0, 2)} •••••${p.slice(-2)}`
const clock = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

function status(l: Lab, v: number) {
  if (l.hi !== undefined && v > l.hi) return 'high'
  if (l.lo !== undefined && v < l.lo) return 'low'
  return 'ok'
}

function Spark({ lab }: { lab: Lab }) {
  const vs = lab.values.map((x) => x.v)
  const lo = Math.min(...vs, lab.lo ?? Infinity), hi = Math.max(...vs, lab.hi ?? -Infinity)
  const pad = (hi - lo) * 0.15 || 1
  const y = (v: number) => 26 - ((v - (lo - pad)) / (hi - lo + pad * 2)) * 22
  const x = (i: number) => (vs.length === 1 ? 40 : 6 + (i / (vs.length - 1)) * 68)
  return (
    <svg viewBox="0 0 80 30" className="h-7 w-20">
      {lab.lo !== undefined && lab.hi !== undefined && <rect x="0" y={y(lab.hi)} width="80" height={y(lab.lo) - y(lab.hi)} fill="#D7EFE9" />}
      {lab.lo === undefined && lab.hi !== undefined && <line x1="0" x2="80" y1={y(lab.hi)} y2={y(lab.hi)} stroke="#0E7C6B" strokeDasharray="2 2" strokeWidth=".8" />}
      <polyline points={vs.map((v, i) => `${x(i)},${y(v)}`).join(' ')} fill="none" stroke="#14212B" strokeWidth="1.2" />
      {vs.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r="2" fill={status(lab, v) === 'ok' ? '#0E7C6B' : '#C2410C'} />)}
    </svg>
  )
}

function Src({ id }: { id: string }) {
  return <span className="inline-flex items-center gap-0.5 rounded border border-[#1E5A8C]/20 bg-[#1E5A8C]/[0.06] px-1 font-mono text-[10px] text-[#1E5A8C]"><FileText size={9} />{id}</span>
}

function Card({ title, children, right }: { title: string; children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-black/[0.08] bg-white">
      <div className="flex items-center justify-between border-b border-black/[0.06] px-3.5 py-2.5"><h3 className="text-[13px] font-semibold">{title}</h3>{right}</div>
      <div className="p-3.5">{children}</div>
    </section>
  )
}

export default function Portal() {
  const { lang, setLang } = useLang()
  const t = T[lang]
  const [q, setQ] = useState('')
  const [pid, setPid] = useState<string | null>(null)
  const [err, setErr] = useState(false)
  const [tab, setTab] = useState<'overview' | 'labs' | 'docs' | 'prot'>('overview')
  const [docId, setDocId] = useState<string | null>(null)
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set())
  const [request, setRequest] = useState<{ pid: string; code: string | null; until: number } | null>(null)
  const [entered, setEntered] = useState('')
  const [codeErr, setCodeErr] = useState(false)
  const [log, setLog] = useState<{ time: string; pid: string; text: string }[]>([])
  const p = PATIENTS.find((x) => x.id === pid) ?? null
  const add = (pidv: string, text: string) => setLog((l) => [{ time: clock(), pid: pidv, text }, ...l].slice(0, 12))

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const openBy = (pass: string) => {
    const norm = pass.replace(/\s+/g, '').toUpperCase()
    const found = PATIENTS.find((x) => x.passport === norm)
    if (!found) { setErr(true); return }
    setErr(false); setPid(found.id); setTab('overview'); setDocId(null); setEntered(''); setCodeErr(false)
    add(found.id, 'aOpen')
    if (window.innerWidth < 1024) setTimeout(() => document.getElementById('patient')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }

  const askAccess = () => { if (!p) return; setRequest({ pid: p.id, code: null, until: 0 }); setEntered(''); setCodeErr(false); add(p.id, 'aReq') }
  const allow = () => { if (!request) return; setRequest({ ...request, code: String(Math.floor(100000 + Math.random() * 900000)), until: Date.now() + 5 * 60_000 }) }
  const tryUnlock = () => {
    if (!p || !request || request.pid !== p.id || !request.code || Date.now() > request.until || entered !== request.code) { setCodeErr(true); return }
    setUnlocked((s) => new Set(s).add(p.id)); setRequest(null); setEntered(''); setCodeErr(false); add(p.id, 'aOk')
  }
  const relock = () => { if (!p) return; setUnlocked((s) => { const n = new Set(s); n.delete(p.id); return n }); add(p.id, 'aLock') }

  const age = (b: number) => 2026 - b
  const isOpen = p ? unlocked.has(p.id) : false

  return (
    <div className="min-h-screen bg-[#EEF2F1] text-[#14212B] [color-scheme:light]" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
      {/* top bar */}
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#14212B] text-white">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-3 py-2 sm:px-5">
          <a href="#home" className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-2.5 py-1.5 text-xs text-white/85 hover:bg-white/10"><ArrowLeft size={13} />{t.back}</a>
          <div className="flex items-center gap-2"><span className="grid h-6 w-6 place-items-center rounded bg-aqua text-[11px] font-bold text-night">M</span><span className="text-sm font-semibold">MSi Clinic</span><span className="hidden text-xs text-white/50 md:inline">· {t.clinic}</span></div>
          <span className="rounded border border-amber/40 bg-amber/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber">{t.demo}</span>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex rounded-md border border-white/15 p-0.5">
              {LANGS.map((l) => <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={`rounded px-2 py-0.5 font-mono text-[11px] uppercase ${lang === l ? 'bg-white text-[#14212B]' : 'text-white/70'}`}>{l}</button>)}
            </div>
            <span className="hidden items-center gap-2 text-xs text-white/70 sm:flex"><span className="grid h-6 w-6 place-items-center rounded-full bg-white/15 text-[10px]">NK</span>{t.doctor}</span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1400px] gap-4 p-3 sm:p-5 lg:grid-cols-[260px_1fr]">
        {/* left: search + list */}
        <aside className="space-y-4">
          <form onSubmit={(e) => { e.preventDefault(); openBy(q) }} className="rounded-lg border border-black/[0.08] bg-white p-3">
            <label className="text-[11px] font-medium uppercase tracking-wide text-[#6B7A86]" htmlFor="pass">{t.pass}</label>
            <div className="mt-1.5 flex gap-1.5">
              <input id="pass" value={q} onChange={(e) => { setQ(e.target.value); setErr(false) }} placeholder="DM 0000001" className="min-w-0 flex-1 rounded-md border border-black/15 bg-white px-2.5 py-2 font-mono text-sm uppercase outline-none focus:border-teal" />
              <button type="submit" aria-label={t.open} className="grid w-10 place-items-center rounded-md bg-teal text-white"><Search size={15} /></button>
            </div>
            {err && <div className="mt-1.5 text-xs text-flag">{t.notFound}</div>}
          </form>
          <div className="rounded-lg border border-black/[0.08] bg-white">
            <div className="border-b border-black/[0.06] px-3 py-2 text-[11px] font-medium uppercase tracking-wide text-[#6B7A86]">{t.today}</div>
            {PATIENTS.map((x) => (
              <button key={x.id} onClick={() => { setQ(fmtPass(x.passport)); openBy(x.passport) }}
                className={`flex w-full items-center gap-2.5 border-b border-black/[0.05] px-3 py-2.5 text-left last:border-0 ${pid === x.id ? 'bg-teal-soft' : 'hover:bg-[#F3F6F5]'}`}>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#14212B]/[0.07] text-[11px] font-semibold">{x.name.split(' ').map((s) => s[0]).join('')}</span>
                <span className="min-w-0 flex-1"><span className="block text-sm font-medium">{x.name}</span><span className="block font-mono text-[10.5px] text-[#6B7A86]">{maskPass(x.passport)} · {x.sex} · {x.born}</span></span>
                <ChevronRight size={14} className="text-[#9AA7B0]" />
              </button>
            ))}
          </div>
          <p className="px-1 text-[11px] leading-snug text-[#7A8893]">{t.note}</p>
        </aside>

        {/* main */}
        <main id="patient" className="min-w-0 scroll-mt-28">
          {!p ? (
            <div className="grid min-h-[60vh] place-items-center rounded-lg border border-dashed border-black/15 bg-white/60 p-8 text-center">
              <div className="max-w-sm">
                <Search size={28} className="mx-auto text-[#9AA7B0]" />
                <h2 className="mt-3 text-lg font-semibold">{t.emptyT}</h2>
                <p className="mt-1 text-sm text-[#5B6B7C]">{t.empty}</p>
                <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                  {PATIENTS.map((x) => <button key={x.id} onClick={() => { setQ(fmtPass(x.passport)); openBy(x.passport) }} className="rounded border border-black/15 bg-white px-2 py-1 font-mono text-xs hover:border-teal">{fmtPass(x.passport)}</button>)}
                </div>
              </div>
            </div>
          ) : (
            <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="space-y-3">
              {/* patient header */}
              <div className="rounded-lg border border-black/[0.08] bg-white p-3.5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-teal-soft text-sm font-semibold text-teal-2">{p.name.split(' ').map((s) => s[0]).join('')}</span>
                    <div>
                      <h2 className="text-lg font-semibold leading-tight">{p.name} <span className="text-sm font-normal text-[#6B7A86]">· {p.sex} · {p.born} ({age(p.born)} {t.age})</span></h2>
                      <div className="mt-0.5 flex flex-wrap gap-x-3 font-mono text-[11px] text-[#6B7A86]"><span>{p.id}</span><span>{maskPass(p.passport)}</span><span>{t.blood}: {p.blood}</span></div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {p.alerts.map((a, i) => <span key={i} className="inline-flex items-center gap-1 rounded border border-[#C2410C]/25 bg-flagsoft px-1.5 py-0.5 text-[11px] text-flag"><AlertTriangle size={11} />{a[lang]}</span>)}
                  </div>
                </div>
                <nav className="-mb-3.5 mt-3 flex gap-1 overflow-x-auto border-t border-black/[0.06] pt-1">
                  {([['overview', t.overview], ['labs', t.labs], ['docs', t.docs], ['prot', t.prot]] as const).map(([k, l]) => (
                    <button key={k} onClick={() => setTab(k)} aria-pressed={tab === k}
                      className={`flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2.5 text-[13px] ${tab === k ? 'border-teal font-semibold text-[#14212B]' : 'border-transparent text-[#5B6B7C] hover:text-[#14212B]'}`}>
                      {k === 'prot' && (isOpen ? <Unlock size={13} className="text-teal" /> : <Lock size={13} />)}{l}
                    </button>
                  ))}
                </nav>
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}>
                  {tab === 'overview' && <Overview p={p} t={t} lang={lang} />}
                  {tab === 'labs' && <Labs p={p} t={t} lang={lang} />}
                  {tab === 'docs' && <Docs p={p} t={t} lang={lang} docId={docId} setDocId={setDocId} />}
                  {tab === 'prot' && (
                    isOpen ? <Protected p={p} t={t} lang={lang} relock={relock} /> : (
                      <div className="grid gap-3 lg:grid-cols-[1fr_300px]">
                        <div className="rounded-lg border border-black/[0.08] bg-white p-5">
                          <div className="flex items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#14212B] text-white"><Lock size={16} /></span><h3 className="font-semibold">{t.lockedT}</h3></div>
                          <p className="mt-3 max-w-lg text-sm text-[#4B5A66]">{t.locked}</p>
                          <div className="mt-3 select-none rounded-md border border-black/[0.06] bg-[#F3F6F5] p-3 text-sm text-[#4B5A66] blur-[3px]" aria-hidden>{t.cats}<br />████████ ██████ ███ ██████████</div>
                          {!request || request.pid !== p.id ? (
                            <button onClick={askAccess} className="mt-4 inline-flex items-center gap-2 rounded-md bg-teal px-4 py-2.5 text-sm font-semibold text-white"><KeyRound size={15} />{t.ask}</button>
                          ) : (
                            <form onSubmit={(e) => { e.preventDefault(); tryUnlock() }} className="mt-4">
                              <label htmlFor="code" className="text-xs font-medium text-[#5B6B7C]">{t.code}</label>
                              <div className="mt-1 flex max-w-xs gap-2">
                                <input id="code" inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={entered} onChange={(e) => { setEntered(e.target.value.replace(/\D/g, '')); setCodeErr(false) }}
                                  className="w-36 rounded-md border border-black/15 bg-white px-3 py-2 text-center font-mono text-lg tracking-[0.3em] outline-none focus:border-teal" placeholder="••••••" />
                                <button type="submit" className="rounded-md bg-teal px-4 text-sm font-semibold text-white">{t.unlock}</button>
                              </div>
                              {codeErr && <div className="mt-1.5 text-xs text-flag">{t.wrong}</div>}
                            </form>
                          )}
                        </div>
                        <PhoneSim t={t} p={p} request={request && request.pid === p.id ? request : null} allow={allow} />
                      </div>
                    )
                  )}
                </motion.div>
              </AnimatePresence>

              {/* audit log */}
              <div className="rounded-lg border border-black/[0.08] bg-white">
                <div className="flex items-center gap-1.5 border-b border-black/[0.06] px-3.5 py-2 text-[12px] font-semibold"><ShieldCheck size={13} className="text-teal" />{t.audit}</div>
                <ul className="divide-y divide-black/[0.05] text-[12px]">
                  {log.filter((l) => l.pid === p.id).slice(0, 5).map((l, i) => (
                    <li key={i} className="flex gap-3 px-3.5 py-1.5"><span className="font-mono text-[#7A8893]">{l.time}</span><span className="text-[#4B5A66]">{t.doctor} · {t[l.text]}</span></li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  )
}

type P = { p: Patient; t: Record<string, string>; lang: Lang }

function Overview({ p, t, lang }: P) {
  const imm = p.labs.filter((l) => l.panel.en === 'Immunity')
  return (
    <div className="grid gap-3 xl:grid-cols-2">
      <Card title={t.cond}>
        <ol className="relative space-y-3 border-l border-black/10 pl-4">
          {p.conditions.map((c, i) => (
            <li key={i} className="relative">
              <span className={`absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full border-2 border-white ${c.status === 'active' ? 'bg-flag' : 'bg-[#9AA7B0]'}`} />
              <div className="flex flex-wrap items-center gap-2 text-sm"><span className="font-mono text-xs text-[#6B7A86]">{c.y}</span><span className="font-medium">{c.name[lang]}</span>
                <span className={`rounded px-1.5 text-[10px] ${c.status === 'active' ? 'bg-flagsoft text-flag' : 'bg-[#EEF2F1] text-[#5B6B7C]'}`}>{t[c.status]}</span><Src id={c.src} /></div>
            </li>
          ))}
        </ol>
      </Card>
      <Card title={t.meds}>
        <ul className="space-y-2">
          {p.meds.map((m, i) => {
            const cur = !m.to
            return (
              <li key={i} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <span><span className={`font-medium ${cur ? '' : 'text-[#5B6B7C]'}`}>{m.name}</span> <span className="text-[#5B6B7C]">{m.dose[lang]}</span></span>
                <span className="flex items-center gap-2 font-mono text-[11px] text-[#6B7A86]">{m.from} → {m.to ?? <b className="text-teal">{t.now}</b>}<Src id={m.src} /></span>
              </li>
            )
          })}
        </ul>
      </Card>
      <Card title={t.allergy}>
        {p.allergies.length ? (
          <ul className="space-y-2">
            {p.allergies.map((a, i) => (
              <li key={i} className={`flex flex-wrap items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm ${a.conflict ? 'bg-flagsoft' : ''}`}>
                <span><span className={`font-medium ${a.conflict ? 'text-flag' : ''}`}>{a.name[lang]}</span> <span className="text-[#5B6B7C]">{a.note[lang]}</span></span><Src id={a.src} />
              </li>
            ))}
          </ul>
        ) : <p className="text-sm text-[#6B7A86]">{t.none}</p>}
      </Card>
      <Card title={t.vacc}>
        <ul className="space-y-1.5">
          {p.vaccines.map((v, i) => (
            <li key={i} className="flex items-center justify-between gap-2 text-sm">
              <span className="flex items-center gap-1.5">{v.src === '—' ? <AlertTriangle size={12} className="text-[#B7791F]" /> : <Check size={12} className="text-teal" />}{v.name[lang]}</span>
              <span className="flex items-center gap-2 font-mono text-[11px] text-[#6B7A86]">{v.src === '—' ? t.none : v.date}{v.src !== '—' && <Src id={v.src} />}</span>
            </li>
          ))}
        </ul>
        {!!imm.length && (
          <div className="mt-3 border-t border-black/[0.06] pt-2.5">
            <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-[#6B7A86]">{t.immLabs}</div>
            {imm.map((l, i) => {
              const last = l.values[l.values.length - 1], st = status(l, last.v)
              return <div key={i} className="flex items-center justify-between text-sm"><span>{l.test[lang]}</span><span className="flex items-center gap-2"><Spark lab={l} /><span className={`font-mono tabular ${st === 'ok' ? '' : 'text-flag'}`}>{last.v} {l.unit}</span></span></div>
            })}
          </div>
        )}
      </Card>
    </div>
  )
}

function Labs({ p, t, lang }: P) {
  const dates = useMemo(() => [...new Set(p.labs.flatMap((l) => l.values.map((v) => v.date)))].sort(), [p])
  return (
    <div className="overflow-x-auto rounded-lg border border-black/[0.08] bg-white">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-black/[0.08] bg-[#F3F6F5] text-left text-[11px] uppercase tracking-wide text-[#6B7A86]">
            <th className="px-3 py-2 font-medium">{t.test}</th>
            {dates.map((d) => <th key={d} className="px-3 py-2 text-right font-mono font-medium">{d}</th>)}
            <th className="px-3 py-2 font-medium">{t.ref}</th><th className="px-3 py-2 font-medium">{t.trend}</th>
          </tr>
        </thead>
        <tbody>
          {p.labs.map((l, i) => (
            <tr key={i} className="border-b border-black/[0.05]">
              <td className="px-3 py-2"><div className="font-medium">{l.test[lang]}</div><div className="text-[11px] text-[#7A8893]">{l.panel[lang]} · {l.unit}</div></td>
              {dates.map((d) => {
                const v = l.values.find((x) => x.date === d)
                if (!v) return <td key={d} className="px-3 py-2 text-right text-[#C0C8CE]">—</td>
                const st = status(l, v.v)
                return <td key={d} className="px-3 py-2 text-right"><span className={`font-mono tabular ${st === 'ok' ? '' : 'font-semibold text-flag'}`}>{v.v}{st === 'high' ? ' ↑' : st === 'low' ? ' ↓' : ''}</span><div><Src id={v.src} /></div></td>
              })}
              <td className="px-3 py-2 font-mono text-xs text-[#5B6B7C]">{l.ref}</td>
              <td className="px-3 py-2"><Spark lab={l} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Docs({ p, t, lang, docId, setDocId }: P & { docId: string | null; setDocId: (s: string) => void }) {
  const d = p.docs.find((x) => x.id === docId) ?? p.docs[0]
  return (
    <div className="grid gap-3 lg:grid-cols-[1fr_1.1fr]">
      <ul className="divide-y divide-black/[0.06] overflow-hidden rounded-lg border border-black/[0.08] bg-white">
        {p.docs.map((x) => (
          <li key={x.id}>
            <button onClick={() => setDocId(x.id)} className={`flex w-full items-center gap-3 px-3.5 py-3 text-left ${d.id === x.id ? 'bg-teal-soft' : 'hover:bg-[#F3F6F5]'}`}>
              <span className="grid h-10 w-8 shrink-0 place-items-center rounded-sm border border-black/10 bg-[#FBFAF5] font-mono text-[10px]">{x.id}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">{x.type[lang]} <span className="font-normal text-[#6B7A86]">· {x.facility}</span></span>
                <span className="block font-mono text-[10.5px] text-[#6B7A86]">{x.date} · {x.lang} · {x.pages} {t.pages}{x.hand ? ` · ${t.hand}` : ''}</span>
              </span>
              <span className="text-right text-[11px]"><span className="block text-teal">{x.facts} {t.facts}</span>{x.review > 0 && <span className="block text-[#B7791F]">{x.review} {t.review}</span>}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="rounded-lg border border-black/[0.08] bg-white p-3.5">
        <div className="mb-2 flex items-center justify-between text-xs text-[#6B7A86]"><span>{d.id} · p.1</span><span className="flex items-center gap-1 text-teal"><Check size={12} />{t.read}</span></div>
        <div className="paper-grain rotate-[-0.4deg] rounded-sm border border-black/10 bg-[#FBFAF5] p-4 shadow-sm">
          <div className="mb-2 flex justify-between border-b border-[#1B2733]/20 pb-1.5 font-mono text-[11px] text-[#1B2733]"><span>{d.facility.toUpperCase()} (SYNTHETIC)</span><span>{d.date}</span></div>
          <div className={`space-y-1.5 ${d.hand ? 'font-hand text-[17px]' : 'font-mono text-[12px]'} text-[#1B2733]`}>
            {d.lines.map((l, i) => <div key={i} className={l.mark ? 'rounded-sm bg-[#FFE15A]/60 px-1' : 'px-1'}>{l.t}</div>)}
            {[60, 80, 45].map((w, i) => <div key={i} className="mx-1 h-[3px] rounded bg-[#1B2733]/15" style={{ width: `${w}%` }} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

function Protected({ p, t, lang, relock }: P & { relock: () => void }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between rounded-lg border border-teal/30 bg-teal-soft px-3.5 py-2 text-sm text-teal-2">
        <span className="flex items-center gap-2"><Unlock size={14} />{t.aOk}</span>
        <button onClick={relock} className="inline-flex items-center gap-1 rounded border border-teal/40 px-2 py-1 text-xs"><LogOut size={12} />{t.relock}</button>
      </div>
      <div className="grid gap-3 xl:grid-cols-3">
        <Card title={t.hered}>
          <ul className="space-y-2">{p.protected.hereditary.map((h, i) => <li key={i} className="text-sm"><div className="flex items-center gap-2 font-medium">{h.name[lang]}<Src id={h.src} /></div><p className="mt-0.5 text-[#5B6B7C]">{h.detail[lang]}</p></li>)}</ul>
        </Card>
        <Card title={t.hep}>
          <ul className="space-y-2.5">{p.protected.hepatitis.map((h, i) => (
            <li key={i} className="text-sm"><div className="flex items-center justify-between gap-2"><span className="font-mono text-xs font-semibold">{h.test}</span><span className="flex items-center gap-1 font-mono text-[10px] text-[#6B7A86]">{h.date}<Src id={h.src} /></span></div><div className={h.positive ? 'font-semibold text-flag' : 'text-[#4B5A66]'}>{h.result[lang]}</div></li>
          ))}</ul>
        </Card>
        <Card title={t.fam}>
          <ul className="list-inside list-disc space-y-1 text-sm">{p.protected.family.map((f, i) => <li key={i}>{f[lang]}</li>)}</ul>
        </Card>
      </div>
    </div>
  )
}

function PhoneSim({ t, p, request, allow }: { t: Record<string, string>; p: Patient; request: { code: string | null } | null; allow: () => void }) {
  return (
    <div className="mx-auto w-full max-w-[300px]">
      <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-[#6B7A86]"><Smartphone size={12} />{t.phone}</div>
      <div className="rounded-[28px] border-[6px] border-[#14212B] bg-[#0F171E] p-3 text-white shadow-lg">
        <div className="mx-auto mb-3 h-1 w-14 rounded-full bg-white/20" />
        <div className="mb-3 flex items-center gap-2"><span className="grid h-6 w-6 place-items-center rounded bg-aqua text-[10px] font-bold text-night">M</span><span className="text-sm font-semibold">MSi</span><span className="ml-auto text-[10px] text-white/50">{p.name}</span></div>
        {!request ? (
          <div className="grid h-40 place-items-center text-center text-xs text-white/50">{t.waiting}</div>
        ) : !request.code ? (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-white/[0.07] p-3">
            <div className="flex items-center gap-1.5 text-[11px] text-amber"><KeyRound size={12} />Access request</div>
            <p className="mt-1.5 text-sm"><b>{t.doctor}</b> {t.req}</p>
            <button onClick={allow} className="mt-3 w-full rounded-lg bg-aqua py-2 text-sm font-semibold text-night">{t.allow}</button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="rounded-xl bg-white/[0.07] p-3 text-center">
            <div className="font-mono text-3xl font-semibold tracking-[0.25em] text-aqua">{request.code}</div>
            <p className="mt-2 text-[11px] text-white/60">{t.valid}</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
