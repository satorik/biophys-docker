const updateAfterCreate = (cache, mutationResults, query) => {
  const { data: {createDepartmentPerson} } = mutationResults
  const { staff } = cache.readQuery({ query })
  cache.writeQuery({
    query,
    data: { staff:  [...staff, createDepartmentPerson]}
  })
}

const updateAfterDelete = (cache, mutationResults, query) => {
  const { data: {deleteDepartmentPerson} } = mutationResults
  const { staff } = cache.readQuery({ query})
  const newStaff = staff.filter(person => person.position !== deleteDepartmentPerson)
      .map(person => {
        if (person.position > deleteDepartmentPerson)
          return {...person, position: person.position - 1}
        if (person.position < deleteDepartmentPerson){
          return person
        }
      })
      .sort((a, b) => a.position - b.position)
  cache.writeQuery({
    query,
    data: { staff: newStaff}
  })
}

const updateAfterMove = (cache, mutationResults, query) => {
  const { data: {moveDepartmentPerson} } = mutationResults
  const { staff } = cache.readQuery({ query })
  const newStaff = staff.map(person => {
    const foundPerson = moveDepartmentPerson.find(newPos => newPos.id === person.id)
      if (foundPerson) {
        return {...person, position: foundPerson.position}
      }
      return person
  }).sort((a, b) => a.position - b.position)
  cache.writeQuery({
    query,
    data: {staff: newStaff}
  })
}

export {updateAfterCreate, updateAfterDelete, updateAfterMove}