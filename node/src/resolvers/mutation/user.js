import { ApolloError, AuthenticationError, UserInputError } from "apollo-server"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sendMail from '../../utils/sendMail'

const userMutation = {

  async createUser(parent, {inputData}, { models }) {
 
    const existingUser = await models.User.findOne({where: {email: inputData.email}})
    if (existingUser) {throw new UserInputError('Такой пользователь уже существует.')}

    const hashedPassword = await bcrypt.hash(inputData.password, 12)
    const hashedString = jwt.sign({email: inputData.email}, process.env.JWT_key, {expiresIn: '7d'})

    const user = await models.User.create({
      email: inputData.email,
      username: inputData.username,
      hashedPassword,
      hashedString,
      role: 'USER',
      status: 'CREATED'
    })

    try 
    {
      sendMail(inputData.username, inputData.email, hashedString, 'register')
      user.status = 'MESSAGE SENT'
      await user.save()
      return true
    }
    catch(error) {
      console.log('user', error)
    }    
  },
  async loginUser(parent, {inputData}, { models }) {
    const user = await models.User.findOne({where: {email: inputData.email}})
    if (!user) {throw new AuthenticationError('Такого пользователя не существует')}

    const isEqual = await bcrypt.compare(inputData.password, user.hashedPassword)
    if (!isEqual) {
      throw new AuthenticationError('Пароль неверен');
    }

    if (user.status === 'APPROVED') {
      const token = jwt.sign({userId: user.id, email: user.email}, process.env.JWT_key, {expiresIn: '1d'})

      return {
        userId: user.id,
        username: user.username,
        token,
        tokenExpiration: 1,
        role: user.role
      }
    }
    else return {
      userId: user.id,
      username: user.username,
      role: user.role
    }
  },
  async updateUser(parent, {id, status}, {models}) {
    const user = await models.User.findOne({where: {id}})
    if (!user) {throw new AuthenticationError('Такого пользователя не существует')}

    user.status = status
    await user.save()
    return {
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString()
    }
  },
  async deleteUser(parent, {id}, {models}){
    const user = await models.User.findOne({where: {id}})
    if (!user) {throw new AuthenticationError('Такого пользователя не существует')}

    await user.destroy()
    return id
  },
  async getRole(parent, {id}, {models}){
    const user = await models.User.findOne({where: {id}})
    if (!user) {throw new AuthenticationError('Такого пользователя не существует')}

    return user.dataValues.role
  },
  async recoverPassword(parent, {email}, {models}){
    const user = await models.User.findOne({where: {email}})
    if (!user) return 'Пользователя с таким почтовым адресом не существует'

    const hashedString = jwt.sign({email}, process.env.JWT_key, {expiresIn: '1d'})
    try {
      await sendMail(user.username, user.email, hashedString, 'recovery')
      return 'Письмо отправлено, проверьте почту'
    }
    catch(error) {
      console.log('user', error)
    }  
  },
  async changePassword(parent, {hashedString, newPassword}, {models}){
    try {
      const decodedString = jwt.verify(hashedString, process.env.JWT_key)

      const user = await models.User.findOne({where: {email: decodedString.email}})
      if (!user) return 'Пользователя с таким почтовым адресом не существует'

      const hashedPassword = await bcrypt.hash(newPassword, 12)

      user.hashedPassword = hashedPassword
      await user.save()

      return 'Пароль был изменен'
    }
    catch(err) {
      if (err.message === 'jwt expired') return 'Ссылка на смену пароля устарела, запросите новую'
    }
  }
}

export default userMutation