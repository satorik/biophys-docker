import { gql } from '@apollo/client'

export const GET_COURSES = gql`
  query getEducationCourses {
    courses {
		id
		title
		description
		read
		lector
		exam
		resourses{
			id
			title
      image
      description
			fileLink
			form {
				id
				title
        type
        filetype
        parentForm {
          id
          type
          title
          filetype
        }
			}
		}
	}

  forms {
    id
    title
    type
    filetype
    parentForm {
      id
      type
      title
      filetype
    }
    subSections {
      id
      type
      title
      filetype
    }
  }
}
`

export const CREATE_COURSE = gql`
  mutation createEducationCourse($inputData: EducationCourseCreateData!) {
    createEducationCourse(inputData: $inputData) {
      id
      title
      description
      read
      lector
      exam
      resourses{
        id
        title
        image
        description
        fileLink
        form{
          id
          title
          type
          filetype
          parentForm {
            id
            type
            title
            filetype
          }
        }
      }
    }
  }
`

export const DELETE_COURSE = gql`
  mutation deleteEducationCourse($id: ID!) {
    deleteEducationCourse(id: $id) 
  }
`
export const UPDATE_COURSE = gql`
  mutation updateEducationCourse($id: ID!, $inputData: EducationCourseUpdateData!) {
    updateEducationCourse(id: $id, inputData: $inputData) {
        id
        title
        description
        read
        lector
        exam
    }
  }
`
export const CREATE_RESOURSE = gql`
  mutation createEducationResourse($courseId: ID!, $filetype: FILETYPE!,  $inputData: EducationResourseCreateData!) {
    createEducationResourse(courseId: $courseId, inputData: $inputData, filetype: $filetype) {
      resourse{
        id
        title
        image
        description
        fileLink
        form{
            id
            title
            type
            filetype
            parentForm {
              id
              type
              title
              filetype
            }
        }
      }
      forms {
        id
        title
        type
        filetype
        parentForm {
          id
          type
          title
          filetype
        }
        subSections {
          id
          type
          title
          filetype
        }
      }
    }
  }
`

export const UPDATE_RESOURSE = gql`
  mutation updateEducationResourse($id: ID!, $filetype: FILETYPE!,  $inputData: EducationResourseUpdateData!) {
    updateEducationResourse(id: $id, filetype: $filetype, inputData: $inputData) {
      resourse{
        id
        title
        image
        description
        fileLink
        form{
            id
            title
            type
            filetype
            parentForm {
              id
              type
              title
              filetype
            }
        }
      }
      forms {
        id
        title
        type
        filetype
        parentForm {
          id
          type
          title
          filetype
        }
        subSections {
          id
          type
          title
          filetype
        }
      }
    }
  }
`

export const DELETE_RESOURSE = gql`
  mutation deleteEducationResourse($id: ID!) {
    deleteEducationResourse(id: $id) {
      resourse {
        id
      }
      forms {
        id
        title
        type
        filetype
        parentForm {
          id
          type
          title
          filetype
        }
        subSections {
          id
          type
          title
          filetype
        }
      }
    }
  }
`