import React from 'react'
import Edit from '../Shared/Edit'
import { required, email, password, passwordRepeat } from '../../utils/validators'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const LOGIN_USER = gql`                    
  query userLogin($inputData: UserLoginData!){
      userLogin(inputData: $inputData) {
        userId
        token
        tokenExpiration
    }
  }
`
const REGISTER_USER = gql`
  mutation createUser($inputData: UserCreateData!){
      createUser(inputData: $inputData) {
        userId
        token
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


export const LoginForm = ({onCancel}) => {

  const [isAbleToSave, setIsAbleToSave] = React.useState(true)
  const [isLogin, setIsLogin] = React.useState(true)

  // const { loading: loadingUser, error: UserError, data} = useQuery(LOGIN_USER)
  const [createUser,
        { loading: creationLoading, error: creationError }] = useMutation(REGISTER_USER)

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
        if (item.type !== 'passwordRepeat') {
          obj[item.title] = item.value
        }
        return obj
      } ,{})   
      
     if (isLogin) {

        localStorage.setItem('key', 'value')
     }
     else {
       const user = await createUser()
     }
    } 
  }

  return (
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
  )
}
