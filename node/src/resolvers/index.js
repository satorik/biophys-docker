import Query from './query/'
import Mutation from './mutation/'
import NavigationLink from './link'
import scienceQuery from './query/science'
import {educationQuery, EducationForm, EducationResourse} from './query/education'

const resolvers = {
  Query: Query,
  Mutation: Mutation,
  NavigationLink: NavigationLink,
  ScienceRoute:  {scienceGroups : scienceQuery.scienceGroups},
  ScheduleYear: {timetable: educationQuery.timetable},
  EducationCourse: {resourses: educationQuery.resourses},
  EducationResourse: {form: EducationResourse.form},
  EducationForm: {parentForm: EducationForm.parentForm},
  EducationForm: {subSections: EducationForm.subSections},
}

//console.log(resolvers)

export { resolvers as default }