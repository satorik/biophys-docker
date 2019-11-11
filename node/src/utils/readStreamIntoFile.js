import path from 'path'
import uuidv4 from 'uuidv4'
import fs from 'fs'

export default (file, subDir) => {
  return new Promise(function(resolve, reject) {
    const { createReadStream, filename, mimetype } = file
    if (!(mimetype === 'image/png' || mimetype === 'image/jpeg' || mimetype === 'image/jpg')){
      const error = new Error('Forbidden file type ', mimetype)
      error.code = 415
      reject(error)
    }

    const savedFileName = uuidv4()+path.extname(filename)
    const savedFile = path.join(__dirname, '..', 'images', subDir, savedFileName)
    const imagePath = path.join('images', subDir, savedFileName).replace(/\\/g, "/")
    
    const readStream  = createReadStream()

    const writeStream = fs.createWriteStream(savedFile, { flags : 'w' });
    readStream.pipe(writeStream)

    readStream.on('error', () => console.log('reading error'))
    writeStream.on('finish', () => resolve({file: savedFile, imageUrl: imagePath}))
    writeStream.on('error', (error) => {

      //const err = new Error('Error writing file')
      //error.code = 422
      reject(error)
    })
  }).catch(error => console.error('error writing file', error))
}