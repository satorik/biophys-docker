import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import LinkCard from '../Shared/LinkCard'

const GET_DEPARTMENT_PRINTS = gql`                    
    query getDepartmentPrints {
      prints{
        id
        link
        imageUrl
        desc  
        title
    }
  }
  `

const Prints = () => {

  const { loading, error, data } = useQuery(GET_DEPARTMENT_PRINTS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const {prints} = data
  return (
    <div className="container d-flex flex-wrap mt-5 justify-content-between">
      {prints.map(print => 
        <LinkCard 
          key={print.id}
          link={print.link}
          imageUrl={print.imageUrl}
          title={print.title}
          desc={print.desc}
        />)
      }
    </div>
  )
}

export default Prints
