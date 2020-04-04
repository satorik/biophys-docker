const updateAfterCreate = (cache, mutationResults, query) => {
    const { data: {createScienceRoute} } = mutationResults
    const { scienceRoutes } = cache.readQuery({ query })
    cache.writeQuery({
      query,
      data: { scienceRoutes:  [...scienceRoutes, createScienceRoute]}
    })
}

const updateAfterDelete = (cache, mutationResults, query) => {
  const { data: { deleteScienceRoute } } = mutationResults
  const { scienceRoutes } = cache.readQuery({ query })
  cache.writeQuery({
    query,
    data: { scienceRoutes: scienceRoutes.filter(el => el.id !== deleteScienceRoute)}
  })
}


export { updateAfterCreate, updateAfterDelete }