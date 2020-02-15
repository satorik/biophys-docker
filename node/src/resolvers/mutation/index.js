//import departmentQuery from './department'
//import educationQuery from './education'
//import scienceQuery from './science'
//import sharedQuery from './shared'

import blogpostMutation from './blogpost'
import conferenceMutation from './conference'
import seminarMutaion from './seminar'
import noteMutation from './note'
import scienceMutation from './science'
import departmentMutation from './department'
import educationMutation from './education'

const Mutation = {
  ...blogpostMutation,
  ...conferenceMutation,
  ...seminarMutaion,
  ...noteMutation,
  ...scienceMutation,
  ...departmentMutation,
  ...educationMutation
}

export default Mutation