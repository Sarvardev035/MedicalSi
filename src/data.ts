// ALL DATA IN THIS FILE IS SYNTHETIC. No real patient, PINFL or clinic data.
import type { Lang } from './i18n'

export type Line = { id: string; text: string; pii?: boolean; head?: boolean }
export type Doc = {
  id: string
  kind: Record<Lang, string>
  facility: string
  date: string // ISO
  lang: string
  handwritten?: boolean
  title: string
  lines: Line[]
}

export const DOCS: Doc[] = [
  {
    id: 'D1', kind: { en: 'Lab report', ru: 'Анализы', uz: 'Tahlil' }, facility: 'Shifo-Lab (synthetic)', date: '2021-03-14', lang: 'RU',
    title: 'РЕЗУЛЬТАТЫ АНАЛИЗОВ',
    lines: [
      { id: 'D1-p', text: 'Пациент: Каримова Азиза Р.   ПИНФЛ 0000000000000', pii: true },
      { id: 'D1-h', text: 'Показатель        Результат      Норма', head: true },
      { id: 'D1-1', text: 'Глюкоза натощак    6,8 ммоль/л    3,9–6,1' },
      { id: 'D1-2', text: 'HbA1c              6,4 %          4,0–6,0' },
      { id: 'D1-3', text: 'Холестерин общий   6,2 ммоль/л    < 5,2' },
      { id: 'D1-4', text: 'Креатинин          79 мкмоль/л    44–97' },
    ],
  },
  {
    id: 'D2', kind: { en: 'Discharge note', ru: 'Выписка', uz: "Ko'chirma" }, facility: 'City Hospital No. 0 (synthetic)', date: '2022-09-02', lang: 'RU', handwritten: true,
    title: 'Выписка из истории болезни',
    lines: [
      { id: 'D2-p', text: 'ФИО: Каримова А.Р., 1968 г.р.', pii: true },
      { id: 'D2-1', text: 'Диагноз: Артериальная гипертензия II ст.' },
      { id: 'D2-2', text: 'АД при выписке 135/85' },
      { id: 'D2-3', text: 'Рек.: Лизиноприл 10 мг 1 р/д' },
      { id: 'D2-4', text: 'Аллергия: пенициллин — сыпь' },
    ],
  },
  {
    id: 'D3', kind: { en: 'Lab report', ru: 'Анализы', uz: 'Tahlil' }, facility: 'Diagnostika Markazi (synthetic)', date: '2023-06-20', lang: 'UZ',
    title: 'TAHLIL NATIJALARI',
    lines: [
      { id: 'D3-p', text: 'Bemor: Karimova Aziza   Tel: +998 00 000 00 00', pii: true },
      { id: 'D3-h', text: "Ko'rsatkich        Natija          Me'yor", head: true },
      { id: 'D3-1', text: 'Glyukoza (och)     7,4 mmol/l      3,9–6,1' },
      { id: 'D3-2', text: 'HbA1c              7,1 %           4,0–6,0' },
      { id: 'D3-3', text: 'Umumiy xolesterin  5,6 mmol/l      < 5,2' },
      { id: 'D3-4', text: 'Kreatinin          88 mkmol/l      44–97' },
    ],
  },
  {
    id: 'D4', kind: { en: 'Consultation', ru: 'Консультация', uz: "Ko'rik" }, facility: 'Endo Clinic (synthetic)', date: '2024-11-05', lang: 'UZ',
    title: "ENDOKRINOLOG KO'RIGI",
    lines: [
      { id: 'D4-p', text: 'Bemor: Karimova A.R.   Pasport: AA0000000', pii: true },
      { id: 'D4-1', text: 'Tashxis: Qandli diabet, 2-tur (E11)' },
      { id: 'D4-2', text: 'Metformin 1000 mg, kuniga 2 marta' },
      { id: 'D4-3', text: 'Lizinopril davom ettiriladi' },
      { id: 'D4-4', text: "Allergiya: yo'q" },
    ],
  },
  {
    id: 'D5', kind: { en: 'Lab report', ru: 'Анализы', uz: 'Tahlil' }, facility: 'MedLab Tashkent (synthetic)', date: '2025-08-12', lang: 'EN/RU',
    title: 'LAB REPORT / АНАЛИЗЫ',
    lines: [
      { id: 'D5-p', text: 'Patient: KARIMOVA AZIZA   ID 0000-000', pii: true },
      { id: 'D5-h', text: 'Test               Result          Range', head: true },
      { id: 'D5-1', text: 'Glucose fasting    6,3 mmol/L      3,9–6,1' },
      { id: 'D5-2', text: 'HbA1c              6,6 %           4,0–6,0' },
      { id: 'D5-3', text: 'Cholesterol total  4,9 mmol/L      < 5,2' },
      { id: 'D5-4', text: 'Creatinine         91 µmol/L       44–97' },
    ],
  },
]

