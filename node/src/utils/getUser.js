import { AuthenticationError } from 'apollo-server'

export default async(auth, User, role = 'USER') => {
  return new Promise((resolve, reject) => {

    if (!auth.isAuth) reject(new AuthenticationError('Not Authorized!'))

    User.findOne({where: {id: auth.userId}})
        .then(res => {
            if (role === 'USER') { resolve(res.dataValues.id) }
            else {
              if (res.dataValues.role !== 'ADMIN') reject(new AuthenticationError('Not Authorized!'))
              else resolve(res.dataValues.id)
            }
            
          })
        .catch(error => reject(new AuthenticationError('No such user!')))
  })
}