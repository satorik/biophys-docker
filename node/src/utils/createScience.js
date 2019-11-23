import bulk from './bulk'
import faker from 'faker'

const createScience = async (models) => {

  await models.scienceRoute.create({
    title: 'Теоретическая биофизика',
    description: faker.lorem.paragraph(),
    scienceGroups: bulk(3, () => ({
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      tel: faker.phone.phoneNumber(),
      mail: faker.internet.email(),
      imageUrl:'/images/scienceGroup/002.png',
      room: '205'
    }))
  },
   { include: [ models.scienceGroup ]}
  )

  const firstScienceRoute = await models.scienceRoute.findOne({where: {title:"Теоретическая биофизика"}})

  await firstScienceRoute.createScienceGroup({
    title: 'Группа молекулярной фотобиологии микроорганизмов',
    description: `Научная работа группы связана с исследованием фундаментальных механизмов воздействия света на живую клетку. Основная проблема состоит в изучении природы светочувствительности клеток дрожжей и бактерий, не содержащих специализированные фоторецепторные системы. В центре внимания – идентификация потенциально фотоактивных хромофоров (сенсибилизаторов), способных вступать в фотохимические реакции, инициирующие определенные фотобиологические ответы. В зависимости от природы хромофора, его субклеточной локализации и молекулярного микроокружения, а также параметров оптического излучения наблюдаются фотосенсибилизированные цитотоксические, фотозащитные и регуляторные эффекты. Выявленные у дрожжей новые механизмы фотозащиты клеток расширяют представления об индуцированных светом защитных процессах в живых системах. 
    На основе изучения молекулярных основ цитотоксических воздействий фотосенсибилизаторов разрабатывается новый метод антимикробной фотодинамической терапии. Процессы взаимодействия антимикробных соединений с микробными объектами исследуются с помощью бактериальной биолюминесцентной тест-системы, методами измерения поверхностного потенциала, молекулярного моделирования.
    `,
    tel: '8-495-939-39-68',
    mail: faker.internet.email(),
    imageUrl:'/images/scienceGroup/002.png',
    room: '217-219'
  })

  await models.scienceRoute.create({
    title: 'Биофизика клеточных и мембранных процессов',
    description: faker.lorem.paragraph(),
    scienceGroups: bulk(3, () => ({
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      tel: faker.phone.phoneNumber(),
      mail: faker.internet.email(),
      imageUrl:'/images/scienceGroup/002.png',
      room: '205'
    }))
  },
   { include: [ models.scienceGroup ]}
  )
  
  await models.scienceRoute.create({
    title: 'Биофизика фотобиологических процессов',
    description: faker.lorem.paragraph(),
    scienceGroups: bulk(3, () => ({
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      tel: faker.phone.phoneNumber(),
      mail: faker.internet.email(),
      imageUrl:'/images/scienceGroup/002.png',
      room: '205'
    }))
  },
   { include: [ models.scienceGroup ]}
  )

  await models.scienceRoute.create({
    title: 'Радиационная биофизика',
    description: faker.lorem.paragraph(),
    scienceGroups: bulk(3, () => ({
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      tel: faker.phone.phoneNumber(),
      mail: faker.internet.email(),
      imageUrl:'/images/scienceGroup/002.png',
      room: '205'
    }))
  },
   { include: [ models.scienceGroup ]}
  )

  await models.scienceRoute.create({
    title: 'Медицинская биофизика',
    description: faker.lorem.paragraph(),
    scienceGroups: bulk(3, () => ({
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      tel: faker.phone.phoneNumber(),
      mail: faker.internet.email(),
      imageUrl:'/images/scienceGroup/002.png',
      room: '205'
    }))
  },
   { include: [ models.scienceGroup ]}
  )

  await models.scienceRoute.create({
    title: 'Экологическая биофизика',
    description: faker.lorem.paragraph(),
    scienceGroups: bulk(3, () => ({
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      tel: faker.phone.phoneNumber(),
      imageUrl:'/images/scienceGroup/002.png',
      mail: faker.internet.email(),
      room: '205'
    }))
  },
   { include: [ models.scienceGroup ]}
  )

const groups = await models.scienceGroup.findAll({'raw': true})
const trueGroup = await models.scienceGroup.findOne({where: {title: 'Группа молекулярной фотобиологии микроорганизмов'}, 'raw': true})

for (const group of groups) {
  if (group.id !== trueGroup.id)
  {
    await models.sciencePeople.bulkCreate(
      bulk(5, () => ({
        firstname: faker.name.firstName(),
        middlename: faker.name.firstName(),
        lastname: faker.name.lastName(),
        tel: faker.phone.phoneNumber(),
        mail: faker.internet.email(),
        scienceGroupId: group.id,
        position: faker.random.number(100),
        type:'STUDENT'
      }))
    )

    await models.sciencePeople.bulkCreate(
      bulk(4, () => ({
        firstname: faker.name.firstName(),
        middlename: faker.name.firstName(),
        lastname: faker.name.lastName(),
        tel: faker.phone.phoneNumber(),
        mail: faker.internet.email(),
        scienceGroupId: group.id,
        position: faker.random.number(100),
        type:'STAFF'
      }))
    )

    await models.scienceArticle.bulkCreate(
      bulk(8, () => ({
        author: faker.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}"),
        title: faker.lorem.paragraph(),
        journal:faker.lorem.paragraph(),
        position: faker.random.number(100),
        scienceGroupId: group.id
      }))
    )
  }
  else {
    await models.sciencePeople.bulkCreate([
      {
        firstname: 'Григорий',
        middlename: 'Яковлевич',
        lastname: 'Фрайкин',
        description:'доктор биологических наук, ведущий научный сотрудник, профессор',
        scienceGroupId: group.id,
        position: faker.random.number(100),
        type:'STAFF'
      },
      {
        firstname: 'Марина',
        middlename: 'Глебовна',
        lastname: 'Страховская',
        description:'доктор биологических наук, ведущий научный сотрудник',
        scienceGroupId: group.id,
        position: faker.random.number(100),
        type:'STAFF'
      },
      {
        firstname: 'Наталья',
        middlename: 'Серафимовна',
        lastname: 'Беленикина',
        description:'кандидат биологических наук, научный сотрудник',
        scienceGroupId: group.id,
        position: faker.random.number(100),
        type:'STAFF'
      },
      {
        firstname: 'Екатерина',
        middlename: 'Георгиевна',
        lastname: 'Холина',
        description:'2-й год обучения',
        scienceGroupId: group.id,
        position: faker.random.number(100),
        type:'STUDENT'
      }
    ]) 

    await models.scienceArticle.bulkCreate(
      [
        {
          author: 'Fraikin G.Ya., Belenikina N.S., Rubin A.B',
          title: 'Damaging and defense processes induced in plant cells by UVB radiation',
          journal:'Biology Bulletin, 2018, 45, 519-527',
          position: faker.random.number(100),
          scienceGroupId: group.id
        },
        {
          author: 'Fraikin G.Ya',
          title: 'Signaling mechanisms regulating diverse plant cell responses to UVB radiation',
          journal:'Biochemistry (Moscow), 2018, 83, 972-980',
          position: faker.random.number(100),
          scienceGroupId: group.id
        },
        {
          author: 'P.S. Orekhov, E. G. Kholina, M. E. Bozdaganyan, A. M. Nesterenko, I. B. Kovalenko, and M. G. Strakhovskaya',
          title: 'Molecular mechanism of uptake of cationic photoantimicrobial phthalocyanine across bacterial membranes revealed by molecular dynamics simulations',
          journal:'Journal of Physical Chemistry B, vol. 122, no. 14, pp. 3711–3722, 2018. DOI: 10.1021/acs.jpcb.7b11707',
          position: faker.random.number(100),
          scienceGroupId: group.id
        },
        {
          author: 'В. Г. Жуховицкий, Е. Г. Холина, М. Г. Страховская',
          title: 'Фотодинамическая инактивация helicobacter pylori октакис(холинил)фталоцианином цинка in vitro',
          journal:'Экспериментальная и клиническая гастроэнтерология. 2018. Т. 154, №6, 10–15',
          position: faker.random.number(100),
          scienceGroupId: group.id
        }
      ]
    )
  }
}


for (const item of groups) { 
    const people = await models.sciencePeople.findAll({where: {scienceGroupId: item.id}, order: [['id']]})
    const articles = await models.scienceArticle.findAll({where: {scienceGroupId: item.id}, order: [['id']]})
    let i = 0
    for (const person of people) {
      person.position = i
      await person.save()
      i++
    }
    let j = 0
    for (const article of articles) {
      article.position = j
      await article.save()
      j++
    }

}
  console.log('science created')
}

export default createScience