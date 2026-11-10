// Later-phase features shown as realistic product screens: global case lessons,
// the personal medical lifeline (digital twin history) and the full roadmap.
// All patient data is synthetic. Case-lesson figures come from published sources
// listed on each card and must be re-checked before external use.
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Check, CircleDashed, ExternalLink, FileText, Minus } from 'lucide-react'
import { useLang, type Lang } from '../i18n'
import { Reveal, Section } from './Story'

type L3 = Record<Lang, string>
const L = (en: string, ru: string, uz: string): L3 => ({ en, ru, uz })

function Head({ eyebrow, title, sub, tag }: { eyebrow: string; title: string; sub?: string; tag?: string }) {
  return (
    <Reveal className="mb-8 max-w-3xl sm:mb-10">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="eyebrow">{eyebrow}</span>
        {tag && <span className="rounded border border-amber/40 bg-amber/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber">{tag}</span>}
      </div>
      <h2 className="h2">{title}</h2>
      {sub && <p className="lead mt-4 max-w-2xl">{sub}</p>}
    </Reveal>
  )
}

/* ================= GLOBAL CASE LESSONS ================= */

const Q = {
  where: L('Where and when', 'Где и когда', 'Qayerda va qachon'),
  who: L('Who was affected', 'Кто пострадал', 'Kimlar'),
  approach: L('What doctors did', 'Что сделали врачи', 'Shifokorlar nima qildi'),
  benefit: L('Benefit', 'Польза', 'Foyda'),
  harm: L('Harm and side effects', 'Вред и побочные эффекты', "Zarar va nojo'ya ta'sirlar"),
}

type Check = { t: L3; s: 'found' | 'missing' | 'none'; src?: string }
type Case = {
  id: string; tab: L3; flag: string; title: L3; strength: L3
  rows: Record<keyof typeof Q, L3>
  checks: Check[]; sources: string[]
}

