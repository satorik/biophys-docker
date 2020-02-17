import React from 'react'
import {FileCard} from './FileCard'

export const CourseMaterials = ({title, links}) => {
  return (
    <div className="container bg-light mb-2">
      <p className="bg-warning font-weight-bold p-1 mt-2">{title}</p>
      <div className="d-flex flex-wrap justify-content-between flex-row">
        {
          links.map(link => <FileCard 
              key={link.id}
              fileLink={link.fileLink}
              title={link.title}
              description={link.description}
              image={link.image}
              onEditClick={null}
              onDeleteClick={null}
          />)
        }
      </div>
    </div>
  )
}
