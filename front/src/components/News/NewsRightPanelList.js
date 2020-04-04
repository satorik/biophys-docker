import React from 'react'
import NewsCard from './NewsCard'
import {EmptyData} from '../Shared/EmptyData'

const NewsRightPanelList = ({contentType, posts}) => {

  const title = contentType === 'seminar' ? 'Семинары' : 'Конференции'

  return (
    <div className="card mb-3">
      <div className={`card-header text-right ${contentType === 'seminar' ? 'bg-info text-white' : 'bg-warning'}`}>
        <h4>{title}</h4>
      </div>
      <div className="card-body">
        {posts.length > 0 && <ul className="list-group list-group-flush">
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
        </ul>}
        {posts.length === 0 && <EmptyData instance={contentType} secondary />
        }
      </div>
  </div>
  )
}

export default NewsRightPanelList