const CASES: Case[] = [
  {
    id: 'mucor', flag: 'IN', tab: L('India 2021 · black fungus', 'Индия 2021 · «чёрный грибок»', 'Hindiston 2021 · qora zamburug‘'),
    title: L('COVID-associated mucormycosis', 'Мукормикоз, связанный с COVID-19', 'COVID bilan bog‘liq mukormikoz'),
    strength: L('Cohort studies + national guidance', 'Когортные исследования + нац. рекомендации', 'Kogort tadqiqotlar + milliy ko‘rsatma'),
    rows: {
      where: L('India, April–June 2021, Delta wave. Over 40,000 cases reported nationally.', 'Индия, апрель–июнь 2021, волна «Дельта». Более 40 000 случаев.', 'Hindiston, 2021 aprel–iyun, Delta to‘lqini. 40 000 dan ortiq holat.'),
      who: L('Mostly people with diabetes (often uncontrolled) who received steroids for COVID-19.', 'В основном люди с диабетом (часто некомпенсированным), получавшие стероиды при COVID-19.', 'Asosan qandli diabeti bor (ko‘pincha nazoratsiz) va COVID uchun steroid olgan bemorlar.'),
      approach: L('Early imaging, liposomal amphotericin B, urgent surgery, glucose control, stop unneeded steroids.', 'Ранняя визуализация, липосомальный амфотерицин B, срочная операция, контроль глюкозы, отмена лишних стероидов.', 'Erta tasvir tekshiruvi, liposomal amfoteritsin B, shoshilinch operatsiya, qand nazorati, keraksiz steroidni to‘xtatish.'),
      benefit: L('Early combined surgery + antifungal clearly improved survival.', 'Ранняя операция + противогрибковая терапия заметно повышали выживаемость.', 'Erta operatsiya + zamburug‘ga qarshi dori omon qolishni sezilarli oshirdi.'),
      harm: L('High mortality and eye loss. Amphotericin B harms the kidneys and lowers potassium. Drug shortages delayed care.', 'Высокая смертность, потеря глаза. Амфотерицин B вредит почкам и снижает калий. Дефицит препарата.', 'Yuqori o‘lim va ko‘z yo‘qotish. Amfoteritsin B buyrakka zarar, kaliyni tushiradi. Dori tanqisligi.'),
    },
    checks: [
      { t: L('Type 2 diabetes', 'Сахарный диабет 2 типа', 'Qandli diabet, 2-tur'), s: 'found', src: 'D4 · 2024' },
      { t: L('HbA1c trend: 6.4 → 7.1 → 6.6 %', 'HbA1c: 6,4 → 7,1 → 6,6 %', 'HbA1c: 6,4 → 7,1 → 6,6 %'), s: 'found', src: 'D1 D3 D5' },
      { t: L('Steroid course (dexamethasone, 2021)', 'Курс стероидов (дексаметазон, 2021)', 'Steroid kursi (deksametazon, 2021)'), s: 'found', src: 'D6 · 2021' },
      { t: L('Kidney function (creatinine)', 'Функция почек (креатинин)', 'Buyrak faoliyati (kreatinin)'), s: 'missing' },
    ],
    sources: ['Sen M. et al., COSMIC study, Indian J Ophthalmol 2021', 'Patel A. et al., Emerg Infect Dis 2021', 'ICMR / MoHFW advisory on mucormycosis, May 2021', 'Cornely O.A. et al., Lancet Infect Dis 2019'],
  },
  {
    id: 'tb', flag: 'UZ', tab: L('Uzbekistan 2017–21 · resistant TB', 'Узбекистан 2017–21 · устойчивый ТБ', 'O‘zbekiston 2017–21 · chidamli sil'),
    title: L('6-month all-oral regimen for drug-resistant TB (BPaLM)', '6-месячная пероральная схема при устойчивом ТБ (BPaLM)', 'Dori-chidamli sil uchun 6 oylik og‘iz orqali sxema (BPaLM)'),
    strength: L('Randomised trials + WHO guideline', 'Рандомизированные исследования + рекомендация ВОЗ', 'Randomizatsiyalangan sinovlar + JSST ko‘rsatmasi'),
    rows: {
      where: L('TB-PRACTECAL trial, 2017–2021, sites in Uzbekistan, Belarus, South Africa.', 'Исследование TB-PRACTECAL, 2017–2021: Узбекистан, Беларусь, ЮАР.', 'TB-PRACTECAL sinovi, 2017–2021: O‘zbekiston, Belarus, JAR.'),
      who: L('Adults with rifampicin-resistant / multidrug-resistant TB.', 'Взрослые с рифампицин-устойчивым / МЛУ-ТБ.', 'Rifampitsinga chidamli / ko‘p dori chidamli sil bilan kattalar.'),
      approach: L('Bedaquiline + pretomanid + linezolid + moxifloxacin for 6 months, no injections.', 'Бедаквилин + претоманид + линезолид + моксифлоксацин 6 месяцев, без инъекций.', 'Bedakvilin + pretomanid + linezolid + moksifloksatsin 6 oy, ukolsiz.'),
      benefit: L('Unfavourable outcomes ~11% vs ~48% on the old 18–24 month regimen. WHO adopted it in 2022.', 'Неблагоприятные исходы ~11% против ~48% на старой схеме 18–24 мес. ВОЗ приняла в 2022.', 'Yomon natija ~11% va eski 18–24 oylik sxemada ~48%. JSST 2022 yilda qabul qildi.'),
      harm: L('Linezolid: nerve damage and low blood counts (lower dose helps). QT prolongation needs ECG.', 'Линезолид: нейропатия и угнетение кроветворения (меньшая доза помогает). Удлинение QT — нужен ЭКГ.', 'Linezolid: asab shikastlanishi, qon ko‘rsatkichlari pasayishi (kam doza yordam beradi). QT uzayishi, EKG kerak.'),
    },
    checks: [
      { t: L('Complete blood count', 'Общий анализ крови', 'Umumiy qon tahlili'), s: 'missing' },
      { t: L('ECG / QT interval', 'ЭКГ / интервал QT', 'EKG / QT oralig‘i'), s: 'missing' },
      { t: L('Neuropathy risk: diabetes', 'Риск нейропатии: диабет', 'Neyropatiya xavfi: diabet'), s: 'found', src: 'D4 · 2024' },
      { t: L('Other QT-prolonging drugs', 'Другие препараты, удлиняющие QT', 'QT ni uzaytiruvchi boshqa dorilar'), s: 'none' },
    ],
    sources: ["Nyang'wa B.-T. et al., NEJM 2022 (TB-PRACTECAL)", 'Conradie F. et al., NEJM 2020 (Nix-TB)', 'Conradie F. et al., NEJM 2022 (ZeNix)', 'WHO TB guidelines, Module 4, 2022 update'],
  },
  {
    id: 'hcv', flag: 'EG', tab: L('Egypt 2014–20 · hepatitis C', 'Египет 2014–20 · гепатит C', 'Misr 2014–20 · gepatit C'),
    title: L('National hepatitis C screening and cure programme', 'Национальная программа скрининга и лечения гепатита C', 'Gepatit C bo‘yicha milliy skrining va davolash dasturi'),
    strength: L('National programme data + safety warnings', 'Данные нац. программы + предупреждения регуляторов', 'Milliy dastur ma’lumotlari + xavfsizlik ogohlantirishlari'),
    rows: {
      where: L('Egypt, from 2014; "100 Million Healthy Lives" campaign 2018–2019.', 'Египет, с 2014; кампания «100 миллионов здоровых жизней» 2018–2019.', 'Misr, 2014 yildan; "100 million sog‘lom hayot" kampaniyasi 2018–2019.'),
      who: L('One of the highest HCV rates in the world. Tens of millions screened.', 'Одна из самых высоких распространённостей ВГС. Десятки миллионов обследованы.', 'Dunyodagi eng yuqori HCV darajalaridan biri. O‘nlab million kishi tekshirildi.'),
      approach: L('Mass screening + cheap generic sofosbuvir-based pills for 12 weeks, free.', 'Массовый скрининг + дешёвые дженерики на основе софосбувира, 12 недель, бесплатно.', 'Ommaviy skrining + arzon sofosbuvir asosidagi generik dorilar, 12 hafta, bepul.'),
      benefit: L('Cure rates above 90% in programme data, at low cost.', 'Излечение более 90% по данным программы, при низкой стоимости.', 'Dastur ma’lumotlarida 90% dan ortiq tuzalish, arzon narxda.'),
      harm: L('Hepatitis B can reactivate. Amiodarone + sofosbuvir can dangerously slow the heart.', 'Возможна реактивация гепатита B. Амиодарон + софосбувир — опасная брадикардия.', 'Gepatit B qayta faollashishi mumkin. Amiodaron + sofosbuvir yurakni xavfli sekinlashtiradi.'),
    },
    checks: [
      { t: L('Hepatitis B status (HBsAg)', 'Статус гепатита B (HBsAg)', 'Gepatit B holati (HBsAg)'), s: 'missing' },
      { t: L('Amiodarone or other heart drugs', 'Амиодарон или др. сердечные препараты', 'Amiodaron yoki boshqa yurak dorilari'), s: 'none' },
      { t: L('Lisinopril 10 mg (no known interaction)', 'Лизиноприл 10 мг (взаимодействие не известно)', 'Lizinopril 10 mg (o‘zaro ta’sir ma’lum emas)'), s: 'found', src: 'D2 · 2022' },
      { t: L('Liver fibrosis / cirrhosis history', 'Фиброз / цирроз печени в анамнезе', 'Jigar fibrozi / sirrozi tarixi'), s: 'none' },
    ],
    sources: ['Waked I. et al., NEJM 2020', 'US FDA safety communication, HBV reactivation with DAAs, Oct 2016', 'US FDA safety communication, amiodarone + sofosbuvir, Mar 2015', 'WHO HCV guidelines, 2022'],
  },
]

