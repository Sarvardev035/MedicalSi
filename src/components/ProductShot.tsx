// Hero visual: a realistic, animated screen of the MSi clinic app (synthetic data).
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLang } from '../i18n'

const T = {
  en: { pts: 'Patients', queue: 'Scan queue', review: 'To review', reports: 'Reports', today: 'Today', reading: 'Reading page', of: 'of', hand: 'handwritten, Russian', done: 'Done', ver: 'verified', need: 'need review', date: 'Date', fact: 'Fact', src: 'Source', st: 'Status', ok: 'Verified', rv: 'Review', conflict: 'Allergy conflict', docs: '5 documents', facts: 'facts' },
  ru: { pts: 'Пациенты', queue: 'Очередь сканов', review: 'На проверку', reports: 'Отчёты', today: 'Сегодня', reading: 'Чтение страницы', of: 'из', hand: 'рукопись, русский', done: 'Готово', ver: 'подтверждено', need: 'на проверку', date: 'Дата', fact: 'Факт', src: 'Источник', st: 'Статус', ok: 'Подтв.', rv: 'Проверить', conflict: 'Конфликт аллергии', docs: '5 документов', facts: 'фактов' },
  uz: { pts: 'Bemorlar', queue: 'Skan navbati', review: 'Tekshirish', reports: 'Hisobotlar', today: 'Bugun', reading: 'Sahifa o‘qilmoqda', of: '/', hand: 'qo‘lyozma, rus tili', done: 'Tayyor', ver: 'tasdiqlandi', need: 'tekshirish kerak', date: 'Sana', fact: 'Fakt', src: 'Manba', st: 'Holat', ok: 'Tasdiq', rv: 'Tekshir', conflict: 'Allergiya ziddiyati', docs: '5 hujjat', facts: 'fakt' },
}

const ROWS = [
  { d: '14.03.2021', f: { en: 'HbA1c 6.4 %', ru: 'HbA1c 6,4 %', uz: 'HbA1c 6,4 %' }, s: 'D1 p.1', ok: true, hi: true },
  { d: '02.09.2022', f: { en: 'Hypertension, stage II', ru: 'Гипертензия II ст.', uz: 'Gipertenziya II bosq.' }, s: 'D2 p.1', ok: true },
  { d: '02.09.2022', f: { en: 'Lisinopril 10 mg daily', ru: 'Лизиноприл 10 мг/сут', uz: 'Lizinopril 10 mg/kun' }, s: 'D2 p.1', ok: false },
  { d: '02.09.2022', f: { en: 'Allergy: penicillin (rash)', ru: 'Аллергия: пенициллин', uz: 'Allergiya: penitsillin' }, s: 'D2 p.2', ok: false, warn: true },
  { d: '20.06.2023', f: { en: 'HbA1c 7.1 %', ru: 'HbA1c 7,1 %', uz: 'HbA1c 7,1 %' }, s: 'D3 p.1', ok: true, hi: true },
  { d: '05.11.2024', f: { en: 'Type 2 diabetes (E11)', ru: 'Сахарный диабет 2 типа', uz: 'Qandli diabet 2-tur' }, s: 'D4 p.1', ok: true },
  { d: '05.11.2024', f: { en: 'Metformin 1000 mg ×2', ru: 'Метформин 1000 мг ×2', uz: 'Metformin 1000 mg ×2' }, s: 'D4 p.1', ok: true },
  { d: '12.08.2025', f: { en: 'HbA1c 6.6 %', ru: 'HbA1c 6,6 %', uz: 'HbA1c 6,6 %' }, s: 'D5 p.1', ok: true, hi: true },
]

