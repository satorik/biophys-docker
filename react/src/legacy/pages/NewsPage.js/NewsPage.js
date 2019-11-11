import React from 'react'
import {Query} from "react-apollo"
import {gql} from "apollo-boost"

import NewsItem from '../../components/NewsItem/NewsItem'
import ContentCard from '../../components/ContentCard/ContentCard';
import Title from '../../components/Title/Title'

const NewsPage = (props) => {
  const contentType = props.history.location.pathname.replace('/', '')
  console.log(contentType)
  const query = gql`                    
  {
    news {
      id,
      title,
      content,
      imageUrl,
      date,
      dateFrom,
      dateTo,
      type,
      updatedAt
    }
  }
  `
  return (
    <Query query={query} fetchPolicy="no-cache">
      {({loading, error, data}) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        // console.log(data)
        const {news} = data

        return <div className="main">
          <Title title="Новости" />
          <div className="main__content">
            {data.map(value => <NewsItem
              key={value.type + value.id}
              title={value.title}
              content={value.content}
              contentType={value.type}
              date={value.date}
              dateTo={value.dateTo}
              dateFrom={value.dateFrom}
              imageUrl={value.imageUrl}
            />)}
          </div>
        </div>
      }}
    </Query>
  )
}

export default NewsPage
