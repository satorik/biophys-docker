import jwt from 'jsonwebtoken'

const userQuery = {
  async activateUser(parent, {hashedString}, { models }) {
    
    const decodedString = jwt.verify(hashedString, process.env.JWT_key)
    const user = await models.User.findOne({where: {email: decodedString.email}})
    user.status = 'VALIDATED'
    await user.save()

    const token = jwt.sign({userId: user.id, email: user.email}, process.env.JWT_key, {expiresIn: '1d'})
 
    return {
      userId: user.id,
      token: token,
      username: user.username,
      tokenExpiration: 1,
      role: user.role
    }
  },
  async users(parent, args, {models}) {
    const users = await models.User.findAll({attributes: ['id', 'email', 'username', 'status', 'role', 'createdAt', 'updatedAt', 'userUpdated'], order: [['updatedAt', 'DESC']]})
    return users.map(user => {
      return {
        ...user.dataValues,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      }
    })
  }
}

export default userQuery