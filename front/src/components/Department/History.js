import React from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import { required, length } from '../../utils/validators'

import YesDelete from '../Shared/DoYouWantToDelete'
import ButtonAddNew from '../UI/ButtonAddNew'
import Modal from '../UI/Modal'
import Edit from '../Shared/Edit'
import Spinner from '../UI/Spinner'
import EditButtons from '../UI/EditButtons'
import getUpdateData from '../../utils/getObjectForUpdate'
import ErrorBoundry from '../Shared/ErrorHandling/ErrorBoundry'
import NetworkErrorComponent from '../Shared/ErrorHandling/NetworkErrorComponent'

const GET_DEPARTMENT_HISTORY = gql`                    
    {
      history {
        id
        content
        imageUrl
      }
    }
  `
const CREATE_HISTORY = gql`
mutation createHistory($inputData: HistoryCreateData!) {
  createHistory(inputData: $inputData) {
    id
    content
    imageUrl
  }
}
`
const DELETE_HISTORY = gql`
mutation deleteHistory{
  deleteHistory
}
`
const UPDATE_HISTORY = gql`
mutation updateHistory($inputData: HistoryUpdateData!) {
  updateHistory(inputData: $inputData) {
      id
      content
      imageUrl
  }
}
`

const FORM_TEMPLATE = [
  {
    title: 'image',
    label:'Картинка',
    type: 'file',
    required: true,
    validators: [required]
  },
  {
    title: 'content',
    label:'Содержание',
    type:'textarea-long',
    required: true,
    validators: [required, length({ min: 50 })]
  }
] 

const History = () => {
  
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [mode, setMode] = React.useState({isEditing: false, isCreating: false, isDeleting: false})
  const [isAbleToSave, setIsAbleToSave] = React.useState(true)

  const { loading: queryLodading, error: queryError, data } = useQuery(GET_DEPARTMENT_HISTORY)
  const [createHistory,
    { loading: creationLoading, error: creatingError }] = useMutation(CREATE_HISTORY, {
        update(cache, { data: {createHistory} }) {
          cache.writeQuery({
            query: GET_DEPARTMENT_HISTORY,
            data: { history: createHistory}
          })
        }
      })
const [updateHistory,
    { loading: updatingLoading, error: updatingError }] = useMutation(UPDATE_HISTORY)
const [deleteHistory,
    { loading: deletingLoading, error: deletingError }] = useMutation(DELETE_HISTORY, {
      update(cache, { data: { deleteHistory } }) {
        cache.writeQuery({
          query: GET_DEPARTMENT_HISTORY,
          data: { }
        })
      }
    })

  if (queryLodading) return <Spinner />
 
  if (queryError) return <NetworkErrorComponent error={queryError} />
  if (updatingError) return <NetworkErrorComponent error={updatingError} />
  if (deletingError) return <NetworkErrorComponent error={deletingError} />
  if (creatingError) return <NetworkErrorComponent error={creatingError} />

  const {history} = data

  const onAddHistory = () => {
    setMode({...mode, isCreating: true})
  }

  const onEditHistoryHandler = () => {
    setMode({...mode, isEditing: true})
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
    setMode({isDeleting: false, isEditing: false, isCreating: false})
    document.body.style.overflow = "scroll"
  }

  const onDeleteHistory = () => {
    setIsModalOpen(true)
    setMode({...mode, isDeleting: true})
  }
  const onDeleteHistoryHandler = async () => {
    await deleteHistory()
    setIsModalOpen(false)
    setMode({...mode, isDeleting: false})
    document.body.style.overflow = "scroll"
  }

  const onChangeHistoryHandler = async (e, postData, valid) => {
    e.preventDefault()
    if (!valid) {
      setIsAbleToSave(false)
    }
    else {
      let postObject = postData
        .reduce((obj, item) => 
        { 
        obj[item.title] = item.value  
        return obj
        }, {})
      if (mode.isEditing) {
        let forUpdate = getUpdateData(history, postObject)
        await updateHistory({ variables: {inputData: forUpdate}})
        setMode({...mode, isEditing: false})
      }
      if (mode.isCreating) {
        await createHistory({ variables: {inputData: postObject}})
        setMode({...mode, isCreating: false})
      }
    } 
  }

  let modalTitle = ''
  if (mode.isDeleting) {modalTitle = 'Удаление истории'}

  return (
    <>
      {isModalOpen && <Modal 
        isOpen={isModalOpen}
        title={modalTitle}
        onClose={onCloseModal}
        >
        {
          (mode.isDeleting) &&  <YesDelete onDelete={onDeleteHistoryHandler} onCancel={onCloseModal} instance="history" />   
        }
      </Modal>}

        <div className="container card mt-5 p-2">
          <div className="mt-3">
          {!history && <h1 className="text-center p-2">История пуста...</h1>}
          {(mode.isEditing || mode.isCreating) && <Edit 
            onClickSubmit={onChangeHistoryHandler}
            onClickCancel={onCloseModal}
            isAbleToSave={isAbleToSave}
            post={history || {}}
            formTemplate={FORM_TEMPLATE}
          />}
          {(!mode.isEditing && !mode.isCreating && history) &&
            <>
            <EditButtons 
              onClickEdit={onEditHistoryHandler}
              onClickDelete={onDeleteHistory}
              size="sm"
              color="black"
              row
            />
          
            <img src={process.env.REACT_APP_STATIC_URI + history.imageUrl}
                className="rounded img-thumbnail w-50 mb-3 float-right" 
                style={{marginTop: '-60px', marginRight: '-60px', marginLeft:'5px'}}
            />
            <p className="p-2" dangerouslySetInnerHTML={{__html: history.content}}></p>
            </>
          }
          </div>
        </div>
      }
      {!history &&
        <ButtonAddNew
            color='red'
            onClickAddButton={onAddHistory}
            fixed
            size='4'
        />
      }
    </>
  )
}

export default ErrorBoundry(History)
