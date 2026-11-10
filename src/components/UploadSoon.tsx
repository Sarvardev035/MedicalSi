// "Upload your own file" teaser. Nothing is uploaded: choosing a file only shows
// that AI checking of uploaded documents is coming in a later version.
import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { Clock, FileUp } from 'lucide-react'
import { useLang, type Lang } from '../i18n'
import { Reveal, Section } from './Story'

const T: Record<Lang, Record<string, string>> = {
  en: {
    eyebrow: 'Your own file', title: 'Upload a document, let AI check it.',
    sub: 'Soon you will be able to upload a lab sheet or medical record and get a first analysis: values compared with ranges, things worth noting, and the sources behind them.',
    pick: 'Choose PDF or photo', drop: 'or drop a file here',
    soonT: 'Coming soon', soon: 'Uploading files and AI checking will be available in the next version of MSi. For now, try the demo above with a synthetic patient.',
    file: 'Selected', none: 'Your file was not uploaded or saved.', back: 'Open the demo',
  },
  ru: {
    eyebrow: 'Ваш файл', title: 'Загрузите документ, и ИИ его проверит.',
    sub: 'Скоро можно будет загрузить бланк анализов или медицинский документ и получить первый анализ: значения против норм, на что обратить внимание и источники.',
    pick: 'Выбрать PDF или фото', drop: 'или перетащите файл сюда',
    soonT: 'Скоро', soon: 'Загрузка файлов и проверка с помощью ИИ появятся в следующей версии MSi. Пока попробуйте демо выше с синтетическим пациентом.',
    file: 'Выбрано', none: 'Ваш файл не загружался и не сохранялся.', back: 'Открыть демо',
  },
  uz: {
    eyebrow: 'O‘z faylingiz', title: 'Hujjat yuklang, AI tekshirib bersin.',
    sub: 'Tez orada tahlil blankasi yoki tibbiy hujjatni yuklab, birinchi tahlilni olishingiz mumkin bo‘ladi: me’yor bilan solishtirish, e’tibor berish kerak bo‘lgan joylar va manbalar.',
    pick: 'PDF yoki rasm tanlash', drop: 'yoki faylni shu yerga tashlang',
    soonT: 'Tez orada', soon: 'Fayl yuklash va AI orqali tekshirish MSi’ning keyingi versiyasida ishga tushadi. Hozircha yuqoridagi demoni sintetik bemor bilan sinab ko‘ring.',
    file: 'Tanlangan', none: 'Faylingiz yuklanmadi va saqlanmadi.', back: 'Demoni ochish',
  },
}

export function UploadSoon() {
  const { lang } = useLang()
  const t = T[lang]
  const input = useRef<HTMLInputElement>(null)
  const [name, setName] = useState<string | null>(null)
  const pick = (f?: File) => { if (f) setName(f.name); if (input.current) input.current.value = '' }
  return (
    <Section id="upload">
      <Reveal className="mb-8 max-w-3xl">
        <div className="mb-3 flex items-center gap-2">
          <span className="eyebrow">{t.eyebrow}</span>
          <span className="rounded border border-amber/40 bg-amber/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber">{t.soonT}</span>
        </div>
        <h2 className="h2">{t.title}</h2>
        <p className="lead mt-4 max-w-2xl">{t.sub}</p>
      </Reveal>
      <Reveal>
        <div className="panel p-4 sm:p-6">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); pick(e.dataTransfer.files[0]) }}
            className="flex flex-col items-start gap-3 rounded-lg border border-dashed border-white/20 bg-white/[0.02] p-5 sm:flex-row sm:items-center"
          >
            <button onClick={() => input.current?.click()} className="btn-ghost"><FileUp size={16} />{t.pick}</button>
            <span className="text-sm text-muted">{t.drop}</span>
            <input ref={input} type="file" accept="application/pdf,image/*" className="hidden" onChange={(e) => pick(e.target.files?.[0])} />
          </div>
          <AnimatePresence>
            {name && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status"
                className="mt-4 flex flex-col gap-3 rounded-lg border border-aqua/30 bg-aqua/[0.06] p-4 sm:flex-row sm:items-start">
                <Clock size={18} className="mt-0.5 shrink-0 text-aqua" />
                <div className="flex-1 text-sm">
                  <div className="font-semibold text-white">{t.soonT}</div>
                  <p className="mt-1 text-white/80">{t.soon}</p>
                  <p className="mt-2 font-mono text-[11px] text-muted">{t.file}: {name} · {t.none}</p>
                </div>
                <a href="#demo" className="btn-primary shrink-0 self-start">{t.back}</a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </Section>
  )
}
