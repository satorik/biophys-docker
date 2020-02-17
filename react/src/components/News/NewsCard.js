import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {getDateToLocal} from '../../utils/dateFormat'
import {Link} from 'react-router-dom'

const NewsCard = ({date, dateFrom, dateTo, title, description, contentType, id}) => {

  const pDate = date ? getDateToLocal(date) : getDateToLocal(dateFrom) +'-'+ getDateToLocal(dateTo)
  const badgeClass = date ? "badge badge-info" : "badge badge-warning"

  return (
    <li className="list-group-item">
     <div className="d-flex justify-content-between align-items-center">
        <h5><span className={badgeClass}>{pDate}</span></h5> 
        <Link to={`/${contentType}?id=${id}`}><FontAwesomeIcon icon="angle-right" color="black" /></Link> 
     </div>
      <p className="font-weight-bold m-0">{title}</p>
      <p className="m-0"> {description}</p>
    </li>

  )
}

export default NewsCard
