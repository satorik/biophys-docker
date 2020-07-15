import React from 'react'
import {UsersAdmin} from './UsersAdmin'
import {BackUpAdmin} from './BackUpAdmin'

export const PageDetailsView = ({section}) => {

  if (section.name === 'users') return <UsersAdmin />
  else if (section.name === 'backup') return <BackUpAdmin />
  
}
