import { gql } from '@apollo/client'

export const GET_DEPARTMENT_HISTORY = gql`                    
    {
      history {
        id
        content
        imageUrl
      }
    }
  `
export const CREATE_HISTORY = gql`
mutation createHistory($inputData: HistoryCreateData!) {
  createHistory(inputData: $inputData) {
    id
    content
    imageUrl
  }
}
`
export const DELETE_HISTORY = gql`
  mutation deleteHistory{
    deleteHistory
  }
`
export const UPDATE_HISTORY = gql`
mutation updateHistory($inputData: HistoryUpdateData!) {
  updateHistory(inputData: $inputData) {
      id
      content
      imageUrl
  }
}
`
