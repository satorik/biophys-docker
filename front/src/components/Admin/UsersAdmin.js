import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {getDateToLocal} from '../../utils/dateFormat'
import { gql } from 'apollo-boost'
import Spinner from '../UI/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NetworkErrorComponent from '../Shared/ErrorHandling/NetworkErrorComponent'

const USERSTATUS = {
'CREATED': 'создан',
'MESSAGESENT': 'отправлено письмо',
'VALIDATED': 'подтверждена',
'APPROVED':'разрешена'
}
const USERROLE = ['USER', 'ADMIN']

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
const CHANGE_STATUS = gql`
  mutation changeUserStatus($id: ID!, $status: USERSTATUS!){
    changeUserStatus(id: $id, status: $status){
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
const CHANGE_ROLE = gql`
  mutation changeUserRole($id: ID!, $role: USERROLE!){
    changeUserRole(id: $id, role: $role){
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
const DELETE_USER = gql`
  mutation deleteUser($id: ID!){
    deleteUser(id: $id) 
  }
`

export const UsersAdmin = () => {

  const { loading: queryLoading, error: queryError, data} = useQuery(GET_USERS)
  const [changeUserStatus, { loading: changingStatus }] = useMutation(CHANGE_STATUS)
  const [changeUserRole, { loading: changingRole }] = useMutation(CHANGE_ROLE)
  const [deleteUser, { loading: deleteLoading }] = useMutation(DELETE_USER, {
    update: (cache, { data }) => {
      const { deleteUser } = data
      const { users } = cache.readQuery(GET_USERS)
      cache.writeQuery({
        query: GET_USERS,
        data: { ...data, users: users.filter(el => el.id !== deleteUser)}
      })
    }})
  
  if (queryLoading || changingStatus || changingRole || deleteLoading) return <Spinner />

  if (queryError) return <NetworkErrorComponent error={queryError} type='queryError' />

  const { users } = data

  const onChangeRole = async id => {
    await changeUserRole({variables:{id, role: 'ADMIN'}})
  }

  const onChangeStatus = async id => {
    await changeUserStatus({variables:{id, status: 'APPROVED'}})
  }

  const onDelete = async id => {
    await deleteUser({variables: {id}})
  }

  return (
    <div className = "bg-light p-3 col-10">
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
                <td>{USERSTATUS[user.status]}</td>
                <td>{user.role}</td>
                <td>{getDateToLocal(user.createdAt)}</td>
                <td>{getDateToLocal(user.updatedAt)}</td>
                <td>{user.userUpdated ? user.userUpdated : '-'}</td>
                <td>
                {user.status === 'VALIDATED' ? <button className="btn p-0 mr-1" onClick={() => onChangeStatus(user.id)}><span><FontAwesomeIcon icon='check' style={{color: 'var(--success)'}} size="sm"/></span></button> : null}
                {user.role === 'USER' ? <button className="btn p-0 mr-1" onClick={() => onChangeRole(user.id)}><span><FontAwesomeIcon icon='user-tie' style={{color: 'var(--info)'}} size="sm"/></span></button> : null }
                <button className="btn p-0" onClick={() => onDelete(user.id)}><span><FontAwesomeIcon icon='trash' style={{color: 'var(--danger)'}} size="sm"/></span></button>
                </td>
              </tr>
            )}
          </tbody>
      </table>
    </div>
  )
}
