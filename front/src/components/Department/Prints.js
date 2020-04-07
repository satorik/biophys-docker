import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { required, length } from '../../utils/validators'
import { getUpdateData } from '../../utils/postDataHandlers'

import { updateAfterCreate, updateAfterDelete } from '../../utils/updateCache/prints'
import * as queries from '../../utils/queries/prints'

import YesDelete from '../Shared/DoYouWantToDelete'
import ButtonAddNew from '../UI/ButtonAddNew'
import Modal from '../UI/Modal'
import Edit from '../Shared/Edit'
import Spinner from '../UI/Spinner'
import ErrorBoundry from '../Shared/ErrorHandling/ErrorBoundry'
import NetworkErrorComponent from '../Shared/ErrorHandling/NetworkErrorComponent'
import {PrintCard} from './PrintCard'
import {EmptyData} from '../Shared/EmptyData'

const FORM_TEMPLATE = [
  {
    title: 'file',
    label:'Файл',
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
  }
] 

const Prints = () => {

  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [mode, setMode] = React.useState({isEditing: false, isCreating: false, isDeleting: false})
  const [updatedPrint, setUpdatedPrint] = React.useState({})
  const [isError, setIsError] = React.useState(null)

  const { loading: queryLoading, error: queryError, data} = useQuery(queries.GET_DEPARTMENT_PRINTS)
  const [createPrint,{ loading: creationLoading }] = useMutation(queries.CREATE_PRINT, {
    update: (cache, res) => updateAfterCreate(cache, res, queries.GET_DEPARTMENT_PRINTS)})
  const [updatePrint, { loading: updatingLoading }] = useMutation(queries.UPDATE_PRINT)
  const [deletePrint, { loading: deletingLoading }] = useMutation(queries.DELETE_PRINT, {
    update: (cache, res) => updateAfterDelete(cache, res, queries.GET_DEPARTMENT_PRINTS)})
  
  if (queryLoading || creationLoading || updatingLoading || deletingLoading) return <Spinner />
  if (queryError) return <NetworkErrorComponent error={queryError} type='queryError' />
  if (isError) return <NetworkErrorComponent error={isError} onDismiss={() => setIsError(null)} />

  const { prints } = data
  
  const onClearMode = (operation, full = false) => {
    setIsModalOpen(false)
    document.body.style.overflow = "scroll"
    setUpdatedPrint({})

    if (full) setMode({isDeleting: false, isEditing: false, isCreating: false})
    else setMode({...mode, [operation]: false})
  }

  const onSetMode = (operation) => {
    setIsModalOpen(true)
    setMode({...mode, [operation]: true})
    document.body.style.overflow = "hidden"
  }

  const onAddNewPrint = () => {
    onSetMode('isCreating')
  }

  const onEditPrint = (id) => {
    onSetMode('isEditing')
    setUpdatedPrint(prints[id])
  }
  const onDeletePrint = (id) => {
    onSetMode('isDeleting')
    setUpdatedPrint(prints[id])
  }

  const onDeletePrintHandler = async () => {
    try {
      await deletePrint({ variables: {id: updatedPrint.id}})
      onClearMode('isDeleting')
    } catch(error) {
      setIsError(error)
    }
  }

  const onCloseModal = () => {
    onClearMode('_', true)
  }

  const onChangePrintHandler = async (postObject) => { 
    if (mode.isEditing) {
      const forUpdate = getUpdateData(updatedPrint, postObject)
      try {
        await updatePrint({ variables: {id: updatedPrint.id, inputData: forUpdate}})
        onClearMode('isEditing')
      } catch(error) {
        setIsError(error)
      }
    }
    if (mode.isCreating) {
      try {
        await createPrint({ variables: {inputData: postObject}})
        onClearMode('isCreating')
      } catch(error) {
        setIsError(error)
      }
    } 
  }

  let modalTitle = ''
  if (mode.isEditing) {modalTitle = 'Редактирование печатной продукции'}
  if (mode.isCreating) {modalTitle = 'Новая печатная продукция'}
  if (mode.isDeleting) {modalTitle = 'Удаление печатной продукции'}

  return (
    <>
    {isModalOpen && <Modal 
      isOpen={isModalOpen}
      title={modalTitle}
      onClose={onCloseModal}
    >
     { (mode.isEditing || mode.isCreating) && <Edit 
        onClickSubmit={onChangePrintHandler}
        onClickCancel={onCloseModal}
        post={updatedPrint}
        formTemplate={FORM_TEMPLATE}
      />}
      {
        (mode.isDeleting) &&  <YesDelete onDelete={onDeletePrintHandler} onCancel={onCloseModal} info={updatedPrint} instance='print' />   
      }
      </Modal>}
    {prints.length > 0 && <div className="container d-flex flex-wrap mt-5 justify-content-between">
      {prints.map((print, idx) => 
        <div className="col-md-6"  key={print.id}>
          <PrintCard 
            fileLink={print.fileLink}
            title={print.title}
            image={print.image}
            description={print.description}
            onEditClick={() => onEditPrint(idx)}
            onDeleteClick={() => onDeletePrint(idx)}
          />
        </div>
        ) 
      }
    </div>}
    {prints.length === 0 && <EmptyData instance='print' />}
    <ButtonAddNew
        color='red'
        onClickAddButton={onAddNewPrint}
        fixed
        size='4'
       />
    </>
  )
}

export default ErrorBoundry(Prints)
