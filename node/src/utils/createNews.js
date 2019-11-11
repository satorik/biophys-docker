import bulk from './bulk'
import faker from 'faker'

const createNews = async(models) => {

  await models.conference.bulkCreate(
    bulk(3, () => ({
      title: faker.lorem.words(),
      description: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      imageUrl: '/images/news/conference001.png',
      dateFrom: faker.date.recent(),
      dateTo: faker.date.future(),
      location:faker.lorem.sentence()
    }))
  )

  await models.seminar.bulkCreate(
    bulk(2, () => ({
      title: faker.lorem.words(),
      description: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      speaker: faker.lorem.words(),
      date: faker.date.future(),
      location:'505'
    }))
  )

  await models.blogpost.bulkCreate(
    bulk(35, () => ({
      title: faker.lorem.words(),
      description: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      imageUrl:'/images/news/blogpost002.jpg',
    }))
  )

  await models.note.bulkCreate(
    bulk(1, () => ({
      title: faker.lorem.words(),
      description: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
    }))
  )

  await models.note.bulkCreate(
    bulk(2, () => ({
      title: faker.lorem.words(),
      description: faker.lorem.sentence(),
    }))
  )

  await models.note.bulkCreate(
    bulk(3, () => ({
      title: faker.lorem.words(),
      description: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
    }))
  )

  await models.note.create(
    {
      title: 'Защита бакалаврских работ',
      description: '30 мая 2019 г. в 10.00 в Новой аудитории состоятся защиты бакалаврских работ. Приглашаются все желающие',
      onTop: true
    })

  await models.note.create(
  {
    title: 'Открытые мероприятия Elsevier',
    description:'В осеннем семестре 2019/20 учебного года в МГУ пройдет серия открытых образовательных мероприятий',
    content: `В осеннем семестре 2019/20 учебного года в МГУ пройдет серия открытых образовательных мероприятий, проводимых компанией Elsevier для сотрудников МГУ по подготовке научных публикаций на английском языке в высокорейтинговых журналах.
    Подробная информация доступна на сайте МГУ, в разделе "Дополнительное образование" по адресу: https://www.msu.ru/ad/otkrytye-lektsii-elsevier.html
    Регистрация осуществляется до 10 сентября включительно на портале "Ломоносов" по адресу: https://lomonosov-msu.ru/rus/event/5738/`,
  })

  await models.conference.create(
  {
    title: 'VI Съезд биофизиков России',
    imageUrl:'/images/news/conference001.png',
    description:'16-21 сентября 2019 г. в Сочи состоится VI Съезд биофизиков России.',
    content: `16-21 сентября 2019 г. в Сочи состоится VI Съезд биофизиков России. С информацией о Съезде можно ознакомиться по ссылке: http://conf-2019.biophys.ru/`,
    dateFrom:'2019-09-16',
    dateTo:'2019-09-21',
    location:'Сочи'
  })

  await models.conference.create(
    {
      title: 'Международная конференция 10th International Conference',
      imageUrl:'/images/news/conference002.jpg',
      description:' Конференция посвящена исследованиям в области фотосинтеза и водородной биоэнергетики.',
      content: `Конференция состоится с 23 по 28 июня 2019 г. в Санкт-Петербурге во Дворце Белосельских-Белозерских (Невский пр., 41)
      Конференция посвящена исследованиям в области фотосинтеза и водородной биоэнергетики. Помимо исследований фотосинтеза растений и бактерий, работа конференции будет включать следующие направления:
      - Развитие растений и регуляция роста
      - Искусственный фотосинтез
      - Стресс, АФК и регуляция фотосинтеза
      - Системная биология фотосинтеза: интеграция геномики, протеомики, метаболомики и биоинформатики
      - Минеральное питание растений и ионный транспорт
      - Новые технологии исследований фотосинтеза и преподавание основ фотосинтеза студентам
      Рабочий язык конференции английский.
      Для молодых ученых предоставляется возможность выступить на специальной сессии и принять участие в Школе, где задействованы ведущие мировые специалисты в области фотосинтеза, стресса и водородной биоэнергетики. Предусмотрены призы за лучший постерный и устный доклады (спонсор лучшего постерного доклада с использованием данных иммуноблоттинга – Agrisera, Швеция).
      Официальные организаторы: Институт Фундаментальных Проблем Биологии РАН (Пущино), Ботанический институт им. В.Л. Комарова РАН (Санкт-Петербург), Российское Фотобиологическое Общество.
      `,
      dateFrom:'2019-06-23',
      dateTo:'2019-06-29',
      location:'Санкт-Петербург, Дворец Белосельских-Белозерских (Невский пр., 41)'
    })

  await models.seminar.create(
  {
    title: 'Доклад по Биофизике',
    description: `14 апреля 2019 г. на кафедральном семинаре состоится доклад Рубина Андрея Борисовича «Биофизика».`,
    content:`14 апреля 2019 г. на кафедральном семинаре состоится доклад Рубина Андрея Борисовича «Биофизика».
    14 апреля 2019 г. на кафедральном семинаре состоится доклад Рубина Андрея Борисовича «Биофизика».
    14 апреля 2019 г. на кафедральном семинаре состоится доклад Рубина Андрея Борисовича «Биофизика».`,
    date:'2019-04-14',
    speaker:'Андрей Борисович Рубин',
    location:'505'
  })

  await models.seminar.create(
    {
      title: 'Достижения и вызовы в области математического моделирования физиологии мозга',
      description:'4 апреля 2019 г. на семинаре сектора информатики и биофизики сложных систем состоится доклад Дмитрия Энгелевича Постнова',
      content: `4 апреля 2019 г. на семинаре сектора информатики и биофизики сложных систем состоится доклад Дмитрия Энгелевича Постнова (Саратовский государственный университет, Физический факультет, кафедра оптики и биофотоники)
      Достижения и вызовы в области математического моделирования физиологии мозга
      Любое значимое изменение активности нейронов мозга сопровождаются измеримыми изменениями физиологических параметров. Межклеточные взаимодействия внутри так называемой “нейроваскулярной единицы” формируют как локальные ответы, так и пространственно-временные паттерны в пределах разнородных функциональных “подсистем” (сети астроцитов, перенос веществ в межклеточном пространстве, распространяющиеся вазомоторные реакции). Будучи в норме неявно выраженными, эти физиологические механизмы становятся доминирующими во время экстремальных состояний коры головного мозга, таких, как распространяющаяся кортикальная депрессия, мигрень с аурой, а также распространение волн деполяризации при инсульте или в результате травмы. С другой стороны, изменение состояния клеточных структур паренхимы мозга оказывается тесно связанным с ее дренажными функциями, понимание которых крайне важно для широкого круга медицинских проблем, таких, как борьба с болезнью Альцгеймера, или же доставка лекарств сквозь гематоэнцефалический барьер.
      В докладе обсуждается подход к анализу указанных выше задач на основе максимально упрощенных "функциональных" математических моделей, что позволяет получить динамически правдоподобную картину взаимодействия разнородных процессов.
      `,
      speaker:'Дмитрий Энгелевич Постнов',
      date:'2019-04-04',
      location:'505'
    })

  await models.blogpost.create({
      title: 'Актуальные проблемы биофизики',
      description:'В 80-х годах XX века режиссер и сценарист Владимир Михайлович Кобрин (гиперссылка на вики) при участии сотрудников кафедры создал серию фильмов, философски осмысляющих актуальные проблемы биофизики.',
      imageUrl:'/images/news/blogpost001.jpg',
      content: `В 80-х годах XX века режиссер и сценарист Владимир Михайлович Кобрин (гиперссылка на вики) при участии сотрудников кафедры создал серию фильмов, философски осмысляющих актуальные проблемы биофизики.
      Вставлено видео с youtube: https://www.youtube.com/watch?v=I9tIADZiwOs
      Другие фильмы В.М. Кобрина о биофизике:
      «Особенности кинетики биологических процессов», 1983 (гиперссылка на youtube)
      «Высокомолекулярные соединения», 1984 (гиперссылка на youtube)
      «Регуляция биологических процессов», 1985 (гиперссылка на youtube)
      «Термодинамика биологических процессов», 1986 (гиперссылка на youtube)
      «Молекулярная биофизика», 1986 (гиперссылка на youtube)
      «Перенос электрона в биологических системах», 1987 (гиперссылка на youtube)
      «Биофизика ферментативных процессов», 1987 (гиперссылка на youtube)
      «Транспорт веществ через биологические мембраны», 1987 (гиперссылка на youtube)
      «Первичные фотобиологические процессы», 1988 (гиперссылка на youtube)
      «Биопотенциалы», 1988 (гиперссылка на youtube)
      «Самоорганизация биологических систем», 1989 (гиперссылка на youtube)
      «Физические основы квантовой теории», 1980 (гиперссылка на youtube)`,
    }
  )

  await models.blogpost.create({
      title: 'Scientists Find Evidence Of A Protein That Existed When Life Began',
      description:`How did life arise on Earth? Rutgers researchers have found among the first and perhaps only hard evidence that simple protein catalysts – essential for cells, the building blocks of life, to function – may have existed when life began.`,
      imageUrl:'/images/news/blogpost002.jpg',
      content: `How did life arise on Earth? Rutgers researchers have found among the first and perhaps only hard evidence that simple protein catalysts – essential for cells, the building blocks of life, to function – may have existed when life began.
      Their study of a primordial peptide, or short protein, is published in the Journal of the American Chemical Society.
      In the late 1980s and early 1990s, the chemist Günter Wächtershäuser postulated that life began on iron- and sulfur-containing rocks in the ocean. Wächtershäuser and others predicted that short peptides would have bound metals and served as catalysts of life-producing chemistry, according to study co-author Vikas Nanda, an associate professor at Rutgers’ Robert Wood Johnson Medical School.
      Human DNA consists of genes that code for proteins that are a few hundred to a few thousand amino acids long. These complex proteins – needed to make all living-things function properly – are the result of billions of years of evolution. When life began, proteins were likely much simpler, perhaps just 10 to 20 amino acids long. With computer modeling, Rutgers scientists have been exploring what early peptides may have looked like and their possible chemical functions, according to Nanda.
      The scientists used computers to model a short, 12-amino acid protein and tested it in the laboratory. This peptide has several impressive and important features. It contains only two types of amino acids (rather than the estimated 20 amino acids that synthesize millions of different proteins needed for specific body functions), it is very short and it could have emerged spontaneously on the early Earth in the right conditions. The metal cluster at the core of this peptide resembles the structure and chemistry of iron-sulfur minerals that were abundant in early Earth oceans. The peptide can also charge and discharge electrons repeatedly without falling apart, according to Nanda, a resident faculty member at the Center for Advanced Technology and Medicine.
      “Modern proteins called ferredoxins do this, shuttling electrons around the cell to promote metabolism,” said senior author Professor Paul G. Falkowski, who leads Rutgers’ Environmental Biophysics and Molecular Ecology Laboratory. “A primordial peptide like the one we studied may have served a similar function in the origins of life.”
      Falkowski is the principal investigator for a NASA-funded ENIGMA project led by Rutgers scientists that aims to understand how protein catalysts evolved at the start of life. Nanda leads one team that will characterize the full potential of the primordial peptide and continue to develop other molecules that may have played key roles in the origins of life.
      With computers, Rutgers scientists have smashed and dissected nearly 10,000 proteins and pinpointed four “Legos of life” – core chemical structures that can be stacked to form the innumerable proteins inside all organisms. The small primordial peptide may be a precursor to the longer Legos of life, and scientists can now run experiments on how such peptides may have functioned in early-life chemistry.
      Study co-lead authors are John Dongun Kim, postdoctoral researcher, and graduate student Douglas H. Pike. Other authors include Alexei M. Tyryshkin and G.V.T. Swapna, staff scientists; Hagai Raanan, postdoctoral researcher; and Gaetano T. Montelione, Jerome and Lorraine Aresty Chair and distinguished professor in the Department of Molecular Biology and Biochemistry. He is also a resident faculty member at the Center for Advanced Technology and Medicine.
      Publication: J. Dongun Kim, et al., “Minimal Heterochiral de Novo Designed 4Fe–4S Binding Peptide Capable of Robust Electron Transfer,” JACS, 2018; doi:10.1021/jacs.8b07553`,
    }
  )
  console.log('News created');
}

export default createNews