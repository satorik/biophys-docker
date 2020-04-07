import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { required, length } from './utils/validators'
import { useLocation, useHistory } from 'react-router-dom'
import { getUpdateData } from './utils/postDataHandlers'

import { updateAfterCreate, updateAfterDelete, updateAfterFetchMore } from './utils/updateCache/blog'
import * as queries from './utils/queries/blog'

import YesDelete from './components/Shared/DoYouWantToDelete'
import Blogpost from './components/Blog/Blogpost'
import ButtonAddNew from './components/UI/ButtonAddNew'
import Modal from './components/UI/Modal'
import Edit from './components/Shared/Edit'
import Spinner from './components/UI/Spinner'
import Pagination from './components/UI/Pagination'
import ErrorBoundry from './components/Shared/ErrorHandling/ErrorBoundry'
import NetworkErrorComponent from './components/Shared/ErrorHandling/NetworkErrorComponent'
import {EmptyData} from './components/Shared/EmptyData'

const POSTS_PER_PAGE = 6

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
    title: 'content',
    label:'Содержание',
    type:'textarea-long',
    required: true,
    validators: [required, length({ min: 50 })]
  }
] 

function useQueryUrl() {
  return new URLSearchParams(useLocation().search)
}

const Blog = () => {

  const history = useHistory()

  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [mode, setMode] = React.useState({isEditing: false, isCreating: false, isDeleting: false})
  const [pageNumber, setPageNumber] = React.useState(1)
  const [updatedPost, setUpdatedPost] = React.useState({})
  const [viewId, setViewId] = React.useState(null)
  const [shouldScroll, setShouldScroll] = React.useState(false)
  const [isError, setIsError] = React.useState(null)

  const queryUrl = useQueryUrl()
  const urlId = queryUrl.get("id")

  const variables = {
    offset: 0, 
    limit: POSTS_PER_PAGE
  }

  const { loading: queryLodading, error: queryError, data, fetchMore } = 
    useQuery(queries.GET_BLOGPOSTS, {variables, fetchPolicy: 'cache-and-network' })
  const [createBlogpost, { loading: creationLoading }] = useMutation(queries.CREATE_BLOGPOST, {
    update: (cache, res) => updateAfterCreate(cache, res, queries.GET_BLOGPOSTS, variables)})
  const [updateBlogpost, { loading: updatingLoading }] = useMutation(queries.UPDATE_BLOGPOST)
  const [deleteBlogpost, { loading: deletingLoading }] = useMutation(queries.DELETE_BLOGPOST, {
    update: (cache, res) => updateAfterDelete(cache, res, queries.GET_BLOGPOSTS, variables)})
  
  React.useEffect(() => {
    if (data && urlId) {
      const postIdx = data.blogposts.posts.indexOf(data.blogposts.posts.find(el => el.id === urlId))
      setViewId(postIdx)
    }
    else if (data && !urlId) {
      setViewId(null)
    }
  }, [data, urlId])

  React.useEffect(() => {
     if (urlId) {
      setShouldScroll(true)
     }
  }, [])

  if (queryLodading || creationLoading || updatingLoading || deletingLoading) return <Spinner />
 
  if (queryError) return <NetworkErrorComponent error={queryError} type='queryError' />
  if (isError) return <NetworkErrorComponent error={isError} onDismiss={() => setIsError(null)} />

  const blogposts = data.blogposts.posts
  const totalPages = Math.ceil(data.blogposts.total/POSTS_PER_PAGE)

  const onViewBlogpostDetails = (i) => {
    if (viewId === i) {
      history.push({search: ''})
    }
    else {
      history.push({search: '?id='+data.blogposts.posts[i].id})
    }
  }

  const onClearMode = (operation, full = false) => {
    setIsModalOpen(false)
    document.body.style.overflow = "scroll"
    setUpdatedPost({})
 
    if (full) setMode({isDeleting: false, isEditing: false, isCreating: false})
    else setMode({...mode, [operation]: false})
  }

  const onSetMode = (operation) => {
    setIsModalOpen(true)
    setMode({...mode, [operation]: true})
    document.body.style.overflow = "hidden"
  }


  const onAddNewBlogpost = () => {
    onSetMode('isCreating')
  }

  const onEditBlogpost = (id) => {
    onSetMode('isEditing')
    setUpdatedPost(blogposts[id])
  }
  const onDeleteBlogpost = (id) => {
    onSetMode('isDeleting')
    setUpdatedPost(blogposts[id])
  }

  const onDeletePostHandler = async () => {
    try {
      await deleteBlogpost({ variables: {id: updatedPost.id}})
      onClearMode('isDeleting')
     // history.push({ search: ''})
    } catch(error) {
      setIsError(error)
    }
  }

  const onPaginate = (page) => {
    fetchMore({ 
      variables: {offset: POSTS_PER_PAGE*(page-1)},
      updateQuery: (prev, { fetchMoreResult }) => updateAfterFetchMore(prev, { fetchMoreResult })
    })

    setPageNumber(page)
    history.push({search: ''})
  }

  const onCloseModal = () => {
    onClearMode('_', true)
  }

  const onChangePostHandler = async (postObject) => { 
    if (mode.isEditing) {
      let forUpdate = getUpdateData(updatedPost, postObject)
      try {
        await updateBlogpost({ variables: {id: updatedPost.id, inputData: forUpdate}})
        onClearMode('isEditing')
      } catch(error) {
        setIsError(error)
      }
    }
    if (mode.isCreating) {
      try {
        await createBlogpost({ variables: {inputData: postObject}})
        onClearMode('isCreating')
      } catch(error) {
        setIsError(error)
      }
    }
  }

  let modalTitle = ''
  if (mode.isEditing) {modalTitle = 'Редактирование записи в блоге'}
  if (mode.isCreating) {modalTitle = 'Новая запись в блоге'}
  if (mode.isDeleting) {modalTitle = 'Удаление записи из блога'}

 
  return (
    <>
   {isModalOpen && <Modal 
      isOpen={isModalOpen}
      title={modalTitle}
      onClose={onCloseModal}
    >
     { (mode.isEditing || mode.isCreating) && <Edit
        onClickSubmit={onChangePostHandler}
        onClickCancel={onCloseModal}
        post={updatedPost}
        formTemplate={FORM_TEMPLATE}
      />}
      {
        (mode.isDeleting) &&  <YesDelete onDelete={onDeletePostHandler} onCancel={onCloseModal} info={updatedPost} instance='blogpost' />    
      }
    </Modal>}
    {blogposts.length > 0 && <div className="container">
      {blogposts.map((blogpost, idx) => 
          <Blogpost 
            blogpost = {blogpost} 
            key={blogpost.id} 
            idx={idx} 
            id={blogpost.id}
            onClickEdit={() => onEditBlogpost(idx)}
            onClickDelete={() => onDeleteBlogpost(idx)}
            showContent={idx === viewId}
            onHandleCaretDown={() => onViewBlogpostDetails(idx)}
            toScroll={shouldScroll ? urlId : null}
            onScroll={() => setShouldScroll(false)}
            //divRef={el => divElement[blogpost.id] = el} 
          />)}
      <Pagination 
        totalPages={totalPages} 
        currentPage={pageNumber} 
        onClickPage={onPaginate}  
        />
    </div>}
    {blogposts.length === 0 && <EmptyData instance='blogpost' />}
    <ButtonAddNew
      color='red'
      onClickAddButton={onAddNewBlogpost}
      fixed
      size='4'
      />
    </>
  )
}

export default ErrorBoundry(Blog)
