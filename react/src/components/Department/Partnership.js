import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import LinkCard from '../Shared/LinkCard'

const GET_DEPARTMENT_PARTNERSHIP = gql`                    
    query getDepartmentPartnership {
      partnership{
        id
        link
        imageUrl
        desc  
        title
    }
  }
  `

const Partnership = () => {

  const { loading, error, data } = useQuery(GET_DEPARTMENT_PARTNERSHIP)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const {partnership} = data
  return (
    <div className="container d-flex flex-wrap mt-5 justify-content-between">
      {partnership.map(partner => 
        <LinkCard 
          key={partner.id}
          link={partner.link}
          imageUrl={partner.imageUrl}
          title={partner.title}
          desc={partner.desc}
        />)
      }
    </div>
  )
}

export default Partnership
