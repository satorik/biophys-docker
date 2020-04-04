const updateAfterCreate = (cache, mutationResults, query, variables) => {
  const { data: {createSeminar} } = mutationResults
  const { seminars } = cache.readQuery({ query, variables })
  cache.writeQuery({
    query,
    variables,
    data: { seminars:  [createSeminar, ...seminars]}
  })
}

const updateAfterDelete = (cache, mutationResults, query, variables) => {
  const { data: {deleteSeminar} } = mutationResults
  const { seminars } = cache.readQuery({ query, variables})
  cache.writeQuery({
    query,
    variables,
    data: { seminars: seminars.filter(el => el.id !== deleteSeminar)}
  })
}

export {updateAfterCreate, updateAfterDelete}