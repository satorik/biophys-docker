import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { required, length, email } from '../../utils/validators'

import FullPersonCard from './FullPersonCard'
import YesDelete from '../Shared/DoYouWantToDelete'
import ButtonAddNew from '../UI/ButtonAddNew'
import Modal from '../UI/Modal'
import Edit from '../Shared/Edit'
import Spinner from '../UI/Spinner'
import ErrorBoundry from '../Shared/ErrorHandling/ErrorBoundry'
import getUpdateData from '../../utils/getObjectForUpdate'
import NetworkErrorComponent from '../Shared/ErrorHandling/NetworkErrorComponent'

const GET_DEPARTMENT_STAFF = gql`                    
    query getDepartmentStaff {
      staff{
        id
        firstname
        middlename
        lastname
        jobTitle
        imageUrl
        description
        position
        tel
        mail      
    }
  }
  `
const CREATE_DEPARTMENT_STAFF = gql`
mutation createDepartmentPerson($inputData: DepartmentStaffCreateData!) {
  createDepartmentPerson(inputData: $inputData) {
    id
    firstname
    middlename
    lastname
    jobTitle
    imageUrl
    description
    position
    tel
    mail
  }
}
`

const DELETE_DEPARTMENT_STAFF = gql`
mutation deleteDepartmentPerson($id: ID!) {
  deleteDepartmentPerson(id: $id) 
}
`
const UPDATE_DEPARTMENT_STAFF = gql`
mutation updateDepartmentPerson($id: ID!, $inputData: DepartmentStaffUpdateData!) {
  updateDepartmentPerson(id: $id, inputData: $inputData) {
    id
    firstname
    middlename
    lastname
    jobTitle
    imageUrl
    description
    position
    tel
    mail
  }
}
`
const MOVE_PERSON = gql`
mutation movePersonPosition($id: ID!, $vector: VECTOR!){
  moveDepartmentPerson(id: $id, vector:$vector){
    id
    position
  } 
}
`

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
  const [isAbleToSave, setIsAbleToSave] = React.useState(true)
  

const { loading: queryLoading, error: queryError, data} = useQuery(GET_DEPARTMENT_STAFF)
  const [createDepartmentPerson,
        { loading: creationLoading, error: creatingError }] = useMutation(CREATE_DEPARTMENT_STAFF, {
            update(cache, { data: {createDepartmentPerson} }) {
              const { staff } = cache.readQuery({ query: GET_DEPARTMENT_STAFF })
              cache.writeQuery({
                query: GET_DEPARTMENT_STAFF,
                data: { staff:  [...staff, createDepartmentPerson]}
              })
            }
          })
  const [updateDepartmentPerson,
        { loading: updatingLoading, error: updatingError }] = useMutation(UPDATE_DEPARTMENT_STAFF)
  const [deleteDepartmentPerson,
        { loading: deletingLoading, error: deletingError }] = useMutation(DELETE_DEPARTMENT_STAFF, {
          update(cache, { data: { deleteDepartmentPerson } }) {
            const { staff } = cache.readQuery({ query: GET_DEPARTMENT_STAFF})
            const newStaff = staff.filter(person => person.position !== deleteDepartmentPerson)
                .map(person => {
                  if (person.position > deleteDepartmentPerson)
                    return {...person, position: person.position - 1}
                  if (person.position < deleteDepartmentPerson){
                    return person
                  }
                })
                .sort((a, b) => a.position - b.position)
            cache.writeQuery({
              query: GET_DEPARTMENT_STAFF,
              data: { staff: newStaff}
            })
          }
        })
  const [movePersonPosition,
    { loading: updatingPersonPositionLoading, error: updatingPersonPositionError }] = useMutation(MOVE_PERSON, {
      update(cache, { data: { moveDepartmentPerson } }) {
        const { staff } = cache.readQuery({ query: GET_DEPARTMENT_STAFF })
        const newStaff = staff.map(person => {
          const foundPerson = moveDepartmentPerson.find(newPos => newPos.id === person.id)
            if (foundPerson) {
              return {...person, position: foundPerson.position}
            }
            return person
        }).sort((a, b) => a.position - b.position)
        cache.writeQuery({
          query: GET_DEPARTMENT_STAFF,
          data: {staff: newStaff}
        })
      }
    })
  
  if (queryLoading) return <Spinner />
  if (queryError) return <NetworkErrorComponent error={queryError} />
  if (updatingError) return <NetworkErrorComponent error={updatingError} />
  if (deletingError) return <NetworkErrorComponent error={deletingError} />
  if (creatingError) return <NetworkErrorComponent error={creatingError} />
  if (updatingPersonPositionError) return <NetworkErrorComponent error={updatingPersonPositionError} />

  const {staff} = data
  
  const onAddNewDepartmentPerson = () => {
    setIsModalOpen(true)
    setMode({...mode, isCreating: true})
    document.body.style.overflow = "hidden"
  }

  const onEditDeaprtmentPerson = (id) => {
    setIsModalOpen(true)
    setMode({...mode, isEditing: true})
    document.body.style.overflow = "hidden"
    setUpdatedPerson(staff[id])
  }
  const ondeleteDepartmentPerson = (id) => {
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
    setMode({...mode, isDeleting: true})
    setUpdatedPerson(staff[id])
    //setUpdatedPerson(blogposts[id])
  }

  const ondeleteDepartmentPersonHandler = async () => {
    await deleteDepartmentPerson({ variables: {id: updatedPerson.id}})
    setIsModalOpen(false)
    setMode({...mode, isDeleting: false})
    document.body.style.overflow = "scroll"
    setUpdatedPerson({})
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
    setMode({isDeleting: false, isEditing: false, isCreating: false})
    setUpdatedPerson({})
    document.body.style.overflow = "scroll"
  }

  const onChangeDepartmentStaffHandler = async (e, postData, valid) => {
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
        const forUpdate = getUpdateData(updatedPerson, postObject)
        await updateDepartmentPerson({ variables: {id: updatedPerson.id, inputData: forUpdate}})
        setIsModalOpen(false)
        setMode({...mode, isEditing: false})
        document.body.style.overflow = "scroll"
        setUpdatedPerson({})
      }
      if (mode.isCreating) {
        await createDepartmentPerson({ variables: {inputData: postObject}})
        setIsModalOpen(false)
        setMode({...mode, isCreating: false})
        document.body.style.overflow = "scroll"
      }
    } 
  }

  const onChangePosition = async (id, vector) => {
    await movePersonPosition({variables:{id, vector}})
  }

  let modalTitle = ''
  if (mode.isEditing) {modalTitle = 'Редактирование конференции'}
  if (mode.isCreating) {modalTitle = 'Новая конференция'}
  if (mode.isDeleting) {modalTitle = 'Удаление конференции'}

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
        isAbleToSave={isAbleToSave}
        post={updatedPerson}
        formTemplate={FORM_TEMPLATE}
      />}
      {
        (mode.isDeleting) &&  <YesDelete onDelete={ondeleteDepartmentPersonHandler} />   
      }
    </Modal>}
    <div className="container d-flex mt-5 flex-wrap align-items-top">
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
    </div>
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
