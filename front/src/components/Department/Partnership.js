import React from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import { required, length, isUrl } from '../../utils/validators'

import YesDelete from '../Shared/DoYouWantToDelete'
import ButtonAddNew from '../UI/ButtonAddNew'
import Modal from '../UI/Modal'
import Edit from '../Shared/Edit'
import Spinner from '../UI/Spinner'
import ErrorBoundry from '../Shared/ErrorHandling/ErrorBoundry'
import getUpdateData from '../../utils/getObjectForUpdate'
import NetworkErrorComponent from '../Shared/ErrorHandling/NetworkErrorComponent'
import LinkCard from '../Shared/LinkCard'

const GET_DEPARTMENT_PARTNERSHIP = gql`                    
    query getDepartmentPartnership {
      partnership{
        id
        link
        imageUrl
        description  
        title
    }
  }
  ` 
const CREATE_PARTNERSHIP = gql`
mutation createPartnership($inputData: DepartmentPartnershipCreateData!) {
  createPartnership(inputData: $inputData) {
    id
    link
    imageUrl
    description  
    title
  }
}
`

const DELETE_PARTNERSHIP = gql`
mutation deletePartnership($id: ID!) {
  deletePartnership(id: $id) 
}
`
const UPDATE_PARTNERSHIP = gql`
mutation updatePartnership($id: ID!, $inputData: DepartmentPartnershipUpdateData!) {
  updatePartnership(id: $id, inputData: $inputData) {
    id
    link
    imageUrl
    description  
    title
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

  const { loading: queryLoading, error: queryError, data} = useQuery(GET_DEPARTMENT_PARTNERSHIP)
  const [createPartnership,
        { loading: creationLoading, error: creatingError }] = useMutation(CREATE_PARTNERSHIP, {
            update(cache, { data: {createPartnership} }) {
              const { partnership } = cache.readQuery({ query: GET_DEPARTMENT_PARTNERSHIP })
              cache.writeQuery({
                query: GET_DEPARTMENT_PARTNERSHIP,
                data: { partnership:  [...partnership, createPartnership]}
              })
            }
          })
  const [updatePartnership,
        { loading: updatingLoading, error: updatingError }] = useMutation(UPDATE_PARTNERSHIP)
  const [deletePartnership,
        { loading: deletingLoading, error: deletingError }] = useMutation(DELETE_PARTNERSHIP, {
          update(cache, { data: { deletePartnership } }) {
            const { partnership } = cache.readQuery({ query:GET_DEPARTMENT_PARTNERSHIP})
            cache.writeQuery({
              query: GET_DEPARTMENT_PARTNERSHIP,
              data: { partnership: partnership.filter(el => el.id !== deletePartnership)}
            })
          }
        })
  
  if (queryLoading) return <Spinner />
  if (queryError) return <NetworkErrorComponent error={queryError} />
  if (updatingError) return <NetworkErrorComponent error={updatingError} />
  if (deletingError) return <NetworkErrorComponent error={deletingError} />
  if (creatingError) return <NetworkErrorComponent error={creatingError} />

  const onAddNewPartner = () => {
    setIsModalOpen(true)
    setMode({...mode, isCreating: true})
    document.body.style.overflow = "hidden"
  }

  const onEditPartner = (id) => {
    setIsModalOpen(true)
    setMode({...mode, isEditing: true})
    document.body.style.overflow = "hidden"
    setUpdatedPartner(partnership[id])
  }
  const onDeletePartner = (id) => {
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
    setMode({...mode, isDeleting: true})
    setUpdatedPartner(partnership[id])
  }

  const onDeletePartnerHandler = async () => {
    await deletePartnership({ variables: {id: updatedPartner.id}})
    setIsModalOpen(false)
    setMode({...mode, isDeleting: false})
    document.body.style.overflow = "scroll"
    setUpdatedPartner({})
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
    setMode({isDeleting: false, isEditing: false, isCreating: false})
    setUpdatedPartner({})
    document.body.style.overflow = "scroll"
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
        await updatePartnership({ variables: {id: updatedPartner.id, inputData: forUpdate}})
        setIsModalOpen(false)
        setMode({...mode, isEditing: false})
        document.body.style.overflow = "scroll"
        setUpdatedPartner({})
      }
      if (mode.isCreating) {
        await createPartnership({ variables: {inputData: postObject}})
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
        (mode.isDeleting) &&  <YesDelete onDelete={onDeletePartnerHandler} />   
      }
      </Modal>}
    <div className="container d-flex flex-wrap mt-5 justify-content-between">
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
    </div>
    <ButtonAddNew
        color='red'
        onClickAddButton={onAddNewPartner}
        fixed
        size='4'
       />
    </>
  )
}

export default Partnership
