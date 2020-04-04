const updateAfterCreate = (cache, mutationResults, query) => {
  const { data } = mutationResults
  const { createEducationCourse } = data
  const { courses } = cache.readQuery({ query })
  cache.writeQuery({
    query,
    data: {...data,  courses:  [...courses, createEducationCourse]}
  })
}

const updateAfterDelete = (cache, mutationResults, query) => {
  const { data } = mutationResults
  const { deleteEducationCourse } = data
  const { courses } = cache.readQuery({ query})
  cache.writeQuery({
    query,
    data: { ...data, courses: courses.filter(el => el.id !== deleteEducationCourse)}
  })
}

const updateAfterCreateResourse = (cache, mutationResults, query, currentId) => {
  const { data } = mutationResults
  const { createEducationResourse } = data
  const { courses } = cache.readQuery({ query })
  cache.writeQuery({
    query,
    data: { ...data, courses: courses.map((course, idx) => {
      if (idx === currentId) {
        return {
          ...course,
          resourses: [...course.resourses, createEducationResourse]
        }
      }
      return course
    })}
  })
}

const updateAfterDeleteResourse = (cache, mutationResults, query, currentId) => {
  const { data } = mutationResults
  const { deleteEducationResourse } = data
  const { courses } = cache.readQuery({ query })
  cache.writeQuery({
    query,
    data: { ...data, courses: courses.map((course, idx) => {
      if (idx === currentId) {
        return {
          ...course,
          resourses: course.resourses.filter(el => el.id !== deleteEducationResourse)
        }
      }
      return course
    })}
  })
}

export {updateAfterCreate, updateAfterDelete, updateAfterCreateResourse, updateAfterDeleteResourse}