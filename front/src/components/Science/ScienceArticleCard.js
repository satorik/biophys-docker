import React from 'react'
import EditButtons from '../UI/EditButtons'

const ScienceArticleCard = ({author, title, journal, onEditClick, onDeleteClick, onClickUp, onClickDown, firstElement, lastElement}) => {
  return (
    <div className="mb-2">
      <div className="pl-2" style={{borderLeft: '4px solid #17a2b8'}}>
        <div>
          <p className="my-0 mr-2 d-inline">{title}</p>
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
        <p className="m-0"><small>{author}</small></p>
        <p className="m-0"><small className="text-muted">{journal}</small></p>
      </div>
    </div>
  )
}

export default ScienceArticleCard
