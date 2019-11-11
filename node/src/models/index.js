import  Sequelize from 'sequelize'

console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_HOST, process.env.DB_SCHEMA)

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  schema:process.env.DB_SCHEMA,
  logging: false
})

const models = {
  NavigationLink: sequelize.import('./shared/navigationLink'),
  TextDescription: sequelize.import('./shared/textDescription'),
  DepartmentStaff: sequelize.import('./department/departmentStaff'),
  DepartmentPartnership: sequelize.import('./department/departmentPartnership'),
  DepartmentPrint: sequelize.import('./department/departmentPrint'),
  ScheduleDay: sequelize.import('./education/schedule/scheduleDay'),
  ScheduleTime: sequelize.import('./education/schedule/scheduleTime'),
  ScheduleYear: sequelize.import('./education/schedule/scheduleYear'),
  ScheduleTimetable: sequelize.import('./education/schedule/scheduleTimetable'),
  EducationCourse: sequelize.import('./education/educationCourse'),
  EducationResourse: sequelize.import('./education/educationResourse'),
  ScienceRoute: sequelize.import('./science/scienceRoute'),
  ScienceGroup: sequelize.import('./science/scienceGroup'),
  SciencePeople: sequelize.import('./science/sciencePeople'),
  ScienceArticle: sequelize.import('./science/scienceArticle'),
  Blogpost: sequelize.import('./blog.js'),
  Conference: sequelize.import('./conference.js'),
  Seminar: sequelize.import('./seminar.js'),
  Note: sequelize.import('./note.js')
}

models.EducationCourse.hasMany(models.EducationResourse)
models.ScienceRoute.hasMany(models.ScienceGroup)
models.ScienceGroup.hasMany(models.SciencePeople)
models.ScienceGroup.hasMany(models.ScienceArticle)

export { models, sequelize as default}