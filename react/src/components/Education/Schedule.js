import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { required, length, time, date } from '../../utils/validators'

import ScheduleDay from './ScheduleDay'
import getWeekNumber from '../../utils/getWeekNumber'
import YesDelete from '../Shared/DoYouWantToDelete'
import ButtonAddNew from '../UI/ButtonAddNew'
import Modal from '../UI/Modal'
import Edit from '../Shared/Edit'
import Spinner from '../UI/Spinner'
import getUpdateData from '../../utils/getObjectForUpdate'
import ErrorBoundry from '../Shared/ErrorHandling/ErrorBoundry'
import NetworkErrorComponent from '../Shared/ErrorHandling/NetworkErrorComponent'

const GET_YEARS = gql`
  query getScheduleYears($calendarYear: Int, $term: Int) {
    years(calendarYear: $calendarYear, term: $term){
      id
      title
      timetable {
        id
        day {
          title
        }
        timeFrom
        timeTo
        lector
        discipline
        lectureHall
        startDate
        isEven
        isDouble
      }
    }

    days
  }
`

const CREATE_YEAR = gql`
  mutation createScheduleYear($inputData: ScheduleYearCreateData!) {
    createScheduleYear(inputData: $inputData) {
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
  mutation updateScheduleYear($id: ID!, $inputData: ScheduleYearUpdateData!) {
    updateScheduleYear(id: $id, inputData: $inputData) {
        id
        title
    }
  }
`

const CREATE_TIMETABLE = gql`
  mutation createScheduleTimetable($yearId: ID!, $dayId: ID!, $inputData: ScheduleTimetableCreateData!) {
    createScheduleTimetable(yearId: $yearId, dayId: $dayId, inputData: $inputData) {
      id
      day {
          title
      }
      timeFrom
      timeTo
      lector
      discipline
      lectureHall
      startDate
      isEven
      isDouble
    }
  }
`

const UPDATE_TIMETABLE = gql`
  mutation updateScheduleTimetable($id: ID!, $inputData: ScheduleTimetableUpdateData!) {
    updateScheduleTimetable(id: $id, inputData: $inputData) {
      id
      timeFrom
      timeTo
      lector
      discipline
      lectureHall
      startDate
      isEven
      isDouble
    }
  }
`

const DELETE_TIMETABLE = gql`
  mutation deleteScheduleTimetable($id: ID!) {
    deleteScheduleTimetable(id: $id) 
  }
`

const FORM_TEMPLATE = [
  {
    title: 'course',
    label:'Курс',
    type: 'course',
    validators: [required, length({ min: 5 })]
  }
]

const DAY_TEMPLATE = [
  {
    title: 'timeFrom',
    label: 'С',
    type: 'time',
    validators: [time]
  },
  {
    title: 'timeTo',
    label: 'По',
    type: 'time',
    validators: [time]
  },
  {
    title: 'discipline',
    label: 'Дисциплина',
    type: 'input',
    validators: [required, length({ min: 5 })]
  },
  {
    title: 'lector',
    label: 'Лектор',
    type: 'input',
    validators: [length({ min: 5 })]
  },
  {
    title: 'startDate',
    label: 'Дата начала',
    type: 'date',
    validators: [date]
  },
  {
    title: 'isEven',
    label:[{title:'Каждую неделю', value: '0'}, {title:'По четным', value: '1'}, {title:'По нечетным', value: '2'}],
    type: 'radio',
    validators: []
  }
]

