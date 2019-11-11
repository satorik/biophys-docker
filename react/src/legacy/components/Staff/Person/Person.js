import React from 'react'

const Person = ({person}) => {
  return (
    <div>
      <p>{person.firstname} {person.middlename} {person.lastname} --- {person.desc} {person.title}</p>
    </div>
  )
}

export default Person
