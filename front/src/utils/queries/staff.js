import { gql } from '@apollo/client'

export const GET_DEPARTMENT_STAFF = gql`                    
    query getDepartmentStaff {
      staff{
        id
        firstname
        middlename
        lastname
        jobTitle
        imageUrl
        description
        position
        tel
        mail      
    }
  }
  `
export const CREATE_DEPARTMENT_STAFF = gql`
mutation createDepartmentPerson($inputData: DepartmentStaffCreateData!) {
  createDepartmentPerson(inputData: $inputData) {
    id
    firstname
    middlename
    lastname
    jobTitle
    imageUrl
    description
    position
    tel
    mail
  }
}
`

export const DELETE_DEPARTMENT_STAFF = gql`
mutation deleteDepartmentPerson($id: ID!) {
  deleteDepartmentPerson(id: $id) 
}
`
export const UPDATE_DEPARTMENT_STAFF = gql`
mutation updateDepartmentPerson($id: ID!, $inputData: DepartmentStaffUpdateData!) {
  updateDepartmentPerson(id: $id, inputData: $inputData) {
    id
    firstname
    middlename
    lastname
    jobTitle
    imageUrl
    description
    position
    tel
    mail
  }
}
`
export const MOVE_PERSON = gql`
mutation movePersonPosition($id: ID!, $vector: VECTOR!){
  moveDepartmentPerson(id: $id, vector:$vector){
    id
    position
  } 
}
`