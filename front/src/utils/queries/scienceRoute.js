import { gql } from '@apollo/client'

export const GET_SCIENCE_ROUTE = gql`  
  {                  
    scienceRoutes {
      id
      title
    }
  }
`
export const CREATE_SCIENCE_ROUTE = gql`
  mutation createScienceRoute($inputData: ScienceRouteCreateData!) {
    createScienceRoute(inputData: $inputData) {
      id
      title
    }
  }
`
export const DELETE_SCIENCE_ROUTE = gql`
  mutation deleteScienceRoute($id: ID!) {
    deleteScienceRoute(id: $id) 
  }
`
export const UPDATE_SCIENCE_ROUTE = gql`
  mutation updateScienceRoute($id: ID!, $inputData: ScienceRouteUpdateData!) {
    updateScienceRoute(id: $id, inputData: $inputData) {
        id
        title
    }
  }
`