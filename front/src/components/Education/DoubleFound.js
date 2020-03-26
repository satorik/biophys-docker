import React from 'react'

export const DoubleFound = (newLecture, foundLecture, impossible, onSave, onCancel) => {

  let question = 'Новая леакция '+ newLecture.title + ' проходит одновременно с лекцией '+foundLecture.title+'. Они будут выводиться параллельно.'

  return (
    <div>
    <p>{question}</p>
    <button className="btn btn-primary mr-2" onClick={onSave}>Да</button>
    <button className="btn btn-danger" onClick={onCancel}>Нет</button>
    </div>
  )
}
