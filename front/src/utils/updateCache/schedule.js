const updateAfterCreate = (cache, mutationResults, query, variables) => {
  const { data } = mutationResults
  const { createScheduleYear } = data
  const { years } = cache.readQuery({ query, variables })
  cache.writeQuery({
    query,
    variables,
    data: {...data,  years:  [...years, createScheduleYear]}
  })
}

const updateAfterDelete = (cache, mutationResults, query, variables) => {
  const { data } = mutationResults
  const { deleteScheduleYear } = data
  const { years } = cache.readQuery({ query, variables})
  cache.writeQuery({
    query,
    variables,
    data: { ...data, years: years.filter(el => el.id !== deleteScheduleYear)}
  })
}


const updateAfterCreateTime = (cache, mutationResults, query, variables, currentId) => {
  const { data } = mutationResults
  const { createScheduleTimetable } = data
  const { years } = cache.readQuery({ query, variables })
  let timetable = years[currentId].timetable.slice()
  if (createScheduleTimetable.double ) {
    timetable = timetable.map(el => {
      if (createScheduleTimetable.double.id === el.id) {
        return {
          ...el,
          isDouble: createScheduleTimetable.double.isDouble
        }
      }
      return el
    })
  }
  cache.writeQuery({
    query,
    variables,
    data: { ...data, years: years.map((year, idx) => {
      if (idx === currentId) {
        return {
          ...year,
          timetable: [...timetable, createScheduleTimetable.timetable]
        }
      }
      return year
    })}
  })
}

const updateAfterDeleteTime = (cache, mutationResults, query, variables, currentId) => {
  const { data } = mutationResults
  const { deleteScheduleTimetable } = data
  const { years } = cache.readQuery({ query, variables})
  cache.writeQuery({
    query,
    variables,
    data: { ...data, years: years.map((year, idx) => {
      if (idx === currentId) {
        return {
          ...year,
          timetable: year.timetable.filter(el => el.id !== deleteScheduleTimetable.id)
              .map(el => {
                if (deleteScheduleTimetable.double && deleteScheduleTimetable.double.id === el.id) {
                return {
                  ...el,
                  isDouble: deleteScheduleTimetable.double.isDouble
                }
                }
                return el
              })
        }
      }
      return year
    })}
  })
}




export {updateAfterCreate, updateAfterDelete, updateAfterCreateTime, updateAfterDeleteTime}