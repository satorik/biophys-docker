import React from 'react'
import ShortPersonCard from './ShortPersonCard'
import ScienceArticleCard from './ScienceArticleCard'

const GroupCard = ({groupInfo}) => {
  return (
    <div className="p-3">
     <img src={'http://localhost:4000/images/scienceGroup/image1.png'} className="img-thumbnail float-right" alt="..." style={{'width':'12rem','objectFit': 'cover'}} />
      <h5>О группе</h5>
      <hr/>
      <p>{groupInfo.description}</p>
      <h5>Состав научной группы</h5>
      <hr/>
      {groupInfo.people.map(person => 
        <ShortPersonCard 
          key={person.id}
          firstname={person.firstname}
          middlename={person.middlename}
          lastname={person.lastname}
          isStaff={person.type === 'staff'}
          isStudent={person.type === 'student'}
          description={person.description}
        />
      )}
      <h5 className="mt-3">Избранные публикации</h5>
      <hr/>
      <div>
        {
          groupInfo.articles.map(article => 
            <ScienceArticleCard 
              key={article.id}
              author={article.author}
              title={article.title}
              journal={article.journal}
            />
          )
        }
      </div>
    </div>
  )
}

export default GroupCard
