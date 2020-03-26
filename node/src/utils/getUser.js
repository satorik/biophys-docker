import { ApolloError } from 'apollo-server'

export default async(auth, User) => {
  return new Promise((resolve, reject) => {
    if (!auth.isAuth) reject(new ApolloError('Not Authorized!'))

    User.findOne({where: {id: auth.userId}})
        .then(res => {
            resolve(res.dataValues.id)
          })
        .catch(error => reject(new ApolloError('No such user!')))
  })
}