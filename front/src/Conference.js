import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { required, length, date } from './utils/validators'
import { useLocation, useHistory } from 'react-router-dom'
import { getUpdateData } from './utils/postDataHandlers'

import { updateAfterCreate, updateAfterDelete } from './utils/updateCache/conference'
import * as queries from './utils/queries/conference'

import YesDelete from './components/Shared/DoYouWantToDelete'
import ButtonAddNew from './components/UI/ButtonAddNew'
import Modal from './components/UI/Modal'
import Edit from './components/Shared/Edit'
import Spinner from './components/UI/Spinner'
import ErrorBoundry from './components/Shared/ErrorHandling/ErrorBoundry'
import ConferenceCard from './components/Conference/ConferenceCard'
import ConferenceDetails from './components/Conference/ConferenceDetails'
import NetworkErrorComponent from './components/Shared/ErrorHandling/NetworkErrorComponent'
import {EmptyData} from './components/Shared/EmptyData'

const CONFERENCES_PER_PAGE = 6


const FORM_TEMPLATE = [
  {
    title: 'image',
    label:'Картинка',
    type: 'file',
    required: true,
    validators: [required]
  },
  {
    title: 'title',
    label:'Название',
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
    title: 'content',
    label:'Содержание',
    type:'textarea-long',
    required: true,
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
    required: true,
    validators: [required, length({ min: 5 })]
  }
] 

function useQueryUrl() {
  return new URLSearchParams(useLocation().search)
}

const Conferece = () => {

  const queryUrl = useQueryUrl()
  const urlId = queryUrl.get("id")
  const history = useHistory()
  const [viewId, setViewId] = React.useState(0)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [mode, setMode] = React.useState({isEditing: false, isCreating: false, isDeleting: false})
  const [updatedConference, setUpdatedConference] = React.useState({})
  const [isError, setIsError] = React.useState(null)
  
  const variables = {
    offset:0, 
    limit: CONFERENCES_PER_PAGE
  }

  const { loading: queryLoading, error: queryError, data} = useQuery(queries.GET_CONFERENCE, {variables})
  const [createConference, { loading: creationLoading }] = useMutation(queries.CREATE_CONFERENCE, {
    update: (cache, res) => updateAfterCreate(cache, res, queries.GET_CONFERENCE, variables)})
  const [updateConference, { loading: updatingLoading }] = useMutation(queries.UPDATE_CONFERENCE)
  const [deleteConference, { loading: deletingLoading }] = useMutation(queries.DELETE_CONFERENCE, {
    update: (cache, res) => updateAfterDelete(cache, res, queries.GET_CONFERENCE, variables)})

  React.useEffect(() => {
    if (data && urlId) {
      const selectedConf = data.conferences.indexOf(data.conferences.find(el => el.id === urlId))
      if (selectedConf && selectedConf !== -1) setViewId(selectedConf)
      else setViewId(0)

      if (data.conferences.length === 0) history.push({search: ''})
    }
  }, [data, urlId])
  
  if (queryLoading || creationLoading || updatingLoading || deletingLoading) return <Spinner />

  if (queryError) return <NetworkErrorComponent error={queryError} type='queryError' />
  if (isError) return <NetworkErrorComponent error={isError} onDismiss={() => setIsError(null)} />

  const { conferences } = data

  const onClearMode = (operation, full = false) => {
    setIsModalOpen(false)
    document.body.style.overflow = "scroll"
    setUpdatedConference({})

    if (full) setMode({isDeleting: false, isEditing: false, isCreating: false})
    else setMode({...mode, [operation]: false})
  }

  const onSetMode = (operation) => {
    setIsModalOpen(true)
    setMode({...mode, [operation]: true})
    document.body.style.overflow = "hidden"
  }

  const onShowConferenceDetails = (i) => {
    history.push({search: '?id='+conferences[i].id})
  }

  const onAddNewConference = () => {
    onSetMode('isCreating')
  }

  const onEditConference = (id) => {
    onSetMode('isEditing')
    setUpdatedConference(conferences[id])
  }

  const onDeleteConference = (id) => {
    onSetMode('isDeleting')
    setUpdatedConference(conferences[id])
  }

  const onDeleteConferenceHandler = async () => {
    try {
      await deleteConference({ variables: {id: updatedConference.id}})
      onClearMode('isDeleting')
    } catch(error) {
      setIsError(error)
    }
  }

  const onCloseModal = () => {
    onClearMode('_', true)
  }

  const onChangeConferenceHandler = async (postObject) => {
    if (mode.isEditing) {
      const forUpdate = getUpdateData(updatedConference, postObject)
      try {
        await updateConference({ variables: {id: updatedConference.id, inputData: forUpdate}})
        onClearMode('isEditing')
      } catch(error) {
        setIsError(error)
      }
    }
    if (mode.isCreating) {
      try {
        const createdConference = await createConference({ variables: {inputData: postObject}})
        history.push({search: '?id='+createdConference.data.createConference.id})
        onClearMode('isCreating')
      } catch(error) {
        setIsError(error)
      }
    }
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
        onClickSubmit={onChangeConferenceHandler}
        onClickCancel={onCloseModal}
        post={updatedConference}
        formTemplate={FORM_TEMPLATE}
      />}
      {
        (mode.isDeleting) &&  <YesDelete onDelete={onDeleteConferenceHandler} onCancel={onCloseModal} info={updatedConference} instance='conference' />   
      }
    </Modal>}
      {conferences.length > 0 && <div className="container mt-5">
        <div className="row">
          <div className="col-4 p-0 flex-column" style={{borderRight: '3px solid #17a2b8'}}>
              {conferences.map((conference, idx) => 
                <ConferenceCard 
                  key={idx}
                  dateFrom={conference.dateFrom}
                  dateTo={conference.dateTo}
                  active={viewId == idx}
                  last={idx === (conferences.length-1)}
                  onSelectConference={()=>onShowConferenceDetails(idx)}
                  onClickEdit={() => onEditConference(idx)}
                  onClickDelete={() => onDeleteConference(idx)}
                />
              )}
          </div>
          <ConferenceDetails 
            title={conferences[viewId].title}
            location={conferences[viewId].location}
            imageUrl={conferences[viewId].imageUrl}
            content={conferences[viewId].content}
          />
        </div>
      </div>}
      {(conferences.length === 0 ) &&
        <EmptyData instance='conference' />
      }
      <ButtonAddNew
        color='red'
        onClickAddButton={onAddNewConference}
        fixed
        size='4'
       />
    </>
  )
}

export default ErrorBoundry(Conferece)
