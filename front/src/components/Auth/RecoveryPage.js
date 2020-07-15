import React from 'react'
import { required, password, passwordRepeat } from '../../utils/validators'
import Edit from '../Shared/Edit'
import {Redirect, useHistory } from 'react-router-dom'
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

export const RecoveryPage = ({match}) => {
  let history = useHistory()
  const { code } = match.params

  const onHandleSubmit = (postObject) => {
    console.log('RecoveryPage', postObject)
  }

  const onCancel = () => {
    
    console.log('RecoveryPage', 'cancel')
    history.push('/news')
  }

  return (
    <div className="container">
      <Edit 
        onClickSubmit={onHandleSubmit}
        onClickCancel={onCancel}
        post={{}}
        formTemplate={PASS_CHANGE_FORM_TEMPLATE}
        border
      />
    </div>
  )
}
