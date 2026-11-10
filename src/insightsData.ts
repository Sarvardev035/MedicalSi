// Demo data for the doctor portal's "Similar cases", "Trends" and "Doctors network" views.
// All counts and percentages are SYNTHETIC: they show how the screens work, not real results.
// Guideline names are real documents; numbers in this file do not come from them.
// Hospital names are real public institutions listed only as examples (no partnership);
// every doctor profile is fictional.
import type { L3 } from './portalData'

const L = (en: string, ru: string, uz: string): L3 => ({ en, ru, uz })

// ---------- Similar cases ----------
export type Treatment = { name: L3; n: number; goal: number; side: number; sideName: L3; note?: L3 }
export type Cohort = {
  id: string
  protectedOnly?: boolean // shown only after the patient unlocks protected data
  title: L3
  criteria: L3[]
  n: number
  clinics: number
  outcome: L3
  guideline: string
  treatments: Treatment[]
  after: { label: L3; pct: number }[]
  afterTitle: L3
}

export const COHORTS: Record<string, Cohort[]> = {
  'MSi-0001': [{
    id: 't2d',
    title: L('Type 2 diabetes with hypertension', 'Диабет 2 типа с гипертензией', '2-tur diabet va gipertenziya'),
    criteria: [L('Women 50–65', 'Женщины 50–65', 'Ayollar 50–65'), L('Type 2 diabetes', 'Диабет 2 типа', 'Diabet 2-tur'), L('Hypertension', 'Гипертензия', 'Gipertenziya'), L('HbA1c 7.5–9%', 'HbA1c 7,5–9%', 'HbA1c 7,5–9%'), L('eGFR ≥ 60', 'СКФ ≥ 60', 'eGFR ≥ 60')],
    n: 1284, clinics: 14,
    outcome: L('HbA1c below 7% at 12 months', 'HbA1c ниже 7% через 12 мес.', '12 oyda HbA1c 7% dan past'),
    guideline: 'ADA Standards of Care in Diabetes',
    treatments: [
      { name: L('Metformin alone', 'Только метформин', 'Faqat metformin'), n: 412, goal: 48, side: 18, sideName: L('stomach upset', 'ЖКТ-расстройство', 'oshqozon buzilishi') },
      { name: L('Metformin + SGLT2 inhibitor', 'Метформин + иНГЛТ-2', 'Metformin + SGLT2 ingibitori'), n: 296, goal: 61, side: 6, sideName: L('genital infection', 'генитальная инфекция', 'jinsiy a’zo infeksiyasi'), note: L('Guidelines prefer it when heart or kidney disease is present', 'Рекомендации предпочитают при болезнях сердца или почек', 'Yurak yoki buyrak kasalligida tavsiyalar afzal ko‘radi') },
      { name: L('Metformin + GLP-1 RA', 'Метформин + арГПП-1', 'Metformin + GLP-1 RA'), n: 158, goal: 66, side: 21, sideName: L('nausea', 'тошнота', 'ko‘ngil aynishi') },
      { name: L('Metformin + DPP-4 inhibitor', 'Метформин + иДПП-4', 'Metformin + DPP-4 ingibitori'), n: 241, goal: 55, side: 4, sideName: L('joint pain', 'боль в суставах', 'bo‘g‘im og‘rig‘i') },
      { name: L('Basal insulin added', 'Добавлен базальный инсулин', 'Bazal insulin qo‘shilgan'), n: 177, goal: 52, side: 11, sideName: L('low sugar episodes', 'гипогликемии', 'qand tushib ketishi') },
    ],
    afterTitle: L('What happened to similar patients within 5 years', 'Что было с похожими пациентами за 5 лет', 'O‘xshash bemorlarda 5 yil ichida nima bo‘ldi'),
    after: [
      { label: L('Kidney function decline (CKD stage 3+)', 'Снижение функции почек (ХБП 3+)', 'Buyrak faoliyati pasayishi (SBK 3+)'), pct: 19 },
      { label: L('Retinopathy found at eye exam', 'Ретинопатия на осмотре глаз', 'Ko‘z tekshiruvida retinopatiya'), pct: 14 },
      { label: L('Heart attack or stroke', 'Инфаркт или инсульт', 'Infarkt yoki insult'), pct: 6 },
      { label: L('Foot ulcer', 'Язва стопы', 'Oyoq yarasi'), pct: 3 },
    ],
  }],
  'MSi-0002': [{
    id: 'asthma',
    title: L('Asthma with allergic rhinitis', 'Астма с аллергическим ринитом', 'Astma va allergik rinit'),
    criteria: [L('Adults 30–45', 'Взрослые 30–45', 'Kattalar 30–45'), L('Asthma', 'Астма', 'Astma'), L('Allergic rhinitis', 'Аллергический ринит', 'Allergik rinit'), L('Spring flare-ups', 'Весенние обострения', 'Bahorgi xurujlar')],
    n: 642, clinics: 11,
    outcome: L('Asthma well controlled (ACT ≥ 20) at 6 months', 'Астма под контролем (ACT ≥ 20) через 6 мес.', '6 oyda astma nazoratda (ACT ≥ 20)'),
    guideline: 'GINA 2024',
    treatments: [
      { name: L('Reliever only (SABA)', 'Только скоропомощь (КДБА)', 'Faqat tez yordam (SABA)'), n: 88, goal: 31, side: 2, sideName: L('tremor', 'тремор', 'titroq'), note: L('GINA no longer recommends SABA alone', 'GINA больше не рекомендует только КДБА', 'GINA endi faqat SABA ni tavsiya qilmaydi') },
      { name: L('Low-dose inhaled steroid (ICS)', 'Низкие дозы ИГКС', 'Past dozali ingalyatsion steroid'), n: 214, goal: 58, side: 5, sideName: L('hoarse voice', 'осиплость', 'ovoz xirillashi') },
      { name: L('ICS-formoterol as needed and daily (MART)', 'ИГКС-формотерол по потребности и ежедневно', 'ICS-formoterol kundalik va kerak bo‘lganda'), n: 196, goal: 72, side: 5, sideName: L('hoarse voice', 'осиплость', 'ovoz xirillashi') },
      { name: L('ICS + LABA fixed dose', 'ИГКС + ДДБА фиксированно', 'ICS + LABA belgilangan doza'), n: 122, goal: 68, side: 6, sideName: L('palpitations', 'сердцебиение', 'yurak urishi tezlashishi') },
      { name: L('Biologic (severe asthma only)', 'Биологическая терапия (тяжёлая астма)', 'Biologik terapiya (og‘ir astma)'), n: 22, goal: 64, side: 9, sideName: L('injection-site reaction', 'реакция в месте укола', 'ukol joyida reaksiya') },
    ],
    afterTitle: L('What happened to similar patients within 3 years', 'Что было с похожими пациентами за 3 года', 'O‘xshash bemorlarda 3 yil ichida nima bo‘ldi'),
    after: [
      { label: L('At least one ER visit for asthma', 'Хотя бы один вызов скорой из-за астмы', 'Astma sababli kamida bir marta tez yordam'), pct: 23 },
      { label: L('Needed oral steroids', 'Нужны были системные стероиды', 'Tabletka steroid kerak bo‘lgan'), pct: 17 },
      { label: L('Moved to severe asthma', 'Перешли в тяжёлую астму', 'Og‘ir astmaga o‘tgan'), pct: 4 },
    ],
  }, {
    id: 'hbv', protectedOnly: true,
    title: L('Chronic hepatitis B (HBsAg positive)', 'Хронический гепатит B (HBsAg+)', 'Surunkali gepatit B (HBsAg+)'),
    criteria: [L('Adults 30–45', 'Взрослые 30–45', 'Kattalar 30–45'), L('HBsAg positive', 'HBsAg положительный', 'HBsAg musbat'), L('ALT above range', 'АЛТ выше нормы', 'ALT me’yordan yuqori'), L('No cirrhosis', 'Без цирроза', 'Sirrozsiz')],
    n: 318, clinics: 9,
    outcome: L('HBV DNA undetectable at 12 months', 'ДНК ВГВ не определяется через 12 мес.', '12 oyda HBV DNK aniqlanmaydi'),
    guideline: 'WHO Hepatitis B guidelines 2024 · EASL',
    treatments: [
      { name: L('Entecavir', 'Энтекавир', 'Entekavir'), n: 124, goal: 78, side: 3, sideName: L('headache', 'головная боль', 'bosh og‘rig‘i') },
      { name: L('Tenofovir disoproxil (TDF)', 'Тенофовир дизопроксил (TDF)', 'Tenofovir dizoproksil (TDF)'), n: 141, goal: 80, side: 5, sideName: L('kidney marker change', 'изменение почечных маркеров', 'buyrak ko‘rsatkichi o‘zgarishi') },
      { name: L('Tenofovir alafenamide (TAF)', 'Тенофовир алафенамид (TAF)', 'Tenofovir alafenamid (TAF)'), n: 53, goal: 81, side: 2, sideName: L('nausea', 'тошнота', 'ko‘ngil aynishi') },
    ],
    afterTitle: L('What happened to similar patients within 5 years', 'Что было с похожими пациентами за 5 лет', 'O‘xshash bemorlarda 5 yil ichida nima bo‘ldi'),
    after: [
      { label: L('Family members tested after diagnosis', 'Родственники обследованы после диагноза', 'Tashxisdan keyin oila a’zolari tekshirilgan'), pct: 61 },
      { label: L('Stopped treatment on their own', 'Сами прекратили лечение', 'Davolanishni o‘zi to‘xtatgan'), pct: 12 },
      { label: L('Developed cirrhosis', 'Развился цирроз', 'Sirroz rivojlangan'), pct: 4 },
    ],
  }],
  'MSi-0003': [{
    id: 'preg',
    title: L('Anaemia in pregnancy', 'Анемия беременных', 'Homiladorlik anemiyasi'),
    criteria: [L('Pregnant, 2nd trimester', 'Беременность, 2 триместр', 'Homiladorlik, 2-trimestr'), L('Hb 95–105 g/L', 'Hb 95–105 г/л', 'Hb 95–105 g/L'), L('Low MCV', 'Низкий MCV', 'Past MCV')],
    n: 211, clinics: 8,
    outcome: L('Hb 110 g/L or more after 8 weeks', 'Hb 110 г/л и выше через 8 нед.', '8 haftadan keyin Hb 110 g/L va undan yuqori'),
    guideline: 'WHO antenatal care recommendations',
    treatments: [
      { name: L('Oral iron daily', 'Пероральное железо ежедневно', 'Har kuni tabletka temir'), n: 104, goal: 62, side: 24, sideName: L('constipation, nausea', 'запор, тошнота', 'qabziyat, ko‘ngil aynishi') },
      { name: L('Oral iron every other day', 'Пероральное железо через день', 'Kun ora tabletka temir'), n: 46, goal: 59, side: 12, sideName: L('constipation', 'запор', 'qabziyat') },
      { name: L('IV iron', 'Железо внутривенно', 'Vena orqali temir'), n: 31, goal: 81, side: 4, sideName: L('infusion reaction', 'реакция на инфузию', 'infuziya reaksiyasi') },
      { name: L('Diet advice only', 'Только диета', 'Faqat parhez'), n: 30, goal: 22, side: 0, sideName: L('none', 'нет', 'yo‘q') },
    ],
    afterTitle: L('What happened to similar patients', 'Что было с похожими пациентами', 'O‘xshash bemorlarda nima bo‘ldi'),
    after: [
      { label: L('Hb did not rise on iron: later found to be thalassaemia trait', 'Hb не вырос на железе: позже найдена талассемия', 'Temirda Hb oshmadi: keyin talassemiya belgisi topildi'), pct: 9 },
      { label: L('Blood transfusion before delivery', 'Переливание крови до родов', 'Tug‘ruqdan oldin qon quyish'), pct: 2 },
    ],
  }, {
    id: 'thal', protectedOnly: true,
    title: L('Beta-thalassaemia trait in pregnancy', 'Бета-талассемия (носительство) при беременности', 'Homiladorlikda beta-talassemiya belgisi'),
    criteria: [L('Pregnant', 'Беременность', 'Homiladorlik'), L('Beta-thal trait', 'Носительство бета-талассемии', 'Beta-talassemiya belgisi'), L('Ferritin normal', 'Ферритин в норме', 'Ferritin me’yorda')],
    n: 47, clinics: 5,
    outcome: L('Stable Hb without iron overload', 'Стабильный Hb без перегрузки железом', 'Temir ortiqchaligisiz barqaror Hb'),
    guideline: 'TIF guidelines (Thalassaemia International Federation)',
    treatments: [
      { name: L('Folic acid, no iron (ferritin normal)', 'Фолиевая кислота без железа', 'Foliy kislota, temirsiz'), n: 29, goal: 76, side: 0, sideName: L('none', 'нет', 'yo‘q') },
      { name: L('Iron given anyway', 'Железо всё равно назначено', 'Baribir temir berilgan'), n: 18, goal: 39, side: 22, sideName: L('ferritin rose above range', 'ферритин выше нормы', 'ferritin me’yordan oshgan'), note: L('Iron does not fix trait-related anaemia', 'Железо не лечит анемию от носительства', 'Temir talassemiya anemiyasini tuzatmaydi') },
    ],
    afterTitle: L('What happened next', 'Что было дальше', 'Keyin nima bo‘ldi'),
    after: [
      { label: L('Partner tested', 'Партнёр обследован', 'Turmush o‘rtog‘i tekshirilgan'), pct: 72 },
      { label: L('Both partners carriers: genetic counselling', 'Оба носители: генетическая консультация', 'Ikkalasi tashuvchi: genetik maslahat'), pct: 11 },
    ],
  }],
}

