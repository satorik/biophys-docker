import { ApolloError } from "apollo-server"
import writeImage from '../../utils/readStreamIntoFile'
import clearImage from '../../utils/clearImage'

const scienceMutation = {
  async createScienceGroup(parent, {scienceRouteId, inputData}, { models }){

    const scienceRoute = await models.ScienceRoute.findOne({where: {id: scienceRouteId}})
    if (!scienceRoute) { throw new ApolloError(`Science Route with id ${scienceRouteId} not found`) }
    // if (!req.isAuth) { throw e}
    const {image, people, articles, ...groupData} = inputData
    const uploadedImage = await inputData.image
    const {file, imageUrl} = await writeImage(uploadedImage, 'scienceGroup')
    const groupDataWithUrl = {
      ...groupData,
      imageUrl,
      scienceRouteId
    }

    const newGroup = await models.ScienceGroup.create({...groupDataWithUrl})
    return newGroup.dataValues
  },
  async updateScienceGroup(parent, {id, inputData}, { models }){
    // if (!req.isAuth) { e }
  
    const scienceGroup = await models.ScienceGroup.findOne({where: {id}})
    if (!scienceGroup) { throw new ApolloError('Science Group with id ${id} not found') }

    let isUploaded = {}
    if (inputData.image) {
      const uploadedImage = await inputData.image
      isUploaded = await writeImage(uploadedImage, 'scienceGroup')
      clearImage(scienceGroup.dataValues.imageUrl, 'scienceGroup')
    }
   
    Object.keys(inputData).forEach(item => scienceGroup[item] = inputData[item])
    if (isUploaded.imageUrl) { scienceGroup.imageUrl = isUploaded.imageUrl }

    await scienceGroup.save()
    return scienceGroup.dataValues

  },
  async deleteScienceGroup(parent, {id}, { models }){
    const scienceGroup = await models.ScienceGroup.findOne({where: {id}})
    if (!scienceGroup) { throw new ApolloError('Science Group with id ${id} not found') }

    await scienceGroup.destroy()
    clearImage(scienceGroup.dataValues.imageUrl, 'scienceGroup')
    return id
  },
  async createScienceRoute(parent, {inputData}, { models }) {
    const scienceRoute = await models.ScienceRoute.create({...inputData})
    return scienceRoute.dataValues
  },
  async updateScienceRoute(parent, {id, inputData}, { models }){
    const route = await models.ScienceRoute.findOne({where: {id}})
    if (!route) { throw new ApolloError('Route not found') }

    Object.keys(inputData).forEach(item => route[item] = inputData[item])

    await route.save()
    return route.dataValues
  },
  async deleteScienceRoute(parent, {id}, { models }){
    const route = await models.ScienceRoute.findOne({where: {id}})
    if (!route) { throw new ApolloError('Route not found') }

    await route.destroy()
    return id
  },
  async createSciencePerson(parent, {scienceGroupId, inputData}, { models }){

    const scienceGroup = await models.ScienceGroup.findOne({where: {id: scienceGroupId}})
    if (!scienceGroup) { throw new ApolloError(`Science Group with id ${scienceGroupId} not found`) }

    const peopleCount = await models.SciencePeople.count({where: {scienceGroupId}})

    const personData = {
      ...inputData,
      scienceGroupId,
      position: peopleCount
    }

    const newPerson = await models.SciencePeople.create({...personData})
    return newPerson.dataValues
  },
  async updateSciencePerson(parent, {id, inputData}, { models }){
   const person = await models.SciencePeople.findOne({where: {id}})
    if (!person) { throw new ApolloError('person with id ${id} not found') }

    Object.keys(inputData).forEach(item => person[item] = inputData[item])
   
    await person.save()
    return person.dataValues

  },
  async deleteSciencePerson(parent, {id}, { models }){
    const person = await models.SciencePeople.findOne({where: {id}})
    if (!person) { throw new ApolloError('person with id ${id} not found') }

    const people = await models.SciencePeople.findAll({where: {scienceGroupId: person.scienceGroupId}, order: [['position', 'ASC']]})
  
    for (const item of people) {
      if (item.position > person.position) {
        item.position = item.position - 1
        await item.save()
      } 
    }
    const position = person.position
    await person.destroy()
    return position
  },
  async createScienceArticle(parent, {scienceGroupId, inputData}, { models }){

    const scienceGroup = await models.ScienceGroup.findOne({where: {id: scienceGroupId}})
    if (!scienceGroup) { throw new ApolloError(`Science Group with id ${scienceGroupId} not found`) }

    const articleCount = await models.ScienceArticle.count({where: {scienceGroupId}})

    const articleData = {
      ...inputData,
      scienceGroupId,
      position: articleCount
    }

    const newArticle = await models.ScienceArticle.create({...articleData})
    return newArticle.dataValues
  },
  async updateScienceArticle(parent, {id, inputData}, { models }){
    // if (!req.isAuth) { e }
  
    const article = await models.ScienceArticle.findOne({where: {id}})
    if (!article) { throw new ApolloError('Article with id ${id} not found') }

    Object.keys(inputData).forEach(item => article[item] = inputData[item])
   
    await article.save()
    return article.dataValues

  },
  async deleteScienceArticle(parent, {id}, { models }){
    const article = await models.ScienceArticle.findOne({where: {id}})
    if (!article) { throw new ApolloError('Article with id ${id} not found') }

    const articles = await models.SciencePeople.findAll({where: {scienceGroupId: person.scienceGroupId}, order: [['position', 'ASC']]})

    for (const item of articles) {
      if (item.position > article.position) {
        item.position = item.position - 1
        await item.save()
      } 
    }

    const position = article.position
    await article.destroy()
    return position
  },
  async moveSciencePerson(parent, {id, vector}, { models }) {
    const person = await models.SciencePeople.findOne({where: {id}})
    if (!person)  throw new ApolloError('person with id ${id} not found') 

    let newPosition = 0
    if (vector === 'UP') {
      if (person.position === 0) throw new ApolloError('Person can not go any higher')
      newPosition = person.position - 1
    }
    if (vector === 'DOWN') {
      const peopleCount = await models.SciencePeople.count({where: {scienceGroupId: person.scienceGroupId}})
      if (person.position === peopleCount - 1) throw new ApolloError('Person can not go any lower')
      newPosition = person.position + 1
    }
    
    if (newPosition < 0) throw new ApolloError('Something wrong')

    const personToMove = await models.SciencePeople.findOne({where: {scienceGroupId: person.scienceGroupId, position: newPosition}})
    if (!personToMove)  throw new ApolloError('person with scienceGroupId ${person.scienceGroupId} and position ${newPosition} not found')
    personToMove.position = person.position
    await personToMove.save()
    person.position = newPosition
    await person.save()
    return [person, personToMove]
  },
  async moveScienceArticle(parent, {id, vector}, { models }) {
    const article = await models.ScienceArticle.findOne({where: {id}})
    if (!article)  throw new ApolloError('article with id ${id} not found') 

    let newPosition = 0
    if (vector === 'UP') {
      if (article.position === 0) throw new ApolloError('article can not go any higher')
      newPosition = article.position - 1
    }
    if (vector === 'DOWN') {
      const articleCount = await models.ScienceArticle.count({where: {scienceGroupId: article.scienceGroupId}})
      if (article.position === articleCount - 1) throw new ApolloError('article can not go any lower')
      newPosition = article.position + 1
    }
    
    if (newPosition < 0) throw new ApolloError('Something wrong')

    const articleToMove = await models.ScienceArticle.findOne({where: {scienceGroupId: article.scienceGroupId, position: newPosition}})
    if (!articleToMove)  throw new ApolloError('article with scienceGroupId ${article.scienceGroupId} and position ${newPosition} not found')
    articleToMove.position = article.position
    await articleToMove.save()
    article.position = newPosition
    await article.save()
    return [article, articleToMove]
  }
}

export default scienceMutation