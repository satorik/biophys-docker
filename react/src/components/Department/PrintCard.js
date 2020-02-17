import React from 'react'
import EditButtons from '../UI/EditButtons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const PrintCard = ({fileLink, description, image, title, onEditClick, onDeleteClick}) => {
 
  return (
       <div className="container">
         <div className="row">
           <div className="col-md-8">
            <img className="img-thumbnail" src={image}/>
           </div>
           <div className="col-md-4">
            <div>
              <EditButtons 
                  onClickEdit={onEditClick}
                  onClickDelete={onDeleteClick}
                  size="sm"
                  color="black"
                  row
                />
            </div>
            <h4>{title}</h4>
            <p>{description}</p>
            <p>Скачать: <a href={process.env.REACT_APP_STATIC_URI+fileLink}><FontAwesomeIcon icon='file-download'/></a></p>
           </div>
         </div>
       </div>
  )
}