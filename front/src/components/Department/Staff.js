import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { required, length, email } from '../../utils/validators'
import { getUpdateData } from '../../utils/postDataHandlers'

import { updateAfterCreate, updateAfterDelete, updateAfterMove } from '../../utils/updateCache/staff'
import * as queries from '../../utils/queries/staff'

import FullPersonCard from './FullPersonCard'
import YesDelete from '../Shared/DoYouWantToDelete'
import ButtonAddNew from '../UI/ButtonAddNew'
import Modal from '../UI/Modal'
import Edit from '../Shared/Edit'
import Spinner from '../UI/Spinner'
import ErrorBoundry from '../Shared/ErrorHandling/ErrorBoundry'
import NetworkErrorComponent from '../Shared/ErrorHandling/NetworkErrorComponent'
import {EmptyData} from '../Shared/EmptyData'



const FORM_TEMPLATE = [
  {
    title: 'image',
    label:'Картинка',
    type: 'file',
    validators: [required]
  },
  {
    title: 'firstname',
    label:'Имя',
    type: 'input',
    required: true,
    validators: [required, length({ min: 2})]
  },
  {
    title: 'middlename',
    label:'Отчество',
    type: 'input',
    required: true,
    validators: [required, length({ min: 3})]
  },
  {
    title: 'lastname',
    label:'Фамилия',
    type: 'input',
    required: true,
    validators: [required, length({ min: 2})]
  },
  {
    title: 'jobTitle',
    label:'Должность',
    type: 'input',
    required: true,
    validators: [required, length({ min: 5 })]
  },
  {
    title: 'description',
    label:'Описание',
    type:'textarea',
    required: true,
    validators: [required, length({ min: 5, max: 250 })]
  },
  {
    title: 'tel',
    label:'Телефон',
    type:'input',
  },
  {
    title: 'mail',
    label:'Почта',
    type:'input',
    validators: [email]
  }
] 

const Staff = () => {

  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [mode, setMode] = React.useState({isEditing: false, isCreating: false, isDeleting: false})
  const [updatedPerson, setUpdatedPerson] = React.useState({})
  const [isError, setIsError] = React.useState(null)
  

  const { loading: queryLoading, error: queryError, data} = useQuery(queries.GET_DEPARTMENT_STAFF)
  const [createDepartmentPerson,{ loading: creationLoading }] = useMutation(queries.CREATE_DEPARTMENT_STAFF, {
    update: (cache, res) => updateAfterCreate(cache, res, queries.GET_DEPARTMENT_STAFF)})
  const [updateDepartmentPerson, { loading: updatingLoading }] = useMutation(queries.UPDATE_DEPARTMENT_STAFF)
  const [deleteDepartmentPerson, { loading: deletingLoading }] = useMutation(queries.DELETE_DEPARTMENT_STAFF, {
    update: (cache, res) => updateAfterDelete(cache, res, queries.GET_DEPARTMENT_STAFF)})
  const [movePersonPosition, { loading: updatingPersonPositionLoading }] = useMutation(queries.MOVE_PERSON, {
    update: (cache, res) => updateAfterMove(cache, res, queries.GET_DEPARTMENT_STAFF)})

  if (queryLoading || creationLoading || updatingLoading || deletingLoading || updatingPersonPositionLoading) return <Spinner />
  
  if (queryError) return <NetworkErrorComponent error={queryError} type='queryError' />
  if (isError) return <NetworkErrorComponent error={isError} onDismiss={() => setIsError(null)} />

  const {staff} = data
  
  const onClearMode = (operation, full = false) => {
    setIsModalOpen(false)
    document.body.style.overflow = "scroll"
    setUpdatedPerson({})

    if (full) setMode({isDeleting: false, isEditing: false, isCreating: false})
    else setMode({...mode, [operation]: false})
  }

  const onSetMode = (operation) => {
    setIsModalOpen(true)
    setMode({...mode, [operation]: true})
    document.body.style.overflow = "hidden"
  }

  const onAddNewDepartmentPerson = () => {
    onSetMode('isCreating')
  }

  const onEditDeaprtmentPerson = (id) => {
    onSetMode('isEditing')
    setUpdatedPerson(staff[id])
  }
  const ondeleteDepartmentPerson = (id) => {
    onSetMode('isDeleting')
    setUpdatedPerson(staff[id])
  }

  const ondeleteDepartmentPersonHandler = async () => {
    try {
      await deleteDepartmentPerson({ variables: {id: updatedPerson.id}})
      onClearMode('isDeleting')
    } catch(error) {
      setIsError(error)
    }
  }

  const onCloseModal = () => {
    onClearMode('_', true)
  }

  const onChangeDepartmentStaffHandler = async(postObject) => {
    if (mode.isEditing) {
      const forUpdate = getUpdateData(updatedPerson, postObject)
      try {
        await updateDepartmentPerson({ variables: {id: updatedPerson.id, inputData: forUpdate}})
        onClearMode('isEditing')
      } catch(error) {
        setIsError(error)
      }
    }
    if (mode.isCreating) {
      try {
        await createDepartmentPerson({ variables: {inputData: postObject}})
        onClearMode('isCreating')
      } catch(error) {
        setIsError(error)
      }
    } 
  }

  const onChangePosition = async (id, vector) => {
    await movePersonPosition({variables:{id, vector}})
  }

  let modalTitle = ''
  if (mode.isEditing) {modalTitle = 'Редактирование человека'}
  if (mode.isCreating) {modalTitle = 'Новый человек'}
  if (mode.isDeleting) {modalTitle = 'Удаление человека'}

  return (
    <>
    {isModalOpen && <Modal 
      isOpen={isModalOpen}
      title={modalTitle}
      onClose={onCloseModal}
    >
     { (mode.isEditing || mode.isCreating) && <Edit 
        onClickSubmit={onChangeDepartmentStaffHandler}
        onClickCancel={onCloseModal}
        post={updatedPerson}
        formTemplate={FORM_TEMPLATE}
      />}
      {
        (mode.isDeleting) &&  <YesDelete onDelete={ondeleteDepartmentPersonHandler} onCancel={onCloseModal} info={updatedPerson} instance='staff' />   
      }
    </Modal>}
    {staff.length > 0 && <div className="container d-flex mt-5 flex-wrap align-items-top">
      {staff.map((person, idx) => 
        <FullPersonCard 
            key={person.id}
            firstname={person.firstname}
            middlename={person.middlename}
            lastname={person.lastname}
            imageUrl={person.imageUrl}
            jobTitle={person.jobTitle}
            desc={person.description}
            tel={person.tel}
            mail={person.mail}
            onEditClick={() => onEditDeaprtmentPerson(idx)}
            onDeleteClick={() => ondeleteDepartmentPerson(idx)}
            onClickUp={() => onChangePosition(person.id, 'UP')}
            onClickDown={() => onChangePosition(person.id, 'DOWN')}
            firstElement = {idx === 0}
            lastElement = {idx === staff.length-1}
        />)}
    </div>}
    {staff.length === 0 && <EmptyData instance='staff' />}
    <ButtonAddNew
        color='red'
        onClickAddButton={onAddNewDepartmentPerson}
        fixed
        size='4'
    />
    </>
  )
}

export default ErrorBoundry(Staff)
