import React from 'react'

export default ({onDelete, onCancel, info, instance}) => {
  let question = 'Вы действительно хотите удалить '

  switch (instance) {
    case 'scienceGroup':
      question = question+'научную группу под названием '+info.title
      break
    case 'sciencePeople':
      question = question+'сотрудника под именем '+info.firstname + ' ' + info.middlename + ' ' + info.lastname
      break
    case 'scienceArticle':
      question = question+'научную публикацию под названием '+info.title
      break
    default:
      question = question+'эту запись?'
  }

  return (
  <div>
  <p>{question}</p>
  <button className="btn btn-primary mr-2" onClick={onDelete}>Да</button>
  <button className="btn btn-danger" onClick={onCancel}>Нет</button>
  </div>
  )
} 