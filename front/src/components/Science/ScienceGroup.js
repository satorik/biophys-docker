import React from 'react'
import { useQuery, useMutation} from '@apollo/client'
import { required, length, isUrl, email, isImage } from '../../utils/validators'
import { getUpdateData } from '../../utils/postDataHandlers'

import updates  from '../../utils/updateCache/scienceGroup'
import * as queries from '../../utils/queries/scienceGroup'

import ScienceGroupListItem from './ScienceGroupListItem'
import ButtonAddNew from '../UI/ButtonAddNew'
import YesDelete from '../Shared/DoYouWantToDelete'
import Modal from '../UI/Modal'
import Edit from '../Shared/Edit'
import Spinner from '../UI/Spinner'
import ErrorBoundry from '../Shared/ErrorHandling/ErrorBoundry'
import NetworkErrorComponent from '../Shared/ErrorHandling/NetworkErrorComponent'


const PEOPLE_TEMPLATE= [
  {
    title: 'firstname',
    label:'Имя',
    type: 'input',
    required: true,
    validators: [required, length({ min: 2})]
  },
  {
    title: 'middlename',
    label:'Отчество',
    type: 'input',
    validators: [required, length({ min: 2})]
  },
  {
    title: 'lastname',
    label:'Фамилия',
    type: 'input',
    required: true,
    validators: [required, length({ min: 2})]
  },
  {
    title: 'description',
    label:'Должность',
    type:'input',
  },
  {
    title: 'englishName',
    label:'Имя латиницей',
    type:'input',
  },
  {
    title: 'tel',
    label:'Телефон',
    type:'input',
  },
  {
    title: 'mail',
    label:'Почта',
    type:'input',
    validators: [email]
  },
  {
    title: 'urlIstina',
    label:'Ссылка на ИСТИНУ',
    type:'input',
    validators: [isUrl]
  },
  {
    title: 'urlRints',
    label:'Ссылка на РИНЦ',
    type:'input',
    validators: [isUrl]
  },
  {
    title: 'urlOrcid',
    label:'Ссылка на ORCID',
    type:'input',
    validators: [isUrl]
  },
  {
    title: 'urlResearcher',
    label:'Ссылка на Researcher',
    type:'input',
    validators: [isUrl]
  },
  {
    title: 'urlScopus',
    label:'Ссылка на Scopus',
    type:'input',
    validators: [isUrl]
  },
  {
    title: 'type',
    required: true,
    label:[{title:'Сотрудник', value: 'STAFF'}, {title:'Студент', value: 'STUDENT'}],
    type:'radio'
  },
]
const ARTICLE_TEMPLATE = [
  {
    title: 'author',
    label:'Автор',
    type: 'input',
    validators: [required, length({ min: 5})]
  },
  {
    title: 'title',
    label:'Название',
    type: 'input',
    validators: [required, length({ min: 5})]
  },
  {
    title: 'journal',
    label:'Опубликовано в',
    type: 'input',
    validators: [required, length({ min: 5})]
  },
]
const GENERAL_TEMPLATE = [
  {
    title: 'image',
    label:'Картинка',
    type: 'file',
    required: true,
    validators: [required, isImage]
  },
  {
    title: 'title',
    label:'Название',
    type: 'input',
    required: true,
    validators: [required, length({ min: 5, max: 100 })]
  },
  {
    title: 'description',
    label:'Описание',
    type:'textarea',
    required: true,
    validators: [required, length({ min: 5})]
  },
  {
    title: 'tel',
    label:'Телефон',
    type:'input',
    required: true,
    validators: [required]
  },
  {
    title: 'mail',
    label:'Почта',
    type:'input',
    required: true,
    validators: [required, email]
  },
  {
    title: 'room',
    label:'Комната',
    type:'input',
    required: true,
    validators: [required]
  }
] 

