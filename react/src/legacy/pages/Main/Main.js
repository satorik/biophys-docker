import React from 'react'
import {Query} from "react-apollo"
import {gql} from "apollo-boost"

import NewsItem from '../../components/NewsItem/NewsItem'
import ContentCard from '../../components/ContentCard/ContentCard';
import Title from '../../components/Title/Title'
import './Main.css'

const Main = (props) => {
  const contentType = props.history.location.pathname.replace('/','')
  console.log(contentType)

  const query = gql`                    
    query getNews($contentType: String!){
      news(contentType: $contentType) {
        id,
        title,
        content,
        imageUrl,
        date,
        dateFrom,
        dateTo,
        contentType,
        updatedAt
    }
  }
  `

  const makeContent = (data, Component) => {
    return <div className="main">
      <Title title="Новости" />
      <div className="main__content">
        {data.map(value => <Component
          key={value.type + value.id}
          title={value.title}
          content={value.content}
          contentType={value.contentType}
          date={value.date}
          dateTo={value.dateTo}
          dateFrom={value.dateFrom}
          imageUrl={value.imageUrl}
        />)}
      </div>
    </div>
  }

  return (
    <Query query={query} variables={{contentType}}>
      {({loading, error, data}) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

       // console.log(data)
        const {news} = data
      //  console.log(conferences)
        if (contentType === 'news') { return makeContent(news, NewsItem) }
        else {return makeContent(news, ContentCard)}
      }}
    </Query>
  )
}

export default Main
