import React from 'react'
import { getDateTimeToLocal } from '../../utils/dateFormat'

const SeminarCard = ({speaker, date, active, last, onSelectSeminar, onClickEdit, onClickDelete}) => {

  let navClass = `d-flex justify-content-between bg-light p-4 ${!last ? 'mb-1' : ''}`
  if (active) { navClass = `d-flex justify-content-between bg-danger text-white p-4 ${!last ? 'mb-1' : ''}` }

  const buttonClass = `btn mr-1 ${active ? 'btn-outline-light' : 'btn-outline-dark'}`

  return (
    <div className={navClass} style={{cursor:'pointer'}} onClick={onSelectSeminar}>
        <div>
            <p>{speaker}</p>
            <p>{getDateTimeToLocal(date)}</p>
        </div>
        <div>
          <button className={buttonClass} onClick={onClickEdit}>E</button>
          <button className={buttonClass} onClick={onClickDelete}>D</button>
        </div>
    </div>
  )
}

export default SeminarCard
