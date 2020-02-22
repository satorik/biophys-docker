import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { required, length, date } from './utils/validators'
import { useLocation, useHistory } from 'react-router-dom'

import YesDelete from './components/Shared/DoYouWantToDelete'
import ButtonAddNew from './components/UI/ButtonAddNew'
import Modal from './components/UI/Modal'
import Edit from './components/Shared/Edit'
import Spinner from './components/UI/Spinner'
import ErrorBoundry from './components/Shared/ErrorHandling/ErrorBoundry'
import getUpdateData from './utils/getObjectForUpdate'
import HeaderSeminar from './components/UI/Header/HeaderSeminar'
import SeminarCard from './components/Seminar/SeminarCard'
import SeminarDetails from './components/Seminar/SeminarDetails'
import NetworkErrorComponent from './components/Shared/ErrorHandling/NetworkErrorComponent'


const SEMINARS_PER_PAGE = 6

const GET_SEMINAR = gql`                    
    query getSeminars($limit: Int, $offset: Int){
      seminars(limit: $limit, offset: $offset) {
        id
        title
        content
        description
        date
        speaker
        onCampus
        location
    }
  }
  `
const CREATE_SEMINAR = gql`
  mutation createSeminar($inputData: SeminarCreateData!) {
    createSeminar(inputData: $inputData) {
      id
      title
      content
      description
      date
      speaker
      onCampus
      location
    }
  }
`

