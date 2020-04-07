import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { required, length, time, date } from '../../utils/validators'
import { getIsDouble } from '../../utils/checkDoubleLecture'
import { getUpdateData } from '../../utils/postDataHandlers'

import { updateAfterCreate, updateAfterDelete, updateAfterCreateTime, updateAfterDeleteTime } from '../../utils/updateCache/schedule'
import * as queries from '../../utils/queries/schedule'

import ScheduleDay from './ScheduleDay'
import getWeekNumber from '../../utils/getWeekNumber'
import YesDelete from '../Shared/DoYouWantToDelete'
import ButtonAddNew from '../UI/ButtonAddNew'
import Modal from '../UI/Modal'
import Edit from '../Shared/Edit'
import Spinner from '../UI/Spinner'
import ErrorBoundry from '../Shared/ErrorHandling/ErrorBoundry'
import NetworkErrorComponent from '../Shared/ErrorHandling/NetworkErrorComponent'
import {EducationButtons} from '../UI/EducationButtons'
import {EmptyData} from '../Shared/EmptyData'

const DAYS = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]

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
    title: 'lectureHall',
    label: 'Аудитория',
    type: 'input',
    validators: []
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
  const [isError, setIsError] = React.useState(null)

  const {currentWeek, currentTerm, currentYear} = getWeekNumber()


  const variables = {
    year: currentYear, 
    term: currentTerm
  }

  const { loading: queryLoading, error: queryError, data} = useQuery(queries.GET_YEARS, {variables})
  const [createScheduleYear, { loading: creationLoading }] = useMutation(queries.CREATE_YEAR, {
    update: (cache, res) => updateAfterCreate(cache, res, queries.GET_YEARS, variables)})
  const [updateScheduleYear, { loading: updatingLoading }] = useMutation(queries.UPDATE_YEAR)
  const [deleteScheduleYear, { loading: deletingLoading }] = useMutation(queries.DELETE_YEAR, {
    update: (cache, res) => updateAfterDelete(cache, res, queries.GET_YEARS, variables)})
  const [createScheduleTimetable, { loading: createTimeTableLoading }] = useMutation(queries.CREATE_TIMETABLE, {
    update: (cache, res) => updateAfterCreateTime(cache, res, queries.GET_YEARS, variables, viewId)})
  const [updateScheduleTimetable, { loading: updateTimeTableLoading }] = useMutation(queries.UPDATE_TIMETABLE)
  const [deleteScheduleTimetable, { loading: deleteTimeTableLoading }] = useMutation(queries.DELETE_TIMETABLE, {
    update: (cache, res) => updateAfterDeleteTime(cache, res, queries.GET_YEARS, variables, viewId)})

  if (queryLoading || creationLoading || updatingLoading || deletingLoading || 
    createTimeTableLoading || updateTimeTableLoading || deleteTimeTableLoading) return <Spinner />
  if (queryError) return <NetworkErrorComponent error={queryError} type='queryError' />
  if (isError) return <NetworkErrorComponent error={isError} onDismiss={() => setIsError(null)} />
 
  
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

  const clearTimeMode = (operation, full = false) => {
    setIsModalOpen(false)
    document.body.style.overflow = "scroll"
    setUpdatedTime({})
    setUpdatedDay('')

    if (full) setTimeMode({isDeleting: false, isEditing: false, isCreating: false})
    else setTimeMode({...mode, [operation]: false})
  }

  const clearMode = (operation, full = false) => {
    setIsModalOpen(false)
    document.body.style.overflow = "scroll"
    setUpdatedYear({})

    if (full) setMode({isDeleting: false, isEditing: false, isCreating: false})
    else setMode({...mode, [operation]: false})
  }

  const onSetMode = (operation, instance) => {
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
    if (instance === 'time') setTimeMode({...mode, [operation]: true})
    else setMode({...mode, [operation]: true})
  }
  
  const onChangeviewId = (id) => {
    setViewId(id)
    clearMode('_', true)
    clearTimeMode('_', true)
  }

  const onEditScheduleTime = (id) => {
    onSetMode('isEditing', 'time')
    setUpdatedTime(years[viewId].timetable.find(x => x.id === id))
  }

  const onDeleteScheduleTime = (id) => {
    onSetMode('isDeleting', 'time')
    setUpdatedTime(years[viewId].timetable.find(x => x.id === id))
  }

  const onDeleteScheduleYear = (id) => {
    onSetMode('isDeleting')
    setUpdatedYear(years[id])
  }

 const onCancelEditing = () => {
    clearMode('_', true)
 }

  const onAddNewTime = (day) => {
    setTimeMode({...timeMode, isCreating: true})
    setUpdatedDay(day)
  }

  const onAddNewYear = () => {
    onSetMode('isCreating')
  }

  const onDeleteScheduleTimeHandler = async () => {
    try {
      await deleteScheduleTimetable({ variables: {id: updatedTime.id}})
      clearTimeMode('isDeleting')
    } catch(error) {
      setIsError(error)
    }
  }

  const onDeleteScheduleYearHandler = async () => {
    try {
      await deleteScheduleYear({ variables: {id: updatedYear.id}})
      clearMode('isDeleting')
    } catch(error) {
      setIsError(error)
    }
  }

  const onCloseModal = () => {
    clearTimeMode('_', true)
    clearMode('_', true)
  }

  const onChangeTimeHandler = async (postObject) => {   
    if (timeMode.isEditing) {
      const double = getIsDouble(postObject, timetableByDay[DAYS[updatedTime.dayId]], updatedTime.id)
      const forUpdate = getUpdateData(updatedTime, {...postObject, isDouble: +double.isDouble})
      if (double.isOneEven && double.isOneDouble) {
        try {
            await updateScheduleTimetable({ variables: {id: updatedTime.id, inputData: forUpdate}})
            if (forUpdate.isDouble !== undefined) {
              const newDouble = forUpdate.isDouble === 0 ? 0 : +updatedTime.id
              await updateScheduleTimetable({ variables: {id: updatedTime.isDouble, inputData: {isDouble: newDouble}}})
            }
            clearTimeMode('isEditing')
        } catch(error) {
            setIsError(error)
        }
      }
      else {
        if (!double.isOneDouble) {console.log('Третий дубль')}
        if (!double.isOneEven) {console.log('Две по четным или две по нечетным')}
        setDoubleFound(true)
      }
    }
    if (timeMode.isCreating) {
      const double = getIsDouble(postObject, timetableByDay[updatedDay])
      if (double.isOneDouble && double.isOneEven) {
        try {
            await createScheduleTimetable({ variables: {
              yearId: years[viewId].id, dayId: DAYS.indexOf(updatedDay), inputData: {...postObject, isDouble: +double.isDouble}
            }})
          setTimeMode({...timeMode, isCreating: false})
          setUpdatedDay('')
        } catch(error) {
            setIsError(error)
        }
      }
      else {
        if (!double.isOneDouble) {console.log('Третий дубль')}
        if (!double.isOneEven) {console.log('Две по четным или две по нечетным')}
        setDoubleFound(true)
      }
    }
  }


  const onChangeYearHandler = async (postObject) => {
    if (mode.isEditing) {
      try {
        await updateScheduleYear({ variables: {id: updatedYear.id, inputData: postObject}})
        clearMode('isEditing')
      } catch(error) {
          setIsError(error)
      }
    }
    if (mode.isCreating) {
      try {
        await createScheduleYear({ variables: {inputData: {
          title: postObject.course.course,
          year: +postObject.course.year,
          term: +postObject.course.term
        }}})
        clearMode('isCreating')
      } catch(error) {
          setIsError(error)
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
            post={updatedYear}
            formTemplate={FORM_TEMPLATE}
         />}
          {(timeMode.isEditing) && <Edit 
            onClickSubmit={onChangeTimeHandler}
            onClickCancel={onCloseModal}
            post={updatedTime}
            formTemplate={DAY_TEMPLATE}
         />}
          {(mode.isDeleting) &&  <YesDelete onDelete={onDeleteScheduleYearHandler} onCancel={onCloseModal} info={updatedYear} instance={'educationYear'} /> }
          {(timeMode.isDeleting) &&  <YesDelete onDelete={onDeleteScheduleTimeHandler} onCancel={onCloseModal} info={updatedTime} instance={'scheduleDay'} /> }
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
              isDayUpdating = {key === updatedDay}
              updatedTime = {updatedTime}
              dayTemplate = {DAY_TEMPLATE}
            />
          )}
      </div>
    </div>
    }
    {(data.years.length === 0 ) && <EmptyData instance='schedule' />}
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
