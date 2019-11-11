import  Sequelize from 'sequelize'

const Query = {
  links(parent, args, { models }, info) {
    return models.NavigationLink.findAll({ where: {level: 0}, raw: true })
  },

  news(parent, {contentType}, { models }, info) {
    if (!contentType) {
      return models.News.findAll({ raw: true,  limit: 20, order: [['updatedAt', 'DESC']] })
    }
    else {
      return models.News.findAll({ raw: true,  where: {contentType} })
    }
  },
  async text(parent, {section}, { models }, info) {
    const text = await models.TextDescription.findOne({where: {section}})
    return text.content
  },
  staff(parent, args, {models}, info) {
    return models.DepartmentStaff.findAll({raw: true})
  },
  prints(parent, args, {models}, info) {
    return models.DepartmentPrint.findAll({raw: true})
  },
  partnership(parent, args, {models}, info) {
    return models.DepartmentPartnership.findAll({raw: true})
  },
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
 // years: [ScheduleYear!]!
  async years(parent, {id}, {models}, info) {
    let years

    if (id) {
      years = await models.ScheduleYear.findAll({raw:true})
    }
    else {
      years = await models.ScheduleYear.findAll({raw:true, where: {id}})
    }
    return years
  },
  async timetable(parent, args, {models}, info) {
    let timetable
    if (!args) {
      timetable = await models.ScheduleTimetable.findAll({raw:true})
    }
    else {
      timetable = await models.ScheduleTimetable.findAll({raw:true, where: args})
    }
    for (const timeRecord of timetable) {
      const day = await models.ScheduleDay.findOne({raw:true, where: {id: timeRecord.dayId}})
      const time = await models.ScheduleTime.findOne({raw:true, where: {id: timeRecord.timeId}})
      const year = await models.ScheduleYear.findOne({raw:true, where: {id: timeRecord.yearId}})
      timeRecord.day = day
      timeRecord.time = time
      timeRecord.year = year
    }
    return timetable
  },
  async scienceRoutes(parent, {id}, {models}, info) {
    let routes
    if (id) {
      routes = await models.ScienceRoute.findAll({raw:true, where: {id}})
    }
    else {
      routes = await models.ScienceRoute.findAll({raw:true })
    }
    for (const route of routes) {  
      const groups = await models.ScienceGroup.findAll({raw: true, where:{scienceRouteId: route.id}})
      course.groups = groups
    }
    return routes
  },
  async scienceGroups(parent, {id}, {models}, info) {
    let groups
    if (id) {
      groups = await models.ScienceGroup.findAll({raw:true, where: {id}})
    }
    else {
      groups = await models.ScienceGroup.findAll({raw:true })
    }
    for (const group of groups) {  
      const people = await models.SciencePeople.findAll({raw: true, where:{scienceGroupId: group.id}})
      const articles = await models.ScienceArticle.findAll({raw: true, where:{scienceGroupId: group.id}})
      group.people = people
      group.articles = articles
    }
    return groups
  }
 // scienceRoutes: [ScienceRoute!]!
 // scienceGroups: [ScienceGroup!]!
}

export default Query