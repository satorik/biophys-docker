import React from 'react'
import EditButtons from '../UI/EditButtons'

const LinkCard = ({imageUrl, link, desc, title, onEditClick, onDeleteClick}) => {
  return (
    <div className="card bg-light mb-3" style={{maxWidth: '22rem'}}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <img src={imageUrl} alt="" className="img-fluid w-25 mr-1" />
        <a href={link}>{title}</a>
        <EditButtons 
            onClickEdit={onEditClick}
            onClickDelete={onDeleteClick}
            size="sm"
            color="black"
            row
        />
      </div>
      <div className="card-body">
        <p className="card-text">{desc}</p>
      </div>
    </div>
  )
}

export default LinkCard
