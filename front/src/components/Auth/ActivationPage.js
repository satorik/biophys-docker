import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/client'
import {Redirect} from 'react-router-dom'
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

  const { currentUser, setCurrentUser } = React.useContext(AuthContext)
  const { code } = match.params
  const { loading: queryLoading, error: queryError, data} = useQuery(ACTIVATE_USER, {variables: {hashedString: code}})

  if (currentUser.username !== null)  return <Redirect to='/news' />

  if (queryLoading ) return <Spinner />
  if (queryError) return <NetworkErrorComponent error={queryError} type='queryError' />
  if (data) {
    updateLocalStorage({...data.activateUser})
    setCurrentUser({...data.activateUser})  
  }
}
