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

const deleteWithImage = async(post, imageUrl, currentSection, id, transation = null, fileType = 'image') => {

  const t = transation || await sequelize.transaction()
  try {
      await post.destroy({ transaction: t })
      clearImage(imageUrl, currentSection, fileType)
      await t.commit()
      return id
  } catch(error) {
      console.log(error)
      await t.rollback()
      throw error
  }
}


export {createWithImage, updateWithImage, deleteWithImage}