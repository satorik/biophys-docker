import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { required, length } from './utils/validators'
import { getUpdateData } from './utils/postDataHandlers'

import { updateAfterCreate, updateAfterDelete } from './utils/updateCache/news'
import * as queries from './utils/queries/news'

import ButtonAddNew from './components/UI/ButtonAddNew'
import BlogpostCard from './components/News/BlogpostCard'
import NewsRightPanelList from './components/News/NewsRightPanelList'
import NoteCarousel from './components/News/NoteCarousel'
import YesDelete from './components/Shared/DoYouWantToDelete'
import Modal from './components/UI/Modal'
import Edit from './components/Shared/Edit'
import Spinner from './components/UI/Spinner'
import ErrorBoundry from './components/Shared/ErrorHandling/ErrorBoundry'
import NetworkErrorComponent from './components/Shared/ErrorHandling/NetworkErrorComponent'
import { EmptyData } from './components/Shared/EmptyData'

const CONFERENCES_PER_PAGE = 4
const SEMINARS_PER_PAGE = 4
const BLOGPOSTS_PER_PAGE = 6
const NOTES_PER_PAGE = 5


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
    required: true,
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
  const [isError, setIsError] = React.useState(null)

  const variables = {
    limitConferences: CONFERENCES_PER_PAGE, 
    limitSeminars: SEMINARS_PER_PAGE, 
    limitBlogposts: BLOGPOSTS_PER_PAGE, 
    limitNotes: NOTES_PER_PAGE
  }

  const { loading: queryLodading, error: queryError, data } = useQuery(queries.GET_NEWS, {variables})
  const [createNote, { loading: creationLoading }] = useMutation(queries.CREATE_NOTE, {
    update: (cache, res) => updateAfterCreate(cache, res, queries.GET_NEWS, variables)})
  const [updateNote, { loading: updatingLoading}] = useMutation(queries.UPDATE_NOTE)
  const [deleteNote, { loading: deletingLoading }] = useMutation(queries.DELETE_NOTE, {
    update: (cache, res) => updateAfterDelete(cache, res, queries.GET_NEWS, variables)})
  
   
  if (queryLodading || creationLoading || updatingLoading || deletingLoading) return <Spinner />
  if (queryError) return <NetworkErrorComponent error={queryError} type='queryError' />
  if (isError) return <NetworkErrorComponent error={isError} onDismiss={() => setIsError(null)} />

  const {notes, conferences, seminars, blogposts: {posts}} = data

  const onClearMode = (operation, full = false) => {
    setIsModalOpen(false)
    document.body.style.overflow = "scroll"
    setUpdatedNote({})

    if (full) setMode({isDeleting: false, isEditing: false, isCreating: false})
    else setMode({...mode, [operation]: false})
  }

  const onSetMode = (operation) => {
    setIsModalOpen(true)
    setMode({...mode, [operation]: true})
    document.body.style.overflow = "hidden"
  }

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
    onSetMode('isCreating')
  }

  const onEditNote = (id) => {
    onSetMode('isEditing')
    setUpdatedNote(notes[id])
  }

  const onDeleteNote = (id) => {
    onSetMode('isDeleting')
    setUpdatedNote(notes[id])
  }

  const onDeleteNoteHandler = async() => {
    try {
      await deleteNote({ variables: {id: updatedNote.id}})
      onClearMode('isDeleting')
      setViewId(0)
      console.log('setting viewId')
      console.log(viewId)
    } catch(error) {
      setIsError(error)
    }
  }

  const onCloseModal = () => {
    onClearMode('_', true)
  }

  const onChangeNoteHandler = async (postObject) => {

    if (mode.isEditing) {
      const forUpdate = getUpdateData(updatedNote, postObject)
      try {
        await updateNote({ variables: {id: updatedNote.id, inputData: forUpdate}})
        onClearMode('isEditing')
      } catch(error) {
        setIsError(error)
      }
    }
    if (mode.isCreating) {
      try {
        await createNote({ variables: {inputData: postObject}})
        onClearMode('isCreating')
        setViewId(0)
      } catch(error) {
        setIsError(error)
      }
    }  
  }

  let modalTitle = ''
  if (mode.isEditing) {modalTitle = 'Редактирование объявления'}
  if (mode.isCreating) {modalTitle = 'Новое объявление'}
  if (mode.isDeleting) {modalTitle = 'Удаление объявления'}

  console.log('notes', notes)
  console.log('viewId', viewId)
  console.log('notes.length', notes.length)
  return (
    <>
    {isModalOpen && <Modal 
      isOpen={isModalOpen}
      title={modalTitle}
      onClose={onCloseModal}
    >
     { (mode.isEditing || mode.isCreating) && <Edit 
        onClickSubmit={onChangeNoteHandler}
        onClickCancel={onCloseModal}
        post={updatedNote}
        formTemplate={FORM_TEMPLATE}
      />}
      {
        (mode.isDeleting) &&  <YesDelete onDelete={onDeleteNoteHandler} onCancel={onCloseModal} info={updatedNote} instance='note'/>   
      }
    </Modal>}
    {notes.length > 0 && viewId < notes.length && <NoteCarousel 
      selectedNote={viewId}
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
    />}
    {notes.length === 0 && <EmptyData instance='note' />}
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
              {posts.length === 0 && <EmptyData instance='blogpost' secondary />}
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
