import React from 'react'
import {CourseInfo} from './CourseInfo'
import {CourseLinks} from './CourseLinks'
import {CourseMaterials} from './CourseMaterials'

const Courses = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
            <CourseInfo />
        </div>
        <div className="col-md-6">
            <CourseLinks />
            <CourseMaterials />
        </div>
      </div>
    </div>
  )
}

export default Courses

// Название (крупно)
// Описание (нормально)
// Когда читается (нормально)
// Форма отчетности (зачет/экзамен)
// Материалы по курсу: pdf-файлы, ссылки
