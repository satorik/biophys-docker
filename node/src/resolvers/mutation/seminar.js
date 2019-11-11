import { ApolloError } from "apollo-server"

const seminarMutation = {
  async createSeminar(parent, {inputData}, { models }){
    // if (!req.isAuth) { throw e}

    // const user = await User.findOne({where: {id: +req.userId}});
    // if (!user) {  throw e }

      const seminar = await models.Seminar.create({...inputData})
      return seminar.dataValues
  },
  async updateSeminar(parent, {id, inputData}, { models }){
    // if (!req.isAuth) { e }
  
    const post = await models.Seminar.findOne({where: {id}})
    if (!post) { throw new ApolloError('Post not found') }

    // const user = await User.findOne({where: {id: +req.userId}});
    // if (!user) {thro e }

    Object.keys(inputData).forEach(item => post[item] = inputData[item])

    await post.save()

    return post.dataValues

  },
  async deleteSeminar(parent, {id}, { models }){
    const post = await models.Seminar.findOne({where: {id}})
    if (!post) { throw new ApolloError('Post not found') }

    await post.destroy()
    return id
  }
}

export default seminarMutation