import db from '../models'
import createLinks from './createLinks'
import createNews from './createNews'
import createDepartment from './createDepartment'
import createEducation from './createEducation'
import createScience from './createScience'
import createBasis from './createBasicDBLayout'

const populate = async (force = true) => {

  if (force) {
    await db.sync({force: true})

    console.log(`Force sync!`)
    try {
      await createBasis(db.models)
    }
    catch (err) {
      console.log(err);
    }
  }
  else {
    await db.sync()
    
    await createBasis(db.models)
  }
}

export default populate