// ---------- Trends ----------
export type Trend = { id: string; name: L3; base: number; growth: number; season: number; peak: number; factors: { label: L3; pct: number }[]; women: number; age: string; note: L3 }
export const TRENDS: Trend[] = [
  { id: 'flu', name: L('Influenza-like illness', 'ОРВИ / гриппоподобные', 'Gripp va O‘RVI'), base: 820, growth: 0.04, season: 0.75, peak: 0, women: 52, age: '0–14, 65+',
    factors: [{ label: L('Not vaccinated this season', 'Не привит в этом сезоне', 'Bu mavsum emlanmagan'), pct: 88 }, { label: L('Child in the household', 'Ребёнок в семье', 'Uyda bola bor'), pct: 61 }, { label: L('Chronic lung or heart disease', 'Хронические болезни лёгких/сердца', 'Surunkali o‘pka/yurak kasalligi'), pct: 19 }],
    note: L('Peaks December–February every year', 'Пик ежегодно в декабре–феврале', 'Har yili dekabr–fevralda cho‘qqi') },
  { id: 't2d', name: L('Type 2 diabetes, new cases', 'Диабет 2 типа, новые случаи', '2-tur diabet, yangi holatlar'), base: 140, growth: 0.18, season: 0.05, peak: 9, women: 55, age: '45–64',
    factors: [{ label: L('BMI 30 or more', 'ИМТ 30 и выше', 'TVI 30 va undan yuqori'), pct: 54 }, { label: L('Family history of diabetes', 'Диабет у родственников', 'Oilada diabet'), pct: 38 }, { label: L('High blood pressure', 'Повышенное давление', 'Yuqori qon bosimi'), pct: 47 }],
    note: L('Steady rise; more cases found at check-ups', 'Устойчивый рост; больше находят на профосмотрах', 'Barqaror o‘sish; ko‘proq tekshiruvda topilmoqda') },
  { id: 'htn', name: L('Hypertension, new cases', 'Гипертензия, новые случаи', 'Gipertenziya, yangi holatlar'), base: 210, growth: 0.11, season: 0.08, peak: 0, women: 49, age: '40–69',
    factors: [{ label: L('BMI 30 or more', 'ИМТ 30 и выше', 'TVI 30 va undan yuqori'), pct: 41 }, { label: L('Smoking', 'Курение', 'Chekish'), pct: 27 }, { label: L('Diabetes', 'Диабет', 'Diabet'), pct: 22 }],
    note: L('Slightly more in winter', 'Немного больше зимой', 'Qishda biroz ko‘proq') },
  { id: 'ida', name: L('Iron-deficiency anaemia', 'Железодефицитная анемия', 'Temir tanqisligi anemiyasi'), base: 175, growth: 0.07, season: 0.04, peak: 3, women: 81, age: '18–45',
    factors: [{ label: L('Pregnancy', 'Беременность', 'Homiladorlik'), pct: 31 }, { label: L('Heavy periods recorded', 'Обильные менструации', 'Ko‘p hayz qayd etilgan'), pct: 26 }, { label: L('Low-meat diet noted', 'Мало мяса в рационе', 'Ratsionda go‘sht kam'), pct: 18 }],
    note: L('Mostly women of child-bearing age', 'В основном женщины детородного возраста', 'Asosan tug‘ish yoshidagi ayollar') },
  { id: 'asthma', name: L('Asthma and allergic flare-ups', 'Обострения астмы и аллергии', 'Astma va allergiya xurujlari'), base: 95, growth: 0.09, season: 0.6, peak: 4, women: 47, age: '5–45',
    factors: [{ label: L('Pollen season (April–June)', 'Сезон пыльцы (апрель–июнь)', 'Gulchang mavsumi (aprel–iyun)'), pct: 64 }, { label: L('Smoker in the household', 'Курящий в семье', 'Uyda chekuvchi'), pct: 29 }, { label: L('Dust storm days', 'Дни пыльных бурь', 'Chang bo‘roni kunlari'), pct: 22 }],
    note: L('Clear spring peak, second smaller peak in autumn', 'Пик весной, меньший осенью', 'Bahorda aniq cho‘qqi, kuzda kichikroq') },
  { id: 'hbv', name: L('Hepatitis B, newly found', 'Гепатит B, впервые выявлен', 'Gepatit B, yangi aniqlangan'), base: 38, growth: 0.04, season: 0.03, peak: 6, women: 46, age: '25–55',
    factors: [{ label: L('Found at pre-surgery screening', 'Найден при обследовании перед операцией', 'Operatsiya oldi tekshiruvda topilgan'), pct: 44 }, { label: L('Found at pregnancy screening', 'Найден при скрининге беременных', 'Homiladorlik skriningida topilgan'), pct: 21 }, { label: L('Family member positive', 'Положительный родственник', 'Oila a’zosi musbat'), pct: 17 }],
    note: L('Most cases have no symptoms and are found by screening', 'Чаще без симптомов, находят скринингом', 'Ko‘pincha belgisiz, skrining orqali topiladi') },
]
export const MONTHS = 24
// Deterministic synthetic monthly counts. Index 0 = Dec 2024, 23 = Nov 2026.
export function series(tr: Trend): number[] {
  return Array.from({ length: MONTHS }, (_, i) => {
    const m = (11 + i) % 12
    const d = Math.min(Math.abs(m - tr.peak), 12 - Math.abs(m - tr.peak))
    const s = 1 + tr.season * Math.cos((d / 6) * Math.PI) * 0.8
    const g = 1 + (tr.growth * i) / 12
    const wob = 1 + 0.04 * Math.sin(i * 2.3 + tr.base)
    return Math.round(tr.base * s * g * wob)
  })
}

