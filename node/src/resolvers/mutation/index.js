//import departmentQuery from './department'
//import educationQuery from './education'
//import scienceQuery from './science'
//import sharedQuery from './shared'

import blogpostMutation from './blogpost'
import conferenceMutation from './conference'
import seminarMutaion from './seminar'
import noteMutation from './note'

const Mutation = {
  ...blogpostMutation,
  ...conferenceMutation,
  ...seminarMutaion,
  ...noteMutation
}

export default Mutation