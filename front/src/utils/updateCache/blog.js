const updateAfterCreate = (cache, mutationResults, query, variables) => {
  const { data: {createBlogpost} } = mutationResults
  const { blogposts } = cache.readQuery({ query, variables })
  cache.writeQuery({
    query,
    variables,
    data: { blogposts:  {...blogposts, posts:  [createBlogpost, ...blogposts.posts]}}
  })
}

const updateAfterDelete = (cache, mutationResults, query, variables) => {
  const { data: {deleteBlogpost} } = mutationResults
  const { blogposts } = cache.readQuery({ query , variables})
  cache.writeQuery({
    query,
    variables,
    data: { blogposts: {...blogposts, posts: blogposts.posts.filter(el => el.id !== deleteBlogpost)}}
  })
}

const updateAfterFetchMore = (prev, { fetchMoreResult }) => {
  if (!fetchMoreResult) return prev
  return Object.assign({}, prev, {
    blogposts: { 
        ...prev.blogposts, 
        posts: [...fetchMoreResult.blogposts.posts]}
    } 
  )
}

export {updateAfterCreate, updateAfterDelete, updateAfterFetchMore}