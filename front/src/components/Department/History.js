import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { required, length } from '../../utils/validators'

import { updateAfterCreate, updateAfterDelete } from '../../utils/updateCache/history'
import * as queries from '../../utils/queries/history'

import YesDelete from '../Shared/DoYouWantToDelete'
import ButtonAddNew from '../UI/ButtonAddNew'
import Modal from '../UI/Modal'
import Edit from '../Shared/Edit'
import Spinner from '../UI/Spinner'
import EditButtons from '../UI/EditButtons'
import getUpdateData from '../../utils/getObjectForUpdate'
import ErrorBoundry from '../Shared/ErrorHandling/ErrorBoundry'
import NetworkErrorComponent from '../Shared/ErrorHandling/NetworkErrorComponent'
import {EmptyData} from '../Shared/EmptyData'


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
  const [isError, setIsError] = React.useState(null)

  const { loading: queryLodading, error: queryError, data } = useQuery(queries.GET_DEPARTMENT_HISTORY)
  const [createHistory,{ loading: creationLoading }] = useMutation(queries.CREATE_HISTORY, {
    update: (cache, res) => updateAfterCreate(cache, res, queries.GET_DEPARTMENT_HISTORY)})
  const [updateHistory, { loading: updatingLoading }] = useMutation(queries.UPDATE_HISTORY)
  const [deleteHistory, { loading: deletingLoading }] = useMutation(queries.DELETE_HISTORY, {
    update: (cache) => updateAfterDelete(cache, queries.GET_DEPARTMENT_HISTORY)})
 
  if (queryLodading || creationLoading || updatingLoading || deletingLoading) return <Spinner />
 
  if (queryError) return <NetworkErrorComponent error={queryError} type='queryError' />
  if (isError) return <NetworkErrorComponent error={isError} onDismiss={() => setIsError(null)} />

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
    try {
      await deleteHistory()
      setIsModalOpen(false)
      setMode({...mode, isDeleting: false})
      document.body.style.overflow = "scroll"
    } catch(error) {
      setIsError(error)
    }
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
        try {
          await updateHistory({ variables: {inputData: forUpdate}})
          setMode({...mode, isEditing: false})
        } catch(error) {
          setIsError(error)
        }
      }
      if (mode.isCreating) {
        try {
          await createHistory({ variables: {inputData: postObject}})
          setMode({...mode, isCreating: false})
        } catch(error) {
          setIsError(error)
        }
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
        {(mode.isCreating) && <div className="container card mt-5 p-2"><Edit 
          onClickSubmit={onChangeHistoryHandler}
          onClickCancel={onCloseModal}
          isAbleToSave={isAbleToSave}
          formTemplate={FORM_TEMPLATE}
          post={{}}
        /></div>}
        {history && <div className="container card mt-5 p-2">
          <div className="mt-3">
          {(mode.isEditing ) && <Edit 
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
        </div>}
      }
      {!history && !mode.isCreating && <>
        <EmptyData instance='history' />
        <ButtonAddNew
            color='red'
            onClickAddButton={onAddHistory}
            fixed
            size='4'
        />
        </>
      }
    </>
  )
}

export default ErrorBoundry(History)
