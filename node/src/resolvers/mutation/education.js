import { ApolloError } from "apollo-server"
import writeImage from '../../utils/readStreamIntoFile'
import clearImage, { convertPdfToBase64 } from '../../utils/imageFunctions'

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

      return {
        timetable: {
          ...newTime.dataValues,
          startDate: newTime.startDate && newTime.startDate.toISOString(),
          createdAt: newTime.createdAt.toISOString(),
          updatedAt: newTime.updatedAt.toISOString()
        }, 
        double: {id: doubleTime.id, isDouble: newTime.id}}
    }

    return {timetable: {
      ...newTime.dataValues,
      startDate: newTime.startDate && newTime.startDate.toISOString(),
      createdAt: newTime.createdAt.toISOString(),
      updatedAt: newTime.updatedAt.toISOString()
    }}

  },
  async updateScheduleTimetable(parent, {id, inputData}, { models }){
    const timetable = await models.ScheduleTimetable.findOne({where: {id}})
    if (!timetable) { throw new ApolloError('This lecture does not exist') }

    Object.keys(inputData).forEach(item => timetable[item] = inputData[item])
   
    await timetable.save()
    return {
      ...timetable.dataValues,
      startDate: timetable.startDate && timetable.startDate.toISOString(),
      createdAt: timetable.createdAt.toISOString(),
      updatedAt: timetable.updatedAt.toISOString()
    }

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
  },
  async createEducationCourse(parent, {inputData}, { models }){
    const course = await models.EducationCourse.findOne({where: {title: inputData.title}})
    if (course) { throw new ApolloError('This course already exists') }

    const newCourse = await models.EducationCourse.create({...inputData})
    return newCourse
  },
  async updateEducationCourse(parent, {id, inputData}, { models }){
    const course = await models.EducationCourse.findOne({where: {id}})
    if (!course) { throw new ApolloError('Course not found') }

    Object.keys(inputData).forEach(item => course[item] = inputData[item])
    await course.save()
    return course.dataValues

  },
  async deleteEducationCourse(parent, {id}, { models }){
    const course = await models.EducationCourse.findOne({where: {id}})
    if (!course) { throw new ApolloError('Course not found') }

    await course.destroy()
    //ADD DELETE ALL RESOURSES
    return id
  },
  async createEducationResoursePDF(parent, {courseId, inputData}, { models }){
    const course = await models.EducationCourse.findOne({where: {id: courseId}})
    if (!course) { throw new ApolloError('Course not found') }

    const {file, ...postData} = inputData

    const uploadedFile = await inputData.file
    const { file: filePath, fileLink } = await writeImage(uploadedFile, 'education', 'pdf')
    const image = await convertPdfToBase64(filePath)
  
    const postWithFile = {
      ...postData,
      fileLink,
      image: 'data:image/jpeg;base64,'+image.base64,
      educationCourseId: courseId
    }
    
    return models.EducationResourse.create({...postWithFile})
  },
  async createEducationResourseURL(parent, {courseId, inputData}, { models }){
    const course = await models.EducationCourse.findOne({where: {id: courseId}})
    if (!course) { throw new ApolloError('Course not found') }

    const postData = {
      ...inputData,
      educationCourseId: courseId
    }

    return models.EducationResourse.create({...postData})
  },

  async updateEducationResoursePDF(parent, {id, inputData}, { models }){
    const course = await models.EducationCourse.findOne({where: {id}})
    if (!course) { throw new ApolloError('Course not found') }

    Object.keys(inputData).forEach(item => course[item] = inputData[item])
    await course.save()
    return course.dataValues

  },
  async updateEducationResourseURL(parent, {id, inputData}, { models }){
    const course = await models.EducationCourse.findOne({where: {id}})
    if (!course) { throw new ApolloError('Course not found') }

    Object.keys(inputData).forEach(item => course[item] = inputData[item])
    await course.save()
    return course.dataValues

  },
  async deleteEducationResourse(parent, {id}, { models }){
    const course = await models.EducationCourse.findOne({where: {id}})
    if (!course) { throw new ApolloError('Course not found') }

    await course.destroy()
    //ADD DELETE ALL RESOURSES
    return id
  },
}


export default educationMutation