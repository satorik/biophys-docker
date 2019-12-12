import { makeExecutableSchema } from 'graphql-tools'

//import {LengthDirective, lengthType} from './directives/length'
import {dateTypeDef, DateFormatDirective} from './directives/date'
import query from './types/query'
import mutation from './types/mutation'

import navigationLink from './types/navigationLink'
import department from './types/department'
import education from './types/education'
import science from './types/science'
import blogpost from './types/blogpost'
import conference from './types/conference'
import seminar from './types/seminar'
import note from './types/note'
import plainText from './types/plainText'

import resolvers from '../resolvers'

export const schema = makeExecutableSchema({
  typeDefs: ['scalar Upload  scalar Date', plainText, dateTypeDef, navigationLink, blogpost, conference, seminar, note, department, education, ...science, query, mutation],
  resolvers,
  schemaDirectives: {
    date: DateFormatDirective
  }
})

