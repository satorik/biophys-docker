import writeImage from './readStreamIntoFile'
import getUser from './getUser'
import { convertPdfToBase64 } from './imageFunctions'
import { ApolloError } from 'apollo-server'

const getCreateDataImage = (postData, imageUrl, user) => {
  return {
    createData: {
      ...postData,
      imageUrl,
      userCreated: user
    },
    imageUrl  
  }
}

const getCreateDataPDF = (postData, fileLink, user, image) => {
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

const getUploadedLinks = async(image, file, fileType, currentSection) => {
  if (!image && !file) return null
  
  const uploadedFile = fileType === 'image' ? await image : await file
  const { file: filePath, imageUrl, fileLink } = await writeImage(uploadedFile, currentSection, fileType)

  if (image) return {imageUrl}
  if (file) {
    const image = await convertPdfToBase64(filePath)
    return {
      fileLink,
      image
    }
  }
}

const valueForCreateImg = async(inputData, currentSection, auth, userModel, fileType = 'image') => {

  const user = await getUser(auth, userModel)
  const {image, file, ...postData} = inputData
  const uploaded = await getUploadedLinks(image, file, fileType, currentSection)
  
  if (fileType === 'image') return getCreateDataImage(postData, uploaded.imageUrl, user)

  else if (fileType === 'pdf') return getCreateDataPDF(postData, uploaded.fileLink, user, uploaded.image)
  
  else {throw new ApolloError('File Type not recognized')}
}

const findPostById = async (id, currentModel) => {
  const post = await currentModel.findOne({where: {id}})
  if (!post) { throw new ApolloError('Post not found') }

  return post
}

const findPostBySection = async (section, currentModel) => {
  const post = await currentModel.findOne({where: {section}})
  if (!post) { throw new ApolloError('Post not found') }

  return post
}

const valueForUpdateImg = async(id, inputData, currentSection, auth, currentModel, userModel, fileType = 'image') => {

  const user = await getUser(auth, userModel)
  
  const post = (currentSection === 'history' || currentSection === 'admission') 
                ? await findPostBySection(inputData.section, currentModel)
                : await findPostById(id, currentModel)

  const {image, file, ...postData} = inputData

  const uploaded = await getUploadedLinks(image, file, fileType, currentSection)
 
  let imageToClear = null
  if (uploaded) {
    imageToClear = fileType === 'image' ? post.imageUrl : post.fileLink
    if (fileType === 'image') post.imageUrl = uploaded.imageUrl
    if (fileType === 'pdf') {
      post.fileLink = uploaded.fileLink
      post.image = 'data:image/jpeg;base64,'+uploaded.image.base64
    } 
  }
 
  Object.keys(postData).forEach(item => post[item] = postData[item])

  post.userUpdated = user

  return {
    updateData: post,
    imageToClear,
    isUploaded: uploaded 
      ? {
        imageUrl: uploaded.imageUrl,
        fileLink: uploaded.fileLink
        }
      : null 
  }
}

const valueForDeleteImg = async(auth, userModel, id, currentModel) => {
  
  await getUser(auth, userModel)

  const post = (id === 'HISTORY' || id === 'ADMISSION') 
                ? await findPostBySection(id, currentModel)
                : await findPostById(id, currentModel)

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