import { ApolloError } from "apollo-server"
import writeImage from '../../utils/readStreamIntoFile'
import clearImage from '../../utils/imageFunctions'
import getUser from '../../utils/getUser'

import { createWithImage, updateWithImage, deleteWithImage } from '../../utils/mutate'
import { valueForCreateImg, valueForUpdateImg, valueForDeleteImg } from '../../utils/getMutationValue'

const scienceMutation = {
  async createScienceGroup(parent, {scienceRouteId, inputData}, { models, auth }){

    const scienceRoute = await models.ScienceRoute.findOne({where: {id: scienceRouteId}})
    if (!scienceRoute) { throw new ApolloError(`Science Route with id ${scienceRouteId} not found`) }

    const {createData, imageUrl} = await valueForCreateImg(inputData, 'scienceGroup', auth, models.User)
    return createWithImage(models.ScienceGroup, {...createData, scienceRouteId}, imageUrl, 'scienceGroup')

  },
  async updateScienceGroup(parent, {id, inputData}, { models, auth }){
    
    const {updateData, imageToClear, isUploaded} = 
    await valueForUpdateImg(id, inputData, 'scienceGroup', auth, models.ScienceGroup, models.User)

    return updateWithImage(updateData, imageToClear, isUploaded, 'scienceGroup')

  },
  async deleteScienceGroup(parent, {id}, { models, auth }){

    const forDelete = await valueForDeleteImg(auth, models.User, id, models.ScienceGroup)
    return deleteWithImage(forDelete, forDelete.dataValues.imageUrl, 'scienceGroup', id)
  },
  async createScienceRoute(parent, {inputData}, { models, auth }) {

    const user = await getUser(auth, models.User)

    const scienceRoute = await models.ScienceRoute.create({...inputData, userCreated: user})
    return scienceRoute
  },
  async updateScienceRoute(parent, {id, inputData}, { models, auth }){

    const user = await getUser(auth, models.User)

    const route = await models.ScienceRoute.findOne({where: {id}})
    if (!route) { throw new ApolloError('Route not found') }

    Object.keys(inputData).forEach(item => route[item] = inputData[item])
    route.userUpdated = user

    await route.save()
    return route
  },
  async deleteScienceRoute(parent, {id}, { models, auth }){

    await getUser(auth, models.User)
    const route = await models.ScienceRoute.findOne({where: {id}})
    if (!route) { throw new ApolloError('Route not found') }

    await route.destroy()
    return id
  },
  async createSciencePerson(parent, {scienceGroupId, inputData}, { models, auth }){

    const user = await getUser(auth, models.User)

    const scienceGroup = await models.ScienceGroup.findOne({where: {id: scienceGroupId}})
    if (!scienceGroup) { throw new ApolloError(`Science Group with id ${scienceGroupId} not found`) }

    const peopleCount = await models.SciencePeople.count({where: {scienceGroupId}})

    const personData = {
      ...inputData,
      scienceGroupId,
      position: peopleCount,
      userCreated: user
    }

    const newPerson = await models.SciencePeople.create({...personData})
    return newPerson.dataValues
  },
  async updateSciencePerson(parent, {id, inputData}, { models, auth }){

    const user = await getUser(auth, models.User)

   const person = await models.SciencePeople.findOne({where: {id}})
    if (!person) { throw new ApolloError('person with id ${id} not found') }

    Object.keys(inputData).forEach(item => person[item] = inputData[item])
    person.userUpdated= user
   
    await person.save()
    return person.dataValues

  },
  async deleteSciencePerson(parent, {id}, { models, auth }){

    const user = await getUser(auth, models.User)

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
  async createScienceArticle(parent, {scienceGroupId, inputData}, { models, auth }){

    const user = await getUser(auth, models.User)

    const scienceGroup = await models.ScienceGroup.findOne({where: {id: scienceGroupId}})
    if (!scienceGroup) { throw new ApolloError(`Science Group with id ${scienceGroupId} not found`) }

    const articleCount = await models.ScienceArticle.count({where: {scienceGroupId}})

    const articleData = {
      ...inputData,
      scienceGroupId,
      position: articleCount,
      userCreated: user
    }

    const newArticle = await models.ScienceArticle.create({...articleData})
    return newArticle.dataValues
  },
  async updateScienceArticle(parent, {id, inputData}, { models, auth }){
    
    const user = await getUser(auth, models.User)
  
    const article = await models.ScienceArticle.findOne({where: {id}})
    if (!article) { throw new ApolloError('Article with id ${id} not found') }

    Object.keys(inputData).forEach(item => article[item] = inputData[item])
    article.userUpdated = user

    await article.save()
    return article.dataValues

  },
  async deleteScienceArticle(parent, {id}, { models, auth }){

    const user = await getUser(auth, models.User)

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
  async moveSciencePerson(parent, {id, vector}, { models, auth }) {

    const user = await getUser(auth, models.User)

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

    person.userUpdated = user
    await person.save()
    return [person, personToMove]
  },
  async moveScienceArticle(parent, {id, vector}, { models, auth }) {

    const user = await getUser(auth, models.User)

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

    article.userUpdated = user
    await article.save()
    return [article, articleToMove]
  }
}

export default scienceMutation