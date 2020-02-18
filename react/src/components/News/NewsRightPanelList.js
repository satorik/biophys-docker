import React from 'react'
import NewsCard from './NewsCard'

const NewsRightPanelList = ({contentType, posts}) => {

  const title = contentType === 'seminar' ? 'Семинары' : 'Конференции'

  return (
    <div className="card mb-3">
    <div className="card-header text-right">
      <h4>{title}</h4>
    </div>
    <div className="card-body">
      <ul className="list-group list-group-flush">
        {posts.map(item => 
          <NewsCard 
            key={item.id} 
            date={item.date}
            dateFrom={item.dateFrom}
            dateTo={item.dateTo}
            title={item.title}
            description={item.description}
            id={item.id}
            contentType={contentType}
          />)}
      </ul>
    </div>
  </div>
  )
}

export default NewsRightPanelList
