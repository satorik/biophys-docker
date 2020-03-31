import clearImage from './imageFunctions'
import sequelize from '../models/'

const createWithImage =  (currentModel, data, fileUrl, currentSection, fileType = 'image') => {
  return new Promise((resolve, reject) => {
        currentModel.create({...data})
          .then(res => resolve(res))
          .catch(err => {
            clearImage(fileUrl, currentSection, fileType)
            reject(err)
          })
        })
}

const updateWithImage = async(post, imageToClear, upload, currentSection, fileType = 'image') => {
  const t = await sequelize.transaction()
  try {
    await post.save({ transaction: t })
    if (imageToClear) {clearImage(imageToClear, currentSection, fileType)}
    await t.commit()
    return post
  } catch(error) {
    await t.rollback()
    if (upload) {clearImage(upload.imageUrl, currentSection, fileType)}
    throw error
  }
}

const deleteWithImage = async(post, imageUrl, currentSection, id, t = null, fileType = 'image') => {
  const transaction = t || await sequelize.transaction()

  try {
      await post.destroy({ transaction })
      clearImage(imageUrl, currentSection, fileType)
      await transaction.commit()
      return id
  } catch(error) {
      console.log(error)
      await transaction.rollback()
      throw error
  }
}


export {createWithImage, updateWithImage, deleteWithImage}