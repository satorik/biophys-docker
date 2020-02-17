import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { required, length, time, date } from '../../utils/validators'

import {CourseInfo} from './CourseInfo'
import {CourseMaterials} from './CourseMaterials'

import YesDelete from '../Shared/DoYouWantToDelete'
import ButtonAddNew from '../UI/ButtonAddNew'
import Modal from '../UI/Modal'
import Edit from '../Shared/Edit'
import Spinner from '../UI/Spinner'
import getUpdateData from '../../utils/getObjectForUpdate'
import ErrorBoundry from '../Shared/ErrorHandling/ErrorBoundry'
import NetworkErrorComponent from '../Shared/ErrorHandling/NetworkErrorComponent'

const GET_COURSES = gql`
  query getEducationCourses {
    courses {
		id
		title
		description
		read
		lector
		exam
		resourses{
			id
			title
      image
      description
			fileLink
			type
			form{
				id
				title
			}
		}
	}
}
`

const FORM_TEMPLATE = [
  {
    title: 'title',
    label:'Название',
    type: 'input',
    validators: [required, length({ min: 5 })]
  },
  {
    title: 'description',
    label:'Описание',
    type: 'textarea',
    validators: [required, length({ min: 5 })]
  },
  {
    title: 'read',
    label:'Читается',
    type: 'input',
    validators: [required, length({ min: 5 })]
  },
  {
    title: 'lector',
    label:'Лектор',
    type: 'input',
    validators: [required, length({ min: 5 })]
  },
  {
    title: 'exam',
    label:[{title:'Экзамен', value: 'EXAM'}, {title:'Зачет', value: 'TEST'}],
    type: 'radio',
    validators: []
  }
]

const RESOURSE_TEMPLATE = [
  {
    title: 'fileLink',
    label:'Файл',
    type: 'fileOrLink',
    required: true,
    validators: [required]
  },
  {
    title: 'title',
    label:'Название',
    type: 'input',
    validators: [required, length({ min: 5 })]
  },
  {
    title: 'form',
    label:[{title:'Экзамен', value: 'EXAM'}, {title:'Зачет', value: 'TEST'}],
    type: 'radio',
    validators: []
  }
]