const ScienceGroup = ({match}) => {

  const [viewId, setviewId] = React.useState(100)
  const [mode, setMode] = React.useState({isEditing: false, isCreating: false, isDeleting: false})
  const [peopleMode, setPeopleMode] = React.useState({isEditing: false, isCreating: false, isDeleting: false})
  const [articleMode, setArticleMode] = React.useState({isEditing: false, isCreating: false, isDeleting: false})
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [updatedGroup, setUpdatedGroup] = React.useState({})
  const [updatedPerson, setUpdatedPerson] = React.useState({})
  const [updatedArticle, setUpdatedArticle] = React.useState({})
  const [isError, setIsError] = React.useState(null)

  const scienceRouteId = match.params.id || 1
  const variables = {scienceRouteId}

  const {loading: queryLoading, error: queryError, data } = useQuery(queries.GET_SCIENCE_GROUPS, {variables})
  const [createScienceGroup, { loading: creationLoading }] = useMutation(queries.CREATE_SCIENCE_GROUP, {
    update: (cache, res) => updates.updateAfterCreate(cache, res, queries.GET_SCIENCE_GROUPS, variables)})

  const [updateScienceGroup, { loading: updatingLoading }] = useMutation(queries.UPDATE_SCIENCE_GROUP)
  const [deleteScienceGroup, { loading: deletingLoading }] = useMutation(queries.DELETE_SCIENCE_GROUP, {
    update: (cache, res) => updates.updateAfterDelete(cache, res, queries.GET_SCIENCE_GROUPS, variables)})

  const [createSciencePerson, { loading: creatingPersonLoading }] = useMutation(queries.CREATE_SCIENCE_PERSON, {
    update: (cache, res) => updates.updateAfterCreatePerson(cache, res, queries.GET_SCIENCE_GROUPS, variables, viewId)})

  const [createScienceArticle, { loading: creationArticleLoading }] = useMutation(queries.CREATE_SCIENCE_ARTICLE, {
    update: (cache, res) => updates.updateAfterCreateArticle(cache, res, queries.GET_SCIENCE_GROUPS, variables, viewId)})

  const [updateSciencePerson, { loading: updatingPersonLoading }] = useMutation(queries.UPDATE_SCIENCE_PERSON)
  const [updateScienceArticle, { loading: updatingArticleLoading }] = useMutation(queries.UPDATE_SCIENCE_ARTICLE)
  
  const [deleteSciencePerson, { loading: deletingPersonLoading }] = useMutation(queries.DELETE_SCIENCE_PERSON, {
    update: (cache, res) => updates.updateAfterDeletePerson(cache, res, queries.GET_SCIENCE_GROUPS, variables, viewId)})

  const [deleteScienceArticle, { loading: deletingArticleLoading }] = useMutation(queries.DELETE_SCIENCE_ARTICLE, {
    update: (cache, res) => updates.updateAfterDeleteArticle(cache, res, queries.GET_SCIENCE_GROUPS, variables, viewId)})

  const [movePersonPosition, { loading: updatingPersonPositionLoading }] = useMutation(queries.MOVE_PERSON, {
    update: (cache, res) => updates.updateAfterMovePerson(cache, res, queries.GET_SCIENCE_GROUPS, variables, viewId)})

  const [moveArticlePosition, { loading: updatingArticlePositionLoading }] = useMutation(queries.MOVE_ARTICLE, {
    update: (cache, res) => updates.updateAfterMoveArticle(cache, res, queries.GET_SCIENCE_GROUPS, variables, viewId)})

  if (queryLoading || creationLoading || updatingLoading || deletingLoading || creatingPersonLoading ||
    creationArticleLoading || updatingPersonLoading || updatingArticleLoading || deletingPersonLoading ||
    deletingArticleLoading || updatingPersonPositionLoading || updatingArticlePositionLoading
    ) return <Spinner />

  if (queryError) return <NetworkErrorComponent error={queryError} type='queryError' />
  if (isError) return <NetworkErrorComponent error={isError} onDismiss={() => setIsError(null)} />

  const onSelectScinceGroupHandler = (id) => {
    if (id === viewId) setviewId(1000)
    else setviewId(id)
  }

  const clearArticleMode = () => {
    setArticleMode({isDeleting: false, isEditing: false, isCreating: false})
    setUpdatedArticle({})
  }

  const clearPeopleMode = () => {
    setPeopleMode({isDeleting: false, isEditing: false, isCreating: false})
    setUpdatedPerson({})
  }

  const clearMode = () => {
    setMode({isDeleting: false, isEditing: false, isCreating: false})
    setUpdatedGroup({})
  }

  const onAddNewScienceGroup = (type) => {
    switch (type){
      case 'people':
        setPeopleMode({...peopleMode, isCreating: true}) 
        clearArticleMode()
        clearMode()  
        break
      case 'articles':
        setArticleMode({...articleMode, isCreating: true}) 
        clearPeopleMode()
        clearMode()
        break
      default:
        setMode({...mode, isCreating: true})
        clearPeopleMode()
        clearArticleMode()
    }
  }

  const onEditScienceGroup = (id, type) => {
    switch (type){
      case 'people':
        setPeopleMode({...peopleMode, isEditing: true})
        setUpdatedPerson(scienceGroups[viewId].people[id])
        clearArticleMode()
        clearMode()
        break
      case 'articles':
        setArticleMode({...articleMode, isEditing: true})
        setUpdatedArticle(scienceGroups[viewId].articles[id]) 
        clearPeopleMode()
        clearMode()
        break
      default:
        setviewId(id)
        setMode({...mode, isEditing: true})
        setUpdatedGroup(scienceGroups[id])
        clearPeopleMode()
        clearArticleMode()
    }
  }

  const onDeleteScienceGroup = (id, type) => {
    setIsModalOpen(true)
    
    switch (type){
      case 'people':
        setPeopleMode({...peopleMode, isDeleting: true})
        setUpdatedPerson(scienceGroups[viewId].people[id])
        clearArticleMode()
        clearMode()
        break
      case 'articles':
        setArticleMode({...articleMode, isDeleting: true})
        setUpdatedArticle(scienceGroups[viewId].articles[id]) 
        clearPeopleMode()
        clearMode()
        break
      default:
        setMode({...mode, isDeleting: true})
        setUpdatedGroup(scienceGroups[id])
        clearPeopleMode()
        clearArticleMode()
    }
  }

  const onDeleteScienceGroupHandler = async () => {
    if (mode.isDeleting) {
      try {
        await deleteScienceGroup({ variables: {id: updatedGroup.id}})
        setMode({...mode, isDeleting: false})
        setUpdatedGroup({})
      } catch(error) {
        setIsError(error)
      }
    }
    if (peopleMode.isDeleting) {
      try {
        await deleteSciencePerson({ variables: {id: updatedPerson.id}})
        setPeopleMode({...peopleMode, isDeleting: false})
        setUpdatedPerson({})
      } catch(error) {
        setIsError(error)
      }
    }
    if (articleMode.isDeleting) {
      try {
        await deleteScienceArticle({ variables: {id: updatedArticle.id}})
        setArticleMode({...articleMode, isDeleting: false})
        setUpdatedArticle({})
      } catch(error) {
        setIsError(error)
      }
    } 
    setIsModalOpen(false)
    document.body.style.overflow = "scroll" 
  }

  const onChangeGroupHandler = async (postObject) => {
    if (mode.isEditing) {
      try {
        const forUpdate = getUpdateData(updatedGroup, postObject)
        await updateScienceGroup({ variables: {id: updatedGroup.id, inputData: forUpdate}})
        setMode({...mode, isEditing: false})
        setUpdatedGroup({})
      } catch(error) {
        setIsError(error)
      }
    }
    if (mode.isCreating) {
      try {
        await createScienceGroup({ variables: {inputData: postObject, scienceRouteId }})
        setMode({...mode, isCreating: false})
      } catch(error) {
        setIsError(error)
      }
    }
    if (peopleMode.isCreating) {
      try {
        await createSciencePerson({ variables: {inputData: postObject, scienceGroupId: scienceGroups[viewId].id}})
        setPeopleMode({...peopleMode, isCreating: false})
      } catch(error) {
        setIsError(error)
      }
    }
    if (articleMode.isCreating) {
      try {
        await createScienceArticle({ variables: {inputData: postObject, scienceGroupId: scienceGroups[viewId].id}})
        setArticleMode({...articleMode, isCreating: false})
      } catch(error) {
        setIsError(error)
      }
    }
    if (peopleMode.isEditing) {
      try {
        const forUpdate = getUpdateData(updatedPerson, postObject)
        await updateSciencePerson({ variables: {inputData: forUpdate, id: updatedPerson.id}})
        setPeopleMode({...peopleMode, isEditing: false})
        setUpdatedPerson({})
      } catch(error) {
        setIsError(error)
      }
    }
    if (articleMode.isEditing) {
      try {
        const forUpdate = getUpdateData(updatedArticle, postObject)
        await updateScienceArticle({ variables: {inputData: forUpdate, id: updatedArticle.id}})
        setArticleMode({...articleMode, isEditing: false})
        setUpdatedArticle({})
      } catch(error) {
        setIsError(error)
      }
    }
  }

  const onCancelEditing = (type) => {
    switch (type){
      case 'people':
        clearPeopleMode()
        break
      case 'articles':
        clearArticleMode()
        break
      default:
        clearMode()
    }
  }

  const onChangePosition = async (id, type, vector) => {
    if (type === 'people') {
      try {
        await movePersonPosition({variables:{id, vector}})
      } catch(error) {
        setIsError(error)
      }    
    }
    if (type === 'articles') {
      try {
        await moveArticlePosition({variables:{id, vector}})
      } catch(error) {
        setIsError(error)
      }   
    }
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
    clearMode()
    document.body.style.overflow = "scroll"
  }

  const { scienceGroups } = data
  const scienceGroupsWithActions = scienceGroups.map((item, idx) =>{
    return {
      ...item,
      onViewInfo: () => onSelectScinceGroupHandler(idx),
      onEditInfo:() => onEditScienceGroup(idx),
      onDelete:() => onDeleteScienceGroup(idx),
      onCancel:() => onCancelEditing(), 
      onChangeInfo: onChangeGroupHandler,
      template: GENERAL_TEMPLATE,
      mode: mode,
      people: {
        template:PEOPLE_TEMPLATE,
        mode: peopleMode,
        onCancel: () => onCancelEditing('people'),
        onCreate: () => onAddNewScienceGroup('people'),
        onChangePerson: onChangeGroupHandler,
        data: item.people.map((person, idx) => {
          return {
            ...person,
            onEdit:() => onEditScienceGroup(idx, 'people'),
            onDelete:() => onDeleteScienceGroup(idx, 'people'),
            onPersonUp:() => onChangePosition(person.id, 'people', 'UP'),
            onPersonDown:() => onChangePosition(person.id, 'people', 'DOWN')
          }
        })
      },
      articles: {
        template: ARTICLE_TEMPLATE,
        mode: articleMode,
        onCancel: () => onCancelEditing('articles'),
        onCreate: () => onAddNewScienceGroup('articles'),
        onChangeArticle: onChangeGroupHandler,
        data: item.articles.map((article, idx) => {
          return {
            ...article,
            onEdit:() => onEditScienceGroup(idx, 'articles'),
            onDelete:() => onDeleteScienceGroup(idx, 'articles'),
            onArticleUp:() => onChangePosition(article.id, 'articles', 'UP'),
            onArticleDown:() => onChangePosition(article.id, 'articles', 'DOWN')
          }
        })
      }
    }
  })

  let modalTitle = ''
  if (mode.isDeleting) {modalTitle = 'Удаление научной группы'}
  if (peopleMode.isDeleting) {modalTitle = 'Удаление сотрудника'}
  if (articleMode.isDeleting) {modalTitle = 'Удаление публикации'}

  return (
    <div className="container mt-5">
      <div className="card">
        {isModalOpen && <Modal 
          isOpen={isModalOpen}
          title={modalTitle}
          onClose={onCloseModal}
          >
          {(mode.isDeleting) &&  <YesDelete onDelete={onDeleteScienceGroupHandler} onCancel={onCloseModal} info={updatedGroup} instance="scienceGroup" />}  
          {(peopleMode.isDeleting) &&  <YesDelete onDelete={onDeleteScienceGroupHandler} onCancel={onCloseModal} info={updatedPerson} instance="sciencePeople" />}
          {(articleMode.isDeleting) &&  <YesDelete onDelete={onDeleteScienceGroupHandler} onCancel={onCloseModal} info={updatedArticle} instance="scienceArticle" />}
          
        </Modal>}
        {scienceGroupsWithActions.map((scienceGroup, idx) => 
          <ScienceGroupListItem 
              key = {idx}   
              active = {viewId === idx}
              groupObject = {scienceGroup}
              updatedArticle = {updatedArticle}
              updatedPerson = {updatedPerson}
          />
        )}
        {
          mode.isCreating && <div className="p-3">
            <h3>Общая информация</h3>
            <Edit 
              onClickSubmit={onChangeGroupHandler}
              onClickCancel={onCancelEditing}
              post={updatedGroup}
              formTemplate={GENERAL_TEMPLATE}
            /></div>
        }
        {
          !(mode.isEditing || mode.isCreating) && 
          <div className="card-header text-center">
            <ButtonAddNew
              color='green'
              onClickAddButton={onAddNewScienceGroup}
              size='2'
            />
          </div>
        }
      </div>
    </div>
  )
}

export default ErrorBoundry(ScienceGroup)
