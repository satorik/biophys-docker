import { ApolloError } from "apollo-server"
import writeImage from '../../utils/readStreamIntoFile'
import clearImage from '../../utils/imageFunctions'

const blogpostMutation = {
  async createBlogpost(parent, { inputData }, { models }) {
    const uploadedImage = await inputData.image
    const {file, imageUrl} = await writeImage(uploadedImage, 'blog')
    //try {

      const post = await models.Blogpost.create({
        title: inputData.title,
        content: inputData.content,
        description: inputData.description,
        imageUrl: imageUrl
      })
  
      return post.dataValues
   // } 
   // catch(error) {throw new ApolloError(error)}
  },
  async updateBlogpost(parent, { id, inputData }, { models }) {
    // if (!req.isAuth) {throw e }
    const post = await models.Blogpost.findOne({ where: { id } })
    if (!post) { throw new ApolloError('Post not found') }

    let isUploaded = {}
    if (inputData.image) {
      const uploadedImage = await inputData.image
      isUploaded = await writeImage(uploadedImage, 'blog')
    }

    // const user = await User.findOne({where: {id: +req.userId}});
    // if (!user) {throw e }
    
    Object.keys(inputData).forEach(item => post[item] = inputData[item])
    if (isUploaded.imageUrl) { post.imageUrl = isUploaded.imageUrl }

    await post.save()
    return post.dataValues

  },
  async deleteBlogpost(parent, { id }, { models }) {
    const post = await models.Blogpost.findOne({ where: { id } })
    if (!post) { throw new ApolloError('Post not found') }

    await post.destroy()
    clearImage(post.dataValues.imageUrl, 'blog')
    return id

  },
}

export default blogpostMutation