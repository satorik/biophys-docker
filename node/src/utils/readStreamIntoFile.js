import path from 'path'
import uuidv4 from 'uuidv4'
import fs from 'fs'

export default (file, subDir) => {
  return new Promise((resolve, reject) => {
    const { createReadStream : apolloStream, filename, mimetype } = file
  
    if (!(mimetype === 'image/png' || mimetype === 'image/jpeg' || mimetype === 'image/jpg')){
      const error = new Error('Forbidden file type ', mimetype)
      error.code = 415
      reject(error)
    }

    const savedFileName = uuidv4()+path.extname(filename)
    const savedFile = path.join(__dirname, '..', 'images', subDir, savedFileName)
    const imagePath = path.join('/images', subDir, savedFileName).replace(/\\/g, "/")
    
    const readStream  = apolloStream()
    readStream.on('error', error => {
      if (readStream.truncated)
        fs.unlinkSync(savedFile)
      reject(error)
    })
    .on('readable', () => {
      let chunk;
      while (null !== (chunk = readStream.read())) {
        console.log(`Received ${chunk.length} bytes of data.`);
      }
    })
    .pipe(fs.createWriteStream(savedFile))
    .on('finish', () => resolve({file: savedFile, imageUrl: imagePath}))
    })
}