const LT = {
  eyebrow: L('Global case lessons', 'Мировой опыт', 'Global tajriba'),
  tag: L('Later phase', 'Следующий этап', 'Keyingi bosqich'),
  title: L('Someone already faced this. What did they do, and what happened?', 'Кто-то уже сталкивался с этим. Что сделали и чем закончилось?', 'Kimdir buni allaqachon boshdan kechirgan. Nima qilgan va natija qanday bo‘lgan?'),
  sub: L(
    'For a condition in front of the doctor, MSi shows one short evidence card: where it happened, what doctors did, the benefit, the harm, and what to check in this patient’s own record. Every line links to its source.',
    'Для болезни пациента MSi показывает короткую карточку: где это было, что сделали врачи, польза, вред и что проверить в карте именно этого пациента. Каждая строка со ссылкой на источник.',
    'Shifokor oldidagi kasallik uchun MSi qisqa dalil kartasini ko‘rsatadi: qayerda bo‘lgan, shifokorlar nima qilgan, foyda, zarar va aynan shu bemor kartasida nimani tekshirish kerak. Har bir qator manbaga bog‘langan.'),
  patient: L('In this patient’s record', 'В карте этого пациента', 'Shu bemor kartasida'),
  patientNote: L('Aziza K. · synthetic · from the verified MSi timeline', 'Азиза К. · синтетические данные · из проверенной хронологии MSi', 'Aziza K. · sintetik · tasdiqlangan MSi tarixidan'),
  found: L('found', 'есть', 'bor'), missing: L('not in record', 'нет в карте', 'kartada yo‘q'), none: L('none found', 'не найдено', 'topilmadi'),
  strength: L('Evidence', 'Доказательность', 'Dalil darajasi'),
  sources: L('Sources', 'Источники', 'Manbalar'),
  foot: L('Decision support for the doctor, not a prescription. Figures are from the cited publications and are re-checked before use.', 'Поддержка решения врача, а не назначение. Цифры из указанных публикаций и перепроверяются перед использованием.', 'Bu shifokorga yordam, retsept emas. Raqamlar ko‘rsatilgan manbalardan olingan va ishlatishdan oldin qayta tekshiriladi.'),
}

