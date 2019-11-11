const educationQuery = {
  async courses(parent, {id}, {models}, info) {
    let courses
    if (id) {
      courses = await models.EducationCourse.findAll({raw:true, where: {id}})
    }
    else {
      courses = await models.EducationCourse.findAll({raw:true })
    }
    for (const course of courses) {  
      const resourses = await models.EducationResourse.findAll({raw: true, where:{educationCourseId: course.id}})
      course.resourses = resourses
    }
    return courses
  },
  timeHeaders(parent, args, {models}) {
    return models.ScheduleTime.findAll({raw:true})
  },
  async years(parent, args, {models}, info) {
    let years

    if (!args) {
      years = await models.ScheduleYear.findAll({raw:true})
    }
    else {
      years = await models.ScheduleYear.findAll({raw:true, where: args})
    }
    return years
  },
  async timetable(parent, args, {models}, info) {
    let timetable
    if (!args) {
      timetable = await models.ScheduleTimetable.findAll({raw:true, order: [['dayId', 'ASC'], ['timeFrom', 'ASC'], ['isEven', 'ASC']]})
    }
    else {
      timetable = await models.ScheduleTimetable.findAll({raw:true, where: args, order: [['dayId', 'ASC'],['timeFrom', 'ASC'], ['isEven', 'ASC']]})
    }
    const updatedTimetable = timetable.map(async item => {
        const day = await models.ScheduleDay.findOne({raw:true, where: {id: item.dayId}})
        const year = await models.ScheduleYear.findOne({raw:true, where: {id: item.yearId}})
        return {
          ...item,
          day: day,
          year: year,
          startDate: item.startDate && item.startDate.toISOString(),
          createdAt: item.createdAt.toISOString(),
          updatedAt: item.updatedAt.toISOString()
        }
    })
    return updatedTimetable
  }
}

export default educationQuery