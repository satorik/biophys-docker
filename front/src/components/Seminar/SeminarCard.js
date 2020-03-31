import React from 'react'
import { getDateTimeToLocal } from '../../utils/dateFormat'
import EditButtons from '../UI/EditButtons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SeminarCard = ({speaker, date, active, last, onSelectSeminar, onClickEdit, onClickDelete, onCampus}) => {

  let navClass = `d-flex justify-content-between bg-light p-4 ${!last ? 'mb-1' : ''}`
  if (active) { navClass = `d-flex justify-content-between bg-danger text-white p-4 ${!last ? 'mb-1' : ''}` }

  const getIconColor = () => {
    if ((active && !onCampus) || (!active && onCampus)) return {color: 'var(--danger)'}
    else return {color: 'var(--light)'}
  }

  return (
    <div className={navClass} style={{cursor:'pointer'}} onClick={onSelectSeminar}>
        <span><FontAwesomeIcon icon='home' style={getIconColor()} size='lg'/></span>
        <div>
            <p>{speaker}</p>
            <p>{getDateTimeToLocal(date)}</p>
        </div>
        <div>
          <EditButtons 
                onClickEdit={onClickEdit}
                onClickDelete={onClickDelete}
                size="sm"
                color="white"
                row
          />
        </div>
    </div>
  )
}

export default SeminarCard
