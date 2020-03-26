import { ApolloError } from "apollo-server"
import writeImage from '../../utils/readStreamIntoFile'
import clearImage, { convertPdfToBase64 } from '../../utils/imageFunctions'
import getUser from '../../utils/getUser'

const departmentMutation = {
  async createHistory(parent, {section, inputData}, { models, auth }){
    
    const user = await getUser(auth, models.User)

    const {image, ...postData} = inputData
    const uploadedImage = await inputData.image
    const {file, imageUrl} = await writeImage(uploadedImage, 'history')
    const postDataWithUrl = {
      ...postData,
      imageUrl,
      section,
      userCreated: user
    }

    const history = await models.TextDescription.create({...postDataWithUrl})
    return history.dataValues
  },
  async updateHistory(parent, {section, inputData}, { models, auth }){
    
    const user = await getUser(auth, models.User)
  
    const post = await models.TextDescription.findOne({where: {section}})
    if (!post) { throw new ApolloError('History not found') }

    let isUploaded = {}
    if (inputData.image) {
      const uploadedImage = await inputData.image
      isUploaded = await writeImage(uploadedImage, 'history')
    }
   
    Object.keys(inputData).forEach(item => post[item] = inputData[item])
    if (isUploaded.imageUrl) { post.imageUrl = isUploaded.imageUrl }
    
    post.userUpdated = user

    await post.save()
    return post.dataValues

  },
  async deleteHistory(parent, {section}, { models, auth }){
    const user = await getUser(auth, models.User)

    const post = await models.TextDescription.findOne({where: {section}})
    if (!post) { throw new ApolloError('History not found') }

    await post.destroy()
    clearImage(post.dataValues.imageUrl, 'history')
    return true
  },
  async createDepartmentPerson(parent, { inputData }, { models, auth }){
    
    const user = await getUser(auth, models.User)

    const { image, ...personData } = inputData
    const uploadedImage = await inputData.image
    const { imageUrl } = await writeImage(uploadedImage, 'staff')

    const peopleCount = await models.DepartmentStaff.count()

    const personDataWithUrl = {
      ...personData,
      imageUrl,
      position: peopleCount,
      userCreated: user
    }

    const newPerson = await models.DepartmentStaff.create({...personDataWithUrl})
    return newPerson.dataValues
  },
  async updateDepartmentPerson(parent, {id, inputData}, { models, auth }){

    const user = await getUser(auth, models.User)

    const person = await models.DepartmentStaff.findOne({where: {id}})
    if (!person) { throw new ApolloError('person with id ${id} not found') }

    let isUploaded = {}
    if (inputData.image) {
      const uploadedImage = await inputData.image
      isUploaded = await writeImage(uploadedImage, 'staff')
      clearImage(person.imageUrl, 'staff')
    }

    Object.keys(inputData).forEach(item => person[item] = inputData[item])
    if (isUploaded.imageUrl) { person.imageUrl = isUploaded.imageUrl }
   
    person.userUpdated = user

    await person.save()
    return person.dataValues
  },
  async deleteDepartmentPerson(parent, {id}, { models, auth }){
    
    const user = await getUser(auth, models.User)

    const person = await models.DepartmentStaff.findOne({where: {id}})
    if (!person) { throw new ApolloError('person with id ${id} not found') }

    const people = await models.DepartmentStaff.findAll({order: [['position', 'ASC']]})
  
    for (const item of people) {
      if (item.position > person.position) {
        item.position = item.position - 1
        await item.save()
      } 
    }
    const position = person.position
    clearImage(person.imageUrl, 'staff')
    await person.destroy()
    return position
  },
  async moveDepartmentPerson(parent, {id, vector}, { models, auth }){
    
    const user = await getUser(auth, models.User)

    const person = await models.DepartmentStaff.findOne({where: {id}})
    if (!person)  throw new ApolloError('person with id ${id} not found') 

    let newPosition = 0
    if (vector === 'UP') {
      if (person.position === 0) throw new ApolloError('Person can not go any higher')
      newPosition = person.position - 1
    }
    if (vector === 'DOWN') {
      const peopleCount = await models.DepartmentStaff.count()
      if (person.position === peopleCount - 1) throw new ApolloError('Person can not go any lower')
      newPosition = person.position + 1
    }
    
    if (newPosition < 0) throw new ApolloError('Something wrong')

    const personToMove = await models.DepartmentStaff.findOne({where: {position: newPosition}})
    if (!personToMove)  throw new ApolloError('person with position ${newPosition} not found')
    
    personToMove.position = person.position
    person.userUpdated = user
    
    await personToMove.save()
    person.position = newPosition
    
    await person.save()
    return [person, personToMove]
  },
  async createPartnership(parent, {inputData}, { models, auth }){

    const user = await getUser(auth, models.User)

    const {image, ...postData} = inputData
    const uploadedImage = await inputData.image
    const {file, imageUrl} = await writeImage(uploadedImage, 'partnership')
    const postDataWithUrl = {
      ...postData,
      imageUrl,
      userCreated: user
    }

    const partnership = await models.DepartmentPartnership.create({...postDataWithUrl})
    return partnership.dataValues
  },
  async updatePartnership(parent, {id, inputData}, { models, auth }){

    const user = await getUser(auth, models.User)

    const post = await models.DepartmentPartnership.findOne({where: {id}})
    if (!post) { throw new ApolloError('Post not found') }

    let isUploaded = {}
    if (inputData.image) {
      const uploadedImage = await inputData.image
      isUploaded = await writeImage(uploadedImage, 'partnership')
      clearImage(post.imageUrl, 'partnership')
    }
   
    Object.keys(inputData).forEach(item => post[item] = inputData[item])
    if (isUploaded.imageUrl) { post.imageUrl = isUploaded.imageUrl }

    post.userUpdated = user

    await post.save()
    return post.dataValues
  },
  async deletePartnership(parent, {id}, { models, auth }){

    const user = await getUser(auth, models.User)

    const post = await models.DepartmentPartnership.findOne({where: {id}})
    if (!post) { throw new ApolloError('Post not found') }

    await post.destroy()
    clearImage(post.imageUrl, 'partnership')
    return id
  },
  async createPrint(parent, {inputData}, { models, auth }){

    const user = await getUser(auth, models.User)

    const {file, ...postData} = inputData

    const uploadedFile = await inputData.file
    const { file: filePath, fileLink } = await writeImage(uploadedFile, 'prints', 'pdf')
    const image = await convertPdfToBase64(filePath)
  
    const postWithFile = {
      ...postData,
      fileLink,
      image: 'data:image/jpeg;base64,'+image.base64,
      userCreated: user
    }
    
    return models.DepartmentPrint.create({...postWithFile})
      
  },
  async updatePrint(parent, {id, inputData}, { models, auth }){

    const user = await getUser(auth, models.User)

    const post = await models.DepartmentPrint.findOne({where: {id}})
    if (!post) { throw new ApolloError('Post not found') }

    let isUploaded = {}
    if (inputData.file) {
      const uploadedFile = await inputData.file
      isUploaded = await writeImage(uploadedFile, 'prints', 'pdf')
      const image = await convertPdfToBase64(isUploaded.file)
      isUploaded = {
        ...isUploaded,
        image
      }
      clearImage(post.fileLink, 'prints', 'pdf')
    }
   
    Object.keys(inputData).forEach(item => post[item] = inputData[item])
    if (isUploaded.fileLink) { 
      post.fileLink = isUploaded.fileLink 
      post.image = isUploaded.image
    }

    post.userUpdated = user

    await post.save()
    return post.dataValues
  },
  async deletePrint(parent, {id}, { models, auth }){

    const user = await getUser(auth, models.User)

    const post = await models.DepartmentPrint.findOne({where: {id}})
    if (!post) { throw new ApolloError('Post not found') }

    await post.destroy()
    clearImage(post.fileLink, 'prints', 'pdf')
    return id
  }
}

export default departmentMutation