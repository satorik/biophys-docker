import React from 'react'
import {Query} from "react-apollo"
import {gql} from "apollo-boost"
import Link from './Link/Link';

const ListOfLinks = () => {
  const query = gql`{
    partnership{
    id
    link
    desc
  }}`

  return (
    <Query query={query} >
      {({loading, error, data}) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        const {partnership} = data
        return <div className="staffList">
          {partnership.map(link => <Link link = {link} key={link.id} /> )}
        </div>

      }}
    </Query>
  )
}

export default ListOfLinks
