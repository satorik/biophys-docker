const updateAfterCreate = (cache, mutationResults, query) => {
  const { data: {createPartnership} } = mutationResults
  const { partnership } = cache.readQuery({ query })
  cache.writeQuery({
    query,
    data: { partnership:  [...partnership, createPartnership]}
  })
}

const updateAfterDelete = (cache, mutationResults, query) => {
  const { data: {deletePartnership} } = mutationResults
  const { partnership } = cache.readQuery({ query})
  cache.writeQuery({
    query,
    data: { partnership: partnership.filter(el => el.id !== deletePartnership)}
  })
}

export {updateAfterCreate, updateAfterDelete}