import React from 'react'
import {FileCard} from './FileCard'

export const CourseMaterials = ({title, links, filetype, onClick, parentForm, onDelete, onEdit}) => {

  //console.log(links)
  //console.log(parentForm)

  const createResDiv = (reses) => {
    return <div className="d-flex flex-wrap justify-content-around flex-row">
      { reses.map (res => <FileCard 
                    key={res.id}
                    fileLink={res.fileLink}
                    title={res.title}
                    description={res.description}
                    image={res.image}
                    onEditClick={() => onEdit(res.id)}
                    onDeleteClick={() => onDelete(res.id)}
                    filetype={filetype}
                />)

      }
    </div>
  }

  const subSections = links.filter(link => link.form.id !== parentForm).reduce((acc, el) => {
    acc = [...acc, {id: el.form.id, title: el.form.title}]
    return acc
  }, [])

  console.log(subSections)

  const courseMaterials = <div>
      {
        createResDiv(links.filter(link => link.form.id === parentForm))
      }
     {subSections.length > 0 && <div id="subsections">
        {
          subSections.map(subSecion => <div key={subSecion}>
            <p className="bg-secondary text-white w-50">{subSecion.title}</p>
            {createResDiv(links.filter(link => link.form.id === subSecion.id))}
          </div>)
        }
      </div>}
  </div>

  return (
    <div className="w-100 mt-2 text-center" >
    <p 
      className="bg-warning font-weight-bold p-1"
      style={{cursor: 'pointer'}} 
      onClick={onClick}
      >{title}</p>
        { courseMaterials }
    </div>
  )
}
