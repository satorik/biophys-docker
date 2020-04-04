import { gql } from '@apollo/client'

export const GET_CONFERENCE = gql`                    
    query getConferences($limit: Int, $offset: Int){
      conferences(limit: $limit, offset: $offset) {
        id
        title
        content
        description
        imageUrl
        dateFrom
        dateTo
        location
    }
  }
  `
export const CREATE_CONFERENCE = gql`
  mutation createConference($inputData: ConferenceCreateData!) {
    createConference(inputData: $inputData) {
      id
      title
      content
      description
      imageUrl
      dateFrom
      dateTo
      location
    }
  }
`

export const DELETE_CONFERENCE = gql`
  mutation deleteConference($id: ID!) {
    deleteConference(id: $id) 
  }
`
export const UPDATE_CONFERENCE = gql`
  mutation updateConference($id: ID!, $inputData: ConferenceUpdateData!) {
    updateConference(id: $id, inputData: $inputData) {
        id
        title
        content
        description
        imageUrl
        dateFrom
        dateTo
        location
    }
  }
`
