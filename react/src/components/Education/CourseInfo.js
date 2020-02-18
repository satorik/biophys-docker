import React from 'react'
import EditButtons from '../UI/EditButtons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {PrintCard} from '../Department/PrintCard'

export const CourseInfo = ({title, description, read, lector, exam, video, book, program}) => {

  const examForm = exam === 'EXAM' ? 'Экзамен' : 'Зачет'

  return (
    <div className="container bg-light mb-2">
      <div className="row">
        <div className="col-12 p-3 bg-dark text-white mb-2 d-flex justify-content-between align-items-baseline">
          <p className="h3">{title.toUpperCase()}</p>
          <p className="font-weight-bold h5">{examForm.toLowerCase()}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 border-right border-secondary mb-2">
            <p className="bg-warning font-weight-bold p-1">Описание</p>
            <p>{description}</p>
            <p className="font-weight-bold">{read}</p>
            <p className="font-italic">{lector}</p>
        </div>
        <div className="col-md-6 mb-2">
          {book && <div className="mb-2">
            <p className="bg-warning font-weight-bold p-1">Учебник</p>
            <PrintCard 
              fileLink={book.fileLink}
              description={book.description}
              image={book.image}
              onEditClick={null}
              onDeleteClick={null}
            /> </div>
          }
          {program && <div className="mb-2">
            <p className="bg-warning font-weight-bold p-1">Программа</p>
            <PrintCard 
              fileLink={program.fileLink}
              description={program.description}
              image={program.image}
              onEditClick={null}
              onDeleteClick={null}
            /> </div>
          }
          {video && 
            <div className="w-100 mt-2 text-center">
              <p className="bg-warning font-weight-bold p-1">Видеозаписи</p>
                {video.map(link => <iframe
                      src="https://www.youtube.com/embed/videoseries?list=PLcsjsqLLSfNA8FeLBKTAgQDR3Ll7aF_vu" frameborder="0" 
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>)}
            </div>
            }
        </div>
      </div>
    </div>

  )
}
