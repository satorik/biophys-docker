import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { required, length, isUrl, email } from '../../utils/validators'

import ScienceGroupListItem from './ScienceGroupListItem'
import ButtonAddNew from '../UI/ButtonAddNew'
import YesDelete from '../Shared/DoYouWantToDelete'
import Modal from '../UI/Modal'
import Edit from '../Shared/Edit'
import Spinner from '../UI/Spinner'
import ErrorBoundry from '../Shared/ErrorHandling/ErrorBoundry'
import getUpdateData from '../../utils/getObjectForUpdate'
import NetworkErrorComponent from '../Shared/ErrorHandling/NetworkErrorComponent'

const GET_SCIENCE_GROUPS = gql`                    
    query getSienceGroups($scienceRouteId: ID!){
      scienceGroups(scienceRouteId: $scienceRouteId){
        id
        title
        description
        tel
        imageUrl
        mail
        room
        people {
          id
          firstname
          middlename
          lastname
          description
          tel
          mail
          birthday
          type
          position
        }
        articles {
          id
          author
          title
          journal
          position
        }
    }
  }
  `
const CREATE_SCIENCE_GROUP = gql`
  mutation createScienceGroup($scienceRouteId: ID!, $inputData: ScienceGroupCreateData!) {
    createScienceGroup(scienceRouteId: $scienceRouteId, inputData: $inputData) {
      id
      title
      description
      tel
      imageUrl
      mail
      room
      people {
          id
          firstname
          middlename
          lastname
          description
          tel
          mail
          birthday
          type
          position
        }
        articles {
          id
          author
          title
          journal
          position
        }
    }
  }
  `

  const DELETE_SCIENCE_GROUP = gql`
    mutation deleteScienceGroup($id: ID!) {
      deleteScienceGroup(id: $id) 
    }
  `
  const UPDATE_SCIENCE_GROUP = gql`
   mutation updateScienceGroup($id: ID!, $inputData:ScienceGroupUpdateData!) {
    updateScienceGroup(id: $id, inputData: $inputData) {
      id
      title
      description
      tel
      imageUrl
      mail
      room
    }
  }
  `
  const CREATE_SCIENCE_PERSON = gql`
    mutation createSciencePerson($scienceGroupId: ID!, $inputData: SciencePeopleCreateData!){
      createSciencePerson(scienceGroupId: $scienceGroupId, inputData: $inputData){
        id
        firstname
        middlename
        lastname
        description
        tel
        mail
        birthday
        type
        position
      }
    }
  `
  const UPDATE_SCIENCE_PERSON = gql`
    mutation updateSciencePerson($id: ID!, $inputData: SciencePeopleUpdateData!){
      updateSciencePerson(id: $id, inputData: $inputData){
        id
        firstname
        middlename
        lastname
        description
        tel
        mail
        birthday
        type
        position
      }
    }
  `
  const CREATE_SCIENCE_ARTICLE = gql`
    mutation createScienceArticle($scienceGroupId: ID!, $inputData: ScienceArticleCreateData!){
      createScienceArticle(scienceGroupId: $scienceGroupId, inputData: $inputData){
        id
        author
        title
        journal
        position
      }
    }
  `
  const UPDATE_SCIENCE_ARTICLE = gql`
    mutation updateScienceArticle($id: ID!, $inputData: ScienceArticleUpdateData!){
      updateScienceArticle(id: $id, inputData: $inputData){
        id
        author
        title
        journal
        position
      }
    }
  `
  const DELETE_SCIENCE_PERSON = gql`
    mutation deleteSciencePerson($id: ID!){
      deleteSciencePerson(id: $id)
    }
  `
  const DELETE_SCIENCE_ARTICLE = gql`
    mutation deleteScienceArticle($id: ID!){
      deleteScienceArticle(id: $id)
    }
  `
  const MOVE_PERSON = gql`
    mutation movePersonPosition($id: ID!, $vector: VECTOR!){
      moveSciencePerson(id: $id, vector:$vector){
        id
        position
	    } 
    }
  `
  const MOVE_ARTICLE = gql`
    mutation moveArticlePosition($id: ID!, $vector: VECTOR!){
      moveScienceArticle(id: $id, vector:$vector){
        id
        position
	    } 
    }
  `
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
    required: true,
    validators: [required, length({ min: 3})]
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
    title: 'url',
    label:'Ссылка на истрину',
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
    validators: [required]
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
  const [isAbleToSave, setIsAbleToSave] = React.useState(true)
  const [updatedGroup, setUpdatedGroup] = React.useState({})
  const [updatedPerson, setUpdatedPerson] = React.useState({})
  const [updatedArticle, setUpdatedArticle] = React.useState({})


  const scienceRouteId = match.params.id || 1
  const variables = {scienceRouteId}

  const {loading: queryLoading, error: queryError, data } = useQuery(GET_SCIENCE_GROUPS, {variables})
  const [createScienceGroup,
    { loading: creationLoading, error: creatingError }] = useMutation(CREATE_SCIENCE_GROUP, {
        update(cache, { data: {createScienceGroup} }) {
          const { scienceGroups } = cache.readQuery({ query: GET_SCIENCE_GROUPS, variables })
          const newGroup = {
            ...createScienceGroup,
            people: [],
            articles: []
          }
          cache.writeQuery({
            query: GET_SCIENCE_GROUPS,
            variables,
            data: { scienceGroups:  [...scienceGroups, newGroup]}
          })
          setviewId(scienceGroups.length-1)
        }
      })
  const [updateScienceGroup,
      { loading: updatingLoading, error: updatingError }] = useMutation(UPDATE_SCIENCE_GROUP)
  const [deleteScienceGroup,
      { loading: deletingLoading, error: deletingError }] = useMutation(DELETE_SCIENCE_GROUP, {
        update(cache, { data: { deleteScienceGroup } }) {
          const { scienceGroups } = cache.readQuery({ query: GET_SCIENCE_GROUPS, variables})
          cache.writeQuery({
            query: GET_SCIENCE_GROUPS,
            variables,
            data: { scienceGroups: scienceGroups.filter(el => el.id !== deleteScienceGroup)}
          })
        }
      })

  const [createSciencePerson,
    { loading: creatingPersonLoading, error: creatingPersonError }] = useMutation(CREATE_SCIENCE_PERSON, {
        update(cache, { data: {createSciencePerson} }) {
          const { scienceGroups } = cache.readQuery({ query: GET_SCIENCE_GROUPS, variables })
          cache.writeQuery({
            query: GET_SCIENCE_GROUPS,
            variables,
            data: {scienceGroups: Object.assign([], scienceGroups, {[viewId]: {...scienceGroups[viewId], people: [...scienceGroups[viewId].people, createSciencePerson]}})}
          })
        }
      })
  const [createScienceArticle,
    { loading: creationArticleLoading, error: creatingArticleError }] = useMutation(CREATE_SCIENCE_ARTICLE, {
        update(cache, { data: {createScienceArticle} }) {
          const { scienceGroups } = cache.readQuery({ query: GET_SCIENCE_GROUPS, variables })
          cache.writeQuery({
            query: GET_SCIENCE_GROUPS,
            variables,
            data: {scienceGroups: Object.assign([], scienceGroups, {[viewId]: {...scienceGroups[viewId], articles: [...scienceGroups[viewId].articles, createScienceArticle]}})}
          })
        }
      })
  const [updateSciencePerson,
    { loading: updatingPersonLoading, error: updatingPersonError }] = useMutation(UPDATE_SCIENCE_PERSON)
  const [updateScienceArticle,
    { loading: updatingArticleLoading, error: updatingArticleError }] = useMutation(UPDATE_SCIENCE_ARTICLE)
  const [deleteSciencePerson,
    { loading: deletingPersonLoading, error: deletingPersonError }] = useMutation(DELETE_SCIENCE_PERSON, {
      update(cache, { data: { deleteSciencePerson } }) {
        const { scienceGroups } = cache.readQuery({ query: GET_SCIENCE_GROUPS, variables })
        const newPeople = scienceGroups[viewId].people.filter(person => person.position !== deleteSciencePerson)
        .map(person => {
          if (person.position > deleteSciencePerson)
            return {...person, position: person.position - 1}
          if (person.position < deleteSciencePerson){
            return person
          }
        })
        .sort((a, b) => a.position - b.position)
        cache.writeQuery({
          query: GET_SCIENCE_GROUPS,
          variables,
          data: {scienceGroups: Object.assign([], scienceGroups, {[viewId]: {...scienceGroups[viewId], people: newPeople}})}
        })
      }
    })
  const [deleteScienceArticle,
    { loading: deletingArticleLoading, error: deletingArticleError }] = useMutation(DELETE_SCIENCE_ARTICLE, {
      update(cache, { data: { deleteScienceArticle } }) {
        const { scienceGroups } = cache.readQuery({ query: GET_SCIENCE_GROUPS, variables })
        const newArticles = scienceGroups[viewId].articles.filter(article => article.position !== deleteScienceArticle)
        .map(article => {
          if (article.position > deleteScienceArticle)
            return {...article, position: article.position - 1}
          if (article.position < deleteScienceArticle){
            return article
          }
        })
        .sort((a, b) => a.position - b.position)
        cache.writeQuery({
          query: GET_SCIENCE_GROUPS,
          variables,
          data: {scienceGroups: Object.assign([], scienceGroups, {[viewId]: {...scienceGroups[viewId], articles: newArticles}})}
        })
      }
    })
  const [movePersonPosition,
      { loading: updatingPersonPositionLoading, error: updatingPersonPositionError }] = useMutation(MOVE_PERSON, {
        update(cache, { data: { moveSciencePerson } }) {
          const { scienceGroups } = cache.readQuery({ query: GET_SCIENCE_GROUPS, variables })
          const newPeople = scienceGroups[viewId].people.map(person => {
            const foundPerson = moveSciencePerson.find(newPos => newPos.id === person.id)
             if (foundPerson) {
               return {...person, position: foundPerson.position}
             }
             return person
          }).sort((a, b) => a.position - b.position)
          cache.writeQuery({
            query: GET_SCIENCE_GROUPS,
            variables,
            data: {scienceGroups: Object.assign([], scienceGroups, {[viewId]: {...scienceGroups[viewId], people: newPeople}})}
          })
        }
      })
  const [moveArticlePosition,
        { loading: updatingArticlePositionLoading, error: updatingArticlePositionError }] = useMutation(MOVE_ARTICLE, {
          update(cache, { data: { moveScienceArticle } }) {
            const { scienceGroups } = cache.readQuery({ query: GET_SCIENCE_GROUPS, variables })
            const newArticles = scienceGroups[viewId].articles.map(article => {
              const foundArticle = moveScienceArticle.find(newPos => newPos.id === article.id)
               if (foundArticle) {
                 return {...article, position: foundArticle.position}
               }
               return article
            }).sort((a, b) => a.position - b.position)
            cache.writeQuery({
              query: GET_SCIENCE_GROUPS,
              variables,
              data: {scienceGroups: Object.assign([], scienceGroups, {[viewId]: {...scienceGroups[viewId], articles: newArticles}})}
            })
          }
        })

  if (queryLoading) return <Spinner />
  if (queryError) return <NetworkErrorComponent error={queryError} />
  if (updatingError) return <NetworkErrorComponent error={updatingError} />
  if (deletingError) return <NetworkErrorComponent error={deletingError} />
  if (creatingError) return <NetworkErrorComponent error={creatingError} />
  if (creatingPersonError) return <NetworkErrorComponent error={creatingPersonError} />
  if (creatingArticleError) return <NetworkErrorComponent error={creatingArticleError} />
  if (updatingPersonError) return <NetworkErrorComponent error={updatingPersonError} />
  if (updatingArticleError) return <NetworkErrorComponent error={updatingArticleError} />
  if (deletingPersonError) return <NetworkErrorComponent error={deletingPersonError} />
  if (deletingArticleError) return <NetworkErrorComponent error={deletingArticleError} />
  if (updatingPersonPositionError) return <NetworkErrorComponent error={updatingPersonPositionError} />
  if (updatingArticlePositionError) return <NetworkErrorComponent error={updatingArticlePositionError} />

  const onSelectScinceGroupHandler = (id) => {
    if (id === viewId) setviewId(1000)
    else setviewId(id)
  }

  const onAddNewScienceGroup = (type) => {
    switch (type){
      case 'people':
        setPeopleMode({...peopleMode, isCreating: true}) 
        break
      case 'articles':
        setArticleMode({...articleMode, isCreating: true}) 
        break
      default:
        setMode({...mode, isCreating: true})
    }
  }

  const onEditScienceGroup = (id, type) => {
    switch (type){
      case 'people':
        console.log(id)
        console.log(scienceGroups)
        setPeopleMode({...peopleMode, isEditing: true})
        setUpdatedPerson(scienceGroups[viewId].people[id])
        break
      case 'articles':
        setArticleMode({...articleMode, isEditing: true})
        setUpdatedArticle(scienceGroups[viewId].articles[id]) 
        break
      default:
        setviewId(id)
        setMode({...mode, isEditing: true})
        setUpdatedGroup(scienceGroups[id])
    }
  }

  const onDeleteScienceGroup = (id, type) => {
    setIsModalOpen(true)
    
    switch (type){
      case 'people':
        setPeopleMode({...peopleMode, isDeleting: true})
        setUpdatedPerson(scienceGroups[viewId].people[id])
        break
      case 'articles':
        setArticleMode({...articleMode, isDeleting: true})
        setUpdatedArticle(scienceGroups[viewId].articles[id]) 
        break
      default:
        setMode({...mode, isDeleting: true})
        setUpdatedGroup(scienceGroups[id])
    }
  }

  const onDeleteScienceGroupHandler = async () => {
    if (mode.isDeleting) {
      await deleteScienceGroup({ variables: {id: updatedGroup.id}})
      setMode({...mode, isDeleting: false})
      setUpdatedGroup({})
    }
    if (peopleMode.isDeleting) {
      await deleteSciencePerson({ variables: {id: updatedPerson.id}})
      setPeopleMode({...peopleMode, isDeleting: false})
      setUpdatedPerson({})
    }
    if (articleMode.isDeleting) {
      await deleteScienceArticle({ variables: {id: updatedArticle.id}})
      setArticleMode({...articleMode, isDeleting: false})
      setUpdatedArticle({})
    }
    
    setIsModalOpen(false)
    document.body.style.overflow = "scroll"
    
  }

  const onChangeGroupHandler = async (e, postData, valid) => {
    e.preventDefault()
    if (!valid) {
      setIsAbleToSave(false)
    }
    else {
      const postObject = postData.reduce((obj, item) => {
          obj[item.title] = item.value
          return obj
      } , {})
      if (mode.isEditing) {
        const forUpdate = getUpdateData(updatedGroup, postObject)
        await updateScienceGroup({ variables: {id: updatedGroup.id, inputData: forUpdate}})
        setMode({...mode, isEditing: false})
        setUpdatedGroup({})
      }
      if (mode.isCreating) {
        await createScienceGroup({ variables: {inputData: postObject, scienceRouteId }})
        setMode({...mode, isCreating: false})
      }
      if (peopleMode.isCreating) {
        await createSciencePerson({ variables: {inputData: postObject, scienceGroupId: scienceGroups[viewId].id}})
        setPeopleMode({...peopleMode, isCreating: false})
      }
      if (articleMode.isCreating) {
        await createScienceArticle({ variables: {inputData: postObject, scienceGroupId: scienceGroups[viewId].id}})
        setArticleMode({...articleMode, isCreating: false})
      }
      if (peopleMode.isEditing) {
        const forUpdate = getUpdateData(updatedPerson, postObject)
        await updateSciencePerson({ variables: {inputData: forUpdate, id: updatedPerson.id}})
        setPeopleMode({...peopleMode, isEditing: false})
        setUpdatedPerson({})
      }
      if (articleMode.isEditing) {
        const forUpdate = getUpdateData(updatedArticle, postObject)
        await updateScienceArticle({ variables: {inputData: forUpdate, id: updatedArticle.id}})
        setArticleMode({...articleMode, isEditing: false})
        setUpdatedArticle({})
      }
    } 
  }

  const onCancelEditing = (type) => {
    switch (type){
      case 'people':
        setPeopleMode({isDeleting: false, isEditing: false, isCreating: false}) 
        setUpdatedPerson({})
        break
      case 'articles':
        setArticleMode({isDeleting: false, isEditing: false, isCreating: false})
        setUpdatedArticle({}) 
        break
      default:
        setMode({isDeleting: false, isEditing: false, isCreating: false})
        setUpdatedGroup({})
    }
    
    setIsAbleToSave(true)
  }

  const onChangePosition = async (id, type, vector) => {
    if (type === 'people') {
      await movePersonPosition({variables:{id, vector}})
    }
    if (type === 'articles') {
      await moveArticlePosition({variables:{id, vector}})
    }
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
    setMode({isDeleting: false, isEditing: false, isCreating: false})
    setUpdatedGroup({})
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
              save = {isAbleToSave}
          />
        )}
        {
          mode.isCreating && <div className="p-3">
            <h3>Общая информация</h3>
            <Edit 
              onClickSubmit={onChangeGroupHandler}
              onClickCancel={onCancelEditing}
              isAbleToSave={isAbleToSave}
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
