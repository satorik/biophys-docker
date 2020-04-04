import { gql } from '@apollo/client'

export const GET_ADMISSSION = gql`                    
    {
      admission {
        id
        content
      }
    }
  `
export const CREATE_ADMISSION = gql`
mutation createAdmission($inputData: AdmissionCreateData!) {
  createAdmission(inputData: $inputData) {
    id
    content
  }
}
`
export const DELETE_ADMISSION = gql`
mutation deleteAdmission{
  deleteAdmission
}
`
export const UPDATE_ADMISSION = gql`
mutation updateAdmission($inputData: AdmissionUpdateData!) {
  updateAdmission(inputData: $inputData) {
      id
      content
  }
}
`