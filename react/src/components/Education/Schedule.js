import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { required, length, time, date } from '../../utils/validators'
import { getIsDouble } from '../../utils/checkDoubleLecture'

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
import {EducationButtons} from '../UI/EducationButtons'

const DAYS = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]


const GET_YEARS = gql`
  query getScheduleYears($year: Int, $term: Int) {
    years(year: $year, term: $term){
      id
      title
      timetable {
        id
        dayId
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
  }
`

const CREATE_YEAR = gql`
  mutation createScheduleYear($inputData: ScheduleYearCreateData!) {
    createScheduleYear(inputData: $inputData) {
      id
      title
      timetable{
        id
        dayId
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
      timetable {
        id
        dayId
        timeFrom
        timeTo
        lector
        discipline
        lectureHall
        startDate
        isEven
        isDouble
      }
      double {
        id
        isDouble
      }
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
    deleteScheduleTimetable(id: $id) {
      id
      double {
        id
        isDouble
      }
    }
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
    label: 'Время от',
    type: 'time',
    validators: [time]
  },
  {
    title: 'timeTo',
    label: 'Время до',
    type: 'time',
    validators: [time]
  },
  {
    title: 'discipline',
    label: 'Дисциплина',
    type: 'input',
    required: true,
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
    label:[{title:'Каждую неделю', value: '0'}, {title:'По четным', value: '2'}, {title:'По нечетным', value: '1'}],
    type: 'radio',
    validators: []
  }
]

const Schedule = () => {

  const [viewId, setViewId] = React.useState(0)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [mode, setMode] = React.useState({isEditing: false, isCreating: false, isDeleting: false})
  const [timeMode, setTimeMode] = React.useState({isEditing: false, isCreating: false, isDeleting: false})
  const [doubleFound, setDoubleFound] = React.useState(false)
  const [updatedDay, setUpdatedDay] = React.useState('')
  const [updatedTime, setUpdatedTime] = React.useState({})
  const [updatedYear, setUpdatedYear] = React.useState({})
  const [isAbleToSave, setIsAbleToSave] = React.useState(true)

  const {currentWeek, currentTerm, currentYear} = getWeekNumber()


  const variables = {
    year: currentYear, 
    term: currentTerm
  }


//////////// if no shedule and no term  (show if there is a schedule)

  const { loading: queryLoading, error: queryError, data} = useQuery(GET_YEARS, {variables})
  const [createScheduleYear,
      { loading: creationLoading, error: creatingError }] = useMutation(CREATE_YEAR, {
           update(cache, { data: {createScheduleYear} }) {
            const { years } = cache.readQuery({ query: GET_YEARS, variables })
            cache.writeQuery({
              query: GET_YEARS,
              variables,
              data: {...data,  years:  [...years, createScheduleYear]}
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
            data: { ...data, years: years.filter(el => el.id !== deleteScheduleYear)}
          })
        }
      })
  const [createScheduleTimetable,
    { loading: createTimeTableLoading, error: createTimeTableError }] = useMutation(CREATE_TIMETABLE, {
      update(cache, { data: {createScheduleTimetable} }) {
        const { years } = cache.readQuery({ query: GET_YEARS, variables })
        let timetable = years[viewId].timetable.slice()
        console.log(timetable)
        if (createScheduleTimetable.double ) {
          timetable = timetable.map(el => {
            if (createScheduleTimetable.double.id === el.id) {
              return {
                ...el,
                isDouble: createScheduleTimetable.double.isDouble
              }
            }
            return el
          })
        }
        console.log(timetable)
        cache.writeQuery({
          query: GET_YEARS,
          variables,
          data: { ...data, years: years.map((year, idx) => {
            if (idx === viewId) {
              return {
                ...year,
                timetable: [...timetable, createScheduleTimetable.timetable]
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
        console.log(deleteScheduleTimetable)
        cache.writeQuery({
          query: GET_YEARS,
          variables,
          data: { ...data, years: years.map((year, idx) => {
            if (idx === viewId) {
              return {
                ...year,
                timetable: year.timetable.filter(el => el.id !== deleteScheduleTimetable.id)
                   .map(el => {
                     if (deleteScheduleTimetable.double && deleteScheduleTimetable.double.id === el.id) {
                      return {
                        ...el,
                        isDouble: deleteScheduleTimetable.double.isDouble
                      }
                     }
                     return el
                   })
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
 
  
  const { years } = data

  let isTimetable = false
  let timetableByDay = {}
  let scheduleWithActions = {}
    
  if (data.years.length !== 0 ) {
    isTimetable = years[viewId].timetable.length > 0
    if (isTimetable) {
      DAYS.forEach((day, idx) => {
        timetableByDay = {
          ...timetableByDay,
          [day]: years[viewId].timetable.filter(elem => elem.dayId === idx) 
        }
      })
    }
    else {
      timetableByDay = DAYS.reduce((acc, elem) => {
        acc[elem] =  []
        return acc
      }, {})
    }

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

 const onDeleteScheduleYear = (id) => {
  setIsModalOpen(true)
  document.body.style.overflow = "hidden"
  setMode({...mode, isDeleting: true})
  setUpdatedYear(years[id])
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
    setTimeMode({...mode, isDeleting: false})
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
    clearMode()
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
          if ( item.value.hours === '') {obj[item.title] = null}
          if ( item.value.minutes === '') {obj[item.title] = item.value.hours+':00'}
          else {obj[item.title] = item.value.hours+':'+item.value.minutes} 
        }
        if(item.type === 'date') {
          if (item.value.day !== '')
          {
            const fullDate = new Date(item.value.year, item.value.month, item.value.day)
            obj[item.title] = fullDate.toISOString()
          }
          else obj[item.title] = null
        }
        if (item.title === 'isEven'){
          obj[item.title] = +item.value
        }
        return obj
      } ,{})     
      if (timeMode.isEditing) {
        const double = getIsDouble(postObject, timetableByDay[DAYS[updatedTime.dayId]], updatedTime.id)
        const forUpdate = getUpdateData(updatedTime, {...postObject, isDouble: +double.isDouble})
        if (double.isOneEven && double.isOneDouble) {
          await updateScheduleTimetable({ variables: {id: updatedTime.id, inputData: forUpdate}})
          if (forUpdate.isDouble !== undefined) {
            const newDouble = forUpdate.isDouble === 0 ? 0 : +updatedTime.id
            await updateScheduleTimetable({ variables: {id: updatedTime.isDouble, inputData: {isDouble: newDouble}}})
          }
          setTimeMode({...timeMode, isEditing: false})
          setIsModalOpen(false)
          setUpdatedTime({})
          document.body.style.overflow = "scroll"
        }
        else {
          if (!double.isOneDouble) {console.log('Третий дубль')}
          if (!double.isOneEven) {console.log('Две по четным или две по нечетным')}
          setDoubleFound(true)
          setIsAbleToSave(false)
        }
      }
      if (timeMode.isCreating) {
        const double = getIsDouble(postObject, timetableByDay[updatedDay])
        if (double.isOneDouble && double.isOneEven) {
          await createScheduleTimetable({ variables: {
            yearId: years[viewId].id, dayId: DAYS.indexOf(updatedDay), inputData: {...postObject, isDouble: +double.isDouble}
          }})
         setTimeMode({...timeMode, isCreating: false})
         setUpdatedDay('')
        }
        else {
          if (!double.isOneDouble) {console.log('Третий дубль')}
          if (!double.isOneEven) {console.log('Две по четным или две по нечетным')}
          setDoubleFound(true)
          setIsAbleToSave(false)
        }
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
        await createScheduleYear({ variables: {inputData: {
          title: postObject.course.course,
          year: +postObject.course.year,
          term: +postObject.course.term
        }}})
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
  if (timeMode.isEditing) {modalTitle = 'Редактирование лекции'}
  if (timeMode.isDeleting) {modalTitle = 'Удаление лекции'}
  if (doubleFound){modalTitle = 'Одновременные лекции'}

 
  return (
    <>
    {isModalOpen && <Modal 
        isOpen={isModalOpen}
        title={modalTitle}
        onClose={onCloseModal}
        >
          {(mode.isCreating || mode.isEditing) && <Edit 
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
    {(data.years.length !== 0 ) &&
    <div className="container mt-5">
      <div className="container mb-3">
        <div className="row">
          <div className="col-md-10 d-flex flex-wrap">
              {
                years.map((year, idx) =>  <EducationButtons 
                  title={year.title} 
                  key={year.id} 
                  onClick={()=>onChangeviewId(idx)} 
                  onDelete={() => onDeleteScheduleYear(idx)}
                  last = {idx === years.length-1}
                  selected = {idx === viewId}
                  /> )
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
    </div>
    }
    {(data.years.length === 0 ) &&
      <div className="container card mt-5 p-2">
        <p className="h5 text-center">Расписания на текущий семестр пока нет</p>
      </div>
    }
    <ButtonAddNew
      color='red'
      onClickAddButton={onAddNewYear}
      fixed
      size='4'
      />
    </>
  )
}

export default ErrorBoundry(Schedule)
