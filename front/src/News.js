import React from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import { required, length, date } from './utils/validators'

import HeaderNews from './components/UI/Header/HeaderNews'
import ButtonAddNew from './components/UI/ButtonAddNew'
import BlogpostCard from './components/News/BlogpostCard'
import NewsRightPanelList from './components/News/NewsRightPanelList'
import NoteCarousel from './components/News/NoteCarousel'
import YesDelete from './components/Shared/DoYouWantToDelete'
import Modal from './components/UI/Modal'
import Edit from './components/Shared/Edit'
import Spinner from './components/UI/Spinner'
import ErrorBoundry from './components/Shared/ErrorHandling/ErrorBoundry'
import getUpdateData from './utils/getObjectForUpdate'
import NetworkErrorComponent from './components/Shared/ErrorHandling/NetworkErrorComponent'


const CONFERENCES_PER_PAGE = 4
const SEMINARS_PER_PAGE = 4
const BLOGPOSTS_PER_PAGE = 6
const NOTES_PER_PAGE = 5

const GET_NEWS = gql`                    
  query getNews($limitConferences: Int, $limitSeminars: Int, $limitBlogposts: Int, $limitNotes: Int){
    blogposts(limit: $limitBlogposts){
      posts{
        id
        title
        description
        imageUrl
      }
    }
    seminars(limit: $limitSeminars) {
      id
      date
      title
      description
    }
    notes(limit: $limitNotes) {
      id
      title
      description
      content
      onTop
    }
    conferences(limit: $limitConferences) {
      id
      title
      description
      dateFrom
      dateTo
    }
  }
`

const CREATE_NOTE = gql`
  mutation createNote($inputData: NoteCreateData!) {
    createNote(inputData: $inputData) {
      id
      title
      content
      description
      onTop
    }
  }
`

