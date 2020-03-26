import { ApolloError } from 'apollo-server'
import writeImage from '../../utils/readStreamIntoFile'
import clearImage from '../../utils/imageFunctions'
import getUser from '../../utils/getUser'

const blogpostMutation = {
  async createBlogpost(parent, { inputData }, { models, auth }) {

    const user = await getUser(auth, models.User)

    const uploadedImage = await inputData.image
    const { imageUrl } = await writeImage(uploadedImage, 'blog')

    const post = await models.Blogpost.create({
      title: inputData.title,
      content: inputData.content,
      description: inputData.description,
      imageUrl: imageUrl,
      userCreated: user
    })
  
    return post.dataValues

  },
  async updateBlogpost(parent, { id, inputData }, { models, auth }) {
    
    const user = await getUser(auth, models.User)    

    const post = await models.Blogpost.findOne({ where: { id } })
    if (!post) { throw new ApolloError('Post not found') }

    let isUploaded = {}
    if (inputData.image) {
      const uploadedImage = await inputData.image
      isUploaded = await writeImage(uploadedImage, 'blog')
    }

    Object.keys(inputData).forEach(item => post[item] = inputData[item])
    if (isUploaded.imageUrl) { post.imageUrl = isUploaded.imageUrl }

    post.userUpdated = user

    await post.save()
    return post.dataValues

  },
  async deleteBlogpost(parent, { id }, { models, auth }) {

    const user = await getUser(auth, models.User)

    const post = await models.Blogpost.findOne({ where: { id } })
    if (!post) { throw new ApolloError('Post not found') }

    await post.destroy()
    clearImage(post.dataValues.imageUrl, 'blog')
    return id

  },
}

export default blogpostMutation