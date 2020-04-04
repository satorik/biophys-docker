const updateAfterCreate = (cache, mutationResults, query, variables) => {
  const { data } = mutationResults
  const { createNote } = data
  const { notes } = cache.readQuery({ query, variables })
  cache.writeQuery({
    query,
    variables,
    data: { ...data, notes:  [createNote, ...notes]}
  })
}

const updateAfterDelete = (cache, mutationResults, query, variables) => {
  const { data } = mutationResults
  const { deleteNote } = data
  const { notes } = cache.readQuery({ query, variables})
  cache.writeQuery({
    query,
    variables,
    data: { ...data, notes: notes.filter(el => el.id !== deleteNote)}
  })
}

export {updateAfterCreate, updateAfterDelete}