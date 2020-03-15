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
import {EducationButtons} from '../UI/EducationButtons'
import {PrintCard} from '../Department/PrintCard'
import EditButtons from '../UI/EditButtons'

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
			form {
				id
				title
        type
        filetype
			}
		}
	}

  forms {
    id
    title
    type
    filetype
    subSections {
      id
      type
      title
      filetype
    }
  }
}
`

const CREATE_COURSE = gql`
  mutation createEducationCourse($inputData: EducationCourseCreateData!) {
    createEducationCourse(inputData: $inputData) {
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
        form{
          id
          title
          type
          filetype
          subSections {
            id
            type
            title
            filetype
          }
        }
      }
    }
  }
`

const DELETE_COURSE = gql`
  mutation deleteEducationCourse($id: ID!) {
    deleteEducationCourse(id: $id) 
  }
`
const UPDATE_COURSE = gql`
  mutation updateEducationCourse($id: ID!, $inputData: EducationCourseUpdateData!) {
    updateEducationCourse(id: $id, inputData: $inputData) {
        id
        title
        description
        read
        lector
        exam
    }
  }
`
const CREATE_RESOURSE_PDF = gql`
  mutation createEducationResoursePDF($courseId: ID!, $inputData: EducationResourseCreatePDFData!) {
    createEducationResoursePDF(courseId: $courseId, inputData: $inputData) {
      id
      title
      image
      description
      fileLink
      form{
          id
          title
          type
          filetype
          subSections {
            id
            type
            title
            filetype
          }
      }
    }
  }
`

const CREATE_RESOURSE_URL = gql`
  mutation createEducationResourseURL($courseId: ID!, $inputData: EducationResourseCreateURLData!) {
    createEducationResourseURL(courseId: $courseId, inputData: $inputData) {
      id
      title
      image
      description
      fileLink
      form{
          id
          title
          type
          filetype
          subSections {
            id
            type
            title
            filetype
          }
      }
    }
  }
`

const UPDATE_RESOURSE_PDF = gql`
  mutation updateEducationResoursePDF($id: ID!, $inputData: EducationResourseUpdatePDFData!) {
    updateEducationResoursePDF(id: $id, inputData: $inputData) {
      id
      title
      image
      description
      fileLink
      form{
          id
          title
          type
          filetype
          subSections {
            id
            type
            title
            filetype
          }
      }
    }
  }
`
const UPDATE_RESOURSE_URL = gql`
  mutation updateEducationResourseURL($id: ID!, $inputData: EducationResourseUpdateURLData!) {
    updateEducationResourseURL(id: $id, inputData: $inputData) {
      id
      title
      image
      description
      fileLink
      form{
          id
          title
          type
          filetype
          subSections {
            id
            type
            title
            filetype
          }
      }
    }
  }
