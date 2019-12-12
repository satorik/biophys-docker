import bulk from './bulk'
import faker from 'faker'

const createEducation = async (models) => {

  await models.textDescription.create({
    content: faker.lorem.paragraphs(),
    section: 'ADMISSION'
  }
  )


  await models.educationCourse.create({
    title: 'Бакалавриат',
    desc: faker.lorem.paragraphs(),
    educationResourses: bulk(5, () => ({
        link: faker.internet.url(),
        desc: faker.lorem.paragraph()
      }))
  },
  {
    include: [ models.educationResourse ]
  }
  )

  await models.educationCourse.create({
    title: 'Магистратура',
    desc: faker.lorem.paragraphs(),
    educationResourses: bulk(5, () => ({
      link: faker.internet.url(),
      desc: faker.lorem.paragraph()
    }))
  },
  {
    include: [ models.educationResourse ]
  }
  )

  await models.educationCourse.create({
    title: 'Аспирантура',
    desc: faker.lorem.paragraphs(),
    educationResourses: bulk(5, () => ({
      link: faker.internet.url(),
      desc: faker.lorem.paragraph()
    }))
  },
  {
    include: [ models.educationResourse ]
  }
  )

  const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
  const years = ['Бакалавриат 3 курс', 'Магистратура 1 курс']
  const schedule = 
    {
      'Бакалавриат 3 курс':{
        'Понедельник': [
          {timeFrom:'9:00',
          discipline:'Биохимия, практикум',
          lectureHall:'123',
          isEven:0,
          isDouble:0},
          {timeFrom:'14:00',
          timeTo:'15:35',
          discipline:'Механизмы трансформации энергии в фотосинтезе (лекция)',
          startDate:'2019-09-30',
          lector:'проф. Пащенко Владимир Захарович, в.н.с. Сёмин Борис Константинович',
          lectureHall:'ЛИК, 306',
          isEven:0,
          isDouble:0},
        ],
        'Вторник':[
          {timeFrom:'9:00',
          timeTo:'10:35',
          discipline:'Микробиология с основами биотехнологии микроорганизмов',
          lector:'проф. А.И.Нетрусов',
          lectureHall:'ББА',
          isEven:0,
          isDouble:0},
          {timeFrom:'10:55',
          timeTo:'12:30',
          discipline:'Биофизика',
          lector:'проф. А.Б.Рубин',
          lectureHall:'М-1',
          isEven:0,
          isDouble:0},
          {timeFrom:'12:45',
          timeTo:'14:20',
          discipline:'Риторика',
          lector:'проф. М.Ю.Федосюк',
          lectureHall:'М-1',
          isEven:0,
          isDouble:0},
          {timeFrom:'15:35',
          timeTo:'18:55',
          discipline:'Микробиология, практикум',
          lectureHall:'324',
          startDate:'2019-09-01',
          isEven:0,
          isDouble:1},
          {timeFrom:'15:35',
          timeTo:'18:55',
          discipline:'Биофизика',
          startDate:'2019-10-28',
          lectureHall:'ЛИК',
          isEven:0,
          isDouble:1},
        ],
        'Среда':[
          {timeFrom:'9:00',
          timeTo:'10:35',
          discipline:'Теоретическая физика',
          lector:'доц. П.М.Красильников',
          lectureHall:'ЛИК, 5',
          isEven:0,
          isDouble:0},
          {timeFrom:'10:55',
          timeTo:'12:30',
          discipline:'Квантовая химия, семинар',
          startDate:'2019-09-11',
          lectureHall:'ЛИК, 5',
          isEven:2,
          isDouble:0},
          {timeFrom:'12:45',
          timeTo:'14:20',
          discipline:'Квантовая химия, лекция',
          lector:' в.н.с. М.Г.Хренова',
          lectureHall:'ЛИК, 5',
          isEven:0,
          isDouble:0},
          {timeFrom:'15:10',
          timeTo:'16:45',
          discipline:'Межфакультетские учебные курсы',
          isEven:0,
          isDouble:0},
          {timeFrom:'17:10',
          timeTo:'18:50',
          discipline:'Межфакультетские учебные курсы',
          isEven:0,
          isDouble:0},
        ],
        'Четверг':[
          {timeFrom:'9:00',
          timeTo:'10:35',
          discipline:'Биохимия',
          lector:'проф. Н.Б.Гусев',
          lectureHall:'М-1',
          isEven:0,
          isDouble:0},
          {timeFrom:'10:55',
          timeTo:'12:30',
          discipline:'Физиология человека и животных',
          lector:'доц. А.А.Гусева',
          lectureHall:'М-1',
          isEven:0,
          isDouble:0},
          {timeFrom:'12:45',
          timeTo:'14:20',
          discipline:'Английский язык',
          lectureHall:'228',
          isEven:0,
          isDouble:0},
        ],
        'Пятница':[
          {timeFrom:'10:55',
          timeTo:'12:30',
          discipline:'Физиология растений',
          lectureHall:'538',
          startDate:'2019-09-06',
          isEven:1,
          isDouble:1},
          {timeFrom:'10:55',
          timeTo:'12:30',
          discipline:'Физиология человека и животных',
          startDate:'2019-09-13',
          lectureHall:'242',
          isEven:2,
          isDouble:1},
          {timeFrom:'12:45',
          timeTo:'17:10',
          discipline:'Физиология растений',
          startDate:'2019-09-23',
          lectureHall:'532',
          isEven:2,
          isDouble:0}
        ],
        'Суббота':[
          {timeFrom:'9:00',
          timeTo:'10:35',
          discipline:'Экология',
          lector:'проф. Ю.А. Мазей',
          lectureHall:'ББА',
          isEven:0,
          isDouble:0},
          {timeFrom:'10:55',
          timeTo:'12:30',
          discipline:'Физиология растений, лекция',
          lector:'проф. А.М.Носов',
          lectureHall:'М-1',
          isEven:0,
          isDouble:0},
          {timeFrom:'12:45',
          timeTo:'14:20',
          discipline:'Физиология человека и животных',
          lectureHall:'242',
          startDate:'2019-09-07',
          isEven:1,
          isDouble:1
          },
          {timeFrom:'12:45',
          timeTo:'14:20',
          discipline:'Теоретическая физика',
          lector:'доц. П.М.Красильников',
          lectureHall:'ЛИК, 5',
          startDate:'2019-09-14',
          isEven:2,
          isDouble:1
          },
          {timeFrom:'15:35',
          timeTo:'17:10',
          discipline:'Методы современной биологии',
          lector:'проф. А.Б.Рубин',
          lectureHall:'М-1',
          isEven:0,
          isDouble:0},
        ]
      },
      'Магистратура 1 курс': {
        'Понедельник': [{
          timeFrom:'10:55',
          timeTo:'12:30',
          discipline:'Метаболическая инженерия (лекция)',
          lector:'проф. Машко Сергей Владимирович',
          lectureHall:'123',
          startDate:'2019-09-02',
          isEven:0,
          isDouble:0
        },
        {
          timeFrom:'12:45',
          timeTo:'14:20',
          discipline:'Основы физики полимеров (лекция)',
          lector:'доц. Говорун Елена Николаевна',
          lectureHall:'ЛИК, 5',
          startDate:'2019-09-02',
          isEven:0,
          isDouble:0
        },
        {
          timeFrom:'15:00',
          timeTo:'18:00',
          discipline:'Большой практикум',
          startDate:'2019-09-30',
          isEven:0,
          isDouble:0
        }
        ],
        'Вторник': [{
          timeFrom:'9:00',
          discipline:'Большой практикум',
          isEven:0,
          isDouble:0
        },
        ],
        'Среда': [{
          timeFrom:'10:55',
          timeTo:'12:30',
          discipline:'Нейробиофизика (лекция)',
          lector:'с.н.с. Браже Алексей Рудольфович',
          lectureHall:'ЛИК, 306',
          isEven:0,
          isDouble:1
        },
        {
          timeFrom:'10:55',
          timeTo:'12:30',
          discipline:'Колебательные и диссипативные структуры в биологии, химии и радиоэлектронике (лекция)',
          lector:'ст. преп. Черкашин Александр Александрович',
          lectureHall:'ЛИК, 306',
          startDate:'2019-09-04',
          isEven:0,
          isDouble:1
        },
        {
          timeFrom:'12:45',
          timeTo:'14:20',
          discipline:'Молекулярные механизмы зрения',
          lector:'акад. Островский Михаил Аркадьевич, доц. Фельдман Татьяна Борисовна',
          lectureHall:'ЛИК, 306',
          startDate:'2019-09-04',
          isEven:0,
          isDouble:0
        },
        {
          timeFrom:'15:10',
          timeTo:'16:45',
          discipline:'Межфакультетские учебные курсы',
          isEven:0,
          isDouble:0
        },
        {
          timeFrom:'17:10',
          timeTo:'18:50',
          discipline:'Межфакультетские учебные курсы',
          isEven:0,
          isDouble:0
        }
        ],
        'Четверг': [{
          timeFrom:'9:00',
          timeTo:'10:35',
          discipline:'Механизмы переноса зарядов в биоструктурах',
          lector:'доц. Красильников Павел Михайлович',
          lectureHall:'ЛИК, 5',
          startDate:'2019-09-05',
          isEven:0,
          isDouble:0
        },
        {
          timeFrom:'10:55',
          timeTo:'12:35',
          discipline:'Английский язык',
          lectureHall:'5А',
          isEven:0,
          isDouble:0
        },
        {
          timeFrom:'13:00',
          timeTo:'18:00',
          discipline:'Большой практикум',
          isEven:0,
          isDouble:0
        }
        ],
        'Пятница': [        {
          timeFrom:'9:00',
          timeTo:'18:00',
          discipline:'Большой практикум',
          isEven:0,
          isDouble:0
        }
        ],
        'Суббота': [{
          timeFrom:'9:00',
          timeTo:'10:35',
          discipline:'Правоведение (лекция)',
          lector:'доц. Клименко Сергей Владимирович',
          lectureHall:'4-й Учебный корп., ауд. 125 Б',
          isEven:0,
          isDouble:0
        },
        {
          timeFrom:'10:55',
          timeTo:'12:30',
          discipline:'Философия (лекция)',
          lector:'проф. Ретюнских Лариса Тимофеевна',
          lectureHall:'В-2 Шуваловский корп.',
          isEven:0,
          isDouble:0
        }
        ]
      } 
    }
  
    const scheduleTimes = [
      {timeFrom: '9:00', timeTo:'10:35', orderNumber: 1},
      {timeFrom: '10:55', timeTo:'12:30', orderNumber: 2}, 
      {timeFrom: '12:45', timeTo:'14:20', orderNumber: 3}, 
      {timeFrom: '15:35', timeTo:'17:10', orderNumber: 4}, 
      {timeFrom: '17:20', timeTo:'18:55', orderNumber: 5}]
      
    for (const time of scheduleTimes) {
      let savedTime = await models.scheduleTime.findOne({where: {timeFrom: time.timeFrom}})
      if(!savedTime) {
          savedTime = await models.scheduleTime.create({timeFrom: time.timeFrom, timeTo: time.timeTo, orderNumber: time.orderNumber})
      }
    }

  for (const year in schedule) {
    
      let savedYear = await models.scheduleYear.findOne({where: {title: year}})
      if (!savedYear) {
         savedYear = await models.scheduleYear.create({title: year, calendarYear: 2019, term: 1})
      }

      for (const day in schedule[year]) {
        let savedDay = await models.scheduleDay.findOne({where: {title: day}})
        if (!savedDay) {
          savedDay = await models.scheduleDay.create({title: day})
        }

        for (let i = 0; i < schedule[year][day].length; i++) {
          let times = schedule[year][day][i]

          let isDouble = times.isDouble
          let orderNumber = 15
          let isTimeRight = true

          if (times.isDouble === 1) {
            if (i!== 0 && schedule[year][day][i-1].isDouble === 1) {
              const lastId = await models.scheduleTimetable.max('id')
              const lastTime = await models.scheduleTimetable.findOne({where: {id: lastId}})
              isDouble = lastId
              lastTime.isDouble = lastId + 1
              await lastTime.save()
            }
          }

          for (const time of scheduleTimes) {
            if (time.timeFrom == times.timeFrom) {
              orderNumber = time.orderNumber
              if (time.timeTo != times.timeTo) {
                isTimeRight = false
              }
            }
          }
          if (orderNumber === 15) {isTimeRight = false}

          const scheduleTime = await models.scheduleTimetable.create({
            timeFrom:times.timeFrom,
            timeTo: times.timeTo,
            discipline: times.discipline,
            lectureHall: times.lectureHall,
            lector:times.lector,
            isEven: times.isEven,
            isDouble:isDouble,
            yearId: savedYear.dataValues.id,
            dayId: savedDay.dataValues.id,
            startDate: times.startDate,
          })



        }

      }
  } 


  console.log('education created')
}

export default createEducation