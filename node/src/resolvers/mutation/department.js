import { ApolloError } from 'apollo-server'
import getUser from '../../utils/getUser'
import sequelize from '../../models/'

import { createWithImage, updateWithImage, deleteWithImage } from '../../utils/mutate'
import { valueForCreateImg, valueForUpdateImg, valueForDeleteImg } from '../../utils/getMutationValue'

const departmentMutation = {
  async createHistory(parent, {section, inputData}, { models, auth }){
    
    const {createData, imageUrl} = await valueForCreateImg(inputData, 'history', auth, models.User)
    return createWithImage(models.TextDescription, {...createData, section}, imageUrl, 'history')
  },
  async updateHistory(parent, {section, inputData}, { models, auth }){

    const {updateData, imageToClear, isUploaded} = 
    await valueForUpdateImg('_', inputData, 'history', auth, models.TextDescription, models.User)

    return updateWithImage(updateData, imageToClear, isUploaded, 'history')
  },
  async deleteHistory(parent, {section}, { models, auth }){
    
    const forDelete = await valueForDeleteImg(auth, models.User, section, models.TextDescription)
    await deleteWithImage(forDelete, forDelete.dataValues.imageUrl, 'history', section)
    return true
  },
  async createDepartmentPerson(parent, { inputData }, { models, auth }){
    
    const {createData, imageUrl} = await valueForCreateImg(inputData, 'staff', auth, models.User)  
    const peopleCount = await models.DepartmentStaff.count()
    return createWithImage(models.DepartmentStaff, {...createData, position: peopleCount}, imageUrl, 'staff')
  },
  async updateDepartmentPerson(parent, {id, inputData}, { models, auth }){

    const {updateData, imageToClear, isUploaded} = 
    await valueForUpdateImg(id, inputData, 'staff', auth, models.DepartmentStaff, models.User)

    return updateWithImage(updateData, imageToClear, isUploaded, 'staff')

  },
  async deleteDepartmentPerson(parent, {id}, { models, auth }){
    
    const forDelete = await valueForDeleteImg(auth, models.User, id, models.DepartmentStaff)
    
    const people = await models.DepartmentStaff.findAll({order: [['position', 'ASC']]})
    
    const t =  await sequelize.transaction()
    
    for (const item of people) {
      if (item.position > forDelete.position) {
        item.position = item.position - 1
        await item.save({transaction: t})
      } 
    }
    const position = forDelete.position

    await deleteWithImage(forDelete, forDelete.dataValues.imageUrl, 'staff', id, t)

    return position
  },
  async moveDepartmentPerson(parent, {id, vector}, { models, auth }){
    
    const user = await getUser(auth, models.User)

    const person = await models.DepartmentStaff.findOne({where: {id}})
    if (!person)  throw new ApolloError('person with id ${id} not found') 

    let newPosition = 0
    if (vector === 'UP') {
      if (person.position === 0) throw new ApolloError('Person can not go any higher')
      newPosition = person.position - 1
    }
    if (vector === 'DOWN') {
      const peopleCount = await models.DepartmentStaff.count()
      if (person.position === peopleCount - 1) throw new ApolloError('Person can not go any lower')
      newPosition = person.position + 1
    }
    
    if (newPosition < 0) throw new ApolloError('Something wrong')

    const personToMove = await models.DepartmentStaff.findOne({where: {position: newPosition}})
    if (!personToMove)  throw new ApolloError('person with position ${newPosition} not found')
    
    personToMove.position = person.position
    person.userUpdated = user
    person.position = newPosition
    
    const t =  await sequelize.transaction()
    try {
      await personToMove.save()   
      await person.save()
      t.commit()
      return [person, personToMove]
    } catch(error) {
      t.rollback()
      throw error
    }

  },
  async createPartnership(parent, {inputData}, { models, auth }){

    const {createData, imageUrl} = await valueForCreateImg(inputData, 'partnership', auth, models.User)
    return createWithImage(models.DepartmentPartnership, createData, imageUrl, 'partnership')

  },
  async updatePartnership(parent, {id, inputData}, { models, auth }){

    const {updateData, imageToClear, isUploaded} = 
    await valueForUpdateImg(id, inputData, 'partnership', auth, models.DepartmentPartnership, models.User)

    return updateWithImage(updateData, imageToClear, isUploaded, 'partnership')
  },
  async deletePartnership(parent, {id}, { models, auth }){

    const forDelete = await valueForDeleteImg(auth, models.User, id, models.DepartmentPartnership)
    return deleteWithImage(forDelete, forDelete.dataValues.imageUrl, 'partnership', id)
  },
  async createPrint(parent, {inputData}, { models, auth }){

    const {createData, fileLink} = await valueForCreateImg(inputData, 'prints', auth, models.User, 'pdf')
    return createWithImage(models.DepartmentPrint, createData, fileLink, 'prints', 'pdf')
      
  },
  async updatePrint(parent, {id, inputData}, { models, auth }){

    const {updateData, imageToClear, isUploaded} = 
    await valueForUpdateImg(id, inputData, 'prints', auth, models.DepartmentPrint, models.User, 'pdf')

    return updateWithImage(updateData, imageToClear, isUploaded, 'prints', 'pdf')

  },
  async deletePrint(parent, {id}, { models, auth }){

    const forDelete = await valueForDeleteImg(auth, models.User, id, models.DepartmentPrint)

    return deleteWithImage(forDelete, forDelete.dataValues.fileLink, 'prints', id, null, 'pdf')

  }
}

export default departmentMutation