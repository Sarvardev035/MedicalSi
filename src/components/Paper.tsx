import { motion } from 'framer-motion'
import type { Doc } from '../data'
import { fmtDate } from '../data'
import { useLang } from '../i18n'

type Props = {
  doc: Doc
  highlight?: string | null
  scanning?: boolean
  masked?: boolean
  boxes?: boolean
  compact?: boolean
}

/** A synthetic paper document. Lines carry ids so facts can point to an exact region. */
export default function Paper({ doc, highlight, scanning, masked, boxes, compact }: Props) {
  const { lang, t } = useLang()
  const hand = doc.handwritten
  return (
    <div
      className={`paper-grain relative overflow-hidden rounded-md bg-[#FBFAF5] text-[#1B2733] shadow-[0_25px_50px_-20px_rgba(0,0,0,.6)] ${compact ? 'p-3' : 'p-5 sm:p-6'}`}
      style={{ transform: hand ? 'rotate(-0.6deg)' : undefined }}
    >
      <div className="mb-3 flex items-start justify-between gap-3 border-b border-dashed border-[#1B2733]/25 pb-2">
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[#1B2733]/60">{doc.facility}</div>
          <div className={`${hand ? 'font-hand text-2xl' : 'font-mono text-sm font-semibold'} leading-tight`}>{doc.title}</div>
        </div>
        <div className="shrink-0 text-right font-mono text-[10px] text-[#1B2733]/60">
          <div>{fmtDate(doc.date, lang)}</div>
          <div>{doc.id} · {t.demo.page} 1</div>
        </div>
      </div>
      <div className="space-y-1.5">
        {doc.lines.map((l) => {
          const on = highlight === l.id
          return (
            <div key={l.id} id={`line-${l.id}`} className="relative">
              {on && (
                <motion.span
                  layoutId="marker"
                  className="absolute -inset-x-1.5 -inset-y-0.5 rounded-sm bg-marker/80 mix-blend-multiply"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                />
              )}
              {boxes && !l.head && !l.pii && (
                <motion.span
                  className="absolute -inset-x-1 -inset-y-0.5 rounded-sm border border-teal/70 bg-teal/5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <div
                className={`relative whitespace-pre-wrap break-words ${
                  hand ? 'font-hand text-[19px] leading-snug sm:text-xl' : 'font-mono text-[11.5px] leading-relaxed sm:text-[12.5px]'
                } ${l.head ? 'text-[#1B2733]/50' : ''}`}
              >
                {l.text}
              </div>
              {l.pii && masked && (
                <motion.div
                  className="absolute inset-y-0 left-0 flex items-center rounded-sm bg-[#111] px-2 font-mono text-[10px] uppercase tracking-wider text-white/80"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="truncate">█ {t.demo.masked}</span>
                </motion.div>
              )}
            </div>
          )
        })}
      </div>
      {hand && (
        <div className="mt-4 flex justify-end">
          <div className="rotate-[-8deg] rounded-full border-2 border-[#2B4C9B]/60 px-3 py-1 font-mono text-[9px] uppercase text-[#2B4C9B]/70">stamp · synthetic</div>
        </div>
      )}
      {scanning && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-aqua/50 to-transparent"
          initial={{ top: '-15%' }}
          animate={{ top: '105%' }}
          transition={{ duration: 0.9, ease: 'linear', repeat: Infinity }}
        />
      )}
    </div>
  )
}
