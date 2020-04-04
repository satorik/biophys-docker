import { gql } from '@apollo/client'

export const GET_SEMINAR = gql`                    
    query getSeminars($limit: Int, $offset: Int){
      seminars(limit: $limit, offset: $offset) {
        id
        title
        content
        description
        date
        speaker
        onCampus
        location
    }
  }
  `
export const CREATE_SEMINAR = gql`
  mutation createSeminar($inputData: SeminarCreateData!) {
    createSeminar(inputData: $inputData) {
      id
      title
      content
      description
      date
      speaker
      onCampus
      location
    }
  }
`

export const DELETE_SEMINAR = gql`
  mutation deleteSeminar($id: ID!) {
    deleteSeminar(id: $id) 
  }
`
export const UPDATE_SEMINAR = gql`
  mutation updateSeminar($id: ID!, $inputData: SeminarUpdateData!) {
    updateSeminar(id: $id, inputData: $inputData) {
      id
      title
      content
      description
      date
      speaker
      onCampus
      location
    }
  }
`