export type Cat = 'encounter' | 'condition' | 'medication' | 'allergy' | 'lab' | 'vital'
export type Fact = {
  id: string
  cat: Cat
  date: string
  doc: string
  line: string
  label: Record<Lang, string>
  conf: number
  flag?: boolean
}

const L = (en: string, ru: string, uz: string) => ({ en, ru, uz })

export const FACTS: Fact[] = [
  { id: 'f1', cat: 'lab', date: '2021-03-14', doc: 'D1', line: 'D1-1', label: L('Fasting glucose 6.8 mmol/L', 'Глюкоза натощак 6,8 ммоль/л', 'Glyukoza (och) 6,8 mmol/l'), conf: 0.98 },
  { id: 'f2', cat: 'lab', date: '2021-03-14', doc: 'D1', line: 'D1-2', label: L('HbA1c 6.4 %', 'HbA1c 6,4 %', 'HbA1c 6,4 %'), conf: 0.97 },
  { id: 'f3', cat: 'lab', date: '2021-03-14', doc: 'D1', line: 'D1-3', label: L('Total cholesterol 6.2 mmol/L', 'Холестерин общий 6,2 ммоль/л', 'Umumiy xolesterin 6,2 mmol/l'), conf: 0.97 },
  { id: 'f4', cat: 'encounter', date: '2022-09-02', doc: 'D2', line: 'D2-1', label: L('Hospital stay, discharged', 'Госпитализация, выписка', 'Shifoxonada davolanish, chiqarilgan'), conf: 0.9 },
  { id: 'f5', cat: 'condition', date: '2022-09-02', doc: 'D2', line: 'D2-1', label: L('"Arterial hypertension, stage II" (as written)', '«Артериальная гипертензия II ст.» (как написано)', '«Arterial gipertenziya II bosqich» (yozilganidek)'), conf: 0.86 },
  { id: 'f6', cat: 'vital', date: '2022-09-02', doc: 'D2', line: 'D2-2', label: L('Blood pressure 135/85', 'АД 135/85', 'Qon bosimi 135/85'), conf: 0.81 },
  { id: 'f7', cat: 'medication', date: '2022-09-02', doc: 'D2', line: 'D2-3', label: L('Lisinopril 10 mg once daily', 'Лизиноприл 10 мг 1 раз в день', 'Lizinopril 10 mg kuniga 1 marta'), conf: 0.71 },
  { id: 'f8', cat: 'allergy', date: '2022-09-02', doc: 'D2', line: 'D2-4', label: L('Penicillin, rash', 'Пенициллин, сыпь', 'Penitsillin, toshma'), conf: 0.74, flag: true },
  { id: 'f9', cat: 'lab', date: '2023-06-20', doc: 'D3', line: 'D3-1', label: L('Fasting glucose 7.4 mmol/L', 'Глюкоза натощак 7,4 ммоль/л', 'Glyukoza (och) 7,4 mmol/l'), conf: 0.98 },
  { id: 'f10', cat: 'lab', date: '2023-06-20', doc: 'D3', line: 'D3-2', label: L('HbA1c 7.1 %', 'HbA1c 7,1 %', 'HbA1c 7,1 %'), conf: 0.98 },
  { id: 'f11', cat: 'encounter', date: '2024-11-05', doc: 'D4', line: 'D4-1', label: L('Endocrinology consultation', 'Консультация эндокринолога', "Endokrinolog ko'rigi"), conf: 0.95 },
  { id: 'f12', cat: 'condition', date: '2024-11-05', doc: 'D4', line: 'D4-1', label: L('"Diabetes mellitus, type 2 (E11)" (as written)', '«Сахарный диабет 2 типа (E11)» (как написано)', '«Qandli diabet, 2-tur (E11)» (yozilganidek)'), conf: 0.96 },
  { id: 'f13', cat: 'medication', date: '2024-11-05', doc: 'D4', line: 'D4-2', label: L('Metformin 1000 mg twice daily', 'Метформин 1000 мг 2 раза в день', 'Metformin 1000 mg kuniga 2 marta'), conf: 0.95 },
  { id: 'f14', cat: 'allergy', date: '2024-11-05', doc: 'D4', line: 'D4-4', label: L('"No allergies" recorded', 'Записано «аллергии нет»', "«Allergiya yo'q» deb yozilgan"), conf: 0.93, flag: true },
  { id: 'f15', cat: 'lab', date: '2025-08-12', doc: 'D5', line: 'D5-1', label: L('Fasting glucose 6.3 mmol/L', 'Глюкоза натощак 6,3 ммоль/л', 'Glyukoza (och) 6,3 mmol/l'), conf: 0.99 },
  { id: 'f16', cat: 'lab', date: '2025-08-12', doc: 'D5', line: 'D5-2', label: L('HbA1c 6.6 %', 'HbA1c 6,6 %', 'HbA1c 6,6 %'), conf: 0.99 },
  { id: 'f17', cat: 'lab', date: '2025-08-12', doc: 'D5', line: 'D5-3', label: L('Total cholesterol 4.9 mmol/L', 'Холестерин общий 4,9 ммоль/л', 'Umumiy xolesterin 4,9 mmol/l'), conf: 0.99 },
]