const Courses = () => {

  const [viewId, setViewId] = React.useState(0)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [mode, setMode] = React.useState({isEditing: false, isCreating: false, isDeleting: false})
  const [resourseMode, setResourseMode] = React.useState({isEditing: false, isCreating: false, isDeleting: false})
  const [updatedCourse, setUpdatedCourse] = React.useState({})
  const [updatedResourse, setUpdatedResourse] = React.useState({})
  const [isAbleToSave, setIsAbleToSave] = React.useState(true)

  const { loading: queryLoading, error: queryError, data} = useQuery(GET_COURSES)

  if (queryLoading) return <Spinner />
  if (queryError) return <NetworkErrorComponent error={queryError} />
  // if (updatingError) return <NetworkErrorComponent error={updatingError} />
  // if (deletingError) return <NetworkErrorComponent error={deletingError} />
  // if (creatingError) return <NetworkErrorComponent error={creatingError} />

  const { courses } = data
  const {resourses, ...info} = courses[viewId]

  const videoLinks = resourses.filter(resourse => resourse.form.title === 'видеозапись')
  const book = resourses.find(resourse => resourse.form.title === 'учебник')
  const program = resourses.find(resourse => resourse.form.title === 'программа')
  const presentations = resourses.filter(resourse => resourse.form.title === 'презентация')
  const practice = resourses.filter(resourse => resourse.form.title === 'практикум')

  const clearMode = () => {
    setResourseMode({isDeleting: false, isEditing: false, isCreating: false})
    setMode({isDeleting: false, isEditing: false, isCreating: false})
    setUpdatedResourse({})
    setUpdatedCourse({})
  }

  const onChangeviewId = (id) => {
    setViewId(id)
    clearMode()
  }

  const onCancelEditing = () => {
    clearMode()
 }

   const onCloseModal = () => {
    setIsModalOpen(false)
    setMode({isDeleting: false, isEditing: false, isCreating: false})
    setUpdatedCourse({})
    document.body.style.overflow = "scroll"
  }

  const onAddNewCourse = () => {
    setIsModalOpen(true)
    setMode({...mode, isCreating: true})
    document.body.style.overflow = "hidden"
    console.log(FORM_TEMPLATE)
  }

  const onDeleteCourseHandler = async () => {
    //await deleteScheduleYear({ variables: {id: updatedYear.id}})
    console.log('deleted course')
    setIsModalOpen(false)
    setMode({...mode, isDeleting: false})
    document.body.style.overflow = "scroll"
    setUpdatedCourse({})
  }

  const onDeleteResourseHandler = async () => {
   // await deleteScheduleTimetable({ variables: {id: updatedTime.id}})
   console.log('deleted resourse')
    setIsModalOpen(false)
    setMode({...resourseMode, isDeleting: false})
    document.body.style.overflow = "scroll"
    setUpdatedResourse({})
  }

  const onChangeResourseHandler = async (e, postData, valid) => {
    e.preventDefault()
    if (!valid) {
      setIsAbleToSave(false)
    }
    else {
      let postObject = postData.reduce((obj, item) => {
        obj[item.title] = item.value
        return obj
      } ,{})     
      if (resourseMode.isEditing) {
        const forUpdate = getUpdateData(updatedResourse, postObject)
        //await updateScheduleTimetable({ variables: {id: updatedTime.id, inputData: forUpdate}})
        console.log('resourseEdited')
        setMode({...resourseMode, isEditing: false})
        setIsModalOpen(false)
        document.body.style.overflow = "scroll"
      }
      if (resourseMode.isCreating) {
       console.log(postObject) 
       //await createScheduleTimetable({ variables: {yearId: viewId+1, dayId: days.indexOf(updatedDay)+1, inputData: postObject}})
       setMode({...resourseMode, isCreating: false})
       setUpdatedResourse({})
      }
    }
  }

  const onChangeCourseHandler = async (e, postData, valid) => {
    e.preventDefault()
    if (!valid) {
      setIsAbleToSave(false)
    }
    else {
      const postObject = postData.reduce((obj, item) => {
          obj[item.title] = item.value
          return obj
      } ,{})
      setIsModalOpen(false)
      document.body.style.overflow = "scroll"
      if (mode.isEditing) {
        //await updateScheduleYear({ variables: {id: updatedYear.id, inputData: postObject}})
       console.log('edited', postObject)
        setMode({...mode, isEditing: false})
        setUpdatedCourse({})
      }
      if (mode.isCreating) {
        //await createScheduleYear({ variables: {inputData: postDataWithYear}})
        console.log('created', postObject)
        setMode({...mode, isCreating: false})
      }
    } 
  }

 let modalTitle = ''
 if (mode.isEditing) {modalTitle = 'Редактирование курса'}
 if (mode.isCreating) {modalTitle = 'Новый курс'}
 if (mode.isDeleting) {modalTitle = 'Удаление курса'}

  return (
    <div className="container mt-5">
      <div className="container mb-3">
      {isModalOpen && <Modal 
        isOpen={isModalOpen}
        title={modalTitle}
        onClose={onCloseModal}
        >
          {(mode.isCreating || mode.isEditing) && <Edit 
            onClickSubmit={onChangeCourseHandler}
            onClickCancel={onCloseModal}
            isAbleToSave={isAbleToSave}
            post={updatedCourse}
            formTemplate={FORM_TEMPLATE}
        />}
          {(resourseMode.isEditing) && <Edit 
            onClickSubmit={onChangeResourseHandler}
            onClickCancel={onCloseModal}
            isAbleToSave={isAbleToSave}
            post={updatedResourse}
            formTemplate={RESOURSE_TEMPLATE}
        />}
          {(mode.isDeleting) &&  <YesDelete onDelete={onDeleteCourseHandler} /> }
          {(resourseMode.isDeleting) &&  <YesDelete onDelete={onDeleteResourseHandler} /> }
        </Modal>}
        <div className="row">
          <div className="col-md-12 flex-wrap">
              {
                courses.map((course, idx) => {
                  let className = 'btn-outline-primary'
                  if (idx === viewId ) className = 'btn-primary'
                  return <button type="button" className={`btn ${className} mx-1`} key={course.id} onClick={()=>onChangeviewId(idx)}>{course.title}</button>
                })
              }
          </div>
        </div>      
      </div>
      <CourseInfo 
        title={courses[viewId].title}
        description={courses[viewId].description}
        read={courses[viewId].read}
        lector={courses[viewId].lector}
        exam={courses[viewId].exam}  
        video={videoLinks}
        book={book}
        program={program}
      />
      <CourseMaterials 
        title ="Презентации"
        links = {presentations}
      />
      <CourseMaterials 
        title ="Практикум"
        links = {practice}
      />
      <ButtonAddNew
        color='red'
        onClickAddButton={onAddNewCourse}
        fixed
        size='4'
      />
    </div>
  )
}

export default Courses

// Название (крупно)
// Описание (нормально)
// Когда читается (нормально)
// Форма отчетности (зачет/экзамен)
// Материалы по курсу: pdf-файлы, ссылки
