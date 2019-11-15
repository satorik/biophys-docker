import { ApolloError } from "apollo-server"
import writeImage from '../../utils/readStreamIntoFile'
import clearImage from '../../utils/clearImage'

const scienceMutation = {
  async createScienceGroup(parent, {routeId, inputData}, { models }){

    const scienceRoute = await models.ScienceRoute.findOne({where: {id: routeId}})
    if (!scienceRoute) { throw new ApolloError(`Science Route with id ${routeId} not found`) }

    // if (!req.isAuth) { throw e}
    const {image, people, articles, ...groupData} = inputData
    const uploadedImage = await inputData.image
    const {file, imageUrl} = await writeImage(uploadedImage, 'scienceGroup')
    const groupDataWithUrl = {
      ...groupData,
      imageUrl,
      scienceRouteId: routeId
    }

    const newGroup = await models.ScienceGroup.create({...groupDataWithUrl})
    console.log(newGroup)
    if (people.length > 0) { await newGroup.setSciencePeople(people) }
    if (articles.length > 0) { await newGroup.setScienceArticles(articles) }

    return newGroup.dataValues
  },
  async updateScienceGroup(parent, {id, inputData}, { models }){
    // if (!req.isAuth) { e }
  
    const route = await models.Conference.findOne({where: {id}})
    if (!route) { throw new ApolloError('Post not found') }

    let isUploaded = {}
    if (inputData.image) {
      const uploadedImage = await inputData.image
      isUploaded = await writeImage(uploadedImage, 'conference')
    }
   
  
    // const user = await User.findOne({where: {id: +req.userId}});
    // if (!user) {thro e }
    Object.keys(inputData).forEach(item => route[item] = inputData[item])
    if (isUploaded.imageUrl) { route.imageUrl = isUploaded.imageUrl }

    await route.save()
    return route.dataValues

  },
  async deleteScienceGroup(parent, {id}, { models }){
    const route = await models.Conference.findOne({where: {id}})
    if (!route) { throw new ApolloError('Post not found') }

    await route.destroy()
    clearImage(route.dataValues.imageUrl, 'conference')
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
  }
}

export default scienceMutation