export type LabTest = {
  key: string
  name: Record<Lang, string>
  unit: string
  lo: number | null
  hi: number
  points: { date: string; v: number; doc: string; line: string }[]
}

export const LABS: LabTest[] = [
  {
    key: 'glu', name: L('Fasting glucose', 'Глюкоза натощак', 'Glyukoza (och)'), unit: 'mmol/L', lo: 3.9, hi: 6.1,
    points: [
      { date: '2021-03-14', v: 6.8, doc: 'D1', line: 'D1-1' },
      { date: '2023-06-20', v: 7.4, doc: 'D3', line: 'D3-1' },
      { date: '2025-08-12', v: 6.3, doc: 'D5', line: 'D5-1' },
    ],
  },
  {
    key: 'a1c', name: L('HbA1c', 'HbA1c', 'HbA1c'), unit: '%', lo: 4.0, hi: 6.0,
    points: [
      { date: '2021-03-14', v: 6.4, doc: 'D1', line: 'D1-2' },
      { date: '2023-06-20', v: 7.1, doc: 'D3', line: 'D3-2' },
      { date: '2025-08-12', v: 6.6, doc: 'D5', line: 'D5-2' },
    ],
  },
  {
    key: 'chol', name: L('Total cholesterol', 'Холестерин общий', 'Umumiy xolesterin'), unit: 'mmol/L', lo: null, hi: 5.2,
    points: [
      { date: '2021-03-14', v: 6.2, doc: 'D1', line: 'D1-3' },
      { date: '2023-06-20', v: 5.6, doc: 'D3', line: 'D3-3' },
      { date: '2025-08-12', v: 4.9, doc: 'D5', line: 'D5-3' },
    ],
  },
  {
    key: 'cr', name: L('Creatinine', 'Креатинин', 'Kreatinin'), unit: 'µmol/L', lo: 44, hi: 97,
    points: [
      { date: '2021-03-14', v: 79, doc: 'D1', line: 'D1-4' },
      { date: '2023-06-20', v: 88, doc: 'D3', line: 'D3-4' },
      { date: '2025-08-12', v: 91, doc: 'D5', line: 'D5-4' },
    ],
  },
]

export const fmtDate = (iso: string, lang: Lang) => {
  const [y, m, d] = iso.split('-')
  if (lang === 'en') {
    const mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][+m - 1]
    return `${+d} ${mon} ${y}`
  }
  return `${d}.${m}.${y}`
}

export const fmtNum = (v: number, lang: Lang) => (lang === 'en' ? String(v) : String(v).replace('.', ','))
