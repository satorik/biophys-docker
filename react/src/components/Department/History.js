import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const GET_DEPARTMENT_HISTORY = gql`                    
    query getDepartmentHistory($section: String!) {
      text(section: $section)
    }
  `

const History = () => {

  const { loading, error, data } = useQuery(GET_DEPARTMENT_HISTORY, {variables: {section: 'history'}})
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div className="container card mt-5 p-2">
      <div className="mt-3">
        <img src="https://st2.depositphotos.com/1026649/12226/i/450/depositphotos_122264930-stock-photo-aerial-view-of-moscow-state.jpg"
            className="rounded img-thumbnail w-50 mb-3 float-right" 
            style={{marginTop: '-60px', marginRight: '-60px', marginLeft:'5px'}}
        />
        <p className="p-2">{data.text}</p>
      </div>
    </div>
  )
}

export default History