export default function ProductShot() {
  const { lang } = useLang()
  const t = T[lang]
  const [n, setN] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v >= ROWS.length + 6 ? 0 : v + 1)), 650)
    return () => clearInterval(id)
  }, [])
  const shown = Math.min(n, ROWS.length)
  const done = n >= ROWS.length
  const page = Math.min(5, Math.floor((shown / ROWS.length) * 5) + 1)
  const a1c = [6.4, 7.1, 6.6]
  const cx = (i: number) => 14 + i * 66, cy = (v: number) => 62 - ((v - 5.5) / 2) * 52
  return (
    <div className="mx-auto w-full max-w-[600px] overflow-hidden">
      <div className="w-[600px] origin-top-left [zoom:0.58] min-[420px]:[zoom:0.66] sm:[zoom:0.9] lg:[zoom:1]">
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#F6F8F7] text-[#14212B] shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)]">
          {/* chrome */}
          <div className="flex items-center gap-2 border-b border-black/10 bg-[#E9EDEC] px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#E0675C]" /><span className="h-2.5 w-2.5 rounded-full bg-[#E3B341]" /><span className="h-2.5 w-2.5 rounded-full bg-[#5DBB63]" />
            <div className="ml-3 flex-1 rounded bg-white/80 px-2 py-0.5 font-mono text-[10.5px] text-[#4B5A66]">msi.ooou.uz/clinic/patients/0000-SYN</div>
          </div>
          <div className="grid grid-cols-[132px_1fr]">
            {/* sidebar */}
            <aside className="border-r border-black/[0.07] bg-[#EEF2F1] p-2.5 text-[11.5px]">
              <div className="mb-3 flex items-center gap-1.5 px-1 font-semibold"><span className="grid h-5 w-5 place-items-center rounded bg-teal text-[10px] text-white">M</span>MSi Clinic</div>
              {[[t.pts, ''], [t.queue, '3'], [t.review, '5'], [t.reports, '']].map(([l, c], i) => (
                <div key={l} className={`mb-0.5 flex items-center justify-between rounded px-2 py-1 ${i === 0 ? 'bg-white font-medium shadow-sm' : 'text-[#4B5A66]'}`}>{l}{c && <span className="rounded bg-[#14212B]/10 px-1 text-[10px]">{c}</span>}</div>
              ))}
              <div className="mb-1 mt-4 px-2 text-[10px] uppercase tracking-wider text-[#7A8893]">{t.today}</div>
              {['Aziza K.', 'Bekzod T.', 'Malika R.', 'Rustam N.'].map((p, i) => (
                <div key={p} className={`flex items-center gap-1.5 rounded px-2 py-1 ${i === 0 ? 'bg-teal-soft text-teal-2' : 'text-[#4B5A66]'}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-teal' : i === 2 ? 'bg-[#E3B341]' : 'bg-[#B5C0C7]'}`} />{p}
                </div>
              ))}
            </aside>
            {/* main */}
            <main className="min-w-0 p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-[15px] font-semibold">Aziza K. <span className="font-normal text-[#6B7A86]">· F · 1968</span></div>
                  <div className="text-[10.5px] text-[#6B7A86]">{t.docs} · {shown * 2 + 1} {t.facts} · synthetic</div>
                </div>
                <span className="rounded border border-[#C2410C]/30 bg-flagsoft px-1.5 py-0.5 text-[10.5px] font-medium text-flag">⚠ {t.conflict}</span>
              </div>
              {/* status */}
              <div className="mt-2.5 rounded-md border border-black/[0.07] bg-white px-2.5 py-1.5">
                <div className="flex justify-between text-[10.5px]">
                  <span className={done ? 'font-medium text-teal' : 'text-[#4B5A66]'}>{done ? `✓ ${t.done} · 14 ${t.ver}, 3 ${t.need}` : `${t.reading} ${page} ${t.of} 5 · ${page === 2 ? t.hand : 'OCR'}`}</span>
                  <span className="font-mono text-[#7A8893]">{Math.round((shown / ROWS.length) * 100)}%</span>
                </div>
                <div className="mt-1 h-1 overflow-hidden rounded bg-[#E3E9E8]"><motion.div className="h-full bg-teal" animate={{ width: `${(shown / ROWS.length) * 100}%` }} transition={{ duration: 0.5 }} /></div>
              </div>
              <div className="mt-2.5 grid grid-cols-[1fr_150px] gap-2.5">
                {/* table */}
                <div className="overflow-hidden rounded-md border border-black/[0.07] bg-white">
                  <div className="grid grid-cols-[66px_1fr_42px_50px] gap-1 border-b border-black/[0.07] bg-[#F3F6F5] px-2 py-1 text-[9.5px] uppercase tracking-wide text-[#7A8893]">
                    <span>{t.date}</span><span>{t.fact}</span><span>{t.src}</span><span>{t.st}</span>
                  </div>
                  <div className="h-[208px]">
                    {ROWS.slice(0, shown).map((r, i) => (
                      <motion.div key={i} initial={{ opacity: 0, backgroundColor: '#FFF6C9' }} animate={{ opacity: 1, backgroundColor: '#FFFFFF' }} transition={{ duration: 0.8 }}
                        className="grid grid-cols-[66px_1fr_42px_50px] items-center gap-1 border-b border-black/[0.05] px-2 py-[5px] text-[11px]">
                        <span className="font-mono text-[10px] text-[#6B7A86]">{r.d}</span>
                        <span className={`truncate ${r.warn ? 'text-flag' : ''}`}>{r.f[lang]}</span>
                        <span className="font-mono text-[9.5px] text-[#1E5A8C] underline decoration-dotted">{r.s}</span>
                        <span className={`rounded px-1 text-center text-[9.5px] font-medium ${r.ok ? 'bg-teal-soft text-teal-2' : 'bg-[#FDF0D5] text-[#8A5A00]'}`}>{r.ok ? t.ok : t.rv}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                {/* side cards */}
                <div className="space-y-2.5">
                  <div className="rounded-md border border-black/[0.07] bg-white p-2">
                    <div className="flex justify-between text-[10.5px]"><span className="font-medium">HbA1c</span><span className="font-mono text-[#7A8893]">%</span></div>
                    <svg viewBox="0 0 160 74" className="mt-1 w-full">
                      <rect x="0" y={cy(6)} width="160" height={cy(4) - cy(6)} fill="#D7EFE9" opacity=".7" />
                      <line x1="0" x2="160" y1={cy(6)} y2={cy(6)} stroke="#0E7C6B" strokeDasharray="2 2" strokeWidth=".8" />
                      <text x="157" y={cy(6) + 9} fontSize="7" textAnchor="end" fill="#0E7C6B">ref ≤ 6.0</text>
                      {a1c.map((v, i) => {
                        const on = i < ROWS.slice(0, shown).filter((r) => r.hi).length
                        return (
                          <g key={i} opacity={on ? 1 : 0.15}>
                            {i > 0 && <line x1={cx(i - 1)} y1={cy(a1c[i - 1])} x2={cx(i)} y2={cy(v)} stroke="#14212B" strokeWidth="1.3" />}
                            <circle cx={cx(i)} cy={cy(v)} r="2.6" fill={v > 6 ? '#C2410C' : '#0E7C6B'} />
                            <text x={cx(i)} y={cy(v) - 5} fontSize="7.5" textAnchor="middle" fill="#14212B">{v}</text>
                            <text x={cx(i)} y="72" fontSize="7" textAnchor="middle" fill="#7A8893">{['2021', '2023', '2025'][i]}</text>
                          </g>
                        )
                      })}
                    </svg>
                  </div>
                  <div className="rounded-md border border-black/[0.07] bg-white p-2">
                    <div className="text-[10.5px] font-medium">D2 · p.2</div>
                    <div className="mt-1 rotate-[-1deg] rounded-sm border border-black/[0.06] bg-[#FBFAF5] p-1.5 font-hand text-[13px] leading-tight text-[#24364A]">
                      Аллергия: <span className="bg-[#FFE15A]/70">пенициллин</span> — сыпь
                    </div>
                    <div className="mt-1.5 text-[9.5px] leading-snug text-flag">2024: «Allergiya: yo‘q»</div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
