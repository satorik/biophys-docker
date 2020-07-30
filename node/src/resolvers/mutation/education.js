import { ApolloError } from "apollo-server"
import writeImage from '../../utils/readStreamIntoFile'
import clearImage, { convertPdfToBase64 } from '../../utils/imageFunctions'
import getUser from '../../utils/getUser'

const getEducationSubsection = async (subSectionId, subSectionText, educationFormId, models, filetype) => {
  if (subSectionId || subSectionText) {
    if (subSectionId !== '') return subSectionId
    else {
      const parentSection = await models.EducationForm.findOne({where: {id: educationFormId}}) 
      const newSubSection = await parentSection.createEducationForm({
        title: subSectionText,
        type: parentSection.type,
        filetype
      })
      return newSubSection.id
    }
  }
  else return educationFormId
}

const clearSubSection = async (form, models) => {
  if (form.dataValues.educationFormId !== null ) {
    const cntSubSectionRes = await models.EducationResourse.count({
        where: {educationFormId: form.dataValues.id},
      })
    
    if (cntSubSectionRes === 0 ) await form.destroy()
  }
}

const educationMutation = {
  async createScheduleYear(parent, {inputData}, { models, auth }){

    const user = await getUser(auth, models.User)

    const year = await models.ScheduleYear.findOne({where: {...inputData}})
    if (year) { throw new ApolloError('This year already exists') }

    const newYear = await models.ScheduleYear.create({...inputData, userCreated: user})
    return {...newYear.dataValues, timetable: {}}
  },
  async updateScheduleYear(parent, {id, inputData}, { models, auth }){

    const user = await getUser(auth, models.User)

    const year = await models.ScheduleYear.findOne({where: {id}})
    if (!year) { throw new ApolloError('Year not found') }

    year.title = inputData.title
    year.userUpdated = user
    await year.save()
    return year.dataValues

  },
  async deleteScheduleYear(parent, {id}, { models, auth }){

    const user = await getUser(auth, models.User)

    const year = await models.ScheduleYear.findOne({where: {id}})
    if (!year) { throw new ApolloError('Year not found') }

    await year.destroy()
    return id
  },
  async createScheduleTimetable(parent, {yearId, dayId, inputData}, { models, auth }){

    const user = await getUser(auth, models.User)

    const year = await models.ScheduleYear.findOne({where: {id: yearId}})
    if (!year) { throw new ApolloError('This year does not exist ' + yearId) }

    const newTime = await models.ScheduleTimetable.create({...inputData, yearId, dayId, userCreated: user})

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
  async updateScheduleTimetable(parent, {id, inputData}, { models, auth }){

    const user = await getUser(auth, models.User)

    const timetable = await models.ScheduleTimetable.findOne({where: {id}})
    if (!timetable) { throw new ApolloError('This lecture does not exist') }

    Object.keys(inputData).forEach(item => timetable[item] = inputData[item])
    timetable.userUpdated = user
    await timetable.save()
    return {
      ...timetable.dataValues,
      startDate: timetable.startDate && timetable.startDate.toISOString(),
      createdAt: timetable.createdAt.toISOString(),
      updatedAt: timetable.updatedAt.toISOString()
    }

  },
  async deleteScheduleTimetable(parent, {id}, { models, auth }){

    const user = await getUser(auth, models.User)

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
  async createAdmission(parent, {section, inputData}, { models, auth }){

    const user = await getUser(auth, models.User)

    // if (!req.isAuth) { throw e}
    const postData = {
      ...inputData,
      section
    }

    const admission = await models.TextDescription.create({...postData, userCreated: user})
    return admission.dataValues
  },
  async updateAdmission(parent, {section, inputData}, { models, auth }){

    const user = await getUser(auth, models.User)
  
    const post = await models.TextDescription.findOne({where: {section}})
    if (!post) { throw new ApolloError('admission not found') }

    Object.keys(inputData).forEach(item => post[item] = inputData[item])
    post.userUpdated = user

    await post.save()
    return post.dataValues

  },
  async deleteAdmission(parent, {section}, { models, auth }){

    const user = await getUser(auth, models.User)

    const post = await models.TextDescription.findOne({where: {section}})
    if (!post) { throw new ApolloError('admission not found') }
    await post.destroy()
   // clearImage(post.dataValues.imageUrl, 'admission')
    return true
  },
  async createEducationCourse(parent, {inputData}, { models, auth }){

    const user = await getUser(auth, models.User)

    const course = await models.EducationCourse.findOne({where: {title: inputData.title}})
    if (course) { throw new ApolloError('This course already exists') }

    const newCourse = await models.EducationCourse.create({...inputData, userCreated: user})
    return newCourse
  },
  async updateEducationCourse(parent, {id, inputData}, { models, auth }){

    const user = await getUser(auth, models.User)

    const course = await models.EducationCourse.findOne({where: {id}})
    if (!course) { throw new ApolloError('Course not found') }

    Object.keys(inputData).forEach(item => course[item] = inputData[item])
    course.userUpdated = user

    await course.save()
    return course.dataValues

  },
  async deleteEducationCourse(parent, {id}, { models, auth }){

    const user = await getUser(auth, models.User)

    const course = await models.EducationCourse.findOne({where: {id}})
    if (!course) { throw new ApolloError('Course not found') }

    await course.destroy()
    //ADD DELETE ALL RESOURSES
    return id
  },
  async createEducationResourse(parent, {courseId, filetype,  inputData}, { models, auth }){

    const user = await getUser(auth, models.User)

    const course = await models.EducationCourse.findOne({where: {id: courseId}})
    if (!course) { throw new ApolloError('Course not found') }

    const subSection = await getEducationSubsection(inputData.subSectionId, inputData.subSectionText, inputData.educationFormId, models, filetype)
    let resourse = {}

    if (filetype === 'PDF') {
      const {file, ...postData} = inputData

      const uploadedFile = await inputData.file
      const { file: filePath, fileLink } = await writeImage(uploadedFile, 'education', 'pdf')
      const image = await convertPdfToBase64(filePath)
    
      const postWithFile = {
        ...postData,
        fileLink,
        educationFormId: subSection || postData.educationFormId,
        image: 'data:image/jpeg;base64,'+image.base64,
        educationCourseId: courseId,
        userCreated: user
      }
      resourse = await models.EducationResourse.create({...postWithFile})
    }
    else if (filetype === 'URL'){
      const postData = {
        ...inputData,
        fileLink: inputData.file,
        educationCourseId: courseId,
        educationFormId: subSection || postData.educationFormId,
        userCreated: user
      }
  
      resourse = await models.EducationResourse.create({...postData})
    }
    const forms = await models.EducationForm.findAll({raw:true, where: {educationFormId: null}})
    return { resourse : resourse.dataValues, forms }
  },

  async updateEducationResourse(parent, {id, filetype, inputData}, { models, auth }){

    const user = await getUser(auth, models.User)

    const resourse = await models.EducationResourse.findOne({where: {id}})
    if (!resourse) { throw new ApolloError('Resourse not found') }

    const form = await resourse.getEducationForm()
    if (inputData.title) resourse.title = inputData.title
    if (inputData.description) resourse.description = inputData.description
    resourse.userUpdated = user

    if (filetype === 'PDF') {
      let isUploaded = {}
      if (inputData.file) {
        const uploadedFile = await inputData.file
        isUploaded = await writeImage(uploadedFile, 'education', 'pdf')
        const image = await convertPdfToBase64(isUploaded.file)
        isUploaded = {
          ...isUploaded,
          image
        }
        clearImage(isUploaded.fileLink, 'education', 'pdf')
      }

       if (isUploaded.fileLink) { 
         resourse.fileLink = isUploaded.fileLink
         resourse.image = isUploaded.image
       }
    }
    else if (filetype === 'URL'){
      if (inputData.file) resourse.fileLink = inputData.file
    }

    await resourse.save()

    if ((resourse.educationFormId === inputData.educationFormId && inputData.subSectionText === '' && inputData.subSectionId === '') ||
    (resourse.educationFormId === inputData.subSectionId)) await resourse.save()
    else {
      const subSection = await getEducationSubsection(inputData.subSectionId, inputData.subSectionText, inputData.educationFormId, models, filetype)
      resourse.educationFormId = subSection   
      await resourse.save()

      await clearSubSection(form, models)
    }
    const forms = await models.EducationForm.findAll({raw:true, where: {educationFormId: null}})
    return { resourse : resourse.dataValues, forms }

  },
  async deleteEducationResourse(parent, {id}, { models, auth }){

    const user = await getUser(auth, models.User)

    const resourse = await models.EducationResourse.findOne({where: {id}})
    if (!resourse) { throw new ApolloError('Resourse not found') }

    const form = await resourse.getEducationForm()
    const resourseReturn = resourse.dataValues
    await resourse.destroy()

    await clearSubSection(form, models)

    const forms = await models.EducationForm.findAll({raw:true, where: {educationFormId: null}})
    return { resourse : resourseReturn, forms }
  },
}


export default educationMutation


