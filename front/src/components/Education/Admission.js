import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { required, length } from '../../utils/validators'

import { updateAfterCreate, updateAfterDelete } from '../../utils/updateCache/admission'
import * as queries from '../../utils/queries/admission'

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
    title: 'content',
    label:'Содержание',
    type:'textarea-long',
    required: true,
    validators: [required, length({ min: 50 })]
  }
] 


const Admission = () => {

  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [mode, setMode] = React.useState({isEditing: false, isCreating: false, isDeleting: false})
  const [isAbleToSave, setIsAbleToSave] = React.useState(true)
  const [isError, setIsError] = React.useState(null)

  const { loading: queryLodading, error: queryError, data } = useQuery(queries.GET_ADMISSSION)
  const [createAdmission, { loading: creationLoading }] = useMutation(queries.CREATE_ADMISSION, {
    update: (cache, res) => updateAfterCreate(cache, res, queries.GET_ADMISSSION)})
  const [updatedAdmission, { loading: updatingLoading }] = useMutation(queries.UPDATE_ADMISSION)
  const [deleteAdmission, { loading: deletingLoading }] = useMutation(queries.DELETE_ADMISSION, {
    update: (cache) => updateAfterDelete(cache, queries.GET_ADMISSSION)})

  if (queryLodading || creationLoading || updatingLoading || deletingLoading) return <Spinner />
 
  if (queryError) return <NetworkErrorComponent error={queryError} type='queryError' />
  if (isError) return <NetworkErrorComponent error={isError} onDismiss={() => setIsError(null)} />

  const { admission } = data

  const onAddAdmission = () => {
    setMode({...mode, isCreating: true})
  }

  const onEditAdmissionHandler = () => {
    setMode({...mode, isEditing: true})
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
    setMode({isDeleting: false, isEditing: false, isCreating: false})
    document.body.style.overflow = "scroll"
  }

  const onDeleteAdmission = () => {
    setIsModalOpen(true)
    setMode({...mode, isDeleting: true})
  }
  const onDeleteAdmissionHandler = async () => {
    try {
      await deleteAdmission()
      setIsModalOpen(false)
      setMode({...mode, isDeleting: false})
      document.body.style.overflow = "scroll"
    } catch(error) {
      setIsError(error)
    }
  }

  const onChangeAdmissionHandler = async (e, postData, valid) => {
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
        let forUpdate = getUpdateData(admission, postObject)
        try {
          await updatedAdmission({ variables: {inputData: forUpdate}})
          setMode({...mode, isEditing: false})
        } catch(error) {
          setIsError(error)
        }
      }
      if (mode.isCreating) {
        try {
          await createAdmission({ variables: {inputData: postObject}})
          setMode({...mode, isCreating: false})
        } catch(error) {
          setIsError(error)
        }
      }
    } 
  }

  let modalTitle = ''
  if (mode.isDeleting) {modalTitle = 'Удаление'}

  return (
    <>
      {isModalOpen && <Modal 
        isOpen={isModalOpen}
        title={modalTitle}
        onClose={onCloseModal}
        >
        {
          (mode.isDeleting) &&  <YesDelete onDelete={onDeleteAdmissionHandler} onCancel={onCloseModal} instance="admission" />   
        }
      </Modal>}
      {(mode.isCreating) && <div className="container card mt-5 p-2"><Edit 
        onClickSubmit={onChangeAdmissionHandler}
        onClickCancel={onCloseModal}
        isAbleToSave={isAbleToSave}
        formTemplate={FORM_TEMPLATE}
        post={{}}
      /></div>}
      {admission && <div className="container card mt-5 p-2">
          <div className="mt-3">
          {(mode.isEditing ) && <Edit 
            onClickSubmit={onChangeAdmissionHandler}
            onClickCancel={onCloseModal}
            isAbleToSave={isAbleToSave}
            post={admission }
            formTemplate={FORM_TEMPLATE}
          />}
          {(!mode.isEditing && !mode.isCreating && admission) &&
            <>
            <EditButtons 
              onClickEdit={onEditAdmissionHandler}
              onClickDelete={onDeleteAdmission}
              size="sm"
              color="black"
              row
            />
            <p className="p-2" dangerouslySetInnerHTML={{__html: admission.content}}></p>
            </>
          }
          </div>
        </div>
      }
      {!admission && !mode.isCreating && <>
        <EmptyData instance='admission' />
        <ButtonAddNew
            color='red'
            onClickAddButton={onAddAdmission}
            fixed
            size='4'
        />
        </>
      }
    </>
  )
}

export default ErrorBoundry(Admission)