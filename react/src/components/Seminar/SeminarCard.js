import React from 'react'
import { getDateTimeToLocal } from '../../utils/dateFormat'
import EditButtons from '../UI/EditButtons'

const SeminarCard = ({speaker, date, active, last, onSelectSeminar, onClickEdit, onClickDelete}) => {

  let navClass = `d-flex justify-content-between bg-light p-4 ${!last ? 'mb-1' : ''}`
  if (active) { navClass = `d-flex justify-content-between bg-danger text-white p-4 ${!last ? 'mb-1' : ''}` }

  return (
    <div className={navClass} style={{cursor:'pointer'}} onClick={onSelectSeminar}>
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
