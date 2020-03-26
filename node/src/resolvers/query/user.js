import { ApolloError } from "apollo-server"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userQuery = {
  async loginUser(parent, {inputData}, { models }) {
    const user = await models.User.findOne({where: {email: inputData.email}})
    if (!user) {throw new ApolloError("User not found")}

    const isEqual = await bcrypt.compare(inputData.password, user.password)
    if (!isEqual) {
      throw new ApolloError('Password is incorrect');
    }

    const token = jwt.sign({userId: user.id, email: user.email}, process.env.JWT_key, {expiresIn: '1d'})

    return {
      userId: user.id,
      token: token,
      tokenExpiration: 1
    }
  }
}

export default userQuery