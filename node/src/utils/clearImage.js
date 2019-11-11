import path from 'path'
import fs from 'fs'

export default (imagePath, subDir) => {
  const savedFileName = path.basename(imagePath)
  const savedFile = path.join(__dirname, '..', 'images', subDir, savedFileName)
  fs.unlink(savedFile, err => console.log(err))
}
