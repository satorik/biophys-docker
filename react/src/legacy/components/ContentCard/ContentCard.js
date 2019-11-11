import React from 'react'
import './ContentCard.css'

const ContentCard = (props) => {
  return (
    <div className="content__page">
      <div className="content__header">
        <div className="content__img"> <img src={props.imageUrl} alt="" /></div>
        <div className="content__header_body">
          {props.title && <p>{props.title}</p>}
          {props.date && <p>{props.date}</p>}
          {props.dateFrom && <p>{props.dateFrom}</p>}
          {props.dateTo && <p>{props.dateTo}</p>}
        </div>
      </div>
      <div className="content__body">
        {props.content}
      </div>
    </div>
  )
}

export default ContentCard
