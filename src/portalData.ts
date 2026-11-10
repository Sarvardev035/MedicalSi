// Synthetic patients for the demo clinic portal. Not real people. Passport numbers use the
// reserved demo series "DM" and do not exist.
import type { Lang } from './i18n'

export type L3 = Record<Lang, string>
const L = (en: string, ru: string, uz: string): L3 => ({ en, ru, uz })

export type Lab = { panel: L3; test: L3; unit: string; ref: string; lo?: number; hi?: number; values: { date: string; v: number; src: string }[] }
export type Doc = { id: string; date: string; type: L3; facility: string; lang: string; pages: number; facts: number; review: number; hand?: boolean; lines: { t: string; mark?: boolean }[] }
export type Patient = {
  id: string; passport: string; name: string; sex: 'F' | 'M'; born: number; blood: string
  alerts: L3[]
  conditions: { y: string; name: L3; status: 'active' | 'resolved'; src: string }[]
  meds: { name: string; dose: L3; from: string; to?: string; src: string }[]
  allergies: { name: L3; note: L3; src: string; conflict?: boolean }[]
  vaccines: { name: L3; date: string; src: string }[]
  labs: Lab[]
  docs: Doc[]
  protected: {
    hereditary: { name: L3; detail: L3; src: string }[]
    hepatitis: { test: string; result: L3; date: string; src: string; positive?: boolean }[]
    family: L3[]
  }
}

const CBC = L('Blood count', 'Общий анализ крови', 'Umumiy qon tahlili')
const BIO = L('Biochemistry', 'Биохимия', 'Bioximiya')
const IMM = L('Immunity', 'Иммунитет', 'Immunitet')

