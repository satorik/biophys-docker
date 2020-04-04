const updateAfterCreate = (cache, mutationResults, query, variables) => {
  const { data: {createScienceGroup} } = mutationResults

  const { scienceGroups } = cache.readQuery({ query, variables })
  const newGroup = {
    ...createScienceGroup,
    people: [],
    articles: []
  }
  cache.writeQuery({
    query,
    variables,
    data: { scienceGroups:  [...scienceGroups, newGroup]}
  })
}

const updateAfterDelete = (cache, mutationResults, query, variables) => {
  const { data: { deleteScienceGroup } } = mutationResults
  const { scienceGroups } = cache.readQuery({ query, variables})
  cache.writeQuery({
    query,
    variables,
    data: { scienceGroups: scienceGroups.filter(el => el.id !== deleteScienceGroup)}
  })
}

const updateAfterCreatePerson = (cache, mutationResults, query, variables, currentId) => {
  const { data: {createSciencePerson} } = mutationResults
  const { scienceGroups } = cache.readQuery({ query, variables })
  cache.writeQuery({
    query,
    variables,
    data: {scienceGroups: Object.assign([], scienceGroups, {[currentId]: {...scienceGroups[currentId], people: [...scienceGroups[currentId].people, createSciencePerson]}})}
  })
}

const updateAfterDeletePerson = (cache, mutationResults, query, variables, currentId) => {
  const { data: { deleteSciencePerson } } = mutationResults
  const { scienceGroups } = cache.readQuery({ query, variables })
  const newPeople = scienceGroups[currentId].people.filter(person => person.position !== deleteSciencePerson)
  .map(person => {
    if (person.position > deleteSciencePerson)
      return {...person, position: person.position - 1}
    if (person.position < deleteSciencePerson){
      return person
    }
  })
  .sort((a, b) => a.position - b.position)
  cache.writeQuery({
    query,
    variables,
    data: {scienceGroups: Object.assign([], scienceGroups, {[currentId]: {...scienceGroups[currentId], people: newPeople}})}
  })
}

const updateAfterCreateArticle = (cache, mutationResults, query, variables, currentId) => {
  const { data: {createScienceArticle} } = mutationResults
  const { scienceGroups } = cache.readQuery({ query, variables })
  cache.writeQuery({
    query,
    variables,
    data: {scienceGroups: Object.assign([], scienceGroups, {[currentId]: {...scienceGroups[currentId], articles: [...scienceGroups[currentId].articles, createScienceArticle]}})}
  })
}

const updateAfterDeleteArticle = (cache, mutationResults, query, variables, currentId) => {
  const { data: { deleteScienceArticle } } = mutationResults
  const { scienceGroups } = cache.readQuery({ query, variables })
  const newArticles = scienceGroups[currentId].articles.filter(article => article.position !== deleteScienceArticle)
  .map(article => {
    if (article.position > deleteScienceArticle)
      return {...article, position: article.position - 1}
    if (article.position < deleteScienceArticle){
      return article
    }
  })
  .sort((a, b) => a.position - b.position)
  cache.writeQuery({
    query,
    variables,
    data: {scienceGroups: Object.assign([], scienceGroups, {[currentId]: {...scienceGroups[currentId], articles: newArticles}})}
  })
}

const updateAfterMovePerson = (cache, mutationResults, query, variables, currentId) => {
  const { data: { moveSciencePerson } } = mutationResults
  const { scienceGroups } = cache.readQuery({ query, variables })
  const newPeople = scienceGroups[currentId].people.map(person => {
    const foundPerson = moveSciencePerson.find(newPos => newPos.id === person.id)
      if (foundPerson) {
        return {...person, position: foundPerson.position}
      }
      return person
  }).sort((a, b) => a.position - b.position)
  cache.writeQuery({
    query,
    variables,
    data: {scienceGroups: Object.assign([], scienceGroups, {[currentId]: {...scienceGroups[currentId], people: newPeople}})}
  })
}

const updateAfterMoveArticle = (cache, mutationResults, query, variables, currentId) => {
  const { data: { moveScienceArticle } } = mutationResults
  const { scienceGroups } = cache.readQuery({ query, variables })
  const newArticles = scienceGroups[currentId].articles.map(article => {
    const foundArticle = moveScienceArticle.find(newPos => newPos.id === article.id)
      if (foundArticle) {
        return {...article, position: foundArticle.position}
      }
      return article
  }).sort((a, b) => a.position - b.position)
  cache.writeQuery({
    query,
    variables,
    data: {scienceGroups: Object.assign([], scienceGroups, {[currentId]: {...scienceGroups[currentId], articles: newArticles}})}
  })
}

export default  {
  updateAfterCreate,
  updateAfterDelete,
  updateAfterCreatePerson,
  updateAfterDeletePerson,
  updateAfterCreateArticle,
  updateAfterDeleteArticle,
  updateAfterMovePerson,
  updateAfterMoveArticle
}