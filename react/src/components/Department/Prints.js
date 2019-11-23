import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { required, length, isUrl } from '../../utils/validators'

import YesDelete from '../Shared/DoYouWantToDelete'
import ButtonAddNew from '../UI/ButtonAddNew'
import Modal from '../UI/Modal'
import Edit from '../Shared/Edit'
import Spinner from '../UI/Spinner'
import ErrorBoundry from '../Shared/ErrorHandling/ErrorBoundry'
import getUpdateData from '../../utils/getObjectForUpdate'
import NetworkErrorComponent from '../Shared/ErrorHandling/NetworkErrorComponent'
import LinkCard from '../Shared/LinkCard'

const GET_DEPARTMENT_PRINTS = gql`                    
    query getDepartmentPrints {
      prints{
        id
        link
        imageUrl
        description  
        title
    }
  }
  ` 
const CREATE_CONFERENCE = gql`
mutation createConference($inputData: ConferenceCreateData!) {
  createConference(inputData: $inputData) {
    id
    title
    content
    description
    imageUrl
    dateFrom
    dateTo
    location
  }
}
`

const DELETE_CONFERENCE = gql`
mutation deleteConference($id: ID!) {
  deleteConference(id: $id) 
}
`
const UPDATE_CONFERENCE = gql`
mutation updateConference($id: ID!, $inputData: ConferenceUpdateData!) {
  updateConference(id: $id, inputData: $inputData) {
      id
      title
      content
      description
      imageUrl
      dateFrom
      dateTo
      location
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
  title: 'title',
  label:'Название',
  type: 'input',
  validators: [required, length({ min: 5 })]
},
{
  title: 'description',
  label:'Описание',
  type:'textarea',
  validators: [required, length({ min: 5, max: 250 })]
},
{
  title: 'content',
  label:'Содержание',
  type:'textarea-long',
  validators: [required, length({ min: 50 })]
},
{
  title: 'dateFrom',
  label:'Дата старта',
  type:'date',
  validators: [date]
},
{
  title: 'dateTo',
  label:'Дата Конца',
  type:'date',
  validators: [date]
},
{
  title: 'location',
  label:'Место проведения',
  type:'input',
  validators: [required, length({ min: 5 })]
}
] 


const Prints = () => {

  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [mode, setMode] = React.useState({isEditing: false, isCreating: false, isDeleting: false})
  const [updatedConference, setUpdatedConference] = React.useState({})
  const [isAbleToSave, setIsAbleToSave] = React.useState(true)

const { loading: queryLoading, error: queryError, data} = useQuery(
        GET_CONFERENCE, {variables})
  const [createConference,
        { loading: creationLoading, error: creatingError }] = useMutation(CREATE_CONFERENCE, {
            update(cache, { data: {createConference} }) {
              const { conferences } = cache.readQuery({ query: GET_CONFERENCE, variables })
              cache.writeQuery({
                query: GET_CONFERENCE,
                variables,
                data: { conferences:  [createConference, ...conferences]}
              })
            }
          })
  const [updateConference,
        { loading: updatingLoading, error: updatingError }] = useMutation(UPDATE_CONFERENCE)
  const [deleteConference,
        { loading: deletingLoading, error: deletingError }] = useMutation(DELETE_CONFERENCE, {
          update(cache, { data: { deleteConference } }) {
            const { conferences } = cache.readQuery({ query: GET_CONFERENCE, variables})
            cache.writeQuery({
              query: GET_CONFERENCE,
              variables,
              data: { conferences: conferences.filter(el => el.id !== deleteConference)}
            })
          }
        })
  
  if (queryLoading) return <Spinner />
  if (queryError) return <NetworkErrorComponent error={queryError} />
  if (updatingError) return <NetworkErrorComponent error={updatingError} />
  if (deletingError) return <NetworkErrorComponent error={deletingError} />
  if (creatingError) return <NetworkErrorComponent error={creatingError} />

  const { conferences } = data

  const onShowConferenceDetails = (i) => {
    setViewId(i)
  }

  const onAddNewConference = () => {
    setIsModalOpen(true)
    setMode({...mode, isCreating: true})
    document.body.style.overflow = "hidden"
  }

  const onEditConference = (id) => {
    setIsModalOpen(true)
    setMode({...mode, isEditing: true})
    document.body.style.overflow = "hidden"
    setUpdatedConference(conferences[id])
  }
  const onDeleteConference = (id) => {
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
    setMode({...mode, isDeleting: true})
    setUpdatedConference(conferences[id])
    //setUpdatedConference(blogposts[id])
  }

  const onDeleteConferenceHandler = async () => {
    await deleteConference({ variables: {id: updatedConference.id}})
    setIsModalOpen(false)
    setMode({...mode, isDeleting: false})
    document.body.style.overflow = "scroll"
    setUpdatedConference({})
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
    setMode({isDeleting: false, isEditing: false, isCreating: false})
    setUpdatedConference({})
    document.body.style.overflow = "scroll"
  }

  const onChangeConferenceHandler = async (e, postData, valid) => {
    e.preventDefault()
    if (!valid) {
      setIsAbleToSave(false)
    }
    else {
      let postObject = postData.reduce((obj, item) => {
          obj[item.title] = item.value
          if(item.type === 'date') {
            const fullDate = new Date(Date.UTC(item.value.year, item.value.month, item.value.day))
            obj[item.title] = fullDate.toISOString()
          }
          return obj
      } ,{})
      setIsModalOpen(false)
      setMode({...mode, isEditing: false})
      setMode({...mode, isCreating: false})
      if (mode.isEditing) {
        const forUpdate = getUpdateData(updatedConference, postObject)
        await updateConference({ variables: {id: updatedConference.id, inputData: forUpdate}})
        setIsModalOpen(false)
        setMode({...mode, isEditing: false})
        document.body.style.overflow = "scroll"
        setUpdatedConference({})
      }
      if (mode.isCreating) {
        await createConference({ variables: {inputData: postObject}})
        setIsModalOpen(false)
        setMode({...mode, isCreating: false})
        document.body.style.overflow = "scroll"
      }
    } 
  }

  let modalTitle = ''
  if (mode.isEditing) {modalTitle = 'Редактирование конференции'}
  if (mode.isCreating) {modalTitle = 'Новая конференция'}
  if (mode.isDeleting) {modalTitle = 'Удаление конференции'}


  const {prints} = data
  return (
    <>
    {isModalOpen && <Modal 
      isOpen={isModalOpen}
      title={modalTitle}
      onClose={onCloseModal}
    >
     { (mode.isEditing || mode.isCreating) && <Edit 
        onClickSubmit={onChangeConferenceHandler}
        onClickCancel={onCloseModal}
        isAbleToSave={isAbleToSave}
        post={updatedConference}
        formTemplate={FORM_TEMPLATE}
      />}
      {
        (mode.isDeleting) &&  <YesDelete onDelete={onDeleteConferenceHandler} />   
      }
      </Modal>}
    <div className="container d-flex flex-wrap mt-5 justify-content-between">
      {prints.map(print => 
        <LinkCard 
          key={print.id}
          link={print.link}
          imageUrl={print.imageUrl}
          title={print.title}
          desc={print.description}
          onEditClick={() => onEditDeaprtmentPerson(idx)}
          onDeleteClick={() => ondeleteDepartmentPerson(idx)}
          firstElement = {idx === 0}
          lastElement = {idx === staff.length-1}
        />)
      }
    </div>
    <ButtonAddNew
        color='red'
        onClickAddButton={onAddNewConference}
        fixed
        size='4'
       />
    </>
  )
}

export default Prints
