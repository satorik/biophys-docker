import { createWithImage, updateWithImage, deleteWithImage } from '../../utils/mutate'
import { valueForCreateImg, valueForUpdateImg, valueForDeleteImg } from '../../utils/getMutationValue'

const blogpostMutation = {
  async createBlogpost(parent, { inputData }, { models, auth }) {

    const {createData, imageUrl} = await valueForCreateImg(inputData, 'blog', auth, models.User)
    return createWithImage(models.Blogpost, createData, imageUrl, 'blog')

  },
  async updateBlogpost(parent, { id, inputData }, { models, auth }) {
    
    const {updateData, imageToClear, isUploaded} = 
    await valueForUpdateImg(id, inputData, 'blog', auth, models.Blogpost, models.User)

  return updateWithImage(updateData, imageToClear, isUploaded, 'blog')

  },
  async deleteBlogpost(parent, { id }, { models, auth }) {

    const forDelete = await valueForDeleteImg(auth, models.User, id, models.Blogpost)

    return deleteWithImage(forDelete, forDelete.dataValues.imageUrl, 'blog', id)
  },
}

export default blogpostMutation