export const PATIENTS: Patient[] = [
  {
    id: 'MSi-0001', passport: 'DM0000001', name: 'Aziza K.', sex: 'F', born: 1968, blood: 'A(II) Rh+',
    alerts: [L('Allergy records conflict: penicillin vs "no allergies"', 'Противоречие: аллергия на пенициллин и «аллергии нет»', 'Ziddiyat: penitsillin allergiyasi va "allergiya yo‘q"')],
    conditions: [
      { y: '2018', name: L('Gallstones, cholecystectomy', 'ЖКБ, холецистэктомия', 'O‘t tosh, xoletsistektomiya'), status: 'resolved', src: 'D0' },
      { y: '2021', name: L('COVID-19, moderate', 'COVID-19, средней тяжести', 'COVID-19, o‘rta og‘irlikda'), status: 'resolved', src: 'D6' },
      { y: '2022', name: L('Arterial hypertension, stage II', 'Артериальная гипертензия II ст.', 'Arterial gipertenziya II bosqich'), status: 'active', src: 'D2' },
      { y: '2024', name: L('Type 2 diabetes (E11)', 'Сахарный диабет 2 типа (E11)', 'Qandli diabet 2-tur (E11)'), status: 'active', src: 'D4' },
    ],
    meds: [
      { name: 'Dexamethasone', dose: L('6 mg, 10 days', '6 мг, 10 дней', '6 mg, 10 kun'), from: '2021-01', to: '2021-01', src: 'D6' },
      { name: 'Atorvastatin', dose: L('20 mg daily', '20 мг/сут', '20 mg kuniga'), from: '2021-04', to: '2025-08', src: 'D1' },
      { name: 'Lisinopril', dose: L('10 mg daily', '10 мг/сут', '10 mg kuniga'), from: '2022-09', src: 'D2' },
      { name: 'Metformin', dose: L('1000 mg twice daily', '1000 мг 2 р/сут', '1000 mg kuniga 2 marta'), from: '2024-11', src: 'D4' },
    ],
    allergies: [
      { name: L('Penicillin', 'Пенициллин', 'Penitsillin'), note: L('Rash, 2019 (written 2022)', 'Сыпь, 2019 (запись 2022)', 'Toshma, 2019 (2022 da yozilgan)'), src: 'D2', conflict: true },
      { name: L('"No allergies"', '«Аллергии нет»', '"Allergiya yo‘q"'), note: L('Recorded 2024, contradicts D2', 'Запись 2024, противоречит D2', '2024 yozuvi, D2 ga zid'), src: 'D4', conflict: true },
    ],
    vaccines: [
      { name: L('Hepatitis B (3 doses)', 'Гепатит B (3 дозы)', 'Gepatit B (3 doza)'), date: '2015', src: 'D0' },
      { name: L('COVID-19', 'COVID-19', 'COVID-19'), date: '2021-06', src: 'D6' },
      { name: L('Influenza', 'Грипп', 'Gripp'), date: '2025-10', src: 'D5' },
    ],
    labs: [
      { panel: BIO, test: L('Fasting glucose', 'Глюкоза натощак', 'Glyukoza (och)'), unit: 'mmol/L', ref: '3.9–6.1', lo: 3.9, hi: 6.1, values: [{ date: '2021-03', v: 6.8, src: 'D1' }, { date: '2023-06', v: 7.4, src: 'D3' }, { date: '2025-08', v: 6.3, src: 'D5' }] },
      { panel: BIO, test: L('HbA1c', 'HbA1c', 'HbA1c'), unit: '%', ref: '4.0–6.0', lo: 4, hi: 6, values: [{ date: '2021-03', v: 6.4, src: 'D1' }, { date: '2023-06', v: 7.1, src: 'D3' }, { date: '2025-08', v: 6.6, src: 'D5' }] },
      { panel: BIO, test: L('Total cholesterol', 'Холестерин общий', 'Umumiy xolesterin'), unit: 'mmol/L', ref: '< 5.2', hi: 5.2, values: [{ date: '2021-03', v: 6.2, src: 'D1' }, { date: '2025-08', v: 4.9, src: 'D5' }] },
      { panel: BIO, test: L('Creatinine', 'Креатинин', 'Kreatinin'), unit: 'µmol/L', ref: '53–97', lo: 53, hi: 97, values: [{ date: '2023-06', v: 81, src: 'D3' }, { date: '2025-08', v: 86, src: 'D5' }] },
      { panel: CBC, test: L('Haemoglobin', 'Гемоглобин', 'Gemoglobin'), unit: 'g/L', ref: '120–140', lo: 120, hi: 140, values: [{ date: '2021-03', v: 128, src: 'D1' }, { date: '2025-08', v: 131, src: 'D5' }] },
      { panel: IMM, test: L('White blood cells', 'Лейкоциты', 'Leykotsitlar'), unit: '×10⁹/L', ref: '4.0–9.0', lo: 4, hi: 9, values: [{ date: '2021-03', v: 6.1, src: 'D1' }, { date: '2025-08', v: 5.8, src: 'D5' }] },
      { panel: IMM, test: L('Lymphocytes', 'Лимфоциты', 'Limfotsitlar'), unit: '%', ref: '19–37', lo: 19, hi: 37, values: [{ date: '2021-03', v: 24, src: 'D1' }, { date: '2025-08', v: 29, src: 'D5' }] },
    ],
    docs: [
      { id: 'D1', date: '2021-03-14', type: L('Lab report', 'Анализы', 'Tahlil'), facility: 'Shifo-Lab', lang: 'RU', pages: 1, facts: 6, review: 0, lines: [{ t: 'Глюкоза натощак   6,8 ммоль/л   3,9–6,1', mark: true }, { t: 'HbA1c             6,4 %         4,0–6,0', mark: true }, { t: 'Холестерин общий  6,2 ммоль/л   < 5,2' }] },
      { id: 'D2', date: '2022-09-02', type: L('Discharge note', 'Выписка', 'Ko‘chirma'), facility: 'City Hospital No. 0', lang: 'RU', pages: 2, facts: 5, review: 2, hand: true, lines: [{ t: 'Диагноз: Артериальная гипертензия II ст.' }, { t: 'Лизиноприл 10 мг 1 р/д', mark: true }, { t: 'Аллергия: пенициллин — сыпь', mark: true }] },
      { id: 'D3', date: '2023-06-20', type: L('Lab report', 'Анализы', 'Tahlil'), facility: 'Diagnostika Markazi', lang: 'UZ', pages: 1, facts: 4, review: 0, lines: [{ t: 'Glyukoza (och)    7,4 mmol/l    3,9–6,1', mark: true }, { t: 'HbA1c             7,1 %         4,0–6,0', mark: true }] },
      { id: 'D4', date: '2024-11-05', type: L('Consultation', 'Консультация', 'Ko‘rik'), facility: 'Endo Clinic', lang: 'UZ', pages: 1, facts: 4, review: 1, lines: [{ t: 'Tashxis: Qandli diabet, 2-tur (E11)' }, { t: 'Metformin 1000 mg x 2', mark: true }, { t: "Allergiya: yo'q", mark: true }] },
      { id: 'D5', date: '2025-08-12', type: L('Lab report', 'Анализы', 'Tahlil'), facility: 'MedLab Tashkent', lang: 'EN/RU', pages: 2, facts: 9, review: 0, lines: [{ t: 'HbA1c             6,6 %         4,0–6,0', mark: true }, { t: 'Cholesterol total 4,9 mmol/L    < 5,2' }] },
    ],
    protected: {
      hereditary: [{ name: L('No hereditary condition recorded', 'Наследственных заболеваний не записано', 'Irsiy kasallik yozilmagan'), detail: L('Pharmacogenomic panel 2025: SLCO1B1 variant, higher risk of statin muscle side effects (research).', 'Фармакогенетика 2025: вариант SLCO1B1, выше риск мышечных эффектов статинов (исследование).', 'Farmakogenetika 2025: SLCO1B1 varianti, statinlarning mushak nojo‘ya ta’siri xavfi yuqori (tadqiqot).'), src: 'G1' }],
      hepatitis: [
        { test: 'HBsAg', result: L('Negative', 'Отрицательно', 'Manfiy'), date: '2023-06', src: 'D3' },
        { test: 'Anti-HBs', result: L('Positive (vaccinated)', 'Положительно (вакцинирована)', 'Musbat (emlangan)'), date: '2023-06', src: 'D3' },
        { test: 'Anti-HCV', result: L('Negative', 'Отрицательно', 'Manfiy'), date: '2023-06', src: 'D3' },
      ],
      family: [L('Mother: type 2 diabetes', 'Мать: диабет 2 типа', 'Onasi: qandli diabet 2-tur'), L('Father: heart attack at 61', 'Отец: инфаркт в 61 год', 'Otasi: 61 yoshda infarkt')],
    },
  },
  {
    id: 'MSi-0002', passport: 'DM0000002', name: 'Bekzod T.', sex: 'M', born: 1985, blood: 'O(I) Rh+',
    alerts: [L('Protected data on file: ask patient for access', 'Есть защищённые данные: нужен доступ пациента', 'Maxfiy ma’lumot bor: bemordan ruxsat so‘rang')],
    conditions: [
      { y: '1994', name: L('Bronchial asthma', 'Бронхиальная астма', 'Bronxial astma'), status: 'active', src: 'D1' },
      { y: '2010', name: L('Appendicitis, appendectomy', 'Аппендицит, аппендэктомия', 'Appenditsit, appendektomiya'), status: 'resolved', src: 'D2' },
      { y: '2023', name: L('Allergic rhinitis', 'Аллергический ринит', 'Allergik rinit'), status: 'active', src: 'D3' },
    ],
    meds: [
      { name: 'Salbutamol', dose: L('inhaler as needed', 'ингалятор по требованию', 'ingalyator kerak bo‘lganda'), from: '1994', src: 'D1' },
      { name: 'Budesonide', dose: L('200 µg twice daily', '200 мкг 2 р/сут', '200 mkg kuniga 2 marta'), from: '2019-02', src: 'D3' },
      { name: 'Cetirizine', dose: L('10 mg in spring', '10 мг весной', '10 mg bahorda'), from: '2023-04', src: 'D3' },
    ],
    allergies: [{ name: L('Pollen (wormwood)', 'Пыльца (полынь)', 'Gulchang (shuvoq)'), note: L('Seasonal, confirmed by skin test', 'Сезонная, подтверждена кожной пробой', 'Mavsumiy, teri sinovi bilan tasdiqlangan'), src: 'D3' }],
    vaccines: [
      { name: L('Hepatitis B', 'Гепатит B', 'Gepatit B'), date: L('not recorded', 'нет записи', 'yozilmagan').en, src: '—' },
      { name: L('COVID-19', 'COVID-19', 'COVID-19'), date: '2021-08', src: 'D3' },
      { name: L('Influenza', 'Грипп', 'Gripp'), date: '2024-11', src: 'D4' },
    ],
    labs: [
      { panel: CBC, test: L('Haemoglobin', 'Гемоглобин', 'Gemoglobin'), unit: 'g/L', ref: '130–160', lo: 130, hi: 160, values: [{ date: '2019-02', v: 148, src: 'D2' }, { date: '2024-11', v: 151, src: 'D4' }] },
      { panel: IMM, test: L('Eosinophils', 'Эозинофилы', 'Eozinofillar'), unit: '%', ref: '1–5', lo: 1, hi: 5, values: [{ date: '2019-02', v: 8, src: 'D2' }, { date: '2024-11', v: 6, src: 'D4' }] },
      { panel: IMM, test: L('Total IgE', 'Общий IgE', 'Umumiy IgE'), unit: 'IU/mL', ref: '< 100', hi: 100, values: [{ date: '2023-04', v: 310, src: 'D3' }] },
      { panel: BIO, test: L('ALT', 'АЛТ', 'ALT'), unit: 'U/L', ref: '≤ 41', hi: 41, values: [{ date: '2019-02', v: 38, src: 'D2' }, { date: '2024-11', v: 52, src: 'D4' }] },
    ],
    docs: [
      { id: 'D1', date: '2005-09-01', type: L('Outpatient card', 'Амбулаторная карта', 'Ambulator karta'), facility: 'Polyclinic No. 0', lang: 'RU', pages: 6, facts: 7, review: 3, hand: true, lines: [{ t: 'Бронхиальная астма с детства', mark: true }, { t: 'Сальбутамол по треб.' }] },
      { id: 'D2', date: '2019-02-11', type: L('Lab report', 'Анализы', 'Tahlil'), facility: 'Shifo-Lab', lang: 'RU', pages: 1, facts: 8, review: 0, lines: [{ t: 'Эозинофилы   8 %   1–5', mark: true }, { t: 'АЛТ          38 Ед/л  до 41' }] },
      { id: 'D3', date: '2023-04-18', type: L('Allergist consultation', 'Консультация аллерголога', 'Allergolog ko‘rigi'), facility: 'Allergo Center', lang: 'UZ', pages: 1, facts: 5, review: 0, lines: [{ t: 'IgE umumiy: 310 IU/ml', mark: true }, { t: 'Shuvoq gulchangi +++' }] },
      { id: 'D4', date: '2024-11-02', type: L('Lab report', 'Анализы', 'Tahlil'), facility: 'MedLab Tashkent', lang: 'EN/RU', pages: 2, facts: 10, review: 1, lines: [{ t: 'ALT  52 U/L   ≤ 41', mark: true }] },
    ],
    protected: {
      hereditary: [{ name: L('Asthma in family', 'Астма в семье', 'Oilada astma'), detail: L('Father and brother have asthma. No genetic test on file.', 'Астма у отца и брата. Генетических тестов нет.', 'Otasi va akasida astma. Genetik test yo‘q.'), src: 'D1' }],
      hepatitis: [
        { test: 'HBsAg', result: L('Positive since 2019 (chronic carrier)', 'Положительно с 2019 (хроническое носительство)', '2019 dan musbat (surunkali tashuvchi)'), date: '2024-11', src: 'D4', positive: true },
        { test: 'HBV DNA', result: L('Low, under hepatologist follow-up', 'Низкая, наблюдение гепатолога', 'Past, gepatolog nazoratida'), date: '2024-11', src: 'D4', positive: true },
        { test: 'Anti-HCV', result: L('Negative', 'Отрицательно', 'Manfiy'), date: '2024-11', src: 'D4' },
      ],
      family: [L('Father: asthma', 'Отец: астма', 'Otasi: astma'), L('Brother: asthma', 'Брат: астма', 'Akasi: astma')],
    },
  },
  {
    id: 'MSi-0003', passport: 'DM0000003', name: 'Malika R.', sex: 'F', born: 1994, blood: 'B(III) Rh−',
    alerts: [L('Rh-negative blood group', 'Rh-отрицательная группа крови', 'Rh-manfiy qon guruhi')],
    conditions: [
      { y: '2024', name: L('Pregnancy, delivered at term', 'Беременность, срочные роды', 'Homiladorlik, o‘z vaqtida tug‘ruq'), status: 'resolved', src: 'D2' },
      { y: '2024', name: L('Anaemia during pregnancy', 'Анемия беременных', 'Homiladorlik kamqonligi'), status: 'resolved', src: 'D1' },
    ],
    meds: [
      { name: 'Ferrous sulfate', dose: L('100 mg daily, 3 months', '100 мг/сут, 3 мес', '100 mg kuniga, 3 oy'), from: '2024-02', to: '2024-05', src: 'D1' },
      { name: 'Folic acid', dose: L('400 µg daily', '400 мкг/сут', '400 mkg kuniga'), from: '2023-11', to: '2024-07', src: 'D1' },
      { name: 'Anti-D immunoglobulin', dose: L('once after delivery', 'однократно после родов', 'tug‘ruqdan keyin bir marta'), from: '2024-07', to: '2024-07', src: 'D2' },
    ],
    allergies: [],
    vaccines: [
      { name: L('Hepatitis B', 'Гепатит B', 'Gepatit B'), date: '2012', src: 'D0' },
      { name: L('Tetanus-diphtheria', 'Столбняк-дифтерия', 'Qoqshol-difteriya'), date: '2024-03', src: 'D1' },
    ],
    labs: [
      { panel: CBC, test: L('Haemoglobin', 'Гемоглобин', 'Gemoglobin'), unit: 'g/L', ref: '120–140', lo: 120, hi: 140, values: [{ date: '2024-02', v: 98, src: 'D1' }, { date: '2024-06', v: 114, src: 'D1' }, { date: '2025-09', v: 123, src: 'D3' }] },
      { panel: CBC, test: L('MCV', 'MCV', 'MCV'), unit: 'fL', ref: '80–100', lo: 80, hi: 100, values: [{ date: '2024-02', v: 66, src: 'D1' }, { date: '2025-09', v: 67, src: 'D3' }] },
      { panel: BIO, test: L('Ferritin', 'Ферритин', 'Ferritin'), unit: 'ng/mL', ref: '15–150', lo: 15, hi: 150, values: [{ date: '2024-02', v: 9, src: 'D1' }, { date: '2025-09', v: 42, src: 'D3' }] },
      { panel: IMM, test: L('White blood cells', 'Лейкоциты', 'Leykotsitlar'), unit: '×10⁹/L', ref: '4.0–9.0', lo: 4, hi: 9, values: [{ date: '2024-02', v: 7.2, src: 'D1' }, { date: '2025-09', v: 6.4, src: 'D3' }] },
    ],
    docs: [
      { id: 'D1', date: '2024-02-08', type: L('Antenatal card', 'Обменная карта', 'Homiladorlik kartasi'), facility: 'Women’s Clinic No. 0', lang: 'UZ/RU', pages: 8, facts: 14, review: 2, hand: true, lines: [{ t: 'Gemoglobin 98 g/l', mark: true }, { t: 'Ferritin 9 ng/ml', mark: true }, { t: 'Temir preparati 100 mg' }] },
      { id: 'D2', date: '2024-07-21', type: L('Discharge note', 'Выписка', 'Ko‘chirma'), facility: 'Maternity No. 0', lang: 'RU', pages: 2, facts: 6, review: 0, lines: [{ t: 'Роды срочные, без осложнений' }, { t: 'Введён анти-D иммуноглобулин', mark: true }] },
      { id: 'D3', date: '2025-09-15', type: L('Lab report', 'Анализы', 'Tahlil'), facility: 'MedLab Tashkent', lang: 'EN/RU', pages: 1, facts: 7, review: 0, lines: [{ t: 'Hb 123 g/L   MCV 67 fL', mark: true }, { t: 'Hb electrophoresis: HbA2 5.1 %', mark: true }] },
    ],
    protected: {
      hereditary: [{ name: L('Beta-thalassaemia trait (carrier)', 'Носительство бета-талассемии', 'Beta-talassemiya tashuvchiligi'), detail: L('HbA2 5.1% on electrophoresis explains small red cells (low MCV) even with normal iron. Matters for family planning.', 'HbA2 5,1% объясняет низкий MCV при нормальном железе. Важно для планирования семьи.', 'HbA2 5,1% temir me’yorda bo‘lsa ham MCV pastligini tushuntiradi. Oila rejalashtirishda muhim.'), src: 'D3' }],
      hepatitis: [
        { test: 'HBsAg', result: L('Negative', 'Отрицательно', 'Manfiy'), date: '2024-02', src: 'D1' },
        { test: 'Anti-HCV', result: L('Negative', 'Отрицательно', 'Manfiy'), date: '2024-02', src: 'D1' },
      ],
      family: [L('Father: thalassaemia trait', 'Отец: носитель талассемии', 'Otasi: talassemiya tashuvchisi')],
    },
  },
]
