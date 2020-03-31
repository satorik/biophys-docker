import writeImage from './readStreamIntoFile'
import getUser from './getUser'
import { convertPdfToBase64 } from './imageFunctions'
import { ApolloError } from 'apollo-server'

const valueForCreateImg = async(inputData, currentSection, auth, userModel, fileType = 'image') => {

  const user = await getUser(auth, userModel)
  const {image, file, ...postData} = inputData
  const uploadedFile = fileType === 'image' ? await image : await file
  const { file: filePath, imageUrl, fileLink } = await writeImage(uploadedFile, currentSection, fileType)
 
  if (fileType === 'image') {
    return {
      createData: {
        ...postData,
        imageUrl,
        userCreated: user
      },
      imageUrl  
    }
  }
  else if (fileType === 'pdf') {
    const image = await convertPdfToBase64(filePath)

    return {
      createData: {
        ...postData,
        fileLink,
        image: 'data:image/jpeg;base64,'+image.base64,
        userCreated: user
      },
      fileLink  
    }
  }
  else {throw new ApolloError('File Type not recognized')}
}

const valueForUpdateImg = async(id, inputData, currentSection, auth, currentModel, userModel, fileType = 'image') => {

  const user = await getUser(auth, userModel)

  const post = await currentModel.findOne({where: {id}})
  if (!post) { throw new ApolloError('Post not found') }

  const {image, file, ...postData} = inputData

  let isUploaded = null
  if (image || file) {
    const uploadedFile = fileType === 'image' ? await image : await file
    const { file: filePath, imageUrl, fileLink } = await writeImage(uploadedFile, currentSection, fileType)
    isUploaded = {
      imageUrl,
      fileLink
    }
    if (file) {
      const image = await convertPdfToBase64(filePath)
      post.image = 'data:image/jpeg;base64,'+image.base64
    }  
  }

  Object.keys(postData).forEach(item => post[item] = postData[item])
  
  let imageToClear = null
  if (isUploaded.imageUrl || isUploaded.fileLink) { 
    imageToClear = fileType === 'image' ? post.dataValues.imageUrl : post.dataValues.fileLink
    if (fileType === 'image') post.imageUrl = isUploaded.imageUrl
    if (fileType === 'pdf') post.fileLink = isUploaded.fileLink 
  }
  
  post.userUpdated = user

  return {
    updateData: post,
    imageToClear,
    isUploaded
  }
}

const valueForDeleteImg = async(auth, userModel, id, currentModel) => {
  
  await getUser(auth, userModel)

  const post = await currentModel.findOne({where: {id}})
  if (!post) { throw new ApolloError('Post not found') }

  return post
}

const valueForCreateSimple = () => {

}

const valueForUpdateSimple = () => {
  
}

const valueForDeleteSimple = () => {
  
}

export { valueForCreateImg, 
  valueForUpdateImg, 
  valueForDeleteImg, 
  valueForCreateSimple, 
  valueForUpdateSimple, 
  valueForDeleteSimple}