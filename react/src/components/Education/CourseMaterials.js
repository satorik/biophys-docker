import React from 'react'
import {FileCard} from './FileCard'

export const CourseMaterials = ({title, links, onClick}) => {

  console.log(title)

  return (
    <div className="w-100 mt-2 text-center" >
    <p 
      className="bg-warning font-weight-bold p-1"
      style={{cursor: 'pointer'}} 
      onClick={onClick}
      >{title}</p>

        {/* <div className="d-flex flex-wrap justify-content-between flex-row">
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
        </div> */}

    </div>
  )
}
