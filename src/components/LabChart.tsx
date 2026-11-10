import { motion } from 'framer-motion'
import type { LabTest } from '../data'
import { fmtDate, fmtNum } from '../data'
import { useLang } from '../i18n'

const W = 560
const H = 250
const P = { l: 44, r: 20, t: 22, b: 34 }

export default function LabChart({ test, onPick }: { test: LabTest; onPick: (doc: string, line: string) => void }) {
  const { lang, t } = useLang()
  const vals = test.points.map((p) => p.v)
  const lo = Math.min(test.lo ?? test.hi * 0.7, ...vals)
  const hi = Math.max(test.hi, ...vals)
  const pad = (hi - lo) * 0.25
  const y0 = Math.max(0, lo - pad)
  const y1 = hi + pad
  const times = test.points.map((p) => new Date(p.date).getTime())
  const tMin = new Date('2020-10-01').getTime()
  const tMax = new Date('2026-01-01').getTime()
  const x = (ms: number) => P.l + ((ms - tMin) / (tMax - tMin)) * (W - P.l - P.r)
  const y = (v: number) => P.t + (1 - (v - y0) / (y1 - y0)) * (H - P.t - P.b)
  const ticks = Array.from({ length: 4 }, (_, i) => y0 + ((y1 - y0) * i) / 3)
  const path = test.points.map((p, i) => `${i ? 'L' : 'M'}${x(times[i]).toFixed(1)},${y(p.v).toFixed(1)}`).join(' ')
  const area = `${path} L${x(times[times.length - 1]).toFixed(1)},${H - P.b} L${x(times[0]).toFixed(1)},${H - P.b} Z`
  const bandTop = y(test.hi)
  const bandBot = y(test.lo ?? y0)
  const years = [2021, 2022, 2023, 2024, 2025]

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full min-w-[320px]" role="img" aria-label={`${test.name[lang]} ${test.unit}`}>
        <defs>
          <linearGradient id={`fill-${test.key}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#5EE6CF" stopOpacity="0.35" />
            <stop offset="1" stopColor="#5EE6CF" stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((v) => (
          <g key={v}>
            <line x1={P.l} x2={W - P.r} y1={y(v)} y2={y(v)} stroke="rgba(255,255,255,0.08)" />
            <text x={P.l - 8} y={y(v) + 4} textAnchor="end" fontSize="10" fill="#9FB6B6" fontFamily="JetBrains Mono, monospace">{fmtNum(Math.round(v * 10) / 10, lang)}</text>
          </g>
        ))}
        <rect x={P.l} width={W - P.l - P.r} y={bandTop} height={Math.max(0, bandBot - bandTop)} fill="rgba(94,230,207,0.10)" stroke="rgba(94,230,207,0.35)" strokeDasharray="4 4" />
        <text x={W - P.r - 6} y={Math.min(bandBot, H - P.b) - 6} textAnchor="end" fontSize="10" fill="#5EE6CF" fontFamily="JetBrains Mono, monospace">{t.demo.labs.range}: {test.lo !== null ? `${fmtNum(test.lo, lang)}–` : '< '}{fmtNum(test.hi, lang)}</text>
        {years.map((yr) => (
          <text key={yr} x={x(new Date(`${yr}-07-01`).getTime())} y={H - 10} textAnchor="middle" fontSize="10" fill="#9FB6B6" fontFamily="JetBrains Mono, monospace">{yr}</text>
        ))}
        <motion.path d={area} fill={`url(#fill-${test.key})`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} key={`a-${test.key}`} />
        <motion.path d={path} fill="none" stroke="#5EE6CF" strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, ease: 'easeOut' }} key={`p-${test.key}`} />
        {test.points.map((p, i) => {
          const out = p.v > test.hi || (test.lo !== null && p.v < test.lo)
          return (
            <g key={p.date} className="cursor-pointer" onClick={() => onPick(p.doc, p.line)}>
              <circle cx={x(times[i])} cy={y(p.v)} r="13" fill="transparent" />
              {out && <circle cx={x(times[i])} cy={y(p.v)} r="9" fill="none" stroke="#FFC86B" strokeOpacity="0.5" />}
              <circle cx={x(times[i])} cy={y(p.v)} r="5" fill={out ? '#FFC86B' : '#5EE6CF'} stroke="#07131C" strokeWidth="2" />
              <text x={x(times[i])} y={y(p.v) - 14} textAnchor="middle" fontSize="11" fontWeight="600" fill={out ? '#FFC86B' : '#EAF4F2'} fontFamily="JetBrains Mono, monospace">{fmtNum(p.v, lang)}</text>
              <title>{`${fmtDate(p.date, lang)} · ${fmtNum(p.v, lang)} ${test.unit} · ${p.doc}`}</title>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
