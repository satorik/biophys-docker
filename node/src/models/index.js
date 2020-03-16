import  Sequelize from 'sequelize'

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  dialectOptions: {
    useUTC: false,
  },
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
  ScienceRoute: sequelize.import('./science/scienceRoute'),
  ScienceGroup: sequelize.import('./science/scienceGroup'),
  SciencePeople: sequelize.import('./science/sciencePeople'),
  ScienceArticle: sequelize.import('./science/scienceArticle'),
  Blogpost: sequelize.import('./blog.js'),
  Conference: sequelize.import('./conference.js'),
  Seminar: sequelize.import('./seminar.js'),
  Note: sequelize.import('./note.js'),
  EducationForm: sequelize.import('./education/courses/educationForms'),
  EducationCourse: sequelize.import('./education/courses/educationCourse'),
  EducationResourse: sequelize.import('./education/courses/educationResourse'),
}

models.EducationResourse.belongsTo(models.EducationForm)
models.EducationCourse.hasMany(models.EducationResourse, { onDelete: 'cascade' })
models.ScienceRoute.hasMany(models.ScienceGroup, { onDelete: 'cascade' })
models.ScienceGroup.hasMany(models.SciencePeople, { onDelete: 'cascade' })
models.ScienceGroup.hasMany(models.ScienceArticle, { onDelete: 'cascade' })
models.EducationForm.hasOne(models.EducationForm)

export { models, sequelize as default}