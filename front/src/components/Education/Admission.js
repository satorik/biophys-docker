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

const GET_ADMISSSION = gql`                    
    {
      admission {
        id
        content
      }
    }
  `
const CREATE_ADMISSION = gql`
mutation createAdmission($inputData: AdmissionCreateData!) {
  createAdmission(inputData: $inputData) {
    id
    content
  }
}
`
const DELETE_ADMISSION = gql`
mutation deleteAdmission{
  deleteAdmission
}
`
const UPDATE_ADMISSION = gql`
mutation updateAdmission($inputData: AdmissionUpdateData!) {
  updateAdmission(inputData: $inputData) {
      id
      content
  }
}
`

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

  const { loading: queryLodading, error: queryError, data } = useQuery(GET_ADMISSSION)
  const [createAdmission,
    { loading: creationLoading, error: creatingError }] = useMutation(CREATE_ADMISSION, {
        update(cache, { data: {createAdmission} }) {
          cache.writeQuery({
            query: GET_ADMISSSION,
            data: { admission: createAdmission}
          })
        }
      })
const [updatedAdmission,
    { loading: updatingLoading, error: updatingError }] = useMutation(UPDATE_ADMISSION)
const [deleteAdmission,
    { loading: deletingLoading, error: deletingError }] = useMutation(DELETE_ADMISSION, {
      update(cache) {
        cache.writeQuery({
          query: GET_ADMISSSION,
          data: { }
        })
      }
    })

  if (queryLodading) return <Spinner />
 
  if (queryError) return <NetworkErrorComponent error={queryError} />
  if (updatingError) return <NetworkErrorComponent error={updatingError} />
  if (deletingError) return <NetworkErrorComponent error={deletingError} />
  if (creatingError) return <NetworkErrorComponent error={creatingError} />

  const { admission } = data

  console.log(admission)

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
    await deleteAdmission()
    setIsModalOpen(false)
    setMode({...mode, isDeleting: false})
    document.body.style.overflow = "scroll"
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
        await updatedAdmission({ variables: {inputData: forUpdate}})
        setMode({...mode, isEditing: false})
      }
      if (mode.isCreating) {
        await createAdmission({ variables: {inputData: postObject}})
        setMode({...mode, isCreating: false})
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

        <div className="container card mt-5 p-2">
          <div className="mt-3">
          {!admission && <h1 className="text-center p-2">Запись пуста...</h1>}
          {(mode.isEditing || mode.isCreating) && <Edit 
            onClickSubmit={onChangeAdmissionHandler}
            onClickCancel={onCloseModal}
            isAbleToSave={isAbleToSave}
            post={admission || {}}
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
      {!admission &&
        <ButtonAddNew
            color='red'
            onClickAddButton={onAddAdmission}
            fixed
            size='4'
        />
      }
    </>
  )
}

export default ErrorBoundry(Admission)