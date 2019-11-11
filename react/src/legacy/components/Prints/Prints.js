import React from 'react'
import {Query} from "react-apollo"
import {gql} from "apollo-boost"
import Print from './Print/Print';

const Prints = () => {
  const query = gql`{
    prints{
    id
    link
    imageUrl
    desc
  }}`

  return (
    <Query query={query} >
      {({loading, error, data}) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        const {prints} = data
        return <div className="staffList">
          {prints.map(print => <Print print = {print} key={print.id} /> )}
        </div>

      }}
    </Query>
  )
}

export default Prints
