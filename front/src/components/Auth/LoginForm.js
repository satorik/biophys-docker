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
        role
    }
  }
`
const REGISTER_USER = gql`
  mutation createUser($inputData: UserCreateData!){
      createUser(inputData: $inputData) 
  }
`

const PASS_RECOVERY = gql`
  mutation recoverPassword($email: String!){
      recoverPassword(email: $email) 
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
     required: [required]
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

const PASS_RECOVERY_TEMPLATE = [
  {
     title: 'email',
     label: 'Почтовый адрес',
     type: 'input',
     required: true,
     validators: [required, email]
  },
]

const updateLocalStorage = (user) => {
  if (user.token) localStorage.setItem('token', user.token)
  if (user.tokenExpiration) localStorage.setItem('tokenExpiration', user.tokenExpiration)
  localStorage.setItem('username', user.username)
  localStorage.setItem('userId', user.userId)
  if (user.role) localStorage.setItem('role', user.role)
}

const clearLocalStorage = () => {
  localStorage.removeItem('userId')
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  localStorage.removeItem('tokenExpiration')
  localStorage.removeItem('role')

  return {
    userId: null,
    token: null,
    username: null,
    tokenExpiration: null,
    role: null
  }
}


const LoginForm = ({onCancel, isAuth, updatedAuth}) => {

  const [isLogin, setIsLogin] = React.useState(true)
  const [isError, setIsError] = React.useState(null)
  const [messageSent, setMessageSent] = React.useState(null)
  const [message, setMessage] = React.useState(null)
  const [passRecovery, setPassRecovery] = React.useState(null)

  const [loginUser, { loading: loadingUser }] = useMutation(LOGIN_USER)
  const [createUser, { loading: creationLoading }] = useMutation(REGISTER_USER)
  const [recoverPassword, { loading: recoverLoading }] = useMutation(PASS_RECOVERY)

  const onCloseModal = () => {
    onCancel()
  }

  const onHandleSubmit = async (postObject) => {
    console.log('LoginForm', postObject, passRecovery)
    if (passRecovery) {
      const messageRecieved = await recoverPassword({ variables: {email: postObject.email}})
      console.log('LoginForm', messageRecieved)
      setMessage(messageRecieved.data.recoverPassword)
      setMessageSent(true)
      setPassRecovery(false)
    }
    else if (isLogin) {
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
        await createUser({ variables: {inputData: postObject} })
        setMessageSent(true)
        setMessage('Письмо для активации учетной записи было выслано на электронную почту')
      }
      catch(error){
        setIsError(error)
      }
    }  
  }

  const handleLogout = () => {
    const emptyUser = clearLocalStorage()
    updatedAuth({...emptyUser})
  }

  if (loadingUser || creationLoading) return <Spinner />
  if (isError) return <NetworkErrorComponent error={isError} onDismiss={() => setIsError(null)} />

  let content = ""

  if (passRecovery) content = <div>
     <p>Чтобы получить ссылку для восстановления пароля, введите почтовый адрес, используемый при регистрации:</p>
          <Edit 
            onClickSubmit={onHandleSubmit}
            onClickCancel={() => setPassRecovery(false)}
            post={{}}
            formTemplate={PASS_RECOVERY_TEMPLATE}
          />
  </div>
  else if (messageSent) content = <div className="text-center p-2">
    <p>{message}</p>
    <button className="btn btn-success d-block" onClick={onCancel}>OK</button>
  </div>
  else content = isAuth ? <button className="btn btn-danger d-block" onClick={handleLogout}>Выйти</button> :
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
            post={{}}
            formTemplate={isLogin ? LOGIN_FORM_TEMPLATE : REGISTER_FORM_TEMPLATE}
        />

        {isLogin ? <p className="small text-muted ml-2" style={{cursor: 'pointer'}} onClick={() => setPassRecovery(true)}>Восстановить пароль</p> : null}
        </>
  
  return content 
}

export default ErrorBoundry(LoginForm)