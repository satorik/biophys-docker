import { gql } from '@apollo/client'

export const GET_NEWS = gql`                    
  query getNews($limitConferences: Int, $limitSeminars: Int, $limitBlogposts: Int, $limitNotes: Int){
    blogposts(limit: $limitBlogposts){
      posts{
        id
        title
        description
        imageUrl
      }
    }
    seminars(limit: $limitSeminars) {
      id
      date
      title
      description
    }
    notes(limit: $limitNotes) {
      id
      title
      description
      content
      onTop
    }
    conferences(limit: $limitConferences) {
      id
      title
      description
      dateFrom
      dateTo
    }
  }
`

export const CREATE_NOTE = gql`
  mutation createNote($inputData: NoteCreateData!) {
    createNote(inputData: $inputData) {
      id
      title
      content
      description
      onTop
    }
  }
`

export const DELETE_NOTE = gql`
  mutation deleteNote($id: ID!) {
    deleteNote(id: $id) 
  }
`
export const UPDATE_NOTE = gql`
  mutation updateNote($id: ID!, $inputData: NoteUpdateData!) {
    updateNote(id: $id, inputData: $inputData) {
      updatedNote {
        id
        title
        content
        description
        onTop
      }
      removedFromTop {
        id
        title
        content
        description
        onTop
      }
    }
  }
`