export function Lessons() {
  const { lang } = useLang()
  const [id, setId] = useState(CASES[0].id)
  const c = CASES.find((x) => x.id === id)!
  const icon = (s: Check['s']) =>
    s === 'found' ? <Check size={13} className="text-aqua" /> : s === 'missing' ? <CircleDashed size={13} className="text-amber" /> : <Minus size={13} className="text-muted" />
  return (
    <Section id="lessons">
      <Head eyebrow={LT.eyebrow[lang]} tag={LT.tag[lang]} title={LT.title[lang]} sub={LT.sub[lang]} />
      <Reveal>
        <div className="panel overflow-hidden">
          <div className="flex gap-1 overflow-x-auto border-b border-white/[0.08] bg-white/[0.02] px-2 pt-2">
            {CASES.map((x) => (
              <button key={x.id} onClick={() => setId(x.id)} aria-pressed={x.id === id}
                className={`flex shrink-0 items-center gap-2 rounded-t-md border-b-2 px-3 py-2 text-[13px] transition ${x.id === id ? 'border-aqua bg-white/[0.05] text-white' : 'border-transparent text-white/60 hover:text-white'}`}>
                <span className="rounded bg-white/10 px-1 font-mono text-[10px]">{x.flag}</span>{x.tab[lang]}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={c.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="grid lg:grid-cols-[1.5fr_1fr]">
              <div className="p-4 sm:p-6">
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold">{c.title[lang]}</h3>
                  <span className="font-mono text-[11px] text-muted">{LT.strength[lang]}: <span className="text-white/80">{c.strength[lang]}</span></span>
                </div>
                <dl className="divide-y divide-white/[0.07] rounded-lg border border-white/[0.08]">
                  {(Object.keys(Q) as (keyof typeof Q)[]).map((k, i) => (
                    <div key={k} className="grid gap-1 px-3 py-2.5 sm:grid-cols-[170px_1fr] sm:gap-4">
                      <dt className="flex items-center gap-2 text-xs text-muted"><span className="font-mono text-[10px] text-white/35">{i + 1}</span>{Q[k][lang]}</dt>
                      <dd className={`text-sm leading-relaxed ${k === 'harm' ? 'text-[#F2B8A0]' : 'text-white/90'}`}>{c.rows[k][lang]}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-4">
                  <div className="mb-1.5 text-xs text-muted">{LT.sources[lang]}</div>
                  <ul className="space-y-1">
                    {c.sources.map((s) => <li key={s} className="flex items-start gap-1.5 text-xs text-white/70"><ExternalLink size={11} className="mt-0.5 shrink-0 text-white/40" />{s}</li>)}
                  </ul>
                </div>
              </div>
              <div className="border-t border-white/[0.08] bg-white/[0.02] p-4 sm:p-6 lg:border-l lg:border-t-0">
                <div className="flex items-center gap-2 text-xs text-muted"><span className="font-mono text-[10px] text-white/35">6</span>{LT.patient[lang]}</div>
                <div className="mt-1 font-mono text-[11px] text-white/50">{LT.patientNote[lang]}</div>
                <ul className="mt-4 space-y-2">
                  {c.checks.map((k, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.12 }}
                      className="flex items-start gap-2.5 rounded-md border border-white/[0.08] bg-night/60 px-3 py-2">
                      <span className="mt-0.5">{icon(k.s)}</span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[13px] text-white/90">{k.t[lang]}</div>
                        <div className={`mt-0.5 font-mono text-[10px] uppercase tracking-wide ${k.s === 'found' ? 'text-aqua/80' : k.s === 'missing' ? 'text-amber' : 'text-muted'}`}>{LT[k.s][lang]}</div>
                      </div>
                      {k.src && <span className="flex shrink-0 items-center gap-1 rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/60"><FileText size={10} />{k.src}</span>}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="mt-3 text-xs text-muted">{LT.foot[lang]}</p>
      </Reveal>
    </Section>
  )
}

/* ================= PERSONAL LIFELINE (digital twin history) ================= */

type Lane = 'cond' | 'proc' | 'med' | 'lab' | 'gen'
type Ev = { lane: Lane; from: number; to?: number; label: L3; detail: L3; src: string; tone?: 'warn' | 'research' }
const Y0 = 2016, Y1 = 2026.9
const EVENTS: Ev[] = [
  { lane: 'cond', from: 2018.4, to: 2018.6, label: L('Gallstones', 'Желчнокаменная болезнь', 'O‘t tosh kasalligi'), detail: L('Treated by surgery the same year.', 'Лечение — операция в том же году.', 'Shu yili operatsiya qilindi.'), src: 'D0 · 2018' },
  { lane: 'cond', from: 2021.0, to: 2021.1, label: L('COVID-19', 'COVID-19', 'COVID-19'), detail: L('Moderate, treated at home with a short steroid course.', 'Средней тяжести, лечение дома, короткий курс стероидов.', 'O‘rta og‘irlikda, uyda davolangan, qisqa steroid kursi.'), src: 'D6 · 2021' },
  { lane: 'cond', from: 2022.67, label: L('Hypertension, stage II', 'Гипертензия II ст.', 'Gipertenziya II bosqich'), detail: L('Written in the 2022 discharge note (handwritten).', 'Записано в выписке 2022 (рукописно).', '2022 ko‘chirmasida qo‘lda yozilgan.'), src: 'D2 · 2022' },
  { lane: 'cond', from: 2024.85, label: L('Type 2 diabetes (E11)', 'Диабет 2 типа (E11)', 'Qandli diabet 2-tur (E11)'), detail: L('Diagnosed 2024, but glucose was already high in 2021 and 2023.', 'Диагноз 2024, но глюкоза была повышена уже в 2021 и 2023.', '2024 da tashxis, lekin qand 2021 va 2023 dayoq yuqori bo‘lgan.'), src: 'D4 · 2024', tone: 'warn' },
  { lane: 'proc', from: 2018.5, label: L('Cholecystectomy', 'Холецистэктомия', 'Xoletsistektomiya'), detail: L('Laparoscopic gallbladder removal.', 'Лапароскопическое удаление желчного пузыря.', 'Laparoskopik o‘t pufagini olib tashlash.'), src: 'D0 · 2018' },
  { lane: 'proc', from: 2022.67, label: L('Hospital stay', 'Госпитализация', 'Shifoxonada yotish'), detail: L('Admitted for high blood pressure, discharged on lisinopril.', 'Госпитализация по давлению, выписана на лизиноприле.', 'Qon bosimi sababli yotqizilgan, lizinopril bilan chiqarilgan.'), src: 'D2 · 2022' },
  { lane: 'med', from: 2019.3, to: 2019.35, label: L('Amoxicillin → rash', 'Амоксициллин → сыпь', 'Amoksitsillin → toshma'), detail: L('Rash after amoxicillin. Later recorded as penicillin allergy, but a 2024 note says "no allergies". MSi flags the conflict.', 'Сыпь после амоксициллина. Позже записано как аллергия на пенициллин, но в 2024 «аллергии нет». MSi отмечает противоречие.', 'Amoksitsillindan keyin toshma. Keyin penitsillin allergiyasi deb yozilgan, lekin 2024 da "allergiya yo‘q". MSi ziddiyatni belgilaydi.'), src: 'D2 · D4', tone: 'warn' },
  { lane: 'med', from: 2021.0, to: 2021.05, label: L('Dexamethasone 6 mg, 10 days', 'Дексаметазон 6 мг, 10 дней', 'Deksametazon 6 mg, 10 kun'), detail: L('Steroid course during COVID-19. Glucose was 6.8 mmol/L two months later.', 'Курс стероидов при COVID-19. Через 2 месяца глюкоза 6,8 ммоль/л.', 'COVID paytida steroid kursi. 2 oydan keyin qand 6,8 mmol/l.'), src: 'D6 · 2021' },
  { lane: 'med', from: 2021.3, to: 2025.6, label: L('Atorvastatin 20 mg', 'Аторвастатин 20 мг', 'Atorvastatin 20 mg'), detail: L('Cholesterol fell from 6.2 to 4.9 mmol/L.', 'Холестерин снизился с 6,2 до 4,9 ммоль/л.', 'Xolesterin 6,2 dan 4,9 mmol/l ga tushdi.'), src: 'D1 · D5' },
  { lane: 'med', from: 2022.67, label: L('Lisinopril 10 mg daily', 'Лизиноприл 10 мг/сут', 'Lizinopril 10 mg kuniga'), detail: L('Started at discharge, still taken.', 'Начат при выписке, принимает до сих пор.', 'Chiqarilganda boshlangan, hozir ham ichadi.'), src: 'D2 · 2022' },
  { lane: 'med', from: 2024.85, label: L('Metformin 1000 mg ×2', 'Метформин 1000 мг ×2', 'Metformin 1000 mg ×2'), detail: L('Started by the endocrinologist. HbA1c improved from 7.1 to 6.6%.', 'Назначен эндокринологом. HbA1c улучшился с 7,1 до 6,6%.', 'Endokrinolog buyurgan. HbA1c 7,1 dan 6,6% ga yaxshilandi.'), src: 'D4 · 2024' },
  { lane: 'lab', from: 2021.2, label: L('HbA1c 6.4%', 'HbA1c 6,4%', 'HbA1c 6,4%'), detail: L('Above the 6.0% reference.', 'Выше нормы 6,0%.', '6,0% me’yordan yuqori.'), src: 'D1 · 2021' },
  { lane: 'lab', from: 2023.47, label: L('HbA1c 7.1%', 'HbA1c 7,1%', 'HbA1c 7,1%'), detail: L('Rising. No diagnosis recorded yet.', 'Растёт. Диагноз ещё не поставлен.', 'Oshmoqda. Hali tashxis yozilmagan.'), src: 'D3 · 2023', tone: 'warn' },
  { lane: 'lab', from: 2025.6, label: L('HbA1c 6.6%', 'HbA1c 6,6%', 'HbA1c 6,6%'), detail: L('Better on metformin.', 'Лучше на метформине.', 'Metformin bilan yaxshilangan.'), src: 'D5 · 2025' },
  { lane: 'gen', from: 2025.8, label: L('Pharmacogenomic panel', 'Фармакогенетическая панель', 'Farmakogenetik panel'), detail: L('Example: SLCO1B1 variant linked to higher risk of statin muscle side effects. Shown as research, any use needs clinical validation.', 'Пример: вариант SLCO1B1 связан с риском мышечных эффектов статинов. Исследование; нужна клиническая валидация.', 'Misol: SLCO1B1 varianti statinlarning mushak nojo‘ya ta’siri xavfi bilan bog‘liq. Tadqiqot, klinik tasdiq kerak.'), src: 'G1 · 2025', tone: 'research' },
]
const LANES: Record<Lane, L3> = {
  cond: L('Conditions', 'Болезни', 'Kasalliklar'),
  proc: L('Procedures', 'Процедуры', 'Muolajalar'),
  med: L('Medications', 'Лекарства', 'Dorilar'),
  lab: L('Key labs', 'Анализы', 'Tahlillar'),
  gen: L('Genetics', 'Генетика', 'Genetika'),
}
const LF = {
  eyebrow: L('Personal digital twin', 'Персональный цифровой двойник', 'Shaxsiy Digital Twin'),
  tag: L('Later phase · concept', 'Следующий этап · концепт', 'Keyingi bosqich · konsept'),
  title: L('A person’s whole medical life, on one line.', 'Вся медицинская жизнь человека на одной линии.', 'Insonning butun tibbiy hayoti bitta chiziqda.'),
  sub: L(
    'Every illness, procedure and therapy, which drug was taken and when, how labs changed, and later genetic results. This history is the base of the digital twin: first we know the person, then we model effects.',
    'Каждая болезнь, процедура и терапия, какой препарат и когда принимался, как менялись анализы, позже генетика. Эта история — основа цифрового двойника: сначала знаем человека, потом моделируем эффекты.',
    'Har bir kasallik, muolaja va terapiya, qaysi dori qachon ichilgan, tahlillar qanday o‘zgargan, keyinroq genetik natijalar. Bu tarix Digital Twin asosi: avval insonni bilamiz, keyin ta’sirlarni modellashtiramiz.'),
  pick: L('Select an item on the timeline', 'Выберите событие на линии', 'Chiziqdagi hodisani tanlang'),
  src: L('Source', 'Источник', 'Manba'),
  now: L('today', 'сегодня', 'bugun'),
  foot: L('Synthetic patient. Items with source D0, D6 and G1 are illustrative and not part of the five demo documents.', 'Синтетический пациент. События с источником D0, D6 и G1 — иллюстрация, их нет в пяти демо-документах.', 'Sintetik bemor. D0, D6 va G1 manbali hodisalar namuna uchun, beshta demo hujjatda yo‘q.'),
}

export function Lifeline() {
  const { lang } = useLang()
  const [sel, setSel] = useState(6)
  const W = 860, LW = 104, RH = 46
  const x = (y: number) => LW + ((y - Y0) / (Y1 - Y0)) * (W - LW - 12)
  const lanes = Object.keys(LANES) as Lane[]
  const ev = EVENTS[sel]
  const col = (e: Ev) => (e.tone === 'warn' ? '#F0A35E' : e.tone === 'research' ? '#B79CFF' : e.lane === 'med' ? '#56C7B3' : e.lane === 'lab' ? '#8CB8E8' : '#D9E2E1')
  // stack items inside a lane so labels never overlap; lanes grow to fit
  const rowOf = new Map<number, number>()
  const rowsIn: Record<string, number> = {}
  lanes.forEach((ln) => {
    const ends: number[] = []
    EVENTS.map((e, i) => ({ e, i })).filter(({ e }) => e.lane === ln).sort((a, b) => a.e.from - b.e.from).forEach(({ e, i }) => {
      const start = x(e.from), labelEnd = start + 12 + e.label[lang].length * 6
      let r = ends.findIndex((end) => end < start - 6)
      if (r === -1) { r = ends.length; ends.push(0) }
      ends[r] = Math.max(labelEnd, e.to ? x(e.to) : x(Y1))
      rowOf.set(i, r)
    })
    rowsIn[ln] = Math.max(1, ends.length)
  })
  const laneH = (ln: Lane) => Math.max(RH, 16 + rowsIn[ln] * 24)
  const laneY: Record<string, number> = {}
  let acc = 0
  lanes.forEach((ln) => { laneY[ln] = acc; acc += laneH(ln) })
  const H = acc + 30
  return (
    <Section id="lifeline">
      <Head eyebrow={LF.eyebrow[lang]} tag={LF.tag[lang]} title={LF.title[lang]} sub={LF.sub[lang]} />
      <Reveal>
        <div className="panel overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-xs font-semibold">AK</span>
              <div>
                <div className="text-sm font-semibold">Aziza K. <span className="font-normal text-muted">· F · 1968</span></div>
                <div className="font-mono text-[10px] text-muted">MSi-ID 0000-SYN · {lang === 'uz' ? 'sintetik' : lang === 'ru' ? 'синтетический' : 'synthetic'}</div>
              </div>
            </div>
            <div className="flex gap-1.5 font-mono text-[10px]">
              <span className="rounded border border-rose-300/30 bg-rose-300/10 px-1.5 py-0.5 text-rose-200">⚠ penicillin?</span>
              <span className="rounded border border-white/15 px-1.5 py-0.5 text-white/60">15 events · 7 sources</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <svg viewBox={`0 0 ${W} ${H}`} className="block min-w-[760px]" role="img" aria-label={LF.title[lang]}>
              {Array.from({ length: 11 }, (_, i) => Y0 + i).map((y) => (
                <g key={y}>
                  <line x1={x(y)} x2={x(y)} y1={0} y2={H - 22} stroke="rgba(255,255,255,.06)" />
                  <text x={x(y) + 3} y={H - 8} fontSize="10" fill="rgba(255,255,255,.4)" fontFamily="JetBrains Mono">{y}</text>
                </g>
              ))}
              <line x1={x(2026.86)} x2={x(2026.86)} y1={0} y2={H - 22} stroke="#56C7B3" strokeDasharray="3 3" opacity=".6" />
              {lanes.map((ln, li) => (
                <g key={ln}>
                  {li > 0 && <line x1={0} x2={W} y1={laneY[ln]} y2={laneY[ln]} stroke="rgba(255,255,255,.07)" />}
                  <text x={12} y={laneY[ln] + 26} fontSize="11" fill="rgba(255,255,255,.55)">{LANES[ln][lang]}</text>
                </g>
              ))}
              {EVENTS.map((e, i) => {
                const r = rowOf.get(i) ?? 0
                const cy = laneY[e.lane] + 14 + r * 24
                const x1 = x(e.from), x2 = e.to ? Math.max(x(e.to), x1 + 4) : x(Y1)
                const right = !e.to && e.lane !== 'med' && e.lane !== 'cond' && x1 > W - 170
                const c = col(e), on = sel === i
                const bar = e.lane === 'med' || e.lane === 'cond'
                return (
                  <g key={i} onClick={() => setSel(i)} style={{ cursor: 'pointer' }} opacity={on ? 1 : 0.85}>
                    {bar ? (
                      <motion.rect x={x1} y={cy - 4} height={8} rx={2} fill={c} fillOpacity={on ? 0.9 : 0.45} stroke={on ? '#fff' : 'none'}
                        initial={{ width: 0 }} whileInView={{ width: x2 - x1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.05 }} />
                    ) : (
                      <rect x={x1 - 4} y={cy - 4} width={8} height={8} transform={`rotate(45 ${x1} ${cy})`} fill={c} stroke={on ? '#fff' : 'none'} />
                    )}
                    <text x={right ? x1 - 8 : x1 + (bar ? 2 : 8)} y={cy + (bar ? 16 : 4)} textAnchor={right ? 'end' : 'start'} fontSize="10.5" fill={on ? '#fff' : 'rgba(255,255,255,.75)'} fontWeight={on ? 600 : 400}>{e.label[lang]}</text>
                    <rect x={x1 - 6} y={cy - 8} width={Math.max(x2 - x1, 60) + 12} height={26} fill="transparent" />
                  </g>
                )
              })}
            </svg>
          </div>
          <div className="grid gap-3 border-t border-white/[0.08] bg-white/[0.02] p-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <AnimatePresence mode="wait">
              <motion.div key={sel} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold">{ev.label[lang]}</span>
                  <span className="font-mono text-[11px] text-muted">{Math.floor(ev.from)}{ev.to ? `–${Math.floor(ev.to)}` : ev.lane === 'med' || ev.lane === 'cond' ? ` → ${LF.now[lang]}` : ''}</span>
                  {ev.tone === 'research' && <span className="rounded border border-[#B79CFF]/40 px-1.5 font-mono text-[10px] text-[#CDBBFF]">research</span>}
                </div>
                <p className="mt-1 text-sm text-white/75">{ev.detail[lang]}</p>
              </motion.div>
            </AnimatePresence>
            <span className="flex items-center gap-1 justify-self-start rounded border border-white/10 px-2 py-1 font-mono text-[11px] text-white/60 sm:justify-self-end"><FileText size={11} />{LF.src[lang]}: {ev.src}</span>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted">{LF.foot[lang]}</p>
      </Reveal>
    </Section>
  )
}

/* ================= ROADMAP (all features, short) ================= */

const PHASES: { k: string; when: L3; name: L3; items: L3[] }[] = [
  {
    k: 'now', when: L('MVP · now', 'MVP · сейчас', 'MVP · hozir'), name: L('Smart medical records', 'Умная медкарта', 'Aqlli tibbiy karta'),
    items: [
      L('Scan paper folders at the clinic (MSi Station)', 'Сканирование бумажных папок в клинике (MSi Station)', 'Klinikada qog‘oz papkalarni skanerlash (MSi Station)'),
      L('AI reads Uzbek, Russian and handwriting', 'ИИ читает узбекский, русский и рукопись', 'AI o‘zbek, rus va qo‘l yozuvini o‘qiydi'),
      L('One timeline, every fact linked to its page', 'Одна хронология, каждый факт со ссылкой на страницу', 'Bitta tarix, har bir fakt sahifaga bog‘langan'),
      L('Old vs new lab comparison', 'Сравнение старых и новых анализов', 'Eski va yangi tahlillarni solishtirish'),
      L('Allergy and record conflicts flagged', 'Отметка аллергий и противоречий', 'Allergiya va ziddiyatlarni belgilash'),
      L('Doctor verifies, one-page summary', 'Врач подтверждает, сводка на 1 страницу', 'Shifokor tasdiqlaydi, 1 sahifalik xulosa'),
    ],
  },
  {
    k: 'next', when: L('Next · 2027', 'Далее · 2027', 'Keyingi · 2027'), name: L('Doctor intelligence', 'Помощь врачу', 'Shifokorga yordam'),
    items: [
      L('Drug benefit / harm and interaction checks', 'Польза / вред лекарств и взаимодействия', 'Dori foydasi / zarari va o‘zaro ta’sir'),
      L('MRI and CT report reading', 'Чтение заключений МРТ и КТ', 'MRT va KT xulosalarini o‘qish'),
      L('Second-opinion pack for clinics abroad', 'Пакет для второго мнения за рубежом', 'Chet eldagi klinikalar uchun ikkinchi fikr paketi'),
      L('Global case lessons with sources', 'Мировой опыт с источниками', 'Manbali global tajriba kartalari'),
      L('Treatment map: countries, clinics, prices', 'Карта лечения: страны, клиники, цены', 'Davolash xaritasi: davlatlar, klinikalar, narxlar'),
      L('Clinical trials matching', 'Подбор клинических исследований', 'Klinik sinovlarni topish'),
    ],
  },
  {
    k: 'later', when: L('Later · research', 'Позже · исследования', 'Keyinroq · tadqiqot'), name: L('Personal digital twin', 'Цифровой двойник', 'Shaxsiy Digital Twin'),
    items: [
      L('Lifelong history: illnesses, therapies, drugs and dates', 'История жизни: болезни, терапии, лекарства и даты', 'Umrbod tarix: kasalliklar, terapiyalar, dorilar va sanalar'),
      L('Genetic reports and how results change over time', 'Генетические отчёты и их изменения во времени', 'Genetik hisobotlar va vaqt o‘tishi bilan o‘zgarishlar'),
      L('Scientific simulation of drug effects', 'Научное моделирование действия лекарств', 'Dori ta’sirini ilmiy simulyatsiya qilish'),
      L('Validated with clinicians before any clinical use', 'Валидация с врачами до клинического применения', 'Klinik foydalanishdan oldin shifokorlar bilan tasdiqlash'),
    ],
  },
]
const RM = {
  eyebrow: L('Roadmap', 'Дорожная карта', 'Yo‘l xaritasi'),
  title: L('Start with records. Grow into a full platform.', 'Начинаем с медкарт. Растём до платформы.', 'Kartadan boshlaymiz. To‘liq platformaga o‘samiz.'),
}

export function Roadmap() {
  const { lang } = useLang()
  const dot = ['bg-aqua', 'bg-sky-300', 'bg-[#B79CFF]']
  return (
    <Section id="roadmap">
      <Reveal className="mb-8 max-w-3xl">
        <div className="eyebrow mb-3">{RM.eyebrow[lang]}</div>
        <h2 className="h2">{RM.title[lang]}</h2>
      </Reveal>
      <div className="grid gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-3">
        {PHASES.map((p, i) => (
          <Reveal key={p.k} delay={i * 0.08} className="h-full">
            <div className="h-full bg-night p-5">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted"><span className={`h-1.5 w-1.5 rounded-full ${dot[i]}`} />{p.when[lang]}</div>
              <h3 className="mt-2 text-base font-semibold">{p.name[lang]}</h3>
              <ul className="mt-3 space-y-2">
                {p.items.map((it, j) => (
                  <li key={j} className="flex gap-2 text-sm text-white/75"><span className="mt-2 h-px w-2.5 shrink-0 bg-white/30" />{it[lang]}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