const Schedule = () => {

  const [viewId, setViewId] = React.useState(0)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [mode, setMode] = React.useState({isEditing: false, isCreating: false, isDeleting: false})
  const [timeMode, setTimeMode] = React.useState({isEditing: false, isCreating: false, isDeleting: false})
  const [updatedDay, setUpdatedDay] = React.useState('')
  const [updatedTime, setUpdatedTime] = React.useState({})
  const [updatedYear, setUpdatedYear] = React.useState({})
  const [isAbleToSave, setIsAbleToSave] = React.useState(true)

  const {currentWeek, currentTerm, currentYear} = getWeekNumber()


  // const variables = {
  //   year: currentYear, 
  //   term: currentTerm
  // }
  const variables = {
    year: currentYear, 
    term: 1
  }


//////////// if no shedule and no term  

  const { loading: queryLoading, error: queryError, data} = useQuery(GET_YEARS, {variables})
  const [createScheduleYear,
      { loading: creationLoading, error: creatingError }] = useMutation(CREATE_YEAR, {
          update(cache, { data: {createScheduleYear} }) {
            const { years } = cache.readQuery({ query: GET_YEARS, variables })
            cache.writeQuery({
              query: GET_YEARS,
              variables,
              data: {...data,  years:  [createScheduleYear, ...years]}
            })
            setViewId(data.years.length-1)
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
            data: { ...data, years: years.filter(el => el.id !== deleteScheduleYear)}
          })
        }
      })
  const [createScheduleTimetable,
    { loading: createTimeTableLoading, error: createTimeTableError }] = useMutation(CREATE_TIMETABLE, {
      update(cache, { data: {createScheduleTimetable} }) {
        const { years } = cache.readQuery({ query: GET_YEARS, variables })
        cache.writeQuery({
          query: GET_YEARS,
          variables,
          data: { ...data, years: years.map((year, idx) => {
            if (idx === viewId) {
              return {
                ...year,
                timetable: [...year.timetable, createScheduleTimetable]
              }
            }
            return year
          })}
        })
      }
    })

  const [updateScheduleTimetable,
    { loading: updateTimeTableLoading, error: updateTimeTableError }] = useMutation(UPDATE_TIMETABLE)

  const [deleteScheduleTimetable,
    { loading: deleteTimeTableLoading, error: deleteTimeTableError }] = useMutation(DELETE_TIMETABLE, {
      update(cache, { data: { deleteScheduleTimetable } }) {
        const { years } = cache.readQuery({ query: GET_YEARS, variables})
        cache.writeQuery({
          query: GET_YEARS,
          variables,
          data: { ...data, years: years.map((year, idx) => {
            if (idx === viewId) {
              return {
                ...year,
                timetable: year.timetable.filter(el => el.id !== deleteScheduleTimetable)
              }
            }
            return year
          })}
        })
      }
    })

  if (queryLoading) return <Spinner />
  if (queryError) return <NetworkErrorComponent error={queryError} />
  if (updatingError) return <NetworkErrorComponent error={updatingError} />
  if (deletingError) return <NetworkErrorComponent error={deletingError} />
  if (creatingError) return <NetworkErrorComponent error={creatingError} />


  const { years, days } = data

  const isTimetable = years[viewId].timetable.length > 0
  let timetableByDay = {}
  if (isTimetable) {
     timetableByDay = years[viewId].timetable.reduce((acc, elem) => {
      acc[elem.day.title] = (acc[elem.day.title] || []).concat(elem)
      return acc
    }, {})
  }
  else {
    timetableByDay = days.reduce((acc, elem) => {
      acc[elem] =  []
      return acc
    }, {})
  }

  let scheduleWithActions = {}
  for (let key in timetableByDay) {
    scheduleWithActions = {
      ...scheduleWithActions,
      [key]: timetableByDay[key].map(item => {
        return {
          ...item,
          onEdit:() => onEditScheduleTime(item.id),
          onDelete:() => onDeleteScheduleTime(item.id),
          onCancel:() => onCancelEditing(), 
        }
      })
    }
  }

  const isCurrentWeakEven = currentWeek % 2
  const bgColor = isCurrentWeakEven === 0 ? '#FAF1D6' : '#D9F1F1'

  const clearMode = () => {
    setTimeMode({isDeleting: false, isEditing: false, isCreating: false})
    setUpdatedTime({})
    setUpdatedDay('')
  }

  const onChangeviewId = (id) => {
    setViewId(id)
    clearMode()
  }

  const onEditScheduleTime = (id) => {
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
    setTimeMode({...timeMode, isEditing: true})
    setUpdatedTime(years[viewId].timetable.find(x => x.id === id))
  }

 const onDeleteScheduleTime = (id) => {
   setIsModalOpen(true)
   document.body.style.overflow = "hidden"
   setTimeMode({...timeMode, isDeleting: true})
   setUpdatedTime(years[viewId].timetable.find(x => x.id === id))
 }

 const onCancelEditing = () => {
    clearMode()
 }

 const onAddNewTime = (day) => {
   setTimeMode({...timeMode, isCreating: true})
   setUpdatedDay(day)
 }

  const onAddNewYear = () => {
    setIsModalOpen(true)
    setMode({...mode, isCreating: true})
    document.body.style.overflow = "hidden"
  }

  const onDeleteScheduleTimeHandler = async () => {
    await deleteScheduleTimetable({ variables: {id: updatedTime.id}})
    setIsModalOpen(false)
    setMode({...mode, isDeleting: false})
    document.body.style.overflow = "scroll"
    setUpdatedTime({})
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

  const onChangeTimeHandler = async (e, postData, valid) => {
    e.preventDefault()
    if (!valid) {
      setIsAbleToSave(false)
    }
    else {
      let postObject = postData.reduce((obj, item) => {
        obj[item.title] = item.value
        if(item.type === 'time') {
          obj[item.title] = item.value.hours+':'+item.value.minutes
        }
        if(item.type === 'date') {
          if (item.value.day !== '')
          {
            const fullDate = new Date(Date.UTC(item.value.year, item.value.month, item.value.day))
            obj[item.title] = fullDate.toISOString()
          }
          else obj[item.title] = null
        }
        return obj
      } ,{})     
      if (timeMode.isEditing) {
        const forUpdate = getUpdateData(updatedTime, postObject)
        await updateScheduleTimetable({ variables: {id: updatedTime.id, inputData: forUpdate}})
        setMode({...timeMode, isEditing: false})
        setIsModalOpen(false)
        document.body.style.overflow = "scroll"
      }
      if (timeMode.isCreating) {
       //console.log(postObject) 
       await createScheduleTimetable({ variables: {yearId: viewId+1, dayId: days.indexOf(updatedDay)+1, inputData: postObject}})
       setMode({...timeMode, isCreating: false})
       setUpdatedDay('')
      }
    }
  }


  const onChangeYearHandler = async (e, postData, valid) => {
    e.preventDefault()
    if (!valid) {
      setIsAbleToSave(false)
    }
    else {
      const postObject = postData.reduce((obj, item) => {
          obj[item.title] = item.value
          return obj
      } ,{})
      if (mode.isEditing) {
        await updateScheduleYear({ variables: {id: updatedYear.id, inputData: postObject}})
        setIsModalOpen(false)
        setMode({...mode, isEditing: false})
        document.body.style.overflow = "scroll"
        setUpdatedYear({})
      }
      if (mode.isCreating) {
        const postDataWithYear = {
          ...postObject,
          year: currentYear,
          term: currentTerm
        }
        await createScheduleYear({ variables: {inputData: postDataWithYear}})
        setIsModalOpen(false)
        setMode({...mode, isCreating: false})
        document.body.style.overflow = "scroll"
      }
    } 
  }

  let modalTitle = ''
  if (mode.isEditing) {modalTitle = 'Редактирование расписания'}
  if (mode.isCreating) {modalTitle = 'Новое расписание'}
  if (mode.isDeleting) {modalTitle = 'Удаление расписания'}

 
  return (
    <div className="container mt-5">
      <div className="container mb-3">
      {isModalOpen && <Modal 
        isOpen={isModalOpen}
        title={modalTitle}
        onClose={onCloseModal}
        >
          {(mode.isCreating && mode.isEditing) && <Edit 
            onClickSubmit={onChangeYearHandler}
            onClickCancel={onCloseModal}
            isAbleToSave={isAbleToSave}
            post={updatedYear}
            formTemplate={FORM_TEMPLATE}
         />}
          {(timeMode.isEditing) && <Edit 
            onClickSubmit={onChangeTimeHandler}
            onClickCancel={onCloseModal}
            isAbleToSave={isAbleToSave}
            post={updatedTime}
            formTemplate={DAY_TEMPLATE}
         />}
          {(mode.isDeleting) &&  <YesDelete onDelete={onDeleteScheduleYearHandler} /> }
          {(timeMode.isDeleting) &&  <YesDelete onDelete={onDeleteScheduleTimeHandler} /> }
        </Modal>}
        <div className="row">
          <div className="col-md-10">
              {
                years.map((year, idx) => {
                  let className = 'btn-outline-primary'
                  if (idx === viewId ) className = 'btn-primary'
                  return <button type="button" className={`btn ${className} mx-1`} key={year.id} onClick={()=>onChangeviewId(idx)}>{year.title}</button>
                })
              }
          </div>
          <div className="col-md-2">
          <h5 className="p-1 text-center" style={{backgroundColor:bgColor}}>Неделя #{currentWeek}</h5>
          </div>
        </div>      
      </div>
      <div className="text-center">
          {Object.keys(timetableByDay).map( key =>
            <ScheduleDay 
              key = {key}
              dayTitle = {key}
              currentWeek = {currentWeek}
              scheduleDay = {scheduleWithActions[key]}
              timeMode = {timeMode}
              onCreate = {() => onAddNewTime(key)}
              onCancel = {onCancelEditing}
              onSave = {onChangeTimeHandler}
              isAbleToSave={isAbleToSave}
              isDayUpdating = {key === updatedDay}
              updatedTime = {updatedTime}
              dayTemplate = {DAY_TEMPLATE}
            />
          )}
      </div>
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
