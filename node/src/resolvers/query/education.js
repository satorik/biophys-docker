const educationQuery = {
  timeHeaders(parent, args, {models}) {
    return models.ScheduleTime.findAll({raw:true})
  },
  async days(parent, args, {models}) {
    const days = await models.ScheduleDay.findAll({raw:true, attributes:['title'], order: [['id', 'ASC']]})
    return days.map(day => day.title)
  },
  async years(parent, args, {models}) {
    let years

    if (!args) {
      years = await models.ScheduleYear.findAll({raw:true})
    }
    else {
      years = await models.ScheduleYear.findAll({raw:true, where: args})
    }
    return years
  },
  async timetable(parent, args, {models}) {
    const timetable = await models.ScheduleTimetable.findAll({raw:true, where: {yearId: parent.id}, order: [['dayId', 'ASC'],['timeFrom', 'ASC'], ['isEven', 'ASC']]})
    const updatedTimetable = await Promise.all(timetable.map(async item => {
        const day = await models.ScheduleDay.findOne({raw:true, where: {id: item.dayId}})
        return {
          ...item,
          day: day,
          year: parent.title,
          startDate: item.startDate && item.startDate.toISOString(),
          createdAt: item.createdAt.toISOString(),
          updatedAt: item.updatedAt.toISOString()
        }
    }))
    //console.log(timetable)
    //console.log(updatedTimetable)
    return updatedTimetable
  },
  async courses(parent, args, {models}) {
    let courses

    if (!args) {
      courses = await models.EducationCourse.findAll({raw:true})
    }
    else {
      courses = await models.EducationCourse.findAll({raw:true, where: args})
    }
    return courses
  },
  resourses(parent, args, {models}) {
    return models.EducationResourse.findAll({raw:true, where: {educationCourseId: parent.id}, order: [['educationFormId', 'ASC']]})
  },
  form(parent, args, {models}) {
    return models.EducationForm.findOne({raw:true, where: {id: parent.educationFormId}})
  },
  admission(parent, {section}, {models}){
    return models.TextDescription.findOne({where: {section}, raw: true})
  }
}

export default educationQuery