// ---------- Doctors network ----------
export type Spec = 'cardio' | 'endo' | 'hep' | 'pulm' | 'haem' | 'onco' | 'neuro'
export const SPECS: Record<Spec, L3> = {
  cardio: L('Cardiology', 'Кардиология', 'Kardiologiya'),
  endo: L('Endocrinology', 'Эндокринология', 'Endokrinologiya'),
  hep: L('Hepatology', 'Гепатология', 'Gepatologiya'),
  pulm: L('Pulmonology', 'Пульмонология', 'Pulmonologiya'),
  haem: L('Haematology', 'Гематология', 'Gematologiya'),
  onco: L('Oncology', 'Онкология', 'Onkologiya'),
  neuro: L('Neurology', 'Неврология', 'Nevrologiya'),
}
// Search words people type, in three languages.
export const SPEC_WORDS: Record<Spec, string[]> = {
  cardio: ['cardio', 'heart', 'кардио', 'сердц', 'kardio', 'yurak'],
  endo: ['endo', 'diabet', 'thyro', 'эндо', 'диабет', 'щитов', 'qand', 'qalqon'],
  hep: ['hepat', 'liver', 'гепат', 'печен', 'gepat', 'jigar'],
  pulm: ['pulm', 'lung', 'asthma', 'пульм', 'лёгк', 'легк', 'астм', 'o‘pka', "o'pka", 'opka', 'astma'],
  haem: ['haem', 'hem', 'blood', 'thalass', 'гемат', 'кров', 'талас', 'gemat', 'qon', 'talas'],
  onco: ['onco', 'cancer', 'tumor', 'онко', 'рак', 'опухол', 'onko', 'saraton'],
  neuro: ['neuro', 'brain', 'stroke', 'невр', 'мозг', 'инсульт', 'nevro', 'nevr', 'miya', 'insult'],
}

