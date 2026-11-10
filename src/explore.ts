// Educational demo content. Clinic names and prices are SAMPLE figures, clearly labelled on the page.
type T = { en: string; ru: string; uz: string }
const L = (en: string, ru: string, uz: string): T => ({ en, ru, uz })

export type City = { id: string; name: T; lon: number; lat: number; flight: number }
export const CITIES: City[] = [
  { id: 'tas', name: L('Tashkent', 'Ташкент', 'Toshkent'), lon: 69.24, lat: 41.3, flight: 0 },
  { id: 'ist', name: L('Istanbul', 'Стамбул', 'Istanbul'), lon: 28.98, lat: 41.01, flight: 4.5 },
  { id: 'del', name: L('New Delhi', 'Нью-Дели', 'Dehli'), lon: 77.21, lat: 28.61, flight: 2.5 },
  { id: 'sel', name: L('Seoul', 'Сеул', 'Seul'), lon: 126.98, lat: 37.57, flight: 6.5 },
  { id: 'ber', name: L('Berlin', 'Берлин', 'Berlin'), lon: 13.4, lat: 52.52, flight: 6 },
  { id: 'dxb', name: L('Dubai', 'Дубай', 'Dubay'), lon: 55.27, lat: 25.2, flight: 3.5 },
]

export type Option = { city: string; clinic: string; lo: number; hi: number; wait: number; stay: number; acc: boolean }
export type Disease = {
  id: string
  name: T
  aliases: string[]
  procedure: T
  stages: { n: T; d: T; tx: T }[]
  history: { y: string; t: T }[]
  options: Option[]
}

