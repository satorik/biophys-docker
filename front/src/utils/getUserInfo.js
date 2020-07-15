import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/client'

const GET_ROLE = gql`                    
  query getRole($id: ID!){
    getRole(id: $id) {
        role
    }
  }
`

export default (userId) => {

}