export type Hospital = { id: string; name: string; city: string; country: L3; cc: string; specs: Spec[] }
const C = {
  us: L('USA', 'США', 'AQSH'), de: L('Germany', 'Германия', 'Germaniya'), se: L('Sweden', 'Швеция', 'Shvetsiya'),
  il: L('Israel', 'Израиль', 'Isroil'), kr: L('South Korea', 'Южная Корея', 'Janubiy Koreya'), in: L('India', 'Индия', 'Hindiston'),
  tr: L('Türkiye', 'Турция', 'Turkiya'), uz: L('Uzbekistan', 'Узбекистан', 'O‘zbekiston'), gb: L('United Kingdom', 'Великобритания', 'Buyuk Britaniya'),
  fr: L('France', 'Франция', 'Fransiya'), jp: L('Japan', 'Япония', 'Yaponiya'),
}
export const HOSPITALS: Hospital[] = [
  { id: 'h1', name: 'Mayo Clinic', city: 'Rochester', country: C.us, cc: 'US', specs: ['cardio', 'endo', 'hep', 'onco', 'neuro'] },
  { id: 'h2', name: 'Cleveland Clinic', city: 'Cleveland', country: C.us, cc: 'US', specs: ['cardio', 'pulm', 'endo'] },
  { id: 'h3', name: 'Charité – Universitätsmedizin Berlin', city: 'Berlin', country: C.de, cc: 'DE', specs: ['cardio', 'haem', 'onco', 'neuro'] },
  { id: 'h4', name: 'Karolinska University Hospital', city: 'Stockholm', country: C.se, cc: 'SE', specs: ['endo', 'haem', 'neuro'] },
  { id: 'h5', name: 'Sheba Medical Center', city: 'Ramat Gan', country: C.il, cc: 'IL', specs: ['onco', 'cardio', 'haem'] },
  { id: 'h6', name: 'Asan Medical Center', city: 'Seoul', country: C.kr, cc: 'KR', specs: ['hep', 'onco'] },
  { id: 'h7', name: 'Apollo Hospitals', city: 'Chennai', country: C.in, cc: 'IN', specs: ['cardio', 'hep'] },
  { id: 'h8', name: 'Acıbadem Maslak Hospital', city: 'Istanbul', country: C.tr, cc: 'TR', specs: ['onco', 'haem', 'cardio'] },
  { id: 'h9', name: 'Royal Brompton Hospital', city: 'London', country: C.gb, cc: 'GB', specs: ['pulm', 'cardio'] },
  { id: 'h10', name: 'Pitié-Salpêtrière Hospital', city: 'Paris', country: C.fr, cc: 'FR', specs: ['neuro', 'cardio'] },
  { id: 'h11', name: 'The University of Tokyo Hospital', city: 'Tokyo', country: C.jp, cc: 'JP', specs: ['hep', 'onco'] },
  { id: 'h12', name: 'Republican Specialized Cardiology Center', city: 'Tashkent', country: C.uz, cc: 'UZ', specs: ['cardio'] },
  { id: 'h13', name: 'Republican Specialized Endocrinology Center', city: 'Tashkent', country: C.uz, cc: 'UZ', specs: ['endo'] },
]

