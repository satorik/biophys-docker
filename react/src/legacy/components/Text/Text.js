import React from 'react'
import {Query} from "react-apollo"
import {gql} from "apollo-boost"
import './Text.css'

const Text = (props) => {
  const query = gql`
    query Text($section: String!) {
      text(section: $section)
    }`

return (
    <Query query={query} variables={{section: props.section}}>
      {({loading, error, data}) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        const { text } = data

        return <div className="text">{text}</div>

      }}
    </Query>
  )
}

export default Text
