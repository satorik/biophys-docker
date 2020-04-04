import { gql } from '@apollo/client'

export const  GET_SCIENCE_GROUPS = gql`                    
    query getSienceGroups($scienceRouteId: ID!){
      scienceGroups(scienceRouteId: $scienceRouteId){
        id
        title
        description
        tel
        imageUrl
        mail
        room
        people {
          id
          firstname
          middlename
          lastname
          description
          englishName
          tel
          mail
          birthday
          type
          position
          urlIstina
          urlRints
          urlOrcid
          urlResearcher
          urlScopus
        }
        articles {
          id
          author
          title
          journal
          position
        }
    }
  }
  `
export const  CREATE_SCIENCE_GROUP = gql`
  mutation createScienceGroup($scienceRouteId: ID!, $inputData: ScienceGroupCreateData!) {
    createScienceGroup(scienceRouteId: $scienceRouteId, inputData: $inputData) {
      id
      title
      description
      tel
      imageUrl
      mail
      room
      people {
          id
          firstname
          middlename
          lastname
          description
          englishName
          tel
          mail
          birthday
          type
          position
          urlIstina
          urlRints
          urlOrcid
          urlResearcher
          urlScopus
        }
        articles {
          id
          author
          title
          journal
          position
        }
    }
  }
  `

  export const  DELETE_SCIENCE_GROUP = gql`
    mutation deleteScienceGroup($id: ID!) {
      deleteScienceGroup(id: $id) 
    }
  `
  export const  UPDATE_SCIENCE_GROUP = gql`
   mutation updateScienceGroup($id: ID!, $inputData:ScienceGroupUpdateData!) {
    updateScienceGroup(id: $id, inputData: $inputData) {
      id
      title
      description
      tel
      imageUrl
      mail
      room
    }
  }
  `
  export const  CREATE_SCIENCE_PERSON = gql`
    mutation createSciencePerson($scienceGroupId: ID!, $inputData: SciencePeopleCreateData!){
      createSciencePerson(scienceGroupId: $scienceGroupId, inputData: $inputData){
        id
        firstname
        middlename
        lastname
        description
        englishName
        tel
        mail
        birthday
        type
        position
        urlIstina
        urlRints
        urlOrcid
        urlResearcher
        urlScopus
      }
    }
  `
  export const  UPDATE_SCIENCE_PERSON = gql`
    mutation updateSciencePerson($id: ID!, $inputData: SciencePeopleUpdateData!){
      updateSciencePerson(id: $id, inputData: $inputData){
        id
        firstname
        middlename
        lastname
        description
        englishName
        tel
        mail
        birthday
        type
        position
        urlIstina
        urlRints
        urlOrcid
        urlResearcher
        urlScopus
      }
    }
  `
  export const  CREATE_SCIENCE_ARTICLE = gql`
    mutation createScienceArticle($scienceGroupId: ID!, $inputData: ScienceArticleCreateData!){
      createScienceArticle(scienceGroupId: $scienceGroupId, inputData: $inputData){
        id
        author
        title
        journal
        position
      }
    }
  `
  export const  UPDATE_SCIENCE_ARTICLE = gql`
    mutation updateScienceArticle($id: ID!, $inputData: ScienceArticleUpdateData!){
      updateScienceArticle(id: $id, inputData: $inputData){
        id
        author
        title
        journal
        position
      }
    }
  `
  export const  DELETE_SCIENCE_PERSON = gql`
    mutation deleteSciencePerson($id: ID!){
      deleteSciencePerson(id: $id)
    }
  `
  export const  DELETE_SCIENCE_ARTICLE = gql`
    mutation deleteScienceArticle($id: ID!){
      deleteScienceArticle(id: $id)
    }
  `
  export const  MOVE_PERSON = gql`
    mutation movePersonPosition($id: ID!, $vector: VECTOR!){
      moveSciencePerson(id: $id, vector:$vector){
        id
        position
	    } 
    }
  `
  export const  MOVE_ARTICLE = gql`
    mutation moveArticlePosition($id: ID!, $vector: VECTOR!){
      moveScienceArticle(id: $id, vector:$vector){
        id
        position
	    } 
    }
  `