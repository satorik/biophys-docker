import { gql } from '@apollo/client'

export const GET_DEPARTMENT_PARTNERSHIP = gql`                    
    query getDepartmentPartnership {
      partnership{
        id
        link
        imageUrl
        description  
        title
    }
  }
  ` 
export const CREATE_PARTNERSHIP = gql`
mutation createPartnership($inputData: DepartmentPartnershipCreateData!) {
  createPartnership(inputData: $inputData) {
    id
    link
    imageUrl
    description  
    title
  }
}
`

export const DELETE_PARTNERSHIP = gql`
mutation deletePartnership($id: ID!) {
  deletePartnership(id: $id) 
}
`
export const UPDATE_PARTNERSHIP = gql`
mutation updatePartnership($id: ID!, $inputData: DepartmentPartnershipUpdateData!) {
  updatePartnership(id: $id, inputData: $inputData) {
    id
    link
    imageUrl
    description  
    title
  }
}
`