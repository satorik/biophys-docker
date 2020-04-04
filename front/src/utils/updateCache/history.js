const updateAfterCreate = (cache, mutationResults, query) => {
  const { data: {createHistory} } = mutationResults
  cache.writeQuery({
    query,
    data: { history: createHistory}
  })
}

const updateAfterDelete = (cache, query) => {
  cache.writeQuery({
    query,
    data: { history: null}
  })
}

export {updateAfterCreate, updateAfterDelete}