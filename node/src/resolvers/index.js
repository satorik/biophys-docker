import Query from './query/'
import Mutation from './mutation/'
import NavigationLink from './link'
import scienceQuery from './query/science'
import educationQuery from './query/education'

const resolvers = {
  Query: Query,
  Mutation: Mutation,
  NavigationLink: NavigationLink,
  ScienceRoute:  {scienceGroups : scienceQuery.scienceGroups},
  ScheduleYear: {timetable: educationQuery.timetable},
  EducationCourse: {resourses: educationQuery.resourses},
  EducationResourse: {form: educationQuery.form},
  EducationForm: {parentForm: educationQuery.parentForm},
}

//console.log(resolvers)

export { resolvers as default }