import React from 'react'
import ShortPersonCard from './ShortPersonCard'
import ScienceArticleCard from './ScienceArticleCard'
import Edit from '../Shared/Edit'
import ButtonAddNew from '../UI/ButtonAddNew'

const GroupCard = ({group, save, articleForUpdate, personForUpdate}) => {


  const content = group.mode.isEditing ? 
  <>
    <h3>Общая информация</h3>
    <Edit 
      onClickSubmit={group.onChangeInfo}
      onClickCancel={group.onCancel}
      isAbleToSave={true}
      post={group}
      formTemplate={group.template}
    />
  </>
  :
  <>
    <img src={process.env.REACT_APP_STATIC_URI+group.imageUrl} className="img-thumbnail float-right" alt="..." style={{'width':'12rem','objectFit': 'cover'}} />
    <h5>О группе</h5>
    <hr/>
    <p>{group.description}</p>
  </>

  return (
    <div className="p-3">
      {content}
      <h5>Состав научной группы</h5>
      <hr/>
      {group.people.data.map((person, idx) => {
          if (group.people.mode.isEditing && person.id === personForUpdate.id) {
            return <Edit 
              key={person.id}
              onClickSubmit={group.people.onChangePerson}
              onClickCancel={group.people.onCancel}
              isAbleToSave={save}
              post={personForUpdate}
              formTemplate={group.people.template}
            />
          }
          else return <ShortPersonCard 
            key={person.id}
            firstname={person.firstname}
            middlename={person.middlename}
            lastname={person.lastname}
            tel={person.tel}
            mail={person.mail}
            urlIstina={person.urlIstina}
            urlRints={person.urlRints}
            urlOrcid={person.urlOrcid}
            urlResearcher={person.urlResearcher}
            urlScopus={person.urlScopus}
            isStaff={person.type === 'STAFF'}
            isStudent={person.type === 'STUDENT'}
            description={person.description}
            onEditClick={person.onEdit}
            onDeleteClick={person.onDelete}
            onClickUp={person.onPersonUp}
            onClickDown={person.onPersonDown}
            firstElement = {idx === 0}
            lastElement = {idx === group.people.data.length-1}
          />
      
         }
      )}
      {
        group.people.mode.isCreating && <div className="p-3">
            <h3>Сотрудник</h3>
            <Edit 
              onClickSubmit={group.people.onChangePerson}
              onClickCancel={group.people.onCancel}
              isAbleToSave={save}
              post={{}}
              formTemplate={group.people.template}
            /></div>
      }
      {
        !(group.people.mode.isEditing || group.people.mode.isCreating) && 
        <div className="mt-1">
          <ButtonAddNew
            color='orange'
            onClickAddButton={group.people.onCreate}
            size='2'
          />
        </div>
      }
      <h5 className="mt-3">Избранные публикации</h5>
      <hr/>
      <div>
        {
          group.articles.data.map((article, idx) => {
            if (group.articles.mode.isEditing && article.id === articleForUpdate.id) {
            return <Edit 
              key={article.id}
              onClickSubmit={group.articles.onChangeArticle}
              onClickCancel={group.articles.onCancel}
              isAbleToSave={save}
              post={articleForUpdate}
              formTemplate={group.articles.template}
            />
          }
            else return <ScienceArticleCard 
              key={article.id}
              author={article.author}
              title={article.title}
              journal={article.journal}
              onEditClick={article.onEdit}
              onDeleteClick={article.onDelete}
              onClickUp={article.onArticleUp}
              onClickDown={article.onArticleDown}
              firstElement = {idx === 0}
              lastElement = {idx === group.articles.data.length-1}
            />
          }
          )
        }
        {
        group.articles.mode.isCreating && <div className="p-3">
            <h3>Публикация</h3>
            <Edit 
              onClickSubmit={group.articles.onChangeArticle}
              onClickCancel={group.articles.onCancel}
              isAbleToSave={save}
              post={{}}
              formTemplate={group.articles.template}
            /></div>
        }
        {
        !(group.articles.mode.isEditing || group.articles.mode.isCreating) && 
        <div className="mt-1">
          <ButtonAddNew
            color='info'
            onClickAddButton={group.articles.onCreate}
            size='2'
          />
        </div>
      }
      </div>
    </div>
  )
}

export default GroupCard
