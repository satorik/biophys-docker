import jwt from 'jsonwebtoken'
import getUser from '../../utils/getUser'

const userQuery = {
  async activateUser(parent, {hashedString}, { models }) {
    try {
      const decodedString = jwt.verify(hashedString, process.env.JWT_key)
      const user = await models.User.findOne({where: {email: decodedString.email}})
       if (user.status !== 'MESSAGESENT')  return {
        message: 'Учетная уже запись была активирована',
      }

      user.status = 'VALIDATED'
      await user.save()

      const token = jwt.sign({userId: user.id, email: user.email}, process.env.JWT_key, {expiresIn: '1d'})
  
      return {
        userId: user.id,
        token: token,
        username: user.username,
        tokenExpiration: 1,
        role: user.role,
        message: 'Учетная запись была активирована'
      }
    }
    catch(err) {
      if (err.message === 'jwt expired') return {message: 'Ссылка на активацию устарела, запросите новую'}
    }
  },
  async users(parent, args, {models, auth}) {

    await getUser(auth, models.User, 'ADMIN')

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