import React from 'react'
import Edit from '../Shared/Edit'
import { required, email, password, passwordRepeat } from '../../utils/validators'
import NetworkErrorComponent from '../Shared/ErrorHandling/NetworkErrorComponent'
import ErrorBoundry from '../Shared/ErrorHandling/ErrorBoundry'
import Spinner from '../UI/Spinner'
import { useMutation } from '@apollo/client'
import { gql } from 'apollo-boost'

const LOGIN_USER = gql`                    
  mutation loginUser($inputData: UserLoginData!){
      loginUser(inputData: $inputData) {
        userId
        token
        username
        tokenExpiration
    }
  }
`
const REGISTER_USER = gql`
  mutation createUser($inputData: UserCreateData!){
      createUser(inputData: $inputData) {
        userId
        token
        username
        tokenExpiration
    }
  }
`

const REGISTER_FORM_TEMPLATE = [
  {
     title: 'email',
     label: 'Почтовый адрес',
     type: 'input',
     required: true,
     validators: [required, email]
  },
  {
     title: 'username',
     label: 'Имя',
     type: 'input',
     required: [required]
  },
  {
     title: 'password',
     label: 'Пароль',
     type: 'input',
     required: [required, password]
  },
  {
     title: 'passwordRepeat',
     label: 'Повтор пароля',
     type: 'input',
     required: [required, passwordRepeat]
  }
]

const LOGIN_FORM_TEMPLATE = [
  {
     title: 'email',
     label: 'Почтовый адрес',
     type: 'input',
     required: true,
     validators: [required, email]
  },
  {
     title: 'password',
     label: 'Пароль',
     type: 'input',
     required: [required, password]
  },
]

const updateLocalStorage = (user) => {
  localStorage.setItem('token', user.token)
  localStorage.setItem('tokenExpiration', user.tokenExpiration)
  localStorage.setItem('username', user.username)
  localStorage.setItem('userId', user.userId)
}

const clearLocalStorage = () => {
  localStorage.removeItem('userId')
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  localStorage.removeItem('tokenExpiration')

  return {
    userId: null,
    token: null,
    username: null,
    tokenExpiration: null
  }
}


const LoginForm = ({onCancel, isAuth, updatedAuth}) => {

  const [isAbleToSave, setIsAbleToSave] = React.useState(true)
  const [isLogin, setIsLogin] = React.useState(true)
  const [isError, setIsError] = React.useState(null)

  const [loginUser, { loading: loadingUser }] = useMutation(LOGIN_USER)
  const [createUser, { loading: creationLoading }] = useMutation(REGISTER_USER)

  const onCloseModal = () => {
    onCancel()
  }

  const onHandleSubmit = async (e, postData, valid) => {
    e.preventDefault()
    if (!valid) {
      setIsAbleToSave(false)
    }
    else {
      const postObject = postData.reduce((obj, item) => {
        if (item.title !== 'passwordRepeat') {
          obj[item.title] = item.value
        }
        return obj
      } ,{})   
      
      if (isLogin) {
        try {
          const userData = await loginUser({ variables: {inputData: postObject} })
          updateLocalStorage(userData.data.loginUser)
          updatedAuth({...userData.data.loginUser})   
          onCancel()
        }
        catch(error){
          setIsError(error)
        }
      }
      else {
        try {
          const userData = await createUser({ variables: {inputData: postObject} })
          updateLocalStorage(userData.data.createUser)
          updatedAuth({...userData.data.createUser})   
          onCancel()
        }
        catch(error){
          setIsError(error)
        }
      }
    } 
  }

  const handleLogout = () => {
    const emptyUser = clearLocalStorage()
    updatedAuth({...emptyUser})
  }

  if (loadingUser || creationLoading) return <Spinner />
  if (isError) return <NetworkErrorComponent error={isError} onDismiss={() => setIsError(null)} />

  const content = isAuth ? <button className="btn btn-danger d-block" onClick={handleLogout}>Выйти</button> :
      <>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className={`nav-link ${isLogin ? 'active' : ''}`} href="#" onClick={() => setIsLogin(true)}>Авторизация</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${!isLogin ? 'active' : ''}`} href="#" onClick={() => setIsLogin(false)}>Регистрация</a>
          </li>
        </ul>

        <Edit 
            onClickSubmit={onHandleSubmit}
            onClickCancel={onCloseModal}
            isAbleToSave={isAbleToSave}
            post={{}}
            formTemplate={isLogin ? LOGIN_FORM_TEMPLATE : REGISTER_FORM_TEMPLATE}
        />
        </>
  
  return content 
}

export default ErrorBoundry(LoginForm)