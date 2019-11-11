import bulk from './bulk'
import faker from 'faker'

const createDepartment = async (models) => {

const departmentPartnership = [
  {
    link: 'http://en.smbu.edu.cn/index.htm',
    desc: `Shenzhen MSU-BIT University is a non-profit higher educational institution with independent legal entity, jointly established by Shenzhen Municipal People's Government, Lomonosov Moscow State  University and Beijing Institute of Technology`,
    imageUrl:'https://upload.wikimedia.org/wikipedia/en/thumb/d/d7/Shenzhen_University_Logo.svg/1200px-Shenzhen_University_Logo.svg.png',
    title: 'Shenzhen MSU-BIT University'
  },
  {
    link: 'https://www.harvard.edu/',
    desc: `Harvard University is devoted to excellence in teaching, learning, and research, and to developing leaders in many disciplines who make a difference globally.`,
    imageUrl:'https://i1.sndcdn.com/avatars-000017019436-saukzg-t500x500.jpg',
    title:'Harvard University'
  },
  {
    link: 'http://www.ox.ac.uk/',
    desc: `As the oldest university in the English-speaking world, Oxford is a unique and historic institution.`,
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
    desc: 'доктор биологических наук, профессор, член-корреспондент РАН',
    tel: '+7(495)939-11-16',
    mail: 'rubin@biophys.msu.ru'
  },
  {
    firstname: 'Сергей',
    middlename: 'Николаевич',
    lastname: 'Горячев',
    imageUrl:'/images/staff/Goryachev.jpg',
    jobTitle:'Заместитель заведующего кафедрой',
    desc: 'кандидат биологических наук, старший научный сотрудник',
    tel: '+7(495)939-11-15',
    mail: 'goryachev@biophys.msu.ru'
  },
  {
    firstname: 'Георгий',
    middlename: 'Владимирович',
    lastname: 'Максимов',
    imageUrl:'/images/staff/Maximov.jpg',
    jobTitle:'Заместитель заведующего кафедрой по учебным вопросам',
    desc: 'доктор биологических наук, профессор',
    tel: '+7(495)939-19-66',
    mail: 'gmaksimov@mail.ru'
  },
  {
    firstname: 'Татьяна',
    middlename: 'Моисеевна',
    lastname: 'Лукьянченко',
    imageUrl:'/images/staff/Lukianchenko.jpg',
    jobTitle:'Помощник заведующего кафедрой',
    desc: 'ведущий инженер',
    tel: '+7(495)939-11-16',
    mail: 'nomail@mail.ru'
  },
  {
    firstname: 'Ольга',
    middlename: 'Валентиновна',
    lastname: 'Яковлева',
    imageUrl:'/images/staff/Yakovleva.jpg',
    jobTitle:'Ученый секретарь кафедры',
    desc: 'кандидат физико-математических наук, старший научный сотрудник',
    tel: '+7(495)939-11-16',
    mail: 'oyakov@biophys.msu.ru'
  }
]


  await models.textDescription.create({
    content: faker.lorem.paragraphs(),
    section: 'history'
  }
  )

  await models.departmentPartnership.bulkCreate(departmentPartnership)

  await models.departmentStaff.bulkCreate(departmentStaff)

  await models.departmentPrint.bulkCreate(
    bulk(3, () => ({
      link: faker.internet.url(),
      imageUrl: faker.image.imageUrl(),
      desc: faker.lorem.paragraph(),
      title: faker.lorem.words()
    }))
  )

  console.log('department created')
}

export default createDepartment