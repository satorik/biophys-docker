import React from 'react'
import { useQuery, useMutation} from '@apollo/client'
import { required, length, datetime } from './utils/validators'
import { useLocation, useHistory } from 'react-router-dom'
import { getUpdateData } from './utils/postDataHandlers'

import { updateAfterCreate, updateAfterDelete } from './utils/updateCache/seminar'
import * as queries from './utils/queries/seminar'

import YesDelete from './components/Shared/DoYouWantToDelete'
import ButtonAddNew from './components/UI/ButtonAddNew'
import Modal from './components/UI/Modal'
import Edit from './components/Shared/Edit'
import Spinner from './components/UI/Spinner'
import ErrorBoundry from './components/Shared/ErrorHandling/ErrorBoundry'
import SeminarCard from './components/Seminar/SeminarCard'
import SeminarDetails from './components/Seminar/SeminarDetails'
import NetworkErrorComponent from './components/Shared/ErrorHandling/NetworkErrorComponent'
import {EmptyData} from './components/Shared/EmptyData'


const SEMINARS_PER_PAGE = 6

const FORM_TEMPLATE = [
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
    title: 'speaker',
    label:'Лектор',
    type:'input',
    required: true,
    validators: [required, length({ min: 5 })]
  },
  {
    title: 'date',
    label:'Время проведения',
    type:'datetime',
    required: true,
    validators: [required, datetime]
  },
  {
    title: 'location',
    label:'Место проведения',
    type:'input',
    required: true,
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
  const [isError, setIsError] = React.useState(null)

  const variables = {
    offset:0, 
    limit: SEMINARS_PER_PAGE
  }

  const { loading: queryLodading, error: queryError, data} = useQuery(queries.GET_SEMINAR, {variables})
  const [createSeminar, { loading: creatingLoading }] = useMutation(queries.CREATE_SEMINAR, {
    update: (cache, res) => updateAfterCreate(cache, res, queries.GET_SEMINAR, variables)})

  const [updateSeminar, { loading: updatingLoading }] = useMutation(queries.UPDATE_SEMINAR)
  const [deleteSeminar, { loading: deletingLoading }] = useMutation(queries.DELETE_SEMINAR, {
    update: (cache, res) => updateAfterDelete(cache, res, queries.GET_SEMINAR, variables)})
  
  React.useEffect(() => {
    if (data && urlId) {
      const selectedSeminar = data.seminars.indexOf(data.seminars.find(el => el.id === urlId))
      if (selectedSeminar && selectedSeminar !== -1) setViewId(selectedSeminar)
      else setViewId(0)

      if (data.seminars.length === 0) history.push({search: ''})
    }
  }, [data, urlId])

  if (queryLodading || creatingLoading || updatingLoading || deletingLoading) return <Spinner />
 
  if (queryError) return <NetworkErrorComponent error={queryError} type='queryError' />
  if (isError) return <NetworkErrorComponent error={isError} onDismiss={() => setIsError(null)} />

  const { seminars } = data

  const onShowSeminarDetails = (i) => {
   history.push({search: '?id='+seminars[i].id})
  }

  const onClearMode = (operation, full = false) => {
    setIsModalOpen(false)
    document.body.style.overflow = "scroll"
    setUpdatedSeminar({})

    if (full) setMode({isDeleting: false, isEditing: false, isCreating: false})
    else setMode({...mode, [operation]: false})
  }

  const onSetMode = (operation) => {
    setIsModalOpen(true)
    setMode({...mode, [operation]: true})
    document.body.style.overflow = "hidden"
  }

  const onAddNewSeminar = () => {
    onSetMode('isCreating')
  }

  const onEditSeminar = (id) => {
    onSetMode('isEditing')
    setUpdatedSeminar(seminars[id])
  }

  const onDeleteSeminar = (id) => {
    onSetMode('isDeleting')
    setUpdatedSeminar(seminars[id])
  }

  const onDeleteSeminarHandler = async () => {
    try {
      await deleteSeminar({ variables: {id: updatedSeminar.id}})
      onClearMode('isDeleting')
    } catch(error) {
      setIsError(error)
    }
  }

  const onCloseModal = () => {
    onClearMode('_', true)
  }

  const onChangeSeminarHandler = async (postObject) => {
    if (mode.isEditing) {
      const forUpdate = getUpdateData(updatedSeminar, postObject)
      try {
        await updateSeminar({ variables: {id: updatedSeminar.id, inputData: forUpdate}})
        onClearMode('isEditing')
      } catch(error) {
        setIsError(error)
      }
    }
    if (mode.isCreating) {
      try {
        const createdSeminar = await createSeminar({ variables: {inputData: postObject}})
        history.push({search: '?id='+createdSeminar.data.createSeminar.id})
        onClearMode('isCreating')
      } catch(error) {
        setIsError(error)
      }
    }  
  }

  let modalTitle = ''
  if (mode.isEditing) {modalTitle = 'Редактирование семинара'}
  if (mode.isCreating) {modalTitle = 'Новый семинар'}
  if (mode.isDeleting) {modalTitle = 'Удаление семинара'}

  
  return (
    <>
    {isModalOpen && <Modal 
      isOpen={isModalOpen}
      title={modalTitle}
      onClose={onCloseModal}
    >
     { (mode.isEditing || mode.isCreating) && <Edit 
        onClickSubmit={onChangeSeminarHandler}
        onClickCancel={onCloseModal}
        post={updatedSeminar}
        formTemplate={FORM_TEMPLATE}
      />}
      {
        (mode.isDeleting) &&  <YesDelete onDelete={onDeleteSeminarHandler} onCancel={onCloseModal} info={updatedSeminar} instance='seminar' />   
      }
    </Modal>}

      {seminars.length > 0 && <div className="container mt-5">
        <div className="row">
          <div className="col-4 p-0 flex-column" style={{borderRight: '3px solid #dc3545'}}>
            {seminars.map((seminar, idx) => <SeminarCard 
                key={idx}
                date={seminar.date}
                speaker={seminar.speaker}
                active={viewId === idx}
                last={idx === (seminars.length-1)}
                onCampus={seminar.onCampus}
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
      </div>}
      {seminars.length === 0 && <EmptyData instance='seminar' />}
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
