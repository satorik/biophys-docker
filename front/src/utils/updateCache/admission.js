const updateAfterCreate = (cache, mutationResults, query) => {
  const { data: {createAdmission} } = mutationResults
  cache.writeQuery({
    query,
    data: { admission: createAdmission}
  })
}

const updateAfterDelete = (cache, query) => {
  cache.writeQuery({
    query,
    data: { admission: null }
  })
}

export {updateAfterCreate, updateAfterDelete}