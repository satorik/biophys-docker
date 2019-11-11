import React from 'react'
import {getDateToLocal} from '../../utils/dateFormat'

 const ConferenceCard = ({dateFrom, dateTo, active, last, onSelectConference, onClickEdit, onClickDelete}) => {

  let navClass = `d-flex justify-content-between bg-light p-3 ${!last ? 'mb-1' : ''}`
  if (active) { navClass = `d-flex justify-content-between bg-info text-white p-3 ${!last ? 'mb-1' : ''}` }

  const buttonClass = `btn mr-1 ${active ? 'btn-outline-light' : 'btn-outline-dark'}`
  return (
      <div className={navClass} style={{cursor:'pointer'}} onClick={onSelectConference}>
        <div>
          <p>{getDateToLocal(dateFrom)}</p>
          <p>{getDateToLocal(dateTo)}</p>
        </div>
        <div>
          <button className={buttonClass} onClick={onClickEdit}>E</button>
          <button className={buttonClass} onClick={onClickDelete}>D</button>
        </div>
      </div>
  )

}

export default ConferenceCard