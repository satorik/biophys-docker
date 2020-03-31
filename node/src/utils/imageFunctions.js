import path from 'path'
import fs from 'fs'

const gmToBuffer = (data) => {
  return new Promise((resolve, reject) => {
    data.stream((err, stdout, stderr) => {
      if (err) { return reject(err) }
      const chunks = []
      stdout.on('data', (chunk) => { chunks.push(chunk) })
      // these are 'once' because they can and do fire multiple times for multiple errors,
      // but this is a promise so you'll have to deal with them one at a time
      stdout.once('end', () => { resolve(Buffer.concat(chunks)) })
      stderr.once('data', (data) => { reject(String(data)) })
    })
  })
}


const clearImage = (imagePath, subDir, type = 'image') => {
  const rootDir = type === 'image' ? 'images' : 'files'
  const savedFileName = path.basename(imagePath)
  const savedFile = path.join(__dirname, '..', rootDir, subDir, savedFileName)
  fs.unlinkSync(savedFile)
}

const convertPdfToBase64 = (file) => {

  const PDF2Pic = require("pdf2pic")
  const pdf2pic = new PDF2Pic({
    density: 100,           // output pixels per inch
    format: "png",          // output file format
    size: "400x600"         // output size in pixels
  })

 return pdf2pic.convertToBase64(file, [1])

}

export {clearImage as default, convertPdfToBase64}