const DELETE_NOTE = gql`
  mutation deleteNote($id: ID!) {
    deleteNote(id: $id) 
  }
`
const UPDATE_NOTE = gql`
  mutation updateNote($id: ID!, $inputData: NoteUpdateData!) {
    updateNote(id: $id, inputData: $inputData) {
      updatedNote {
        id
        title
        content
        description
        onTop
      }
      removedFromTop {
        id
        title
        content
        description
        onTop
      }
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
    validators: [required, length({ min: 5, max: 250 })]
  },
  {
    title: 'content',
    label:'Содержание',
    type:'textarea-long',
    validators: [length({ min: 5 })]
  },
  {
    title: 'onTop',
    label:'Закрепить',
    type:'check',
    validators: []
  }
] 

const News = () => {
  const [viewId, setViewId] = React.useState(0)
  const [showContent, setShowContent] = React.useState(false)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [mode, setMode] = React.useState({isEditing: false, isCreating: false, isDeleting: false})
  const [updatedNote, setUpdatedNote] = React.useState({})
  const [isAbleToSave, setIsAbleToSave] = React.useState(true)

  const variables = {
    limitConferences: CONFERENCES_PER_PAGE, 
    limitSeminars: SEMINARS_PER_PAGE, 
    limitBlogposts: BLOGPOSTS_PER_PAGE, 
    limitNotes: NOTES_PER_PAGE
  }

  const { loading: queryLodading, error: queryError, data } = useQuery(GET_NEWS, {variables})

  const [createNote,
        { loading: creationLoading, error: creatingError }] = useMutation(CREATE_NOTE, {
            update(cache, { data: {createNote} }) {
              const { notes } = cache.readQuery({ query: GET_NEWS, variables })
              cache.writeQuery({
                query: GET_NEWS,
                variables,
                data: { ...data, notes:  [createNote, ...notes]}
              })
            }
          })
  const [updateNote,
        { loading: updatingLoading, error: updatingError }] = useMutation(UPDATE_NOTE)
  const [deleteNote,
        { loading: deletingLoading, error: deletingError }] = useMutation(DELETE_NOTE, {
          update(cache, { data: { deleteNote } }) {
            const { notes } = cache.readQuery({ query: GET_NEWS, variables})
            cache.writeQuery({
              query: GET_NEWS,
              variables,
              data: { ...data, notes: notes.filter(el => el.id !== deleteNote)}
            })
          }
        })
  
   
  if (queryLodading) return <Spinner />
  if (queryError) return <NetworkErrorComponent error={queryError} />
  if (updatingError) return <NetworkErrorComponent error={updatingError} />
  if (deletingError) return <NetworkErrorComponent error={deletingError} />
  if (creatingError) return <NetworkErrorComponent error={creatingError} />

  const {notes, conferences, seminars, blogposts: {posts}} = data

  const onHandleNextNote = () => {
    setShowContent(false)
    if (viewId === notes.length-1) {
      setViewId(0)
    }
    else {
      setViewId(viewId+1)
    }
  }

  const onHandlePrevNote = () => {
    setShowContent(false)
    if (viewId === 0) {
      setViewId(notes.length-1)
    }
    else {
      setViewId(viewId-1)
    }
  }

  const onHandleCaretDown = () => {
    setShowContent(!showContent)
  }

  const onAddNewNote = () => {
    setIsModalOpen(true)
    setMode({...mode, isCreating: true})
    document.body.style.overflow = "hidden"
  }

  const onEditNote = (id) => {
    setIsModalOpen(true)
    setMode({...mode, isEditing: true})
    document.body.style.overflow = "hidden"
    setUpdatedNote(notes[id])
  }
  const onDeleteNote = (id) => {
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
    setMode({...mode, isDeleting: true})
    setUpdatedNote(notes[id])
  }

  const onDeleteNoteHandler = async() => {
    console.log('deteting')
    await deleteNote({ variables: {id: updatedNote.id}})
    setIsModalOpen(false)
    setMode({...mode, isDeleting: false})
    document.body.style.overflow = "scroll"
    setUpdatedNote({})
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
    setMode({isDeleting: false, isEditing: false, isCreating: false})
    setUpdatedNote({})
    document.body.style.overflow = "scroll"
  }

  const onChangeNoteHandler = async (e, postData, valid, id) => {
    e.preventDefault()
    if (!valid) {
      setIsAbleToSave(false)
    }
    else {
      let postObject = postData.reduce((obj, item) => {
          obj[item.title] = item.value
          return obj
      } ,{})
      setIsModalOpen(false)
      document.body.style.overflow = "scroll"
      if (mode.isEditing) {
        const forUpdate = getUpdateData(updatedNote, postObject)
        await updateNote({ variables: {id: updatedNote.id, inputData: forUpdate}})      
        setMode({...mode, isEditing: false})
        setUpdatedNote({})
      }
      if (mode.isCreating) {
        await createNote({ variables: {inputData: postObject}})
        setMode({...mode, isCreating: false})
      }
    } 
  }

  let modalTitle = ''
  if (mode.isEditing) {modalTitle = 'Редактирование объявления'}
  if (mode.isCreating) {modalTitle = 'Новое объявление'}
  if (mode.isDeleting) {modalTitle = 'Удаление объявления'}


  return (
    <>
    {/* <HeaderNews 
      note={noteOnTop }
    /> */}
    {isModalOpen && <Modal 
      isOpen={isModalOpen}
      title={modalTitle}
      onClose={onCloseModal}
    >
     { (mode.isEditing || mode.isCreating) && <Edit 
        onClickSubmit={onChangeNoteHandler}
        onClickCancel={onCloseModal}
        isAbleToSave={isAbleToSave}
        post={updatedNote}
        formTemplate={FORM_TEMPLATE}
      />}
      {
        (mode.isDeleting) &&  <YesDelete onDelete={onDeleteNoteHandler} onCancel={onCloseModal} info={updatedNote} instance='note'/>   
      }
    </Modal>}
    <NoteCarousel 
      viewId={viewId}
      showContent={showContent}
      last={notes.length-1}
      content={notes[viewId].content}
      title={notes[viewId].title}
      description={notes[viewId].description}
      onClickLeft={onHandlePrevNote}
      onClickRight={onHandleNextNote}
      onClickDown={onHandleCaretDown}
      onClickEdit={() => onEditNote(viewId)}
      onClickDelete={() => onDeleteNote(viewId)}
    />
    <div className="container-fluid mt-5">
      <div className="row">
          <div className="col-md-8">
            {posts.map(post => 
              <BlogpostCard 
                key={post.id}
                id={post.id}
                imageUrl={post.imageUrl}
                title={post.title}
                description={post.description}
              />)}
          </div>
          <div className="col-md-4">
          <NewsRightPanelList posts={seminars} contentType='seminar'  />
          <NewsRightPanelList posts={conferences} contentType='conference'  />
          </div>
      </div>
    </div>
    <ButtonAddNew
        color='red'
        onClickAddButton={onAddNewNote}
        fixed
        size='4'
      />
    </>
  ) 
}

export default ErrorBoundry(News)
