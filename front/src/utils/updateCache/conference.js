const updateAfterCreate = (cache, mutationResults, query, variables) => {
  const { data: {createConference} } = mutationResults
  const { conferences } = cache.readQuery({ query, variables })
  cache.writeQuery({
    query,
    variables,
    data: { conferences:  [createConference, ...conferences]}
  })
}

const updateAfterDelete = (cache, mutationResults, query, variables) => {
  const { data: {deleteConference} } = mutationResults
  const { conferences } = cache.readQuery({ query, variables})
  cache.writeQuery({
    query,
    variables,
    data: { conferences: conferences.filter(el => el.id !== deleteConference)}
  })
}

export {updateAfterCreate, updateAfterDelete}