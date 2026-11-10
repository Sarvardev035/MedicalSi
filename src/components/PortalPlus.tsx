// Extra doctor-portal views: Similar cases (per patient), Trends (clinic network) and the
// Doctors network (search specialists worldwide, message them inside MSi).
// Everything here is a demo: synthetic numbers, fictional doctor profiles, simulated replies, no AI.
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { BookOpen, Building2, Lock, MapPin, MessageSquare, Paperclip, Search, Send, Users, X } from 'lucide-react'
import type { Lang } from '../i18n'
import type { Patient } from '../portalData'
import { COHORTS, DOCTORS, HOSPITALS, MONTHS, SPECS, SPEC_WORDS, TRENDS, series, type Doctor, type Spec, type Trend } from '../insightsData'

const T: Record<Lang, Record<string, string>> = {
  en: {
    demoNums: 'Demo network · synthetic numbers', simIntro: 'Patients across the network whose records match this one, what they were treated with, and how it went. Built from de-identified records. A reference for the doctor, not a recommendation.',
    built: 'Cohort built from this record', patients: 'patients', inClinics: 'clinics', goal: 'Goal', treatment: 'Treatment', n: 'Patients', reached: 'Reached goal', side: 'Side effects',
    check: 'Check against', notAdvice: 'The doctor decides. MSi shows what happened to similar patients; it does not choose a treatment.',
    lockedMore: 'more cohort uses protected data (hereditary or hepatitis). It appears after the patient unlocks it.', openProt: 'Open Protected tab',
    trendsT: 'Illness trends in the demo network', trendsSub: '14 demo clinics in Tashkent · new cases per month · Dec 2024 to Nov 2026',
    yoy: 'vs previous 12 months', perMonth: 'cases / month now', factors: 'Commonly recorded with it', assoc: 'How often this was written in the records of these patients. It shows association, not cause.',
    women: 'women', ages: 'most common ages', pattern: 'Pattern',
    netT: 'Doctors network', netSub: 'Find specialists in leading hospitals worldwide and in Uzbekistan, and message them inside MSi.',
    searchPh: 'Search: cardiologist, liver, thalassaemia…', all: 'All', country: 'Country', anyCountry: 'All countries',
    hospitals: 'hospitals', doctors: 'doctors', message: 'Message', nothing: 'Nothing found. Try another word or specialty.',
    listing: 'Hospitals are real public institutions shown as examples, not partners. Doctor profiles are fictional. Real contacts appear only after a doctor joins and is verified.',
    chatPh: 'Write a message…', attach: 'Attach de-identified case', attached: 'De-identified case', noName: 'no name, no passport', sim: 'simulated reply',
    replyA: 'Thank you, I have received it. Please also attach the latest labs and any imaging reports, and I will review them. You can book a video consult from my profile.',
    replyB: 'Thanks for the case. In patients like this I would first confirm the result with a repeat test. Happy to discuss on a short call.',
    years: 'yrs', close: 'Close', you: 'You', start: 'Start the conversation. Messages stay inside MSi and are logged.',
  },
  ru: {
    demoNums: 'Демо-сеть · синтетические цифры', simIntro: 'Пациенты сети с похожей картой: как их лечили и что получилось. Строится по обезличенным картам. Справка для врача, а не рекомендация.',
    built: 'Когорта по данным этой карты', patients: 'пациентов', inClinics: 'клиник', goal: 'Цель', treatment: 'Лечение', n: 'Пациенты', reached: 'Достигли цели', side: 'Побочные',
    check: 'Сверить с', notAdvice: 'Решает врач. MSi показывает, что было с похожими пациентами, и не выбирает лечение.',
    lockedMore: 'когорта использует защищённые данные (наследственность или гепатит). Появится после разрешения пациента.', openProt: 'Открыть вкладку «Защищено»',
    trendsT: 'Тренды заболеваний в демо-сети', trendsSub: '14 демо-клиник Ташкента · новые случаи в месяц · дек 2024 – ноя 2026',
    yoy: 'к прошлым 12 месяцам', perMonth: 'случаев / мес сейчас', factors: 'Часто записано вместе', assoc: 'Как часто это записано в картах этих пациентов. Это связь, а не причина.',
    women: 'женщины', ages: 'частый возраст', pattern: 'Картина',
    netT: 'Сеть врачей', netSub: 'Найдите специалистов ведущих клиник мира и Узбекистана и напишите им внутри MSi.',
    searchPh: 'Поиск: кардиолог, печень, талассемия…', all: 'Все', country: 'Страна', anyCountry: 'Все страны',
    hospitals: 'клиник', doctors: 'врачей', message: 'Написать', nothing: 'Ничего не найдено. Попробуйте другое слово.',
    listing: 'Клиники — реальные публичные учреждения как пример, не партнёры. Профили врачей вымышлены. Реальные контакты появятся после того, как врач присоединится и пройдёт проверку.',
    chatPh: 'Напишите сообщение…', attach: 'Прикрепить обезличенный случай', attached: 'Обезличенный случай', noName: 'без имени и паспорта', sim: 'симулированный ответ',
    replyA: 'Спасибо, получил. Приложите, пожалуйста, последние анализы и заключения исследований, я посмотрю. Видеоконсультацию можно записать в моём профиле.',
    replyB: 'Спасибо за случай. В таких случаях я бы сначала подтвердил результат повторным тестом. Готов обсудить коротким звонком.',
    years: 'лет', close: 'Закрыть', you: 'Вы', start: 'Начните переписку. Сообщения остаются внутри MSi и попадают в журнал.',
  },
  uz: {
    demoNums: 'Demo tarmoq · sintetik raqamlar', simIntro: 'Tarmoqdagi shu kartaga o‘xshash bemorlar: qanday davolangan va natija qanday bo‘lgan. Shaxssizlantirilgan kartalardan tuziladi. Shifokor uchun ma’lumot, tavsiya emas.',
    built: 'Shu karta asosida tuzilgan guruh', patients: 'bemor', inClinics: 'klinika', goal: 'Maqsad', treatment: 'Davolash', n: 'Bemorlar', reached: 'Maqsadga yetgan', side: 'Nojo‘ya ta’sir',
    check: 'Solishtiring', notAdvice: 'Shifokor qaror qiladi. MSi o‘xshash bemorlarda nima bo‘lganini ko‘rsatadi, davolashni tanlamaydi.',
    lockedMore: 'guruh maxfiy ma’lumotdan foydalanadi (irsiy yoki gepatit). Bemor ruxsat bergandan keyin chiqadi.', openProt: '“Maxfiy” bo‘limini ochish',
    trendsT: 'Demo tarmoqda kasallik trendlari', trendsSub: 'Toshkentdagi 14 demo klinika · oyiga yangi holatlar · 2024-dek – 2026-noy',
    yoy: 'oldingi 12 oyga nisbatan', perMonth: 'holat / oy hozir', factors: 'Ko‘pincha birga yozilgan', assoc: 'Bu bemorlar kartasida qanchalik tez-tez yozilgani. Bu bog‘liqlik, sabab emas.',
    women: 'ayollar', ages: 'ko‘p uchraydigan yosh', pattern: 'Ko‘rinish',
    netT: 'Shifokorlar tarmog‘i', netSub: 'Dunyo va O‘zbekistondagi yetakchi shifoxonalar mutaxassislarini toping va ularga MSi ichida yozing.',
    searchPh: 'Qidiruv: kardiolog, jigar, talassemiya…', all: 'Hammasi', country: 'Davlat', anyCountry: 'Barcha davlatlar',
    hospitals: 'shifoxona', doctors: 'shifokor', message: 'Yozish', nothing: 'Hech narsa topilmadi. Boshqa so‘z bilan urinib ko‘ring.',
    listing: 'Shifoxonalar namuna sifatida ko‘rsatilgan haqiqiy ochiq muassasalar, hamkor emas. Shifokor profillari to‘qima. Haqiqiy kontaktlar shifokor qo‘shilib, tasdiqlangandan keyin chiqadi.',
    chatPh: 'Xabar yozing…', attach: 'Shaxssiz holatni biriktirish', attached: 'Shaxssiz holat', noName: 'ismsiz, pasportsiz', sim: 'simulyatsiya javobi',
    replyA: 'Rahmat, qabul qildim. Iltimos, oxirgi tahlillar va tekshiruv xulosalarini ham biriktiring, ko‘rib chiqaman. Video konsultatsiyani profilimdan band qilishingiz mumkin.',
    replyB: 'Holat uchun rahmat. Bunday hollarda avval natijani qayta test bilan tasdiqlagan bo‘lardim. Qisqa qo‘ng‘iroqda muhokama qilishga tayyorman.',
    years: 'yil', close: 'Yopish', you: 'Siz', start: 'Yozishmani boshlang. Xabarlar MSi ichida qoladi va jurnalga yoziladi.',
  },
}

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded border border-[#B7791F]/30 bg-[#FDF3E1] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#8A5A12]">{children}</span>
)

