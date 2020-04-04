import { gql } from '@apollo/client'

export const GET_DEPARTMENT_PRINTS = gql`                    
    query getDepartmentPrints {
      prints{
        id
        fileLink
        image
        description  
        title
    }
  }
  ` 
export const CREATE_PRINT = gql`
mutation createPrint($inputData: DepartmentPrintCreateData!) {
  createPrint(inputData: $inputData) {
    id
    fileLink
    image
    description  
    title
  }
}
`

export const DELETE_PRINT = gql`
mutation deletePrint($id: ID!) {
  deletePrint(id: $id) 
}
`
export const UPDATE_PRINT = gql`
mutation updatePrint($id: ID!, $inputData: DepartmentPrintUpdateData!) {
  updatePrint(id: $id, inputData: $inputData) {
    id
    fileLink
    image
    description  
    title
  }
}
`