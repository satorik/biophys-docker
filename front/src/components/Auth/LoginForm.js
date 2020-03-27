import React from 'react'
import Edit from '../Shared/Edit'
import { required, email, password, passwordRepeat } from '../../utils/validators'
import NetworkErrorComponent from '../Shared/ErrorHandling/NetworkErrorComponent'
import ErrorBoundry from '../Shared/ErrorHandling/ErrorBoundry'
import { useLazyQuery, useMutation } from '@apollo/client'
import { gql } from 'apollo-boost'

const LOGIN_USER = gql`                    
  query userLogin($inputData: UserLoginData!){
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


const LoginForm = ({onCancel, isAuth, onLogout}) => {

  const [isAbleToSave, setIsAbleToSave] = React.useState(true)
  const [isLogin, setIsLogin] = React.useState(true)

  const [loginUser, { loading: loadingUser, error: UserError, data}] = useLazyQuery(LOGIN_USER)
  const [createUser,
        { loading: creationLoading, error: creationError }] = useMutation(REGISTER_USER)

  if (data) {
    localStorage.setItem('userId', data.loginUser.userId)
    localStorage.setItem('token', data.loginUser.token)
    localStorage.setItem('tokenExpiration', data.loginUser.tokenExpiration) 
    localStorage.setItem('username', data.loginUser.username)
  }

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
        loginUser({ variables: {inputData: postObject} })
     }
     else {
       const { createUser } = await createUser({ variables: {inputData: postObject} })
       localStorage.setItem('token', createUser.token)
       localStorage.setItem('tokenExpiration', createUser.tokenExpiration)
     }
    } 
  }

  const handleLogout = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('tokenExpiration')

    onLogout({
      userId: null,
      token: null,
      username: null,
      tokenExpiration: null
    })
  }

  if (creationError) return <NetworkErrorComponent error={creationError} />

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