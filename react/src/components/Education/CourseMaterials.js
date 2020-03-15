import React from 'react'
import {FileCard} from './FileCard'

export const CourseMaterials = ({title, links, onClick}) => {

  const returnResourseDiv = (_links) => {
    let i = 0
    if (Array.isArray(_links)) {
      return (
        <div className="d-flex flex-wrap justify-content-around flex-row" key={i++}>
          {_links.map(link => {
            if (link.id) {return <FileCard 
                    key={link.id}
                    fileLink={link.fileLink}
                    title={link.title}
                    description={link.description}
                    image={link.image}
                    onEditClick={null}
                    onDeleteClick={null}
                />}
            else {return returnResourseDiv(link)}
            })
          }
        </div>
      )
    }
    else {
      return Object.keys(_links).map(link => <div key={link}>
        <p className="bg-secondary text-white w-50">{link}</p>
        {returnResourseDiv(_links[link])}
      </div>) 
    }
  }

  return (
    <div className="w-100 mt-2 text-center" >
    <p 
      className="bg-warning font-weight-bold p-1"
      style={{cursor: 'pointer'}} 
      onClick={onClick}
      >{title}</p>

         {returnResourseDiv(links)}

    </div>
  )
}
