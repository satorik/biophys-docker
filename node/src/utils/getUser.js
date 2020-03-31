import { AuthenticationError } from 'apollo-server'

export default async(auth, User) => {
  return new Promise((resolve, reject) => {

    if (!auth.isAuth) reject(new AuthenticationError('Not Authorized!'))

    User.findOne({where: {id: auth.userId}})
        .then(res => {
            resolve(res.dataValues.id)
          })
        .catch(error => reject(new AuthenticationError('No such user!')))
  })
}