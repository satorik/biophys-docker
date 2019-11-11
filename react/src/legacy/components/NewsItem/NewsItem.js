import React from 'react'
import './NewsItem.css'

const NewsItem = (props) => {
  let type = ''
  let typeClass = ''
  switch (props.contentType) {
    case 'note':
      type = 'Объявление'
      typeClass = 'news__type type__note'
      break
    case 'conference':
      type = 'Конференция'
      typeClass = 'news__type type__conference'
      break
    case 'seminar':
      type = 'Семинар'
      typeClass = 'news__type type__seminar'
      break
    case 'blogpost':
      type = 'Блог'
      typeClass = 'news__type type__blogpost'
      break
    default:
      type = 'FFFFF'
  }

  //console.log(type);
  return (
    <div className="news">
      <div className="news___title">
        <h1>{props.title}</h1>
      </div>
      <div className="news___body">
        <span className={typeClass}>{type}</span>
        <div className="news___container">
          <div className="news___content">{props.content}</div>
            <a href="#a">дальше</a>
        </div>
      </div>
    </div>
  )
}

export default NewsItem
