import jwt from 'jsonwebtoken'

export default ({ req }) => {

  const authHeader = req.get('authorization')

  if(!authHeader) {
    return { isAuth: false }
  }
  const token = authHeader.split(' ')[1]
  if(!token || token === '') {
    return { isAuth: false }
  }
  
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_key)

    return {
        isAuth: true,
        userId: decodedToken.userId
    }
  }
  catch (err) {
    return { isAuth: false }
  }
   
}
