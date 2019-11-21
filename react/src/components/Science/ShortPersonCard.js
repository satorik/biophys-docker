import React from 'react'
import EditButtons from '../UI/EditButtons'

const ShortPersonCard = ({firstname, lastname, middlename, description, onEditClick, onDeleteClick, onClickUp, onClickDown, firstElement, lastElement}) => {
  return (
    <div className="pl-2 mb-2" style={{borderLeft: '4px solid #fd7e14'}}>
      <div className="d-flex align-items-start" >
        <p className="font-weight-bold mr-2 my-0">{lastname} {firstname} {middlename}</p>
        <EditButtons 
          onClickEdit={onEditClick}
          onClickDelete={onDeleteClick}
          onClickUp={onClickUp}
          onClickDown={onClickDown}
          size="sm"
          color="black"
          row
          withArrowUp={!firstElement}
          withArrowDown={!lastElement}
      />
      </div>
      <small className="text-muted">{description}</small>
    </div>
  )
}

export default ShortPersonCard