`

const DELETE_RESOURSE = gql`
  mutation deleteEducationResourse($id: ID!) {
    deleteEducationResourse(id: $id)
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

const Courses = () => {

  const [viewId, setViewId] = React.useState(0)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [mode, setMode] = React.useState({isEditing: false, isCreating: false, isDeleting: false})
  const [resourseMode, setResourseMode] = React.useState({isEditing: false, isCreating: false, isDeleting: false})
  const [updatedCourse, setUpdatedCourse] = React.useState({})
  const [updatedResourse, setUpdatedResourse] = React.useState({})
  const [isAbleToSave, setIsAbleToSave] = React.useState(true)

  const [showResourses, setShowResourses] = React.useState({
    basic: false,
    video: true,
    presentations: true,
    practice: true
  })

  const { loading: queryLoading, error: queryError, data} = useQuery(GET_COURSES)
  const [createEducationCourse,
    { loading: creationLoading, error: creatingError }] = useMutation(CREATE_COURSE, {
         update(cache, { data: {createEducationCourse} }) {
          const { courses } = cache.readQuery({ query: GET_COURSES })
          cache.writeQuery({
            query: GET_COURSES,
            data: {...data,  courses:  [...courses, createEducationCourse]}
          })
        }
      })
  const [updateEducationCourse,
      { loading: updatingLoading, error: updatingError }] = useMutation(UPDATE_COURSE)
  const [deleteEducationCourse,
      { loading: deletingLoading, error: deletingError }] = useMutation(DELETE_COURSE, {
        update(cache, { data: { deleteEducationCourse } }) {
          const { courses } = cache.readQuery({ query: GET_COURSES})
          cache.writeQuery({
            query: GET_COURSES,
            data: { ...data, courses: courses.filter(el => el.id !== deleteEducationCourse)}
          })
        }
      })

  const [createEducationResoursePDF,
    { loading: createResoursePDFLoading, error: createResoursePDFError }] = useMutation(CREATE_RESOURSE_PDF, {
      update(cache, { data: {createEducationResoursePDF} }) {
        const { courses } = cache.readQuery({ query: GET_COURSES })
        cache.writeQuery({
          query: GET_COURSES,
          data: { ...data, courses: courses.map((course, idx) => {
            if (idx === viewId) {
              return {
                ...course,
                resourses: [...course.resourses, createEducationResoursePDF]
              }
            }
            return course
          })}
        })
      }
    })
  
  const [createEducationResourseURL,
    { loading: createResourseURLLoading, error: createResourseURLError }] = useMutation(CREATE_RESOURSE_URL, {
      update(cache, { data: {createEducationResourseURL} }) {
        const { courses } = cache.readQuery({ query: GET_COURSES })
        cache.writeQuery({
          query: GET_COURSES,
          data: { ...data, courses: courses.map((course, idx) => {
            if (idx === viewId) {
              return {
                ...course,
                resourses: [...course.resourses, createEducationResourseURL]
              }
            }
            return course
          })}
        })
      }
    })

  const [updateEducationResoursePDF,
    { loading: updateResoursePDFLoading, error: updateResoursePDFError }] = useMutation(UPDATE_RESOURSE_PDF)
  
  const [updateEducationResourseURL,
    { loading: updateResourseURLLoading, error: updateResourseURLError }] = useMutation(UPDATE_RESOURSE_URL)

  const [deleteEducationResourse,
    { loading: deleteEducationResourseLoading, error: deleteEducationResourseError }] = useMutation(DELETE_RESOURSE, {
      update(cache, { data: { deleteEducationResourse } }) {
        const { courses } = cache.readQuery({ query: GET_COURSES })
        cache.writeQuery({
          query: GET_COURSES,
          data: { ...data, courses: courses.map((course, idx) => {
            if (idx === viewId) {
              return {
                ...course,
                resourses: course.resourses.filter(el => el.id !== deleteEducationResourse)
              }
            }
            return course
          })}
        })
      }
    })

  if (queryLoading) return <Spinner />
  if (queryError) return <NetworkErrorComponent error={queryError} />
  if (updatingError) return <NetworkErrorComponent error={updatingError} />
  if (deletingError) return <NetworkErrorComponent error={deletingError} />
  if (creatingError) return <NetworkErrorComponent error={creatingError} />

  if (createResoursePDFError) return <NetworkErrorComponent error={createResoursePDFError} />
  if (createResourseURLError) return <NetworkErrorComponent error={createResourseURLError} />
  if (updateResoursePDFError) return <NetworkErrorComponent error={updateResoursePDFError} />
  if (updateResourseURLError) return <NetworkErrorComponent error={updateResourseURLError} />
  if (deleteEducationResourseError) return <NetworkErrorComponent error={deleteEducationResourseError} />

  const { courses, forms } = data

  const resourses = []
  let multyResourses = {}
  const singleResourses = []
  let RESOURSE_TEMPLATE = []

  if (courses.length > 0) {
    resourses.push(...courses[viewId].resourses)
    singleResourses.push(...courses[viewId].resourses.filter(resourse => resourse.form.type === 'SINGLE'))

    const createResourseObject = (_forms) => {
      return _forms.reduce((allResourses, _form) => {
        if (_form.type === 'MULTY') {
          const typedReses = courses[viewId].resourses.filter(resourse => resourse.form.id === _form.id)
          if (typedReses.length > 0 ) {
            allResourses[_form.title] = typedReses
            if (_form.subSections && _form.subSections.length > 0 ) {
              allResourses[_form.title].push(createResourseObject(_form.subSections))
            }
          }
          else if (_form.subSections && _form.subSections.length > 0) {
            allResourses[_form.title] = createResourseObject(_form.subSections)
          }
        }
        return allResourses
      }, {})
    }
    multyResourses = createResourseObject(forms)

    let materialsToAdd = forms.filter(form => singleResourses.filter(resourse => resourse.form.id === form.id).length === 0)

   RESOURSE_TEMPLATE = [
      {
        title: 'title',
        label:'Название',
        type: 'input',
        required: true,
        validators: [required, length({ min: 5 })]
      },
      {
        title: 'description',
        label:'Описание',
        type: 'textarea',
        validators: [length({ min: 5 })]
      },
      {
        title: 'resourse',
        label: materialsToAdd,
        type: 'resourse',
        required: true,
        validators: [required]
      }
    ]
  }

  const clearMode = () => {
    setMode({isDeleting: false, isEditing: false, isCreating: false})
    setUpdatedCourse({})
  }

  const clearResourseMode = () => {
    setResourseMode({isDeleting: false, isEditing: false, isCreating: false})
    setUpdatedResourse({})
  }
  const onChangeviewId = (id) => {
    setViewId(id)
    clearMode()
    clearResourseMode()
  }

  const onCancelEditing = () => {
    clearResourseMode()
 }

   const onCloseModal = () => {
    setIsModalOpen(false)
    clearMode()
    clearResourseMode()
    document.body.style.overflow = "scroll"
  }

  const onAddNewCourse = () => {
    clearResourseMode()
    setIsModalOpen(true)
    setMode({...mode, isCreating: true})
    document.body.style.overflow = "hidden"
  }

  const onEditCourse = () => {
    clearResourseMode()
    setIsModalOpen(true)
    setMode({...mode, isEditing: true})
    setUpdatedCourse(courses[viewId])
    document.body.style.overflow = "hidden"
  }

  const onAddNewResourse = () => {
    clearMode()
    setResourseMode({...mode, isCreating: true})
  }

  const onDeleteCourse = (id) => {
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
    setMode({...mode, isDeleting: true})
    setUpdatedCourse(courses[id])
  }

  const onDeleteCourseHandler = async () => {
    await deleteEducationCourse({ variables: {id: updatedCourse.id}})
    setIsModalOpen(false)
    setMode({...mode, isDeleting: false})
    document.body.style.overflow = "scroll"
    setUpdatedCourse({})
  }

  const onDeleteResourseHandler = async () => {
   // await deleteEducationResourse({ variables: {id: updatedTime.id}})
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
        setResourseMode({...resourseMode, isEditing: false})
        setIsModalOpen(false)
        document.body.style.overflow = "scroll"
      }
      if (resourseMode.isCreating) {
       console.log({
        title: postObject.title,
        educationFormId: postObject.resourse.subSectionSelect || postObject.resourse.subSectionText || postObject.resourse.form,
        file: postObject.resourse.file
        })
       if (postObject.resourse.form.filetype === 'PDF') {
        // await createEducationResoursePDF({ variables: {courseId: courses[viewId].id, inputData: {
        //   title: postObject.title,
        //   educationFormId: postObject.resourse.subSectionSelect || postObject.resourse.subSectionText || postObject.resourse.form,
        //   file: postObject.resourse.file
        // }}})
       }
       else {
        await createEducationResourseURL({ variables: {courseId: courses[viewId].id, inputData: {
          title: postObject.title,
          educationFormId: postObject.resourse.form,
          fileLink: postObject.resourse.file
        }}})
       } 
       setResourseMode({...resourseMode, isCreating: false})
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
        const forUpdate = getUpdateData(updatedCourse, postObject)
        await updateEducationCourse({ variables: {id: updatedCourse.id, inputData: forUpdate}})
        setMode({...mode, isEditing: false})
        setUpdatedCourse({})
      }
      if (mode.isCreating) {
        await createEducationCourse({ variables: {inputData: postObject}})
        setMode({...mode, isCreating: false})
      }
    } 
  }

 let modalTitle = ''
 if (mode.isEditing) {modalTitle = 'Редактирование курса'}
 if (mode.isCreating) {modalTitle = 'Новый курс'}
 if (mode.isDeleting) {modalTitle = 'Удаление курса'}

  return (
    <>
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
          {(mode.isDeleting) &&  <YesDelete onDelete={onDeleteCourseHandler} onCancel={onCloseModal} /> }
          {(resourseMode.isDeleting) &&  <YesDelete onDelete={onDeleteResourseHandler} onCancel={onCloseModal}/> }
        </Modal>}
    {(data.courses.length !== 0 ) &&
    <div className="container mt-5">
      <div className="container mb-3">
        <div className="row">
          <div className="col-md-10 d-flex flex-wrap">
                {
                  courses.map((course, idx) =>  <EducationButtons 
                    title={course.title} 
                    key={course.id} 
                    onClick={()=>onChangeviewId(idx)} 
                    onDelete={() => onDeleteCourse(idx)}
                    last = {idx === courses.length-1}
                    selected = {idx === viewId}
                    /> )
                }
          </div>
        </div>      
      </div>
      <div className="container bg-light pb-2 px-0">
        <CourseInfo 
          title={courses[viewId].title}
          description={courses[viewId].description}
          read={courses[viewId].read}
          lector={courses[viewId].lector}
          exam={courses[viewId].exam}  
          onClickEdit={onEditCourse}
        />
        {(singleResourses.length > 0 && Object.keys(multyResourses).length > 0) && 
          <p 
            className="bg-danger font-weight-bold pl-3 py-2 h5 text-white" 
            style={{cursor: 'pointer'}} 
            onClick={() => setShowResourses({ basic: !showResourses.basic,
                                              video: false,
                                              presentations: false,
                                              practice: false
                                            })}
          >Материалы</p>}
          {(!resourseMode.isCreating && !resourseMode.isEditing ) && 
          <div className="p-2">
            <div className="btn btn-outline-secondary p-3 w-100">
              <ButtonAddNew
                color='orange'
                onClickAddButton={onAddNewResourse}
                size='2'
              />
            </div>
          </div>  
          }
          {(resourseMode.isCreating || resourseMode.isEditing) && 
          <div className="p-2">
            <Edit 
              onClickSubmit={onChangeResourseHandler}
              onClickCancel={onCancelEditing}
              isAbleToSave={isAbleToSave}
              post={updatedResourse}
              formTemplate={RESOURSE_TEMPLATE}
              border
            />
          </div>
          }
          {showResourses.basic && <>   
            {(singleResourses.length > 0 && Object.keys(multyResourses).length > 0) && 
            <>
              {singleResourses.length > 0 && 
              <div className="d-flex justify-content-around">
                {
                  singleResourses.map(resourse => 
                  <div className="mb-2" key={resourse.id}>
                    <PrintCard 
                      fileLink={resourse.fileLink}
                      description={resourse.description}
                      image={resourse.image}
                      title={resourse.title}
                      onEditClick={null}
                      onDeleteClick={null}
                    /> 
                  </div>)
                }
              </div>
              }
              {Object.keys(multyResourses).length > 0 && <div>
                    {Object.keys(multyResourses).map(form => 
                      <CourseMaterials 
                      key={form}
                      links = {multyResourses[form]}
                      onClick = {null}
                      title = {form}
                    />
                    )}
                  </div>
              }               
            </>}
          </>
        }
      </div>
    </div>
    }
    {(data.courses.length === 0 ) &&
      <div className="container card mt-5 p-2">
        <p className="h5 text-center">Пока нет ни одного курса. Создайте.</p>
      </div>
    }
      <ButtonAddNew
        color='red'
        onClickAddButton={onAddNewCourse}
        fixed
        size='4'
      />

   </>
  )
}

export default ErrorBoundry(Courses)

// Название (крупно)
// Описание (нормально)
// Когда читается (нормально)
// Форма отчетности (зачет/экзамен)
// Материалы по курсу: pdf-файлы, ссылки
