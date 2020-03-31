import React from 'react'

export default ({onDelete, onCancel, info, instance}) => {
  let question = 'Вы действительно хотите удалить '
 console.log(info, instance)
  switch (instance) {
    case 'scienceRoute':
        question = question+'научное направление под названием <b>'+info.title+ '</b> ?'
        break
    case 'scienceGroup':
      question = question+'научную группу под названием <b>'+info.title+ '</b> ?'
      break
    case 'sciencePeople':
      question = question+'сотрудника под именем <b>'+info.firstname + ' ' + info.middlename + ' ' + info.lastname+ '</b> ?'
      break
    case 'staff':
        question = question+'сотрудника под именем <b>'+info.firstname + ' ' + info.middlename + ' ' + info.lastname+ '</b> ?'
        break
    case 'scienceArticle':
      question = question+'научную публикацию под названием <b>'+info.title+ '</b> ?'
      break
    case 'admission':
        question = question+'раздел <b>прием на кафедру</b>?'
        break
    case 'educationYear':
      question = question+'курс <b>'+info.title+ '</b> ?'
      break
    case 'schedule':
      question = question+'занятие <b>'+info.title+ '</b> ?'
      break
    case 'educationCourse':
      question = question+'курс <b>'+info.title+ '</b> ?'
      break
    case 'educationResourse':
      question = question+'материал <b>'+info.title+ '</b> ?'
      break
    case 'history':
      question = question+'<b>историю кафедры</b>?'
      break
    case 'partnership':
      question = question+'сотрудничество <b>'+info.title+ '</b> ?'
      break
    case 'print':
      question = question+'печатную продукцию <b>'+info.title+ '</b> ?'
      break
    case 'note':
      question = question+'новость <b>'+info.title+'</b> ?'
      break
    case 'blogpost':
      question = question+'запись блога <b>'+info.title+'</b> ?'
      break
    case 'conference':
      question = question+'конференцию <b>'+info.title+'</b> ?'
      break
    case 'seminar':
        question = question+'семинар <b>'+info.title+'</b> ?'
        break
    default:
      question = question+'эту запись?'
  }

  return (
  <div>
  <p dangerouslySetInnerHTML={{__html: question}}></p>
  <button className="btn btn-primary mr-2" onClick={onDelete}>Да</button>
  <button className="btn btn-danger" onClick={onCancel}>Нет</button>
  </div>
  )
} 