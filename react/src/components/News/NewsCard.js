import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {getDateToLocal} from '../../utils/dateFormat'

const NewsCard = ({date, dateFrom, dateTo, title, description}) => {

  const pDate = date ? getDateToLocal(date) : getDateToLocal(dateFrom) +'-'+ getDateToLocal(dateTo)
  const badgeClass = date ? "badge badge-info" : "badge badge-warning"

  return (
    <li className="list-group-item">
     <div className="d-flex justify-content-between align-items-center">
        <h5><span className={badgeClass}>{pDate}</span></h5> 
        <FontAwesomeIcon icon="angle-right" />
     </div>
      <p className="font-weight-bold m-0">{title}</p>
      <p className="m-0"> {description}</p>
    </li>

  )
}

export default NewsCard