export type Doctor = { id: string; name: string; spec: Spec; hosp: string; role: L3; focus: L3; langs: string; years: number; reply: L3 }
const R = {
  head: L('Head of department', 'Заведующий отделением', 'Bo‘lim mudiri'),
  cons: L('Consultant', 'Консультант', 'Konsultant'),
  prof: L('Professor', 'Профессор', 'Professor'),
}
const day = L('usually replies within a day', 'обычно отвечает за день', 'odatda bir kunda javob beradi')
const hrs = L('usually replies within hours', 'обычно отвечает за несколько часов', 'odatda bir necha soatda javob beradi')
export const DOCTORS: Doctor[] = [
  { id: 'd1', name: 'Dr. Ellen Hartwell', spec: 'cardio', hosp: 'h1', role: R.cons, focus: L('Heart failure, cardiac imaging', 'Сердечная недостаточность, визуализация', 'Yurak yetishmovchiligi, tasvirlash'), langs: 'EN', years: 19, reply: day },
  { id: 'd2', name: 'Dr. Marcus Feld', spec: 'cardio', hosp: 'h3', role: R.prof, focus: L('Arrhythmia, ablation', 'Аритмии, абляция', 'Aritmiya, ablatsiya'), langs: 'DE · EN · RU', years: 24, reply: day },
  { id: 'd3', name: 'Dr. Priya Raman', spec: 'cardio', hosp: 'h7', role: R.head, focus: L('Coronary interventions', 'Коронарные вмешательства', 'Koronar aralashuvlar'), langs: 'EN · TA', years: 21, reply: hrs },
  { id: 'd4', name: 'Dr. Bobur Alimov', spec: 'cardio', hosp: 'h12', role: R.cons, focus: L('Hypertension, heart failure', 'Гипертензия, СН', 'Gipertenziya, yurak yetishmovchiligi'), langs: 'UZ · RU · EN', years: 12, reply: hrs },
  { id: 'd5', name: 'Dr. Selin Aydın', spec: 'cardio', hosp: 'h8', role: R.cons, focus: L('Valve disease, TAVI', 'Клапанные пороки, TAVI', 'Klapan kasalliklari, TAVI'), langs: 'TR · EN', years: 15, reply: day },
  { id: 'd6', name: 'Dr. James Okafor', spec: 'cardio', hosp: 'h2', role: R.prof, focus: L('Preventive cardiology', 'Профилактическая кардиология', 'Profilaktik kardiologiya'), langs: 'EN', years: 22, reply: day },
  { id: 'd7', name: 'Dr. Anna Lindqvist', spec: 'endo', hosp: 'h4', role: R.prof, focus: L('Type 2 diabetes, obesity', 'Диабет 2 типа, ожирение', '2-tur diabet, semizlik'), langs: 'SV · EN', years: 20, reply: day },
  { id: 'd8', name: 'Dr. Dilnoza Rashidova', spec: 'endo', hosp: 'h13', role: R.head, focus: L('Diabetes, thyroid disease', 'Диабет, щитовидная железа', 'Diabet, qalqonsimon bez'), langs: 'UZ · RU · EN', years: 16, reply: hrs },
  { id: 'd9', name: 'Dr. Laura Brennan', spec: 'endo', hosp: 'h2', role: R.cons, focus: L('Diabetes technology, insulin pumps', 'Технологии при диабете, помпы', 'Diabet texnologiyalari, insulin pompalari'), langs: 'EN · ES', years: 11, reply: day },
  { id: 'd10', name: 'Dr. Min-jun Park', spec: 'hep', hosp: 'h6', role: R.prof, focus: L('Hepatitis B, liver cancer screening', 'Гепатит B, скрининг рака печени', 'Gepatit B, jigar saratoni skriningi'), langs: 'KO · EN', years: 23, reply: day },
  { id: 'd11', name: 'Dr. Haruto Sato', spec: 'hep', hosp: 'h11', role: R.cons, focus: L('Viral hepatitis, liver transplant', 'Вирусные гепатиты, трансплантация', 'Virusli gepatit, jigar ko‘chirish'), langs: 'JA · EN', years: 17, reply: day },
  { id: 'd12', name: 'Dr. Ravi Menon', spec: 'hep', hosp: 'h7', role: R.head, focus: L('Fatty liver, hepatitis B/C', 'Жировая болезнь печени, гепатиты B/C', 'Yog‘li jigar, gepatit B/C'), langs: 'EN · HI', years: 19, reply: hrs },
  { id: 'd13', name: 'Dr. Olivia Grant', spec: 'pulm', hosp: 'h9', role: R.cons, focus: L('Severe asthma, biologics', 'Тяжёлая астма, биологики', 'Og‘ir astma, biologik dorilar'), langs: 'EN', years: 14, reply: day },
  { id: 'd14', name: 'Dr. Thomas Reid', spec: 'pulm', hosp: 'h2', role: R.prof, focus: L('COPD, lung function', 'ХОБЛ, функция лёгких', 'O‘SOK, o‘pka faoliyati'), langs: 'EN', years: 25, reply: day },
  { id: 'd15', name: 'Dr. Noa Ben-David', spec: 'haem', hosp: 'h5', role: R.cons, focus: L('Thalassaemia, haemoglobin disorders', 'Талассемия, гемоглобинопатии', 'Talassemiya, gemoglobin kasalliklari'), langs: 'HE · EN · RU', years: 13, reply: hrs },
  { id: 'd16', name: 'Dr. Katrin Vogel', spec: 'haem', hosp: 'h3', role: R.prof, focus: L('Anaemia, bone marrow failure', 'Анемии, недостаточность костного мозга', 'Anemiya, ilik yetishmovchiligi'), langs: 'DE · EN', years: 21, reply: day },
  { id: 'd17', name: 'Dr. Emre Yılmaz', spec: 'onco', hosp: 'h8', role: R.head, focus: L('Breast and lung cancer', 'Рак груди и лёгких', 'Ko‘krak va o‘pka saratoni'), langs: 'TR · EN', years: 18, reply: day },
  { id: 'd18', name: 'Dr. Ji-woo Han', spec: 'onco', hosp: 'h6', role: R.cons, focus: L('Stomach and liver cancer', 'Рак желудка и печени', 'Oshqozon va jigar saratoni'), langs: 'KO · EN', years: 12, reply: day },
  { id: 'd19', name: 'Dr. Claire Moreau', spec: 'neuro', hosp: 'h10', role: R.prof, focus: L('Stroke, movement disorders', 'Инсульт, двигательные расстройства', 'Insult, harakat buzilishlari'), langs: 'FR · EN', years: 20, reply: day },
  { id: 'd20', name: 'Dr. Erik Nyström', spec: 'neuro', hosp: 'h4', role: R.cons, focus: L('Epilepsy', 'Эпилепсия', 'Epilepsiya'), langs: 'SV · EN', years: 10, reply: day },
]
