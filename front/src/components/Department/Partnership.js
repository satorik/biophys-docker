import React from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import { required, length, isUrl } from '../../utils/validators'

import { updateAfterCreate, updateAfterDelete } from '../../utils/updateCache/partnership'
import * as queries from '../../utils/queries/partnership'

import YesDelete from '../Shared/DoYouWantToDelete'
import ButtonAddNew from '../UI/ButtonAddNew'
import Modal from '../UI/Modal'
import Edit from '../Shared/Edit'
import Spinner from '../UI/Spinner'
import ErrorBoundry from '../Shared/ErrorHandling/ErrorBoundry'
import getUpdateData from '../../utils/getObjectForUpdate'
import NetworkErrorComponent from '../Shared/ErrorHandling/NetworkErrorComponent'
import LinkCard from '../Shared/LinkCard'
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
  title: 'link',
  label:'Ссылка',
  type:'input',
  required: true,
  validators: [required, isUrl]
}
] 

const Partnership = () => {

  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [mode, setMode] = React.useState({isEditing: false, isCreating: false, isDeleting: false})
  const [updatedPartner, setUpdatedPartner] = React.useState({})
  const [isAbleToSave, setIsAbleToSave] = React.useState(true)
  const [isError, setIsError] = React.useState(null)

  const { loading: queryLoading, error: queryError, data} = useQuery(queries.GET_DEPARTMENT_PARTNERSHIP)
  const [createPartnership, { loading: creationLoading }] = useMutation(queries.CREATE_PARTNERSHIP, {
    update: (cache, res) => updateAfterCreate(cache, res, queries.GET_DEPARTMENT_PARTNERSHIP)})
  const [updatePartnership, { loading: updatingLoading }] = useMutation(queries.UPDATE_PARTNERSHIP)
  const [deletePartnership, { loading: deletingLoading }] = useMutation(queries.DELETE_PARTNERSHIP, {
    update: (cache, res) => updateAfterDelete(cache, res, queries.GET_DEPARTMENT_PARTNERSHIP)})

  if (queryLoading || creationLoading || updatingLoading || deletingLoading) return <Spinner />
  if (queryError) return <NetworkErrorComponent error={queryError} type='queryError' />
  if (isError) return <NetworkErrorComponent error={isError} onDismiss={() => setIsError(null)} />

  const onClearMode = (operation, full = false) => {
    setIsModalOpen(false)
    document.body.style.overflow = "scroll"
    setUpdatedPartner({})
    setIsAbleToSave(true)

    if (full) setMode({isDeleting: false, isEditing: false, isCreating: false})
    else setMode({...mode, [operation]: false})
  }

  const onSetMode = (operation) => {
    setIsModalOpen(true)
    setMode({...mode, [operation]: true})
    document.body.style.overflow = "hidden"
  }

  const onAddNewPartner = () => {
    onSetMode('isCreating')
  }

  const onEditPartner = (id) => {
    onSetMode('isEditing')
    setUpdatedPartner(partnership[id])
  }
  const onDeletePartner = (id) => {
    onSetMode('isDeleting')
    setUpdatedPartner(partnership[id])
  }

  const onDeletePartnerHandler = async () => {
    try {
      await deletePartnership({ variables: {id: updatedPartner.id}})
      onClearMode('isDeleting')
    } catch(error) {
      setIsError(error)
    }
  }

  const onCloseModal = () => {
    onClearMode('_', true)
  }

  const onChangeConferenceHandler = async (e, postData, valid) => {
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
        const forUpdate = getUpdateData(updatedPartner, postObject)
        try {
          await updatePartnership({ variables: {id: updatedPartner.id, inputData: forUpdate}})
          onClearMode('isEditing')
        } catch(error) {
          setIsError(error)
        }
      }
      if (mode.isCreating) {
        try {
          await createPartnership({ variables: {inputData: postObject}})
          onClearMode('isCreating')
        } catch(error) {
          setIsError(error)
        }
      }
    } 
  }

  let modalTitle = ''
  if (mode.isEditing) {modalTitle = 'Редактирование сотрудничества'}
  if (mode.isCreating) {modalTitle = 'Новое сотрудничество'}
  if (mode.isDeleting) {modalTitle = 'Удаление сотрудничества'}


  const { partnership } = data
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
        post={updatedPartner}
        formTemplate={FORM_TEMPLATE}
      />}
      {
        (mode.isDeleting) &&  <YesDelete onDelete={onDeletePartnerHandler} onCancel={onCloseModal} info={updatedPartner} instance='partnership' />   
      }
      </Modal>}
    {partnership.length > 0 && <div className="container d-flex flex-wrap mt-5 justify-content-between">
      {partnership.map((partner, idx) => 
        <LinkCard 
          key={partner.id}
          link={partner.link}
          imageUrl={partner.imageUrl}
          title={partner.title}
          desc={partner.description}
          onEditClick={() => onEditPartner(idx)}
          onDeleteClick={() => onDeletePartner(idx)}
        />)
      }
    </div>}
    {partnership.length === 0 && <EmptyData instance='partnership' />}
    <ButtonAddNew
        color='red'
        onClickAddButton={onAddNewPartner}
        fixed
        size='4'
       />
    </>
  )
}

export default ErrorBoundry(Partnership)
