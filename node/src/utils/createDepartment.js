import bulk from './bulk'
import faker from 'faker'

const createDepartment = async (models) => {

const departmentPartnership = [
  {
    link: 'http://en.smbu.edu.cn/index.htm',
    description: `Shenzhen MSU-BIT University is a non-profit higher educational institution with independent legal entity, jointly established by Shenzhen Municipal People's Government, Lomonosov Moscow State  University and Beijing Institute of Technology`,
    imageUrl:'https://upload.wikimedia.org/wikipedia/en/thumb/d/d7/Shenzhen_University_Logo.svg/1200px-Shenzhen_University_Logo.svg.png',
    title: 'Shenzhen MSU-BIT University'
  },
  {
    link: 'https://www.harvard.edu/',
    description: `Harvard University is devoted to excellence in teaching, learning, and research, and to developing leaders in many disciplines who make a difference globally.`,
    imageUrl:'https://i1.sndcdn.com/avatars-000017019436-saukzg-t500x500.jpg',
    title:'Harvard University'
  },
  {
    link: 'http://www.ox.ac.uk/',
    description: `As the oldest university in the English-speaking world, Oxford is a unique and historic institution.`,
    imageUrl:'https://i.pinimg.com/originals/be/30/48/be304864a1e2a400320041cffb5acb3f.png',
    title:'Oxford University'
  },

]  

const departmentStaff = [
  {
    firstname: 'Андрей',
    middlename: 'Борисович',
    lastname: 'Рубин',
    imageUrl:'/images/staff/Rubin.jpg',
    jobTitle:'Заведующий кафедрой',
    description: 'доктор биологических наук, профессор, член-корреспондент РАН',
    tel: '+7(495)939-11-16',
    mail: 'rubin@biophys.msu.ru',
    position: 0
  },
  {
    firstname: 'Сергей',
    middlename: 'Николаевич',
    lastname: 'Горячев',
    imageUrl:'/images/staff/Goryachev.jpg',
    jobTitle:'Заместитель заведующего кафедрой',
    description: 'кандидат биологических наук, старший научный сотрудник',
    tel: '+7(495)939-11-15',
    mail: 'goryachev@biophys.msu.ru',
    position: 1
  },
  {
    firstname: 'Георгий',
    middlename: 'Владимирович',
    lastname: 'Максимов',
    imageUrl:'/images/staff/Maximov.jpg',
    jobTitle:'Заместитель заведующего кафедрой по учебным вопросам',
    description: 'доктор биологических наук, профессор',
    tel: '+7(495)939-19-66',
    mail: 'gmaksimov@mail.ru',
    position: 2
  },
  {
    firstname: 'Татьяна',
    middlename: 'Моисеевна',
    lastname: 'Лукьянченко',
    imageUrl:'/images/staff/Lukianchenko.jpg',
    jobTitle:'Помощник заведующего кафедрой',
    description: 'ведущий инженер',
    tel: '+7(495)939-11-16',
    mail: 'nomail@mail.ru',
    position: 3
  },
  {
    firstname: 'Ольга',
    middlename: 'Валентиновна',
    lastname: 'Яковлева',
    imageUrl:'/images/staff/Yakovleva.jpg',
    jobTitle:'Ученый секретарь кафедры',
    description: 'кандидат физико-математических наук, старший научный сотрудник',
    tel: '+7(495)939-11-16',
    mail: 'oyakov@biophys.msu.ru',
    position: 4
  }
]


  await models.textDescription.create({
    content: faker.lorem.paragraphs(),
    imageUrl:'/images/history/001.jpg',
    section: 'HISTORY'
  }
  )

  await models.departmentPartnership.bulkCreate(departmentPartnership)

  await models.departmentStaff.bulkCreate(departmentStaff)

  await models.departmentPrint.bulkCreate(
    bulk(3, () => ({
      fileLink: '/files/prints/001.pdf',
      description: faker.lorem.paragraph(),
      title: faker.lorem.words()
    }))
  )

  console.log('department created')
}

export default createDepartment