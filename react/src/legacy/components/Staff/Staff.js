import React from 'react'
import {Query} from "react-apollo"
import {gql} from "apollo-boost"
import Person from './Person/Person';

const StaffList = () => {

  const query = gql`{
    staff{
    id
    firstname
    middlename
    lastname
    desc
    tel
    mail
  }}`

  return (
    <Query query={query} >
      {({loading, error, data}) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        const {staff} = data
        return <div className="staffList">
          {staff.map(person => <Person person = {person} key={person.id} /> )}
        </div>

      }}
    </Query>
  )
}

export default StaffList