function Bar({ pct, tone = 'teal' }: { pct: number; tone?: 'teal' | 'flag' | 'ink' }) {
  const c = tone === 'teal' ? 'bg-teal' : tone === 'flag' ? 'bg-flag' : 'bg-[#14212B]/60'
  return (
    <div className="h-2 w-full rounded-full bg-[#E6ECEA]">
      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.5, ease: 'easeOut' }} className={`h-2 rounded-full ${c}`} />
    </div>
  )
}

// ---------------- Similar cases ----------------
export function Similar({ p, lang, unlocked, goProt }: { p: Patient; lang: Lang; unlocked: boolean; goProt: () => void }) {
  const t = T[lang]
  const all = COHORTS[p.id] ?? []
  const shown = all.filter((c) => !c.protectedOnly || unlocked)
  const hidden = all.length - shown.length
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3.5 py-2.5 text-[13px] text-[#4B5A66]">
        <Badge>{t.demoNums}</Badge><span className="min-w-0 flex-1">{t.simIntro}</span>
      </div>
      {shown.map((c) => {
        const best = Math.max(...c.treatments.map((x) => x.goal))
        return (
          <section key={c.id} className="rounded-lg border border-black/[0.08] bg-white">
            <div className="border-b border-black/[0.06] px-3.5 py-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="flex items-center gap-2 text-[15px] font-semibold">{c.protectedOnly && <Lock size={13} className="text-teal" />}{c.title[lang]}</h3>
                <span className="flex items-center gap-1.5 font-mono text-[12px] text-[#5B6B7C]"><Users size={13} />{c.n.toLocaleString('en-US')} {t.patients} · {c.clinics} {t.inClinics}</span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] uppercase tracking-wide text-[#7A8893]">{t.built}:</span>
                {c.criteria.map((k, i) => <span key={i} className="rounded-full border border-teal/25 bg-teal-soft px-2 py-0.5 text-[11.5px] text-teal-2">{k[lang]}</span>)}
              </div>
              <div className="mt-2 text-[13px]"><span className="text-[#7A8893]">{t.goal}:</span> <b>{c.outcome[lang]}</b></div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-sm">
                <thead>
                  <tr className="border-b border-black/[0.06] bg-[#F3F6F5] text-left text-[11px] uppercase tracking-wide text-[#6B7A86]">
                    <th className="px-3.5 py-2 font-medium">{t.treatment}</th><th className="px-3 py-2 text-right font-medium">{t.n}</th>
                    <th className="w-[34%] px-3 py-2 font-medium">{t.reached}</th><th className="px-3.5 py-2 font-medium">{t.side}</th>
                  </tr>
                </thead>
                <tbody>
                  {c.treatments.map((x, i) => (
                    <tr key={i} className="border-b border-black/[0.05] last:border-0 align-top">
                      <td className="px-3.5 py-2.5"><div className="font-medium">{x.name[lang]}</div>{x.note && <div className="mt-0.5 text-[11.5px] text-[#6B7A86]">{x.note[lang]}</div>}</td>
                      <td className="px-3 py-2.5 text-right font-mono tabular text-[#5B6B7C]">{x.n}</td>
                      <td className="px-3 py-2.5"><div className="flex items-center gap-2"><div className="flex-1"><Bar pct={x.goal} tone={x.goal === best ? 'teal' : 'ink'} /></div><span className={`w-10 text-right font-mono tabular ${x.goal === best ? 'font-semibold text-teal' : ''}`}>{x.goal}%</span></div></td>
                      <td className="px-3.5 py-2.5"><span className="font-mono tabular">{x.side}%</span> <span className="text-[12px] text-[#6B7A86]">{x.sideName[lang]}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid gap-3 border-t border-black/[0.06] p-3.5 md:grid-cols-[1fr_280px]">
              <div>
                <div className="mb-2 text-[12px] font-semibold">{c.afterTitle[lang]}</div>
                <ul className="space-y-2">
                  {c.after.map((a, i) => (
                    <li key={i} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 text-[13px]"><span>{a.label[lang]}</span><span className="font-mono tabular">{a.pct}%</span><div className="col-span-2"><Bar pct={a.pct} tone="flag" /></div></li>
                  ))}
                </ul>
              </div>
              <div className="rounded-md bg-[#F3F6F5] p-3 text-[12.5px] text-[#4B5A66]">
                <div className="flex items-center gap-1.5 font-semibold text-[#14212B]"><BookOpen size={13} />{t.check}</div>
                <div className="mt-1">{c.guideline}</div>
                <p className="mt-2 text-[11.5px] text-[#6B7A86]">{t.notAdvice}</p>
              </div>
            </div>
          </section>
        )
      })}
      {hidden > 0 && (
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-dashed border-black/15 bg-white/70 px-3.5 py-3 text-[13px] text-[#4B5A66]">
          <Lock size={15} /><span className="min-w-0 flex-1">{hidden} {t.lockedMore}</span>
          <button onClick={goProt} className="rounded-md border border-teal/40 px-3 py-1.5 text-[12px] font-medium text-teal-2 hover:bg-teal-soft">{t.openProt}</button>
        </div>
      )}
    </div>
  )
}

// ---------------- Trends ----------------
const MON: Record<Lang, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  ru: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
  uz: ['yan', 'fev', 'mar', 'apr', 'may', 'iyn', 'iyl', 'avg', 'sen', 'okt', 'noy', 'dek'],
}
const yoy = (s: number[]) => {
  const a = s.slice(-12).reduce((x, y) => x + y, 0), b = s.slice(0, 12).reduce((x, y) => x + y, 0)
  return Math.round(((a - b) / b) * 100)
}

function Mini({ s, on }: { s: number[]; on: boolean }) {
  const mx = Math.max(...s), mn = Math.min(...s)
  const pts = s.map((v, i) => `${(i / (s.length - 1)) * 100},${28 - ((v - mn) / (mx - mn || 1)) * 24}`).join(' ')
  return <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-8 w-24"><polyline points={pts} fill="none" stroke={on ? '#0E7C6B' : '#14212B'} strokeWidth="1.6" vectorEffect="non-scaling-stroke" /></svg>
}

export function Trends({ lang }: { lang: Lang }) {
  const t = T[lang]
  const [sel, setSel] = useState<string>('t2d')
  const tr = TRENDS.find((x) => x.id === sel) as Trend
  const s = useMemo(() => series(tr), [tr])
  const mx = Math.max(...s)
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div><h2 className="text-lg font-semibold">{t.trendsT}</h2><p className="text-[13px] text-[#5B6B7C]">{t.trendsSub}</p></div>
        <Badge>{t.demoNums}</Badge>
      </div>
      <div className="grid gap-3 lg:grid-cols-[320px_1fr]">
        <ul className="space-y-1.5">
          {TRENDS.map((x) => {
            const ss = series(x), ch = yoy(ss), on = x.id === sel
            return (
              <li key={x.id}>
                <button onClick={() => setSel(x.id)} aria-pressed={on} className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left ${on ? 'border-teal bg-white shadow-sm' : 'border-black/[0.08] bg-white/70 hover:bg-white'}`}>
                  <span className="min-w-0 flex-1"><span className="block text-[13.5px] font-medium">{x.name[lang]}</span><span className={`font-mono text-[12px] ${ch > 0 ? 'text-flag' : 'text-teal'}`}>{ch > 0 ? '+' : ''}{ch}% <span className="text-[#7A8893]">{t.yoy}</span></span></span>
                  <Mini s={ss} on={on} />
                </button>
              </li>
            )
          })}
        </ul>
        <AnimatePresence mode="wait">
          <motion.section key={tr.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="rounded-lg border border-black/[0.08] bg-white p-3.5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-[15px] font-semibold">{tr.name[lang]}</h3>
              <div className="flex gap-4 font-mono text-[12px]"><span><b className="text-[15px]">{s[MONTHS - 1]}</b> {t.perMonth}</span><span className={yoy(s) > 0 ? 'text-flag' : 'text-teal'}>{yoy(s) > 0 ? '+' : ''}{yoy(s)}% {t.yoy}</span></div>
            </div>
            <div className="mt-3 flex h-36 items-end gap-[3px]" role="img" aria-label={tr.name[lang]}>
              {s.map((v, i) => (
                <div key={i} className="group relative flex-1">
                  <motion.div initial={{ height: 0 }} animate={{ height: `${(v / mx) * 136}px` }} transition={{ duration: 0.4, delay: i * 0.01 }} className={`rounded-t-sm ${i >= 12 ? 'bg-teal' : 'bg-[#14212B]/25'}`} />
                  <span className="pointer-events-none absolute -top-6 left-1/2 hidden -translate-x-1/2 rounded bg-[#14212B] px-1 font-mono text-[10px] text-white group-hover:block">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-1 flex justify-between font-mono text-[10px] text-[#7A8893]"><span>{MON[lang][11]} 2024</span><span>{MON[lang][11]} 2025</span><span>{MON[lang][10]} 2026</span></div>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[12.5px] text-[#4B5A66]">
              <span><span className="text-[#7A8893]">{t.pattern}:</span> {tr.note[lang]}</span>
              <span><span className="text-[#7A8893]">{t.women}:</span> {tr.women}%</span>
              <span><span className="text-[#7A8893]">{t.ages}:</span> {tr.age}</span>
            </div>
            <div className="mt-4 border-t border-black/[0.06] pt-3">
              <div className="text-[12px] font-semibold">{t.factors}</div>
              <ul className="mt-2 space-y-2">
                {tr.factors.map((f, i) => (
                  <li key={i} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 text-[13px]"><span>{f.label[lang]}</span><span className="font-mono tabular">{f.pct}%</span><div className="col-span-2"><Bar pct={f.pct} tone="ink" /></div></li>
                ))}
              </ul>
              <p className="mt-2 text-[11.5px] text-[#6B7A86]">{t.assoc}</p>
            </div>
          </motion.section>
        </AnimatePresence>
      </div>
    </div>
  )
}

// ---------------- Doctors network ----------------
type Msg = { from: 'me' | 'them'; text: string; case?: string; sim?: boolean }

function caseSummary(p: Patient, lang: Lang) {
  const decade = Math.floor((2026 - p.born) / 10) * 10
  const active = p.conditions.filter((c) => c.status === 'active').map((c) => c.name[lang]).join(', ')
  const meds = p.meds.filter((m) => !m.to).map((m) => m.name).join(', ')
  return `${p.sex}, ${decade}–${decade + 9} · ${active}${meds ? ` · ${meds}` : ''}`
}

export function Network({ lang, patient, onLog }: { lang: Lang; patient: Patient | null; onLog?: (doc: string) => void }) {
  const t = T[lang]
  const [q, setQ] = useState('')
  const [spec, setSpec] = useState<Spec | null>(null)
  const [cc, setCc] = useState('')
  const [open, setOpen] = useState<Doctor | null>(null)
  const [chats, setChats] = useState<Record<string, Msg[]>>({})
  const [draft, setDraft] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  const qSpecs = useMemo(() => {
    const w = q.trim().toLowerCase()
    if (!w) return null
    return (Object.keys(SPEC_WORDS) as Spec[]).filter((k) => SPEC_WORDS[k].some((x) => w.includes(x) || x.startsWith(w)))
  }, [q])

  const docs = DOCTORS.filter((d) => {
    const h = HOSPITALS.find((x) => x.id === d.hosp)!
    if (spec && d.spec !== spec) return false
    if (cc && h.cc !== cc) return false
    if (q.trim()) {
      const w = q.trim().toLowerCase()
      const text = `${d.name} ${h.name} ${h.city} ${h.country[lang]} ${d.focus.en} ${d.focus.ru} ${d.focus.uz}`.toLowerCase()
      if (!(qSpecs?.includes(d.spec) || text.includes(w))) return false
    }
    return true
  })
  const hosps = HOSPITALS.filter((h) => docs.some((d) => d.hosp === h.id))
  const countries = [...new Map(HOSPITALS.map((h) => [h.cc, h.country])).entries()]

  useEffect(() => { endRef.current?.scrollIntoView({ block: 'nearest' }) }, [chats, typing, open])

  const openChat = (d: Doctor) => {
    setOpen(d); setDraft('')
    if (window.innerWidth < 1024) setTimeout(() => document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
  }
  const send = (withCase: boolean) => {
    if (!open || (!draft.trim() && !withCase)) return
    const d = open
    const m: Msg = { from: 'me', text: draft.trim(), case: withCase && patient ? caseSummary(patient, lang) : undefined }
    setChats((c) => ({ ...c, [d.id]: [...(c[d.id] ?? []), m] })); setDraft(''); onLog?.(d.name)
    const mine = (chats[d.id] ?? []).filter((x) => x.from === 'me').length
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setChats((c) => ({ ...c, [d.id]: [...(c[d.id] ?? []), { from: 'them', text: mine % 2 ? t.replyB : t.replyA, sim: true }] }))
    }, 1100)
  }
  const thread = open ? chats[open.id] ?? [] : []
  const oh = open ? HOSPITALS.find((h) => h.id === open.hosp)! : null

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div><h2 className="text-lg font-semibold">{t.netT}</h2><p className="text-[13px] text-[#5B6B7C]">{t.netSub}</p></div>
        <Badge>Demo</Badge>
      </div>
      <div className="rounded-lg border border-black/[0.08] bg-white p-3">
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="relative min-w-0 flex-1">
            <Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#7A8893]" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.searchPh} aria-label={t.searchPh} className="w-full rounded-md border border-black/15 bg-white py-2 pl-8 pr-3 text-sm outline-none focus:border-teal" />
          </label>
          <select value={cc} onChange={(e) => setCc(e.target.value)} aria-label={t.country} className="rounded-md border border-black/15 bg-white px-2.5 py-2 text-sm outline-none focus:border-teal">
            <option value="">{t.anyCountry}</option>
            {countries.map(([k, v]) => <option key={k} value={k}>{v[lang]}</option>)}
          </select>
        </div>
        <div className="mt-2 flex gap-1.5 overflow-x-auto pb-0.5">
          <button onClick={() => setSpec(null)} aria-pressed={!spec} className={`shrink-0 rounded-full border px-2.5 py-1 text-[12px] ${!spec ? 'border-teal bg-teal text-white' : 'border-black/15 text-[#4B5A66] hover:border-teal'}`}>{t.all}</button>
          {(Object.keys(SPECS) as Spec[]).map((k) => (
            <button key={k} onClick={() => setSpec(spec === k ? null : k)} aria-pressed={spec === k} className={`shrink-0 rounded-full border px-2.5 py-1 text-[12px] ${spec === k ? 'border-teal bg-teal text-white' : 'border-black/15 text-[#4B5A66] hover:border-teal'}`}>{SPECS[k][lang]}</button>
          ))}
        </div>
        <div className="mt-2 font-mono text-[11.5px] text-[#6B7A86]">{hosps.length} {t.hospitals} · {docs.length} {t.doctors}</div>
      </div>

      <div className={`grid gap-3 ${open ? 'lg:grid-cols-[1fr_360px]' : ''}`}>
        <div className="space-y-3">
          {!hosps.length && <div className="rounded-lg border border-dashed border-black/15 bg-white/70 p-6 text-center text-sm text-[#5B6B7C]">{t.nothing}</div>}
          {hosps.map((h) => (
            <section key={h.id} className="rounded-lg border border-black/[0.08] bg-white">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-black/[0.06] px-3.5 py-2.5">
                <Building2 size={15} className="text-[#5B6B7C]" />
                <span className="font-semibold">{h.name}</span>
                <span className="flex items-center gap-1 text-[12px] text-[#6B7A86]"><MapPin size={11} />{h.city}, {h.country[lang]}</span>
                <span className="ml-auto flex flex-wrap gap-1">{h.specs.map((s) => <span key={s} className={`rounded px-1.5 py-0.5 text-[10.5px] ${spec === s || qSpecs?.includes(s) ? 'bg-teal-soft text-teal-2' : 'bg-[#EEF2F1] text-[#5B6B7C]'}`}>{SPECS[s][lang]}</span>)}</span>
              </div>
              <ul className="divide-y divide-black/[0.05]">
                {docs.filter((d) => d.hosp === h.id).map((d) => (
                  <li key={d.id} className={`flex flex-wrap items-center gap-3 px-3.5 py-2.5 ${open?.id === d.id ? 'bg-teal-soft/60' : ''}`}>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#14212B]/[0.07] text-[11px] font-semibold">{d.name.replace('Dr. ', '').split(' ').map((s) => s[0]).join('')}</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13.5px] font-medium">{d.name} <span className="font-normal text-[#6B7A86]">· {SPECS[d.spec][lang]}, {d.role[lang]}</span></div>
                      <div className="text-[12px] text-[#5B6B7C]">{d.focus[lang]} · {d.years} {t.years} · <span className="font-mono">{d.langs}</span></div>
                      <div className="text-[11px] text-[#7A8893]">{d.reply[lang]}{chats[d.id]?.length ? ` · ${chats[d.id].length} ✉` : ''}</div>
                    </div>
                    <button onClick={() => openChat(d)} className="inline-flex items-center gap-1.5 rounded-md bg-teal px-3 py-1.5 text-[12.5px] font-semibold text-white"><MessageSquare size={13} />{t.message}</button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <p className="px-1 text-[11px] leading-snug text-[#7A8893]">{t.listing}</p>
        </div>

        {open && oh && (
          <aside id="chat" className="scroll-mt-20 lg:sticky lg:top-16 lg:self-start">
            <div className="flex h-[480px] flex-col rounded-lg border border-black/[0.08] bg-white">
              <div className="flex items-start gap-2 border-b border-black/[0.06] px-3.5 py-2.5">
                <div className="min-w-0 flex-1"><div className="text-[13.5px] font-semibold">{open.name}</div><div className="truncate text-[11.5px] text-[#6B7A86]">{SPECS[open.spec][lang]} · {oh.name}</div></div>
                <button onClick={() => setOpen(null)} aria-label={t.close} className="rounded p-1 text-[#6B7A86] hover:bg-[#EEF2F1]"><X size={15} /></button>
              </div>
              <div className="flex-1 space-y-2 overflow-y-auto bg-[#F6F8F7] p-3">
                {!thread.length && <p className="mt-8 text-center text-[12.5px] text-[#7A8893]">{t.start}</p>}
                {thread.map((m, i) => (
                  <div key={i} className={`max-w-[85%] rounded-lg px-3 py-2 text-[13px] ${m.from === 'me' ? 'ml-auto bg-teal text-white' : 'border border-black/[0.06] bg-white'}`}>
                    {m.case && <div className={`mb-1 rounded border px-2 py-1 text-[11.5px] ${m.from === 'me' ? 'border-white/30 bg-white/10' : ''}`}><div className="flex items-center gap-1 font-semibold"><Paperclip size={11} />{t.attached} · {t.noName}</div><div>{m.case}</div></div>}
                    {m.text && <div>{m.text}</div>}
                    {m.sim && <div className="mt-1 font-mono text-[10px] uppercase tracking-wide text-[#8A5A12]">{t.sim}</div>}
                  </div>
                ))}
                {typing && <div className="w-12 rounded-lg border border-black/[0.06] bg-white px-3 py-2 text-center text-[#7A8893]">···</div>}
                <div ref={endRef} />
              </div>
              <form onSubmit={(e) => { e.preventDefault(); send(false) }} className="border-t border-black/[0.06] p-2">
                {patient && (
                  <button type="button" onClick={() => send(true)} className="mb-1.5 inline-flex items-center gap-1 rounded border border-black/15 px-2 py-1 text-[11.5px] text-[#4B5A66] hover:border-teal"><Paperclip size={11} />{t.attach} ({patient.id})</button>
                )}
                <div className="flex gap-1.5">
                  <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={t.chatPh} aria-label={t.chatPh} className="min-w-0 flex-1 rounded-md border border-black/15 bg-white px-2.5 py-2 text-sm outline-none focus:border-teal" />
                  <button type="submit" aria-label="Send" className="grid w-10 place-items-center rounded-md bg-teal text-white"><Send size={15} /></button>
                </div>
              </form>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
