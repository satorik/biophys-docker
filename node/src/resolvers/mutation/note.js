import { ApolloError } from "apollo-server"

const noteMutation = {
  async createNote(parent, {inputData}, { models }){
    // if (!req.isAuth) { throw e}

    // const user = await User.findOne({where: {id: +req.userId}});
    // if (!user) {  throw e }

      const note = await models.Note.create({...inputData})
      return note.dataValues
  },
  async updateNote(parent, {id, inputData}, { models }){
    // if (!req.isAuth) { e }
  
    const post = await models.Note.findOne({where: {id}})
    if (!post) { throw new ApolloError('Post not found') }

    // const user = await User.findOne({where: {id: +req.userId}});
    // if (!user) {thro e }
    Object.keys(inputData).forEach(item => post[item] = inputData[item])

    await post.save()
    return post.dataValues

  },
  async deleteNote(parent, {id}, { models }){
    const post = await models.Note.findOne({where: {id}})
    if (!post) { throw new ApolloError('Post not found') }

    await post.destroy()
    return id
  }
}

export default noteMutation