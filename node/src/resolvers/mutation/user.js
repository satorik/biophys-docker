import { ApolloError } from "apollo-server"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userMutation = {
  async createUser(parent, {inputData}, { models }) {
    const existingUser = await models.User.findOne({where: {email: inputData.email}})
    if (existingUser) {throw new ApolloError("User already exists")}

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
  }
}

export default userMutation