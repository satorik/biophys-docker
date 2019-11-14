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
    await newGroup.setPeople(people)
    console.log(newGroup)
    await newGroup.setArticles(articles)
    console.log(newGroup)
    
    return newGroup.dataValues
  },
  async updateScienceGroup(parent, {id, inputData}, { models }){
    // if (!req.isAuth) { e }
  
    const post = await models.Conference.findOne({where: {id}})
    if (!post) { throw new ApolloError('Post not found') }

    let isUploaded = {}
    if (inputData.image) {
      const uploadedImage = await inputData.image
      isUploaded = await writeImage(uploadedImage, 'conference')
    }
   
  
    // const user = await User.findOne({where: {id: +req.userId}});
    // if (!user) {thro e }
    Object.keys(inputData).forEach(item => post[item] = inputData[item])
    if (isUploaded.imageUrl) { post.imageUrl = isUploaded.imageUrl }

    await post.save()
    return post.dataValues

  },
  async deleteScienceGroup(parent, {id}, { models }){
    const post = await models.Conference.findOne({where: {id}})
    if (!post) { throw new ApolloError('Post not found') }

    await post.destroy()
    clearImage(post.dataValues.imageUrl, 'conference')
    return id
  }
}

export default scienceMutation