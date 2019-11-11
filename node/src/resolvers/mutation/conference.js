import { ApolloError } from "apollo-server"
import writeImage from '../../utils/readStreamIntoFile'
import clearImage from '../../utils/clearImage'

const conferenceMutation = {
  async createConference(parent, {inputData}, { models }){
    // if (!req.isAuth) { throw e}
    const {image, ...postData} = inputData
    const uploadedImage = await inputData.image
    const {file, imageUrl} = await writeImage(uploadedImage, 'conference')
    const postDataWithUrl = {
      ...postData,
      imageUrl
    }

    // const user = await User.findOne({where: {id: +req.userId}});
    // if (!user) {  throw e }

      const conference = await models.Conference.create({...postDataWithUrl})
      return conference.dataValues
  },
  async updateConference(parent, {id, inputData}, { models }){
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
  async deleteConference(parent, {id}, { models }){
    const post = await models.Conference.findOne({where: {id}})
    if (!post) { throw new ApolloError('Post not found') }

    await post.destroy()
    clearImage(post.dataValues.imageUrl, 'conference')
    return id
  }
}

export default conferenceMutation