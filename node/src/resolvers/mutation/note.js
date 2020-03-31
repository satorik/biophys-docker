import { ApolloError } from "apollo-server"
import getUser from '../../utils/getUser'
import sequelize from '../../models/'

const noteMutation = {
  async createNote(parent, {inputData}, { models, auth }){
    
    const user = await getUser(auth, models.User)
    const t = await sequelize.transaction()

    try {
      if (inputData.onTop) {
        await models.Note.update({onTop:false}, {where: {onTop: true},  transaction: t })
      }
      const note = await models.Note.create({...inputData, userCreated: user}, { transaction: t })
      
      await t.commit()

      return note
    } catch (error) {  
      await t.rollback()
      throw error
    }
 
  },
  async updateNote(parent, {id, inputData}, { models, auth }){
  
    const user = await getUser(auth, models.User)

    const post = await models.Note.findOne({where: {id}})
    if (!post) { throw new ApolloError('Post not found') }

    const t = await sequelize.transaction()
  
    try {
      let removedFromTop = {}
      if (inputData.onTop) {
        removedFromTop = await models.Note.findOne({where: {onTop: true}})
        if (removedFromTop) {
          removedFromTop.onTop = false
          removedFromTop.save({transaction: t})
        }
      }
      Object.keys(inputData).forEach(item => post[item] = inputData[item])
      post.userUpdated = user
  
      await post.save({transaction: t})

      await t.commit()

      return {updatedNote: post, removedFromTop: removedFromTop}

    } catch (error) {
      await t.rollback()
      throw error
    }

  },
  async deleteNote(parent, {id}, { models, auth }){

    const user = await getUser(auth, models.User)

    const post = await models.Note.findOne({where: {id}})
    if (!post) { throw new ApolloError('Post not found') }

    await post.destroy()
    return id
  }
}

export default noteMutation