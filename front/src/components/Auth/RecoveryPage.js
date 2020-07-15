import React from 'react'
import { required, password } from '../../utils/validators'
import Edit from '../Shared/Edit'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { gql } from 'apollo-boost'

const PASS_CHANGE_FORM_TEMPLATE = [
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

const PASS_CHANGE = gql`
  mutation changePassword($hashedString: String!, $newPass: String!){
      changePassword(hashedString: $hashedString, newPassword: $newPass) 
  }
`

export const RecoveryPage = ({match}) => {
  let history = useHistory()
  const { code } = match.params
  
  const [message, setMessage] = React.useState(null)
  const [changePassword] = useMutation(PASS_CHANGE)

  const onHandleSubmit = async (postObject) => {
    const messageRecieved = await changePassword({ variables: {hashedString: code, newPass: postObject.password}})
    setMessage(messageRecieved.data.changePassword)
  }

  const onCancel = () => {
    history.push('/news')
  }

  return (
    !message 
    ? <div className="container">
    <Edit 
      onClickSubmit={onHandleSubmit}
      onClickCancel={onCancel}
      post={{}}
      formTemplate={PASS_CHANGE_FORM_TEMPLATE}
      border
    /></div>
    : <div className="container border text-center p-3">
        <p>{message}</p>
        <button className="btn btn-success" onClick={() => onCancel()}>Вернутся</button>
      </div>
    )
}
