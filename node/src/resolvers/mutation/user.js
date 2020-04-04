import { ApolloError, AuthenticationError, UserInputError } from "apollo-server"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userMutation = {
  async createUser(parent, {inputData}, { models }) {
    const existingUser = await models.User.findOne({where: {email: inputData.email}})
    if (existingUser) {throw new UserInputError('Такой пользователь уже существует.')}

    const hashedPassword = await bcrypt.hash(inputData.password, 12)

    const user = await models.User.create({
      email: inputData.email,
      username: inputData.username,
      role: 'ADMIN',
      hashedPassword,

    })

    const token = jwt.sign({userId: user.id, email: user.email}, process.env.JWT_key, {expiresIn: '1d'});

    return {
      userId: user.id,
      token: token,
      username: user.username,
      tokenExpiration: 1
    }
  },
  async loginUser(parent, {inputData}, { models }) {
    const user = await models.User.findOne({where: {email: inputData.email}})
    if (!user) {throw new AuthenticationError('Такого пользователя не существует')}

    const isEqual = await bcrypt.compare(inputData.password, user.hashedPassword)
    if (!isEqual) {
      throw new AuthenticationError('Пароль неверен');
    }

    const token = jwt.sign({userId: user.id, email: user.email}, process.env.JWT_key, {expiresIn: '1d'})

    return {
      userId: user.id,
      username: user.username,
      token: token,
      tokenExpiration: 1
    }
  }
}

export default userMutation