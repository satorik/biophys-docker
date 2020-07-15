import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import NetworkErrorComponent from '../Shared/ErrorHandling/NetworkErrorComponent'
import Spinner from '../UI/Spinner'
import AuthContext from '../../context/AuthContext'

const ACTIVATE_USER = gql`
  query activateUser($hashedString: String!){
    activateUser(hashedString: $hashedString) {
        userId
        token
        username
        tokenExpiration
        role
        message
    }
  }
`

const updateLocalStorage = (user) => {
  if (user.token) localStorage.setItem('token', user.token)
  if (user.tokenExpiration) localStorage.setItem('tokenExpiration', user.tokenExpiration)
  localStorage.setItem('username', user.username)
  localStorage.setItem('userId', user.userId)
  if (user.role) localStorage.setItem('role', user.role)
}

export const ActivationPage = ({match}) => {
  let history = useHistory()
  const { currentUser, setCurrentUser } = React.useContext(AuthContext)
  const [message, setMessage] = React.useState(null)
  const { code } = match.params
  const { loading: queryLoading, error: queryError, data} = useQuery(ACTIVATE_USER, {variables: {hashedString: code}})

  const onClickBack = () => {
    history.push('/news')
  }

  React.useEffect(() => {
    if (data && data.activateUser.userId) {
      updateLocalStorage({...data.activateUser})
      setCurrentUser({...data.activateUser}) 
      setMessage(data.activateUser.message) 
    }
    else if (data && data.activateUser.message) {
      setMessage(data.activateUser.message)
    }
  }, [data])

  if (queryLoading ) return <Spinner />
  if (queryError) return <NetworkErrorComponent error={queryError} type='queryError' />
  if (message) {
    return <div className="container d-flex justify-content-center mt-3">
      <div className="border p-3 w-50 text-center">
          <p>{message}</p>
          <button className="btn btn-success" onClick={() => onClickBack()}>Вернутся</button>
      </div>
    </div>
  }
  else return ""
}
