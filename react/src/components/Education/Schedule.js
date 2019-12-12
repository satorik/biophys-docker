import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { required, length } from '../../utils/validators'

import ScheduleByYear from './ScheduleByYear'
import getWeekNumber from '../../utils/getWeekNumber'
import YesDelete from '../Shared/DoYouWantToDelete'
import ButtonAddNew from '../UI/ButtonAddNew'
import Modal from '../UI/Modal'
import Edit from '../Shared/Edit'
import Spinner from '../UI/Spinner'
import EditButtons from '../UI/EditButtons'
import getUpdateData from '../../utils/getObjectForUpdate'
import ErrorBoundry from '../Shared/ErrorHandling/ErrorBoundry'
import NetworkErrorComponent from '../Shared/ErrorHandling/NetworkErrorComponent'

const GET_YEARS = gql`
  query getScheduleYears($calendarYear: Int, $term: Int) {
    years(calendarYear: $calendarYear, term: $term){
      id
      title
    }
  }
`

const CREATE_YEAR = gql`
  mutation createScheduleYear($title: String!) {
    createScheduleYear(title: $title) {
      id
      title
    }
  }
`

const DELETE_YEAR = gql`
  mutation deleteScheduleYear($id: ID!) {
    deleteScheduleYear(id: $id) 
  }
`
const UPDATE_YEAR = gql`
  mutation updateScheduleYear($id: ID!, $title: String!) {
    updateScheduleYear(id: $id, title: $title) {
        id
        title
    }
  }
`

const FORM_TEMPLATE = [
  {
    title: 'title',
    label:'Название',
    type: 'input',
    validators: [required, length({ min: 5 })]
  }
] 


const Schedule = () => {

  const [viewId, setViewId] = React.useState(0)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [mode, setMode] = React.useState({isEditing: false, isCreating: false, isDeleting: false})
  const [updatedYear, setUpdatedYear] = React.useState({})
  const [isAbleToSave, setIsAbleToSave] = React.useState(true)

  const {currentWeek, currentTerm, currentYear} = getWeekNumber()

  const variables = {
    calendarYear: currentYear, 
    term: currentTerm
  }

  const { loading: queryLoading, error: queryError, data} = useQuery(GET_YEARS, {variables})
  const [createScheduleYear,
      { loading: creationLoading, error: creatingError }] = useMutation(CREATE_YEAR, {
          update(cache, { data: {createScheduleYear} }) {
            const { years } = cache.readQuery({ query: GET_YEARS, variables })
            cache.writeQuery({
              query: GET_YEARS,
              variables,
              data: { years:  [createScheduleYear, ...years]}
            })
          }
        })
  const [updateScheduleYear,
      { loading: updatingLoading, error: updatingError }] = useMutation(UPDATE_YEAR)
  const [deleteScheduleYear,
      { loading: deletingLoading, error: deletingError }] = useMutation(DELETE_YEAR, {
        update(cache, { data: { deleteScheduleYear } }) {
          const { years } = cache.readQuery({ query: GET_YEARS, variables})
          cache.writeQuery({
            query: GET_YEARS,
            variables,
            data: { years: years.filter(el => el.id !== deleteScheduleYear)}
          })
        }
      })

  if (queryLoading) return <Spinner />
  if (queryError) return <NetworkErrorComponent error={queryError} />
  if (updatingError) return <NetworkErrorComponent error={updatingError} />
  if (deletingError) return <NetworkErrorComponent error={deletingError} />
  if (creatingError) return <NetworkErrorComponent error={creatingError} />


  const { years } = data

  const isCurrentWeakEven = currentWeek % 2
  const bgColor = isCurrentWeakEven === 0 ? '#FAF1D6' : '#D9F1F1'

  const onChangeviewId = (e) => {
    setViewId(e.target.value)
  }

  const onAddNewYear = () => {
    setIsModalOpen(true)
    setMode({...mode, isCreating: true})
    document.body.style.overflow = "hidden"
  }

  const onEditConference = (id) => {
    setIsModalOpen(true)
    setMode({...mode, isEditing: true})
    document.body.style.overflow = "hidden"
    setUpdatedYear(years[id])
  }
  const ondeleteScheduleYear = (id) => {
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
    setMode({...mode, isDeleting: true})
    setUpdatedYear(years[id])
    //setUpdatedYear(blogposts[id])
  }

  const onDeleteScheduleYearHandler = async () => {
    await deleteScheduleYear({ variables: {id: updatedYear.id}})
    setIsModalOpen(false)
    setMode({...mode, isDeleting: false})
    document.body.style.overflow = "scroll"
    setUpdatedYear({})
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
    setMode({isDeleting: false, isEditing: false, isCreating: false})
    setUpdatedYear({})
    document.body.style.overflow = "scroll"
  }

  const onChangeYearHandler = async (e, postData, valid) => {
    e.preventDefault()
    if (!valid) {
      setIsAbleToSave(false)
    }
    else {
      let postObject = postData.reduce((obj, item) => {
          obj[item.title] = item.value
          return obj
      } ,{})
      if (mode.isEditing) {
        await updateScheduleYear({ variables: {id: updatedYear.id, ...postObject}})
        setIsModalOpen(false)
        setMode({...mode, isEditing: false})
        document.body.style.overflow = "scroll"
        setUpdatedYear({})
      }
      if (mode.isCreating) {
        await createScheduleYear({ variables: {...postObject}})
        setIsModalOpen(false)
        setMode({...mode, isCreating: false})
        document.body.style.overflow = "scroll"
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
        { (mode.isEditing || mode.isCreating) && <Edit 
            onClickSubmit={onChangeYearHandler}
            onClickCancel={onCloseModal}
            isAbleToSave={isAbleToSave}
            post={updatedYear}
            formTemplate={FORM_TEMPLATE}
          />}
          {
            (mode.isDeleting) &&  <YesDelete onDelete={onDeleteScheduleYearHandler} />   
          }
        </Modal>}
        <div className="row">
          <div className="col-md-10">
            <select className="form-control bg-light" id="yearSelect" onChange={onChangeviewId}>
              {
                years.map((year, index) => <option key={year.id} value={index}>{year.title}</option>)
              }
              </select>
          </div>
          <div className="col-md-2">
          <h5 className="p-1 text-center" style={{backgroundColor:bgColor}}>Неделя #{currentWeek}</h5>
          </div>
        </div>      
      </div>
      <ScheduleByYear yearId={years[viewId].id} currentWeek={currentWeek} />
      <ButtonAddNew
        color='red'
        onClickAddButton={onAddNewYear}
        fixed
        size='4'
       />
    </div>
  )
}

export default ErrorBoundry(Schedule)
