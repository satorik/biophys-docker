import React from 'react'
import EditButtons from '../UI/EditButtons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const FileCard = ({fileLink, description, image, title, onEditClick, onDeleteClick}) => {
  return (
       <div className="w-25 p-1">
        <div className="border p-2">
          <div className="d-flex flex-row justify-content-between mb-2">
            <h6>{title}</h6>
            <EditButtons 
                onClickEdit={onEditClick}
                onClickDelete={onDeleteClick}
                size="sm"
                color="black"
                row
              />
          </div>      
          <div>
              <img className="img-thumbnail" src={image}/>
          </div>
          <hr />
          <div className="d-flex flex-row justify-content-between mt-2">
             <a href={process.env.REACT_APP_STATIC_URI+fileLink}><FontAwesomeIcon icon='file-download' size="lg"/></a>
             <a href={process.env.REACT_APP_STATIC_URI+fileLink}><FontAwesomeIcon icon='eye' size="lg"/></a>
          </div>
          </div>
        </div>    
  )
}