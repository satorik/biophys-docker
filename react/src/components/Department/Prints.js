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
import {PrintCard} from './PrintCard'

const GET_DEPARTMENT_PRINTS = gql`                    
    query getDepartmentPrints {
      prints{
        id
        fileLink
        image
        description  
        title
    }
  }
  ` 
const CREATE_PRINT = gql`
mutation createPrint($inputData: DepartmentPrintCreateData!) {
  createPrint(inputData: $inputData) {
    id
    fileLink
    image
    description  
    title
  }
}
`

const DELETE_PRINT = gql`
mutation deletePrint($id: ID!) {
  deletePrint(id: $id) 
}
`
const UPDATE_PRINT = gql`
mutation updatePrint($id: ID!, $inputData: DepartmentPrintUpdateData!) {
  updatePrint(id: $id, inputData: $inputData) {
    id
    fileLink
    image
    description  
    title
  }
}
`

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
  const [isAbleToSave, setIsAbleToSave] = React.useState(true)

const { loading: queryLoading, error: queryError, data} = useQuery(GET_DEPARTMENT_PRINTS)
  const [createPrint,
        { loading: creationLoading, error: creatingError }] = useMutation(CREATE_PRINT, {
            update(cache, { data: {createPrint} }) {
              const { prints } = cache.readQuery({ query: GET_DEPARTMENT_PRINTS })
              cache.writeQuery({
                query: GET_DEPARTMENT_PRINTS,
                data: { prints:  [createPrint, ...prints]}
              })
            }
          })
  const [updatePrint,
        { loading: updatingLoading, error: updatingError }] = useMutation(UPDATE_PRINT)
  const [deletePrint,
        { loading: deletingLoading, error: deletingError }] = useMutation(DELETE_PRINT, {
          update(cache, { data: { deletePrint } }) {
            const { prints } = cache.readQuery({ query: GET_DEPARTMENT_PRINTS})
            cache.writeQuery({
              query: GET_DEPARTMENT_PRINTS,
              data: { prints: prints.filter(el => el.id !== deletePrint)}
            })
          }
        })
  
  if (queryLoading) return <Spinner />
  if (queryError) return <NetworkErrorComponent error={queryError} />
  if (updatingError) return <NetworkErrorComponent error={updatingError} />
  if (deletingError) return <NetworkErrorComponent error={deletingError} />
  if (creatingError) return <NetworkErrorComponent error={creatingError} />

  const { prints } = data
  
  const onAddNewPrint = () => {
    setIsModalOpen(true)
    setMode({...mode, isCreating: true})
    document.body.style.overflow = "hidden"
  }

  const onEditPrint = (id) => {
    setIsModalOpen(true)
    setMode({...mode, isEditing: true})
    document.body.style.overflow = "hidden"
    setUpdatedPrint(prints[id])
  }
  const onDeletePrint = (id) => {
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
    setMode({...mode, isDeleting: true})
    setUpdatedPrint(prints[id])
    //setUpdatedPrint(blogposts[id])
  }

  const onDeletePrintHandler = async () => {
    await deletePrint({ variables: {id: updatedPrint.id}})
    setIsModalOpen(false)
    setMode({...mode, isDeleting: false})
    document.body.style.overflow = "scroll"
    setUpdatedPrint({})
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
    setMode({isDeleting: false, isEditing: false, isCreating: false})
    setUpdatedPrint({})
    document.body.style.overflow = "scroll"
  }

  const onChangePrintHandler = async (e, postData, valid) => {
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
        const forUpdate = getUpdateData(updatedPrint, postObject)
        await updatePrint({ variables: {id: updatedPrint.id, inputData: forUpdate}})
        setIsModalOpen(false)
        setMode({...mode, isEditing: false})
        document.body.style.overflow = "scroll"
        setUpdatedPrint({})
      }
      if (mode.isCreating) {
        await createPrint({ variables: {inputData: postObject}})
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
        isAbleToSave={isAbleToSave}
        post={updatedPrint}
        formTemplate={FORM_TEMPLATE}
      />}
      {
        (mode.isDeleting) &&  <YesDelete onDelete={onDeletePrintHandler} />   
      }
      </Modal>}
    <div className="container d-flex flex-wrap mt-5 justify-content-between">
      {prints.map((print, idx) => 
         <PrintCard 
          key={print.id}
          fileLink={print.fileLink}
          title={print.title}
          image={print.image}
          description={print.description}
          onEditClick={() => onEditPrint(idx)}
          onDeleteClick={() => onDeletePrint(idx)}
        />) 
      }
    </div>
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
