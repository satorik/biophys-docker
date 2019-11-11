import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import FullPersonCard from './FullPersonCard'

const GET_DEPARTMENT_STAFF = gql`                    
    query getDepartmentStaff {
      staff{
        id
        firstname
        middlename
        lastname
        jobTitle
        imageUrl
        desc
        tel
        mail      
    }
  }
  `

const Staff = () => {

  const { loading, error, data } = useQuery(GET_DEPARTMENT_STAFF)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const {staff} = data
  
  return (
    <div className="container d-flex mt-5 flex-wrap align-items-top">
      {staff.map(person => 
        <FullPersonCard 
            key={person.id}
            firstname={person.firstname}
            middlename={person.middlename}
            lastname={person.lastname}
            imageUrl={person.imageUrl}
            jobTitle={person.jobTitle}
            desc={person.desc}
            tel={person.tel}
            mail={person.mail}
        />)}
    </div>
  )
}

export default Staff
