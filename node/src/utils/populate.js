import db from '../models'
import createLinks from './createLinks'
import createNews from './createNews'
import createDepartment from './createDepartment'
import createEducation from './createEducation';
import createScience from './createScience';

const populate = async (force = true) => {

  if (force) {
    await db.sync({force: true})

    console.log(`Database & tables created!`)
    try {
      await createNews(db.models)
      await createDepartment(db.models)
      await createEducation(db.models)
      await createScience(db.models)
      await createLinks(db.models)
      console.log('populated')
    }
    catch (err) {
      console.log(err);
    }
  }
  else {
    await db.sync()
    const checkInfo = await db.models.note.count()
    console.log(checkInfo)
    if (checkInfo === 0) {
      try {
        await createNews(db.models)
        await createDepartment(db.models)
        await createEducation(db.models)
        await createScience(db.models)
        await createLinks(db.models)
        console.log('populated')
      }
      catch (err) {
        console.log(err);
      }
    }
  }
}

export default populate