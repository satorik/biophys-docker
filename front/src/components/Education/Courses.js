import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { required, length, time, date } from '../../utils/validators'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

import { updateAfterCreate, updateAfterDelete, updateAfterCreateResourse, updateAfterDeleteResourse } from '../../utils/updateCache/courses'
import * as queries from '../../utils/queries/courses'

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
import {EmptyData} from '../Shared/EmptyData'



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
    type: 'textarea-long',
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
  const [isError, setIsError] = React.useState(null)

  const [showResourses, setShowResourses] = React.useState({
    basic: false,
    video: true,
    presentations: true,
    practice: true
  })

  const { loading: queryLoading, error: queryError, data} = useQuery(queries.GET_COURSES)
  const [createEducationCourse, { loading: creationLoading }] = useMutation(queries.CREATE_COURSE, {
    update: (cache, res) => updateAfterCreate(cache, res, queries.GET_COURSES)})
  const [updateEducationCourse, { loading: updatingLoading }] = useMutation(queries.UPDATE_COURSE)
  const [deleteEducationCourse, { loading: deletingLoading }] = useMutation(queries.DELETE_COURSE, {
    update: (cache, res) => updateAfterDelete(cache, res, queries.GET_COURSES)})
  const [createEducationResourse, { loading: createResourseLoading }] = useMutation(queries.CREATE_RESOURSE, {
    update: (cache, res) => updateAfterCreateResourse(cache, res, queries.GET_COURSES, viewId)})
  const [updateEducationResourse, { loading: updateResourseLoading }] = useMutation(queries.UPDATE_RESOURSE)
  const [deleteEducationResourse, { loading: deleteEducationResourseLoading }] = useMutation(queries.DELETE_RESOURSE, {
    update: (cache, res) => updateAfterDeleteResourse(cache, res, queries.GET_COURSES, viewId)})

  if (queryLoading || creationLoading || updatingLoading || deletingLoading || createResourseLoading || 
    updateResourseLoading || deleteEducationResourseLoading) return <Spinner />

  if (queryError) return <NetworkErrorComponent error={queryError} type='queryError' />
  if (isError) return <NetworkErrorComponent error={isError} onDismiss={() => setIsError(null)} />

  const { courses, forms } = data

  const resourses = []
  let multyResourses = []
  const singleResourses = []
  let RESOURSE_TEMPLATE = []

  if (courses.length > 0) {
    resourses.push(...courses[viewId].resourses)
    singleResourses.push(...courses[viewId].resourses.filter(resourse => resourse.form.type === 'SINGLE'))
    multyResourses.push(...courses[viewId].resourses.filter(resourse => resourse.form.type === 'MULTY'))

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
          label: resourseMode.isCreating ? materialsToAdd : forms,
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

  const onDeleteResourse = (id) => {
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
    setResourseMode({...resourseMode, isDeleting: true})
    setUpdatedResourse(courses[viewId].resourses.find(resourse => resourse.id === id))
  }

  const onEditResourse = (id) => {
    clearMode()
    setResourseMode({...resourseMode, isEditing: true})
    setUpdatedResourse(courses[viewId].resourses.find(resourse => resourse.id === id))
  }

  const onDeleteCourseHandler = async() => {
    try {
      await deleteEducationCourse({ variables: {id: updatedCourse.id}})
      setIsModalOpen(false)
      document.body.style.overflow = "scroll"
      clearMode()
    } catch(error) {
      setIsError(error)
    }
  }

  const onDeleteResourseHandler = async() => {
    try {
      await deleteEducationResourse({ variables: {id: updatedResourse.id}})
      setIsModalOpen(false)
      document.body.style.overflow = "scroll"
      clearResourseMode()
      clearMode()
    } catch(error) {
      setIsError(error)
    }
  }

  const onChangeResourseHandler = async (e, postData, valid) => {
    e.preventDefault()
    if (!valid) {
      setIsAbleToSave(false)
    }
    else {
      let postObject = postData.reduce((obj, item) => {
        if (item.type !== 'resourse') {
          obj[item.title] = item.value
        }
        else {
          Object.keys(item.value).forEach(key => obj[key] = item.value[key])
        }
        return obj
      } ,{})    
      
      const filetype = forms.find(form => form.id === postObject.educationFormId).filetype

      if (resourseMode.isEditing) {
        
        const forUpdate = getUpdateData(updatedResourse, postObject)
        try {
          await updateEducationResourse({
            variables: {
              id: updatedResourse.id, 
              filetype: filetype,
              inputData: {...forUpdate}
            }
          })
  
          setResourseMode({...resourseMode, isEditing: false})
          setIsModalOpen(false)
          document.body.style.overflow = "scroll"
        } catch(error) {
          setIsError(error)
        }
      }
      if (resourseMode.isCreating) {
        try {
          await createEducationResourse({
            variables: {
              courseId: courses[viewId].id, 
              filetype: filetype,
              inputData: {...postObject}
            }
          })
         setResourseMode({...resourseMode, isCreating: false})
         setUpdatedResourse({})
        } catch(error) {
          setIsError(error)
        }
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
        try {
          await updateEducationCourse({ variables: {id: updatedCourse.id, inputData: forUpdate}})
          setMode({...mode, isEditing: false})
          setUpdatedCourse({})
        } catch(error) {
          setIsError(error)
        }
 
      }
      if (mode.isCreating) {
        try {
          await createEducationCourse({ variables: {inputData: postObject}})
          setMode({...mode, isCreating: false})
        } catch(error) {
          setIsError(error)
        }
      }
    } 
  }

 let modalTitle = ''
 if (mode.isEditing) {modalTitle = 'Редактирование курса'}
 if (mode.isCreating) {modalTitle = 'Новый курс'}
 if (mode.isDeleting) {modalTitle = 'Удаление курса'}
 if (resourseMode.isDeleting) {modalTitle = 'Удаление материалов'}

 //console.log(forms)

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
          {(mode.isDeleting) &&  <YesDelete onDelete={onDeleteCourseHandler} onCancel={onCloseModal} info={updatedCourse} instance='educationCourse' /> }
          {(resourseMode.isDeleting) &&  <YesDelete onDelete={onDeleteResourseHandler} onCancel={onCloseModal} info={updatedResourse} instance='educationResourse'  /> }
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
        {(singleResourses.length > 0 || multyResourses.length > 0) && 
          <div 
            className="bg-danger font-weight-bold p-3 text-white text-center d-flex justify-content-between align-items-center" 
            style={{cursor: 'pointer'}} 
            onClick={() => setShowResourses({ basic: !showResourses.basic,
                                              video: false,
                                              presentations: false,
                                              practice: false
                                            })}
                  
          ><p className="h5">Материалы</p>
          <span><FontAwesomeIcon icon={showResourses.basic ? faCaretUp : faCaretDown} size="2x" /></span>
          </div>}
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
            {(singleResourses.length > 0 || multyResourses.length > 0) && 
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
                      onEditClick={() => onEditResourse(resourse.id)}
                      onDeleteClick={() => onDeleteResourse(resourse.id)}
                    /> 
                  </div>)
                }
              </div>
              }
             {multyResourses.length > 0 && <div>
                {forms.map(form => {
                    if (form.type === 'MULTY') {
                      const typedReses = multyResourses.filter(res => (res.form.id === form.id || (res.form.parentForm && res.form.parentForm.id === form.id)))
                      if (typedReses.length > 0) return <CourseMaterials 
                          key={form.id}
                          links = {typedReses}
                          filetype = {form.filetype}
                          onClick = {null}
                          title = {form.title}
                          parentForm = {form.id}
                          onDelete={onDeleteResourse}
                          onEdit={onEditResourse}
                        />
                    } 
                  }

                )}
              </div>}
            </>}
          </>
        }
      </div>
    </div>
    }
    {(data.courses.length === 0 ) &&
      <EmptyData instance='educationCourse' />
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
