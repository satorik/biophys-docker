import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {getDateToLocal} from '../../utils/dateFormat'
import { gql } from 'apollo-boost'
import Spinner from '../UI/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NetworkErrorComponent from '../Shared/ErrorHandling/NetworkErrorComponent'

const GET_USERS = gql` 
query{                   
  users{
      id
      email
      username
      status
      role
      createdAt
      updatedAt
  }
}
`
const UPDATE_USER = gql`
  mutation createUser($inputData: UserCreateData!){
      createUser(inputData: $inputData) {
        userId
        token
        username
        tokenExpiration
    }
  }
`

export const UsersAdmin = () => {

  const { loading: queryLoading, error: queryError, data} = useQuery(GET_USERS)

  if (queryLoading ) return <Spinner />

  if (queryError) return <NetworkErrorComponent error={queryError} type='queryError' />

  const { users } = data

  const onChangeRole = (id) => {
    console.log('UsersAdmin', 'changing role')
  }

  const onChangeStatus = (id) => {
    console.log('UsersAdmin', 'changing role')
  }

  const onDelete = (id) => {
    console.log('UsersAdmin', 'delete')
  }

  return (
    <div className = "bg-light p-3 col-9">
       <h4 className="text-center mb-2">Управление пользователями</h4>
       <table className="table table-striped table-sm text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Status</th>
              <th scope="col">Role</th>
              <th scope="col">CreatedAt</th>
              <th scope="col">UpdatedAt</th>
              <th scope="col">UpdatedBy</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => 
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
                <td>{user.role}</td>
                <td>{getDateToLocal(user.createdAt)}</td>
                <td>{getDateToLocal(user.updatedAt)}</td>
                <td>{user.userUpdated ? user.userUpdated : '-'}</td>
                <td>
                <button className="btn p-0 mr-1" onClick={() => onChangeStatus(user.id)}><span><FontAwesomeIcon icon='check' style={{color: 'var(--success)'}} size="sm"/></span></button>
                <button className="btn p-0 mr-1" onClick={() => onChangeRole(user.id)}><span><FontAwesomeIcon icon='user-tie' style={{color: 'var(--info)'}} size="sm"/></span></button>
                <button className="btn p-0" onClick={() => onDelete(user.id)}><span><FontAwesomeIcon icon='trash' style={{color: 'var(--danger)'}} size="sm"/></span></button>
                </td>
              </tr>
            )}
          </tbody>
      </table>
    </div>
  )
}
