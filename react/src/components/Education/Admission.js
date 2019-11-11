import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const GET_EDUCATION_ADMISSSION = gql`                    
    query getEducationAdmission($section: String!) {
      text(section: $section)
    }
  `

const Admission = () => {

  const { loading, error, data } = useQuery(GET_EDUCATION_ADMISSSION, {variables: {section: 'admission'}})
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
<div className="container card mt-5 p-2">
      <div className="mt-3">
        <p className="p-2">{data.text}</p>
      </div>
    </div>
  )
}

export default Admission
