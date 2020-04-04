const updateAfterCreate = (cache, mutationResults, query) => {
  const { data: {createPrint} } = mutationResults
  const { prints } = cache.readQuery({ query })
  cache.writeQuery({
    query,
    data: { prints:  [createPrint, ...prints]}
  })
}

const updateAfterDelete = (cache, mutationResults, query) => {
  const { data: {deletePrint} } = mutationResults
  const { prints } = cache.readQuery({ query})
  cache.writeQuery({
    query,
    data: { prints: prints.filter(el => el.id !== deletePrint)}
  })
}

export {updateAfterCreate, updateAfterDelete}