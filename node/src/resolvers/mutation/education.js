import { ApolloError } from "apollo-server"

const educationMutation = {
  async createScheduleYear(parent, {inputData}, { models }){
    const year = await models.ScheduleYear.findOne({where: {...inputData}})
    if (year) { throw new ApolloError('This year already exists') }

    const newYear = await models.ScheduleYear.create({...inputData})
    return {...newYear.dataValues, timetable: {}}
  },
  async updateScheduleYear(parent, {id, inputData}, { models }){
    const year = await models.ScheduleYear.findOne({where: {id}})
    if (!year) { throw new ApolloError('Year not found') }

    year.title = inputData.title
    await year.save()
    return year.dataValues

  },
  async deleteScheduleYear(parent, {id}, { models }){
    const year = await models.ScheduleYear.findOne({where: {id}})
    if (!year) { throw new ApolloError('Year not found') }

    await year.destroy()
    return id
  },
  async createScheduleTimetable(parent, {yearId, dayId, inputData}, { models }){
    const year = await models.ScheduleYear.findOne({where: {id: yearId}})
    if (!year) { throw new ApolloError('This year does not exist ' + yearId) }

    const newTime = await models.ScheduleTimetable.create({...inputData, yearId, dayId})

    if (inputData.isDouble !== 0) {
      const doubleTime = await models.ScheduleTimetable.findOne({where: {id: inputData.isDouble}})
      doubleTime.isDouble = newTime.id
      doubleTime.save()

      return {timetable: newTime, double: {id: doubleTime.id, isDouble: newTime.id}}
    }

    return {timetable: newTime}

  },
  async updateScheduleTimetable(parent, {id, inputData}, { models }){
    const timetable = await models.ScheduleTimetable.findOne({where: {id}})
    if (!timetable) { throw new ApolloError('This lecture does not exist') }

    Object.keys(inputData).forEach(item => timetable[item] = inputData[item])
   
    await timetable.save()
    return timetable.dataValues

  },
  async deleteScheduleTimetable(parent, {id}, { models }){
    const timetable = await models.ScheduleTimetable.findOne({where: {id}})
    if (!timetable) { throw new ApolloError('This lecture does not exist') }

    const doubleToFind = timetable.isDouble
    await timetable.destroy()

    if (doubleToFind !== 0) {
      const doubleTime = await models.ScheduleTimetable.findOne({where: {id: doubleToFind}})
      doubleTime.isDouble = 0
      doubleTime.save()
      console.log({id, double: {id: doubleTime.id, isDouble: 0}})
      return {id, double: {id: doubleTime.id, isDouble: 0}}
    }
    return {id}
  },
  async createAdmission(parent, {section, inputData}, { models }){
    // if (!req.isAuth) { throw e}
    const postData = {
      ...inputData,
      section
    }

    const admission = await models.TextDescription.create({...postData})
    return admission.dataValues
  },
  async updateAdmission(parent, {section, inputData}, { models }){
    // if (!req.isAuth) { e }
  
    const post = await models.TextDescription.findOne({where: {section}})
    if (!post) { throw new ApolloError('admission not found') }

    // let isUploaded = {}
    // if (inputData.image) {
    //   const uploadedImage = await inputData.image
    //   isUploaded = await writeImage(uploadedImage, 'admission')
    // }
   
    Object.keys(inputData).forEach(item => post[item] = inputData[item])
    //if (isUploaded.imageUrl) { post.imageUrl = isUploaded.imageUrl }

    await post.save()
    return post.dataValues

  },
  async deleteAdmission(parent, {section}, { models }){
    const post = await models.TextDescription.findOne({where: {section}})
    if (!post) { throw new ApolloError('admission not found') }
    await post.destroy()
   // clearImage(post.dataValues.imageUrl, 'admission')
    return true
  }
}


export default educationMutation



// createScheduleYear(title: String!): ScheduleYear!
// updateScheduleYear(title: String!): ScheduleYear!
// deleteScheduleYear(id: ID!): ID!
// createScheduleTimetable(yearId: ID!, dayId: ID!, inputData: ScheduleTimetableCreateData!): ScheduleTimetable!
// updateScheduleTimetable(id: ID!, inputData: ScheduleTimetableUpdateData!): [ScheduleTimetable!]
// deleteScheduleTimetable(id: ID!): ID!