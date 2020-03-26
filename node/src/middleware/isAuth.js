import jwt from 'jsonwebtoken'

export default ({ req }) => {

  const authHeader = req.get('Authorization')
  if(!authHeader) {
    return { isAuth: false }
  }
  const token = authHeader.split(' ')[1]
  if(!token || token === '') {
    return { isAuth: false }
  }
  try {
   decodedToken =  jwt.verify(token, process.env.JWT_key)
  } 
  catch(err){
    return { isAuth: false }
  }
  if (!decodedToken) {
    return { isAuth: false }
  }

  return {user: { 
    isAuth: true,
    userId: decodedToken.userId
  }}

}
