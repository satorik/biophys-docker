import { ApolloError } from "apollo-server"
import getUser from '../../utils/getUser'

const seminarMutation = {
  async createSeminar(parent, {inputData}, { models, auth }){
    const user = await getUser(auth, models.User)

    const seminar = await models.Seminar.create({...inputData, userCreated: user})
    return seminar
  },
  async updateSeminar(parent, {id, inputData}, { models, auth }){
    const user = await getUser(auth, models.User)

    const post = await models.Seminar.findOne({where: {id}})
    if (!post) { throw new ApolloError('Seminar not found') }

    Object.keys(inputData).forEach(item => post[item] = inputData[item])
    post.userUpdated = user

    await post.save()

    return post

  },
  async deleteSeminar(parent, {id}, { models, auth }){
    await getUser(auth, models.User)

    const post = await models.Seminar.findOne({where: {id}})
    if (!post) { throw new ApolloError('Seminar not found') }

    await post.destroy()
    return id
  }
}

export default seminarMutation