export const DISEASES: Disease[] = [
  {
    id: 'knee',
    name: L('Knee osteoarthritis', 'Артроз коленного сустава', 'Tizza artrozi'),
    aliases: ['knee', 'arthritis', 'osteoarthritis', 'артроз', 'колен', 'tizza', 'artroz', 'gonartroz', 'гонартроз'],
    procedure: L('Total knee replacement (one knee)', 'Эндопротезирование колена (один сустав)', "Tizza endoprotezi (bitta bo'g'im)"),
    stages: [
      { n: L('Grade 1–2: early', 'Стадия 1–2: ранняя', '1–2 bosqich: erta'), d: L('Mild pain after activity, small changes on X-ray.', 'Лёгкая боль после нагрузки, небольшие изменения на снимке.', "Harakatdan keyin yengil og'riq, rentgenda kichik o'zgarishlar."), tx: L('Exercise therapy, weight control, pain relief.', 'ЛФК, контроль веса, обезболивание.', "Davolovchi mashqlar, vaznni nazorat qilish, og'riqni kamaytirish.") },
      { n: L('Grade 3: moderate', 'Стадия 3: умеренная', '3-bosqich: o\'rta'), d: L('Daily pain, narrowed joint space, stiffness.', 'Ежедневная боль, сужение щели, скованность.', "Kundalik og'riq, bo'g'im oralig'i torayadi, qotish."), tx: L('Physiotherapy, braces, joint injections.', 'Физиотерапия, ортезы, внутрисуставные инъекции.', "Fizioterapiya, ortezlar, bo'g'im ichiga ukollar.") },
      { n: L('Grade 4: severe', 'Стадия 4: тяжёлая', '4-bosqich: og\'ir'), d: L('Bone on bone, pain at rest, limited walking.', 'Кость о кость, боль в покое, трудно ходить.', "Suyak suyakka tegadi, tinch holatda og'riq, yurish qiyin."), tx: L('Knee replacement surgery is often discussed.', 'Часто обсуждается эндопротезирование.', "Ko'pincha endoprotez operatsiyasi muhokama qilinadi.") },
    ],
    history: [
      { y: '1968', t: L('First modern knee replacement designs appear.', 'Появляются первые современные эндопротезы колена.', "Birinchi zamonaviy tizza endoprotezlari paydo bo'ladi.") },
      { y: '1974', t: L('The total condylar knee sets the pattern still used today.', 'Тотальный кондилярный протез задаёт стандарт, используемый до сих пор.', "Total kondilyar protez bugungacha ishlatiladigan andozani belgilaydi.") },
      { y: '2000s', t: L('Minimally invasive surgery shortens recovery.', 'Малоинвазивная хирургия сокращает восстановление.', "Kam invaziv jarrohlik tiklanishni qisqartiradi.") },
      { y: '2010s', t: L('Robot-assisted surgery improves implant placement.', 'Робот-ассистированная хирургия повышает точность установки.', "Robot yordamidagi jarrohlik implantni aniqroq o'rnatadi.") },
    ],
    options: [
      { city: 'tas', clinic: 'Ortho Clinic A (sample)', lo: 3500, hi: 6000, wait: 2, stay: 6, acc: false },
      { city: 'del', clinic: 'Joint Center B (sample)', lo: 4000, hi: 7000, wait: 1, stay: 7, acc: true },
      { city: 'ist', clinic: 'Ortho Hospital C (sample)', lo: 7000, hi: 12000, wait: 1, stay: 6, acc: true },
      { city: 'dxb', clinic: 'Bone & Joint D (sample)', lo: 12000, hi: 18000, wait: 1, stay: 5, acc: true },
      { city: 'sel', clinic: 'University Hospital E (sample)', lo: 12000, hi: 20000, wait: 3, stay: 8, acc: true },
      { city: 'ber', clinic: 'Klinikum F (sample)', lo: 18000, hi: 28000, wait: 6, stay: 8, acc: true },
    ],
  },
  {
    id: 'cad',
    name: L('Coronary artery disease', 'Ишемическая болезнь сердца', 'Yurak ishemik kasalligi'),
    aliases: ['heart', 'coronary', 'stent', 'angina', 'сердц', 'ишем', 'стенок', 'стент', 'yurak', 'ishemik', 'stenokardiya'],
    procedure: L('Coronary stent (PCI), one vessel', 'Стентирование коронарной артерии, один сосуд', "Koronar stent (PCI), bitta tomir"),
    stages: [
      { n: L('Risk stage', 'Стадия риска', 'Xavf bosqichi'), d: L('High cholesterol or pressure, no symptoms yet.', 'Высокий холестерин или давление, симптомов нет.', "Yuqori xolesterin yoki bosim, belgilar hali yo'q."), tx: L('Lifestyle change, blood pressure and cholesterol control.', 'Образ жизни, контроль давления и холестерина.', "Turmush tarzini o'zgartirish, bosim va xolesterinni nazorat qilish.") },
      { n: L('Stable angina', 'Стабильная стенокардия', 'Barqaror stenokardiya'), d: L('Chest pain on exertion that settles with rest.', 'Боль в груди при нагрузке, проходит в покое.', "Zo'riqishda ko'krakda og'riq, tinchlanganda o'tadi."), tx: L('Medicines; tests to decide if a stent is needed.', 'Лекарства; обследование, нужен ли стент.', "Dorilar; stent kerakligini aniqlash uchun tekshiruvlar.") },
      { n: L('Significant blockage', 'Значимое сужение', 'Jiddiy torayish'), d: L('Narrowed arteries confirmed by angiography.', 'Сужение подтверждено ангиографией.', "Angiografiyada tasdiqlangan torayish."), tx: L('Stent (PCI) or bypass surgery (CABG), chosen by the heart team.', 'Стент или шунтирование (АКШ), решает кардиокоманда.', "Stent yoki shuntlash (AKSH), kardiologlar jamoasi tanlaydi.") },
    ],
    history: [
      { y: '1967', t: L('Bypass surgery with a vein graft becomes routine.', 'Шунтирование венозным трансплантатом становится рутиной.', "Vena bilan shuntlash odatiy amaliyotga aylanadi.") },
      { y: '1977', t: L('First balloon angioplasty opens an artery without open surgery.', 'Первая баллонная ангиопластика открывает артерию без операции на открытом сердце.', "Birinchi ballon angioplastika arteriyani ochiq operatsiyasiz ochadi.") },
      { y: '1986', t: L('First coronary stent keeps the artery open.', 'Первый коронарный стент удерживает артерию открытой.', "Birinchi koronar stent arteriyani ochiq ushlab turadi.") },
      { y: '2003', t: L('Drug-eluting stents reduce re-narrowing.', 'Стенты с лекарственным покрытием снижают повторное сужение.', "Dori qoplamali stentlar qayta torayishni kamaytiradi.") },
    ],
    options: [
      { city: 'tas', clinic: 'Cardio Center A (sample)', lo: 3000, hi: 6000, wait: 1, stay: 3, acc: false },
      { city: 'del', clinic: 'Heart Institute B (sample)', lo: 4000, hi: 8000, wait: 1, stay: 4, acc: true },
      { city: 'ist', clinic: 'Cardiac Hospital C (sample)', lo: 8000, hi: 14000, wait: 1, stay: 4, acc: true },
      { city: 'dxb', clinic: 'Heart Clinic D (sample)', lo: 14000, hi: 22000, wait: 1, stay: 3, acc: true },
      { city: 'sel', clinic: 'Medical Center E (sample)', lo: 15000, hi: 25000, wait: 2, stay: 4, acc: true },
      { city: 'ber', clinic: 'Herzzentrum F (sample)', lo: 15000, hi: 30000, wait: 4, stay: 5, acc: true },
    ],
  },
  {
    id: 't2d',
    name: L('Type 2 diabetes', 'Сахарный диабет 2 типа', 'Qandli diabet 2-tur'),
    aliases: ['diabetes', 'sugar', 'диабет', 'сахар', 'diabet', 'qand'],
    procedure: L('Full diabetes check-up and care plan', 'Полное обследование и план лечения диабета', "Diabet bo'yicha to'liq tekshiruv va davolash rejasi"),
    stages: [
      { n: L('Prediabetes', 'Предиабет', 'Prediabet'), d: L('Sugar above normal but below the diabetes threshold.', 'Сахар выше нормы, но ниже порога диабета.', "Qand me'yordan yuqori, lekin diabet chegarasidan past."), tx: L('Diet, activity and weight loss can reverse it.', 'Питание, активность и снижение веса могут обратить процесс.', "Ovqatlanish, harakat va vazn yo'qotish uni ortga qaytarishi mumkin.") },
      { n: L('Early diabetes', 'Ранний диабет', 'Erta diabet'), d: L('HbA1c at or above 6.5 %.', 'HbA1c 6,5 % и выше.', 'HbA1c 6,5 % va undan yuqori.'), tx: L('Lifestyle plus first-line tablets, usually metformin.', 'Образ жизни плюс препарат первой линии, обычно метформин.', "Turmush tarzi va birinchi qator dori, odatda metformin.") },
      { n: L('Progressing', 'Прогрессирование', 'Rivojlanish'), d: L('Targets not reached on one medicine.', 'Цели не достигнуты на одном препарате.', "Bitta dori bilan maqsadga erishilmaydi."), tx: L('Add newer medicine classes (GLP-1, SGLT2), then insulin if needed.', 'Добавляют новые классы (GLP-1, SGLT2), затем при необходимости инсулин.', "Yangi dori sinflari (GLP-1, SGLT2), kerak bo'lsa insulin qo'shiladi.") },
    ],
    history: [
      { y: '1922', t: L('Insulin is first used to treat a patient.', 'Инсулин впервые применён для лечения пациента.', "Insulin birinchi marta bemorni davolashda qo'llaniladi.") },
      { y: '1957', t: L('Metformin is introduced; today it is the usual first tablet.', 'Появляется метформин; сегодня это обычно первая таблетка.', "Metformin paydo bo'ladi; bugun u odatda birinchi tabletka.") },
      { y: '2005', t: L('First GLP-1 medicine is approved in the US.', 'В США одобрен первый препарат GLP-1.', "AQShda birinchi GLP-1 dori tasdiqlanadi.") },
      { y: '2013', t: L('SGLT2 medicines add heart and kidney benefits.', 'Препараты SGLT2 дают пользу для сердца и почек.', "SGLT2 dorilari yurak va buyrak uchun foyda qo'shadi.") },
    ],
    options: [
      { city: 'tas', clinic: 'Endo Clinic A (sample)', lo: 150, hi: 400, wait: 1, stay: 1, acc: false },
      { city: 'del', clinic: 'Diabetes Center B (sample)', lo: 250, hi: 600, wait: 1, stay: 2, acc: true },
      { city: 'ist', clinic: 'Check-up Center C (sample)', lo: 400, hi: 900, wait: 1, stay: 2, acc: true },
      { city: 'dxb', clinic: 'Endocrine Clinic D (sample)', lo: 800, hi: 1500, wait: 1, stay: 2, acc: true },
      { city: 'sel', clinic: 'Health Screening E (sample)', lo: 900, hi: 2000, wait: 2, stay: 2, acc: true },
      { city: 'ber', clinic: 'Praxis F (sample)', lo: 1200, hi: 2500, wait: 4, stay: 2, acc: true },
    ],
  },
]

export type Drug = { id: string; name: T; tmax: number; half: number; organs: string[]; note: T; caution: T }
// Typical published values (approximate) for an educational one-compartment curve.
export const DRUGS: Drug[] = [
  { id: 'para', name: L('Paracetamol', 'Парацетамол', 'Paratsetamol'), tmax: 0.75, half: 2.5, organs: ['stomach', 'liver', 'kidney'],
    note: L('Absorbed in the gut, processed mainly by the liver, leaves through the kidneys.', 'Всасывается в кишечнике, перерабатывается в основном печенью, выводится почками.', "Ichakda so'riladi, asosan jigarda qayta ishlanadi, buyrak orqali chiqadi."),
    caution: L('Too much can seriously damage the liver.', 'Передозировка может серьёзно повредить печень.', "Me'yordan ortig'i jigarga jiddiy zarar yetkazishi mumkin.") },
  { id: 'ibu', name: L('Ibuprofen', 'Ибупрофен', 'Ibuprofen'), tmax: 1.5, half: 2, organs: ['stomach', 'liver', 'kidney', 'heart'],
    note: L('Works on inflammation; processed by the liver.', 'Действует на воспаление; перерабатывается печенью.', "Yallig'lanishga ta'sir qiladi; jigarda qayta ishlanadi."),
    caution: L('Can irritate the stomach and strain the kidneys.', 'Может раздражать желудок и нагружать почки.', "Oshqozonni ta'sirlashi va buyrakka yuklama berishi mumkin.") },
  { id: 'met', name: L('Metformin', 'Метформин', 'Metformin'), tmax: 2.5, half: 6, organs: ['stomach', 'liver', 'kidney'],
    note: L('Lowers sugar output from the liver; leaves the body unchanged through the kidneys.', 'Снижает выработку сахара печенью; выводится почками в неизменном виде.', "Jigarda qand ishlab chiqarilishini kamaytiradi; buyrak orqali o'zgarmagan holda chiqadi."),
    caution: L('Dose depends on kidney function.', 'Доза зависит от функции почек.', "Doza buyrak faoliyatiga bog'liq.") },
]

export const STING = {
  steps: [
    { t: '0–5 min', d: L('Sharp pain, redness, small swelling at the sting site.', 'Резкая боль, покраснение, небольшой отёк на месте укуса.', "Chaqilgan joyda keskin og'riq, qizarish, kichik shish.") },
    { t: '1–48 h', d: L('Local swelling may grow, then fades over a few days.', 'Местный отёк может увеличиться, затем спадает за несколько дней.', "Mahalliy shish kattalashishi, so'ng bir necha kunda qaytishi mumkin.") },
    { t: L('Help', 'Помощь', 'Yordam').en, d: L('Remove the sting, cool the area, watch for danger signs.', 'Удалите жало, охладите место, следите за признаками опасности.', "Nayzani olib tashlang, joyni sovuting, xavf belgilarini kuzating.") },
  ],
  danger: [
    L('Trouble breathing or wheezing', 'Затруднённое дыхание или хрипы', "Nafas olish qiyinlashishi yoki xirillash"),
    L('Swelling of lips, tongue or throat', 'Отёк губ, языка или горла', "Lab, til yoki tomoq shishishi"),
    L('Hives spreading over the body', 'Сыпь по всему телу', "Butun tanaga tarqalgan toshma"),
    L('Dizziness, fainting, fast pulse', 'Головокружение, обморок, частый пульс', "Bosh aylanishi, hushdan ketish, tez puls"),
  ],
}
