import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { required, length } from './utils/validators'

import Carousel from './components/Carousel'
import NavigationList from './components/Shared/SecondaryNavigation/NavigationList'
import ScienceGroup from './components/Science/ScienceGroup'
import YesDelete from './components/Shared/DoYouWantToDelete'
import ButtonAddNew from './components/UI/ButtonAddNew'
import Modal from './components/UI/Modal'
import Edit from './components/Shared/Edit'
import Spinner from './components/UI/Spinner'
import getUpdateData from './utils/getObjectForUpdate'
import ErrorBoundry from './components/Shared/ErrorHandling/ErrorBoundry'
import NetworkErrorComponent from './components/Shared/ErrorHandling/NetworkErrorComponent'

const CREATE_SCIENCE_ROUTE = gql`
  mutation createScienceRoute($inputData: ScienceRouteCreateData!) {
    createScienceRoute(inputData: $inputData) {
      id
      title
    }
  }
`
const DELETE_SCIENCE_ROUTE = gql`
  mutation deleteScienceRoute($id: ID!) {
    deleteScienceRoute(id: $id) 
  }
`
const UPDATE_SCIENCE_ROUTE = gql`
  mutation updateScienceRoute($id: ID!, $inputData: ScienceRouteUpdateData!) {
    updateScienceRoute(id: $id, inputData: $inputData) {
        id
        title
    }
  }
`
const FORM_TEMPLATE = [
  {
    title: 'title',
    label:'Название',
    type: 'input',
    validators: [required, length({ min: 5 })]
  },
  {
    title: 'description',
    label:'Описание',
    type:'textarea',
  }
] 

const Science = ({links}) => {
 
  const {subLinks} = links
  const [viewId, setViewId] = React.useState(subLinks[0].id)

  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [mode, setMode] = React.useState({isEditing: false, isCreating: false, isDeleting: false})
  const [updatedRoute, setUpdatedRoute] = React.useState({})
  const [isAbleToSave, setIsAbleToSave] = React.useState(true)
  
  const [createScienceRoute,
      { loading: creationLoading, error: creatingError }] = useMutation(CREATE_SCIENCE_ROUTE, 
        // {
        //   update(cache, { data: {createScienceRoute} }) {
        //     const { conferences } = cache.readQuery({ query: GET_CONFERENCE, variables })
        //     cache.writeQuery({
        //       query: GET_CONFERENCE,
        //       variables,
        //       data: { conferences:  [createScienceRoute, ...conferences]}
        //     })
        //   }
        // }
        )
  const [updateScienceRoute,
      { loading: updatingLoading, error: updatingError }] = useMutation(UPDATE_SCIENCE_ROUTE)
  const [deleteScienceRoute,
      { loading: deletingLoading, error: deletingError }] = useMutation(DELETE_SCIENCE_ROUTE, 
      //   {
      //   update(cache, { data: { deleteScienceRoute } }) {
      //     const { conferences } = cache.readQuery({ query: GET_CONFERENCE, variables})
      //     cache.writeQuery({
      //       query: GET_CONFERENCE,
      //       variables,
      //       data: { conferences: conferences.filter(el => el.id !== deleteScienceRoute)}
      //     })
      //   }
      // }
      )

  if (updatingError) return <NetworkErrorComponent error={updatingError} />
  if (deletingError) return <NetworkErrorComponent error={deletingError} />
  if (creatingError) return <NetworkErrorComponent error={creatingError} />
 
  const onSelectRoute = (sublinkId) => {
    setViewId(sublinkId)
  }

  const onAddNewScienceRoute = () => {
    setIsModalOpen(true)
    setMode({...mode, isCreating: true})
    document.body.style.overflow = "hidden"
  }

  const onEditScienceRoute = (id) => {
    setIsModalOpen(true)
    setMode({...mode, isEditing: true})
    document.body.style.overflow = "hidden"
    setUpdatedRoute(id)
  }
  const onDeleteScienceRoute = (id) => {
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
    setMode({...mode, isDeleting: true})
    setUpdatedRoute(id)
    //setUpdatedRoute(blogposts[id])
  }

  const onDeleteScienceRouteHandler = async () => {
    await deleteScienceRoute({ variables: {id: updatedRoute.id}})
    setIsModalOpen(false)
    setMode({...mode, isDeleting: false})
    document.body.style.overflow = "scroll"
    setUpdatedRoute({})
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
    setMode({isDeleting: false, isEditing: false, isCreating: false})
    setUpdatedRoute({})
    document.body.style.overflow = "scroll"
  }

  const onChangeConferenceHandler = async (e, postData, valid, id) => {
    e.preventDefault()
    if (!valid) {
      setIsAbleToSave(false)
    }
    else {
      let postObject = postData.reduce((obj, item) => {
          obj[item.title] = item.value
          if(item.type === 'date') {
            const fullDate = new Date(Date.UTC(item.value.year, item.value.month, item.value.day))
            obj[item.title] = fullDate.toISOString()
          }
          return obj
      } ,{})
      setIsModalOpen(false)
      setMode({...mode, isEditing: false})
      setMode({...mode, isCreating: false})
      if (mode.isEditing) {
        const forUpdate = getUpdateData(updatedRoute, postObject)
        await updateScienceRoute({ variables: {id: updatedRoute.id, inputData: forUpdate}})
        setIsModalOpen(false)
        setMode({...mode, isEditing: false})
        document.body.style.overflow = "scroll"
        setUpdatedRoute({})
      }
      if (mode.isCreating) {
        await createScienceRoute({ variables: {inputData: postObject}})
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
    <div>
      <Carousel />
      <NavigationList subLinks={subLinks} navigationChange={onSelectRoute} selectedLink={viewId}/>
      <Redirect from="/science" to={`/science${subLinks[0].path}`} /> 
      {isModalOpen && <Modal 
        isOpen={isModalOpen}
        title={modalTitle}
        onClose={onCloseModal}
        >
        {(mode.isEditing || mode.isCreating) && <Edit 
          onClickSubmit={onChangeConferenceHandler}
          onClickCancel={onCloseModal}
          isAbleToSave={isAbleToSave}
          post={updatedRoute}
          formTemplate={FORM_TEMPLATE}
        />}
        {
          (mode.isDeleting) &&  <YesDelete onDelete={onDeleteScienceRouteHandler} />   
        }
      </Modal>}
      <Route
          path="/science/route/:id"
          component={ScienceGroup}
        />
      <ButtonAddNew
        color='red'
        onClickAddButton={onAddNewScienceRoute}
        fixed
        size='4'
       />
    </div>
  )
}

export default ErrorBoundry(Science)