const DELETE_SEMINAR = gql`
  mutation deleteSeminar($id: ID!) {
    deleteSeminar(id: $id) 
  }
`
const UPDATE_SEMINAR = gql`
  mutation updateSeminar($id: ID!, $inputData: SeminarUpdateData!) {
    updateSeminar(id: $id, inputData: $inputData) {
      id
      title
      content
      description
      date
      speaker
      onCampus
      location
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
    title: 'date',
    label:'Время проведения',
    type:'datetime',
    validators: [date]
  },
  {
    title: 'location',
    label:'Место проведения',
    type:'input',
    validators: [required]
  },
  {
    title: 'onCampus',
    label:'Кафедральный',
    type:'check'
  },
] 

function useQueryUrl() {
  return new URLSearchParams(useLocation().search)
}

const Seminar = () => {

  const queryUrl = useQueryUrl()
  const urlId = queryUrl.get("id")
  const history = useHistory()
  const [viewId, setViewId] = React.useState(0)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [mode, setMode] = React.useState({isEditing: false, isCreating: false, isDeleting: false})
  const [updatedSeminar, setUpdatedSeminar] = React.useState({})
  const [isAbleToSave, setIsAbleToSave] = React.useState(true)

  const variables = {
    offset:0, 
    limit: SEMINARS_PER_PAGE
  }

  const { loading: queryLodading, error: queryError, data} = useQuery(
        GET_SEMINAR, {variables})
  const [createSeminar,
        { loading: creatingLoading, error: creatingError }] = useMutation(CREATE_SEMINAR, {
            update(cache, { data: {createSeminar} }) {
              const { seminars } = cache.readQuery({ query: GET_SEMINAR, variables })
              cache.writeQuery({
                query: GET_SEMINAR,
                variables,
                data: { seminars:  [createSeminar, ...seminars]}
              })
            }
          })
  const [updateSeminar,
        { loading: updatingLoading, error: updatingError }] = useMutation(UPDATE_SEMINAR)
  const [deleteSeminar,
        { loading: deletingLoading, error: deletingError }] = useMutation(DELETE_SEMINAR, {
          update(cache, { data: { deleteSeminar } }) {
            const { seminars } = cache.readQuery({ query: GET_SEMINAR, variables})
            cache.writeQuery({
              query: GET_SEMINAR,
              variables,
              data: { seminars: seminars.filter(el => el.id !== deleteSeminar)}
            })
          }
        })
  
  React.useEffect(() => {
    console.log(urlId)
    if (data && urlId) {
      setViewId(data.seminars.indexOf(data.seminars.find(el => el.id === urlId)))
    }
  }, [data, urlId])

  if (queryLodading) return <Spinner />
  if (queryError) return <NetworkErrorComponent error={queryError} />
  if (updatingError) return <NetworkErrorComponent error={updatingError} />
  if (deletingError) return <NetworkErrorComponent error={deletingError} />
  if (creatingError) return <NetworkErrorComponent error={creatingError} />

  const { seminars } = data

  const onShowSeminarDetails = (i) => {
   history.push({
    search: '?id='+seminars[i].id
   })
  }

  const onAddNewSeminar = () => {
    setIsModalOpen(true)
    setMode({...mode, isCreating: true})
    document.body.style.overflow = "hidden"
  }

  const onEditSeminar = (id) => {
    setIsModalOpen(true)
    setMode({...mode, isEditing: true})
    document.body.style.overflow = "hidden"
    setUpdatedSeminar(seminars[id])
  }

  const onDeleteSeminar = (id) => {
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
    setMode({...mode, isDeleting: true})
    setUpdatedSeminar(seminars[id])
    //setUpdatedSeminar(blogposts[id])
  }

  const onDeleteSeminarHandler = async () => {
    await deleteSeminar({ variables: {id: updatedSeminar.id}})
    setIsModalOpen(false)
    setMode({...mode, isDeleting: false})
    document.body.style.overflow = "scroll"
    setUpdatedSeminar({})
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
    setMode({isDeleting: false, isEditing: false, isCreating: false})
    setUpdatedSeminar({})
    document.body.style.overflow = "scroll"
  }

  const onChangeSeminarHandler = async (e, postData, valid, id) => {
    e.preventDefault()
    if (!valid) {
      setIsAbleToSave(false)
    }
    else {
      let postObject = postData.reduce((obj, item) => {
          obj[item.title] = item.value
          if(item.type === 'datetime') {
            const fullDate = new Date(item.value.year, item.value.month, item.value.day, item.value.hours, item.value.minutes)
            obj[item.title] = fullDate.toISOString()
          }
          return obj
      } ,{})
      setIsModalOpen(false)
      setMode({...mode, isEditing: false})
      setMode({...mode, isCreating: false})
      if (mode.isEditing) {
        const forUpdate = getUpdateData(updatedSeminar, postObject)
        await updateSeminar({ variables: {id: updatedSeminar.id, inputData: forUpdate}})
        setIsModalOpen(false)
        setMode({...mode, isEditing: false})
        document.body.style.overflow = "scroll"
        setUpdatedSeminar({})
      }
      if (mode.isCreating) {
        await createSeminar({ variables: {inputData: postObject}})
        setIsModalOpen(false)
        setMode({...mode, isCreating: false})
        document.body.style.overflow = "scroll"
      }
    } 
  }

  let modalTitle = ''
  if (mode.isEditing) {modalTitle = 'Редактирование семинара'}
  if (mode.isCreating) {modalTitle = 'Новый семинар'}
  if (mode.isDeleting) {modalTitle = 'Удаление семинара'}

  
  return (
    <>
    <HeaderSeminar />

    {isModalOpen && <Modal 
      isOpen={isModalOpen}
      title={modalTitle}
      onClose={onCloseModal}
    >
     { (mode.isEditing || mode.isCreating) && <Edit 
        onClickSubmit={onChangeSeminarHandler}
        onClickCancel={onCloseModal}
        isAbleToSave={isAbleToSave}
        post={updatedSeminar}
        formTemplate={FORM_TEMPLATE}
      />}
      {
        (mode.isDeleting) &&  <YesDelete onDelete={onDeleteSeminarHandler} />   
      }
    </Modal>}

      <div className="container mt-5">
        <div className="row">
          <div className="col-4 p-0 flex-column" style={{borderRight: '3px solid #dc3545'}}>
            {seminars.map((seminar, idx) => <SeminarCard 
                key={idx}
                date={seminar.date}
                speaker={seminar.speaker}
                active={viewId == idx}
                last={idx === (seminars.length-1)}
                onSelectSeminar={()=>onShowSeminarDetails(idx)}
                onClickEdit={() => onEditSeminar(idx)}
                onClickDelete={() => onDeleteSeminar(idx)}
            />
            )}
          </div>
          <SeminarDetails 
            title={seminars[viewId].title}
            location={seminars[viewId].location}
            content={seminars[viewId].content}
          />
        </div>
      </div>
      <ButtonAddNew
        color='red'
        onClickAddButton={onAddNewSeminar}
        fixed
        size='4'
       />
    </>
  )
}

export default ErrorBoundry(Seminar)
