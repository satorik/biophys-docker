import { gql } from '@apollo/client'

export const GET_BLOGPOSTS = gql`                    
    query getBlogposts($limit: Int, $offset: Int){
      blogposts(limit: $limit, offset: $offset) {
        posts{
          id,
          title,
          content,
          description,
          imageUrl,
          createdAt
        }
        total
    }
  }
  `
export const CREATE_BLOGPOST = gql`
  mutation createBlogpost($inputData: BlogpostCreateData!) {
    createBlogpost(inputData: $inputData) {
      id
      title
      description
      content
      imageUrl
      createdAt
    }
  }
`

export const DELETE_BLOGPOST = gql`
  mutation deleteBlogpost($id: ID!) {
    deleteBlogpost(id: $id) 
  }
`
export const UPDATE_BLOGPOST = gql`
  mutation updateBlogpost($id: ID!, $inputData: BlogpostUpdateData!) {
    updateBlogpost(id: $id, inputData: $inputData) {
      id
      title
      description
      content
      imageUrl
      createdAt
    }
  }
`