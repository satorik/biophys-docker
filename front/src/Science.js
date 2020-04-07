import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { required, length } from './utils/validators'
import { getUpdateData } from './utils/postDataHandlers'

import { updateAfterCreate, updateAfterDelete } from './utils/updateCache/scienceRoute'
import * as queries from './utils/queries/scienceRoute'

import NavigationList from './components/Shared/SecondaryNavigation/NavigationList'
import ScienceGroup from './components/Science/ScienceGroup'
import YesDelete from './components/Shared/DoYouWantToDelete'
import ButtonAddNew from './components/UI/ButtonAddNew'
import Modal from './components/UI/Modal'
import Edit from './components/Shared/Edit'
import Spinner from './components/UI/Spinner'
import ErrorBoundry from './components/Shared/ErrorHandling/ErrorBoundry'
import NetworkErrorComponent from './components/Shared/ErrorHandling/NetworkErrorComponent'
import {EmptyData} from './components/Shared/EmptyData'


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
  }
] 

const Science = () => {
 
  const [viewId, setViewId] = React.useState(0)

  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [mode, setMode] = React.useState({isEditing: false, isCreating: false, isDeleting: false})
  const [updatedRoute, setUpdatedRoute] = React.useState({})
  const [isError, setIsError] = React.useState(null)
  
  const { loading: queryLoading, error: queryError, data} = useQuery(queries.GET_SCIENCE_ROUTE)
  
  const [createScienceRoute, { loading: creationLoading }] = useMutation(queries.CREATE_SCIENCE_ROUTE, {
    update: (cache, res) => updateAfterCreate(cache, res, queries.GET_SCIENCE_ROUTE)})

  const [updateScienceRoute, { loading: updatingLoading }] = useMutation(queries.UPDATE_SCIENCE_ROUTE)
  
  const [deleteScienceRoute, { loading: deletingLoading }] = useMutation(queries.DELETE_SCIENCE_ROUTE, {
    update: (cache, res) => updateAfterDelete(cache, res, queries.GET_SCIENCE_ROUTE)})

  if (queryLoading || creationLoading || updatingLoading || deletingLoading) return <Spinner />
  if (isError) return <NetworkErrorComponent error={isError} onDismiss={() => setIsError(null)}/>
  if (queryError) return <NetworkErrorComponent error={queryError} type="queryError"/>

  const { scienceRoutes } = data

  const links = scienceRoutes.map((route, idx) => {
    return {
      id: route.id,
      path: `/route/${route.id}`,
      title: route.title,
      root: `/science`,
      onEdit: () => onEditScienceRoute(idx),
      onDelete: () => onDeleteScienceRoute(idx)
    }
  })
 
  const onClearMode = (operation, full = false) => {
    setIsModalOpen(false)
    document.body.style.overflow = "scroll"
    setUpdatedRoute({})

    if (full) setMode({isDeleting: false, isEditing: false, isCreating: false})
    else setMode({...mode, [operation]: false})
  }

  const onSetMode = (operation) => {
    setIsModalOpen(true)
    setMode({...mode, [operation]: true})
    document.body.style.overflow = "hidden"
  }

  const onSelectRoute = (sublinkId) => {
    setViewId(sublinkId)
  }

  const onAddNewScienceRoute = () => {
    onSetMode('isCreating')
  }

  const onEditScienceRoute = (id) => {
    onSetMode('isEditing')
    setUpdatedRoute(scienceRoutes[id])
  }
  const onDeleteScienceRoute = (id) => {
    onSetMode('isDeleting')
    setUpdatedRoute(scienceRoutes[id])
  }

  const onDeleteScienceRouteHandler = async () => {
    try {
      await deleteScienceRoute({ variables: {id: updatedRoute.id}})
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
      const forUpdate = getUpdateData(updatedRoute, postObject)
      try {
        await updateScienceRoute({ variables: {id: updatedRoute.id, inputData: forUpdate}})
        onClearMode('isEditing')
      }
      catch(error) {
        setIsError(error)
      }
    }
    if (mode.isCreating) {
      try {
        await createScienceRoute({ variables: {inputData: postObject}})
        onClearMode('isCreating')
      }
      catch(error) {
        setIsError(error)
      }
    }   
  }

  let modalTitle = ''
  if (mode.isEditing) {modalTitle = 'Редактирование научного направления'}
  if (mode.isCreating) {modalTitle = 'Новое научное направление'}
  if (mode.isDeleting) {modalTitle = 'Удаление научного направления'}

  return (
    <>
    {isModalOpen && <Modal 
        isOpen={isModalOpen}
        title={modalTitle}
        onClose={onCloseModal}
        >
        {(mode.isEditing || mode.isCreating) && <Edit 
          onClickSubmit={onChangeConferenceHandler}
          onClickCancel={onCloseModal}
          post={updatedRoute}
          formTemplate={FORM_TEMPLATE}
        />}
        {
          (mode.isDeleting) &&  <YesDelete onDelete={onDeleteScienceRouteHandler} onCancel={onCloseModal} info={updatedRoute} instance='scienceRoute' />   
        }
    </Modal>}
    {scienceRoutes.length > 0 && <div>
      <NavigationList subLinks={links} navigationChange={onSelectRoute} selectedLink={viewId}/>
      <Redirect from="/science" to={`/science${links[0].path}`} /> 
      <Route
          path="/science/route/:id"
          component={ScienceGroup}
        />
    </div>}
    {scienceRoutes.length === 0 && <EmptyData instance='scienceRoute' />}
    <ButtonAddNew
      color='red'
      onClickAddButton={onAddNewScienceRoute}
      fixed
      size='4'
      />
    </>
  )
}

export default ErrorBoundry(Science)
