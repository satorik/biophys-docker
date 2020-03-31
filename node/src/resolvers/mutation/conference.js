import { createWithImage, updateWithImage, deleteWithImage } from '../../utils/mutate'
import { valueForCreateImg, valueForUpdateImg, valueForDeleteImg } from '../../utils/getMutationValue'

const conferenceMutation = {
  async createConference(parent, {inputData}, { models, auth }){

    const {createData, imageUrl} = await valueForCreateImg(inputData, 'conference', auth, models.User)
    return createWithImage(models.Conference, createData, imageUrl, 'conference')

  },
  async updateConference(parent, {id, inputData}, { models, auth }){

    const {updateData, imageToClear, isUploaded} = 
      await valueForUpdateImg(id, inputData, 'conference', auth, models.Conference, models.User)

    return updateWithImage(updateData, imageToClear, isUploaded, 'conference')

  },
  async deleteConference(parent, {id}, { models, auth }){

    const forDelete = await valueForDeleteImg(auth, models.User, id, models.Conference)

    return deleteWithImage(forDelete, forDelete.dataValues.imageUrl, 'conference', id)
  }
}

export default conferenceMutation