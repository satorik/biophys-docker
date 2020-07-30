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
    data: { 
      ...data, 
      courses: courses.map((course, idx) => {
        if (idx === currentId) {
          return {
            ...course,
            resourses: [...course.resourses, createEducationResourse.resourse]
          }
        }
        return course
      }),
      forms: createEducationResourse.forms
    }
  })
}

const updateAfterUpdateResourse = (cache, mutationResults, query, currentId) => {
  const { data } = mutationResults
  const { updateEducationResourse } = data
  const { courses } = cache.readQuery({ query })
  
  cache.writeQuery({
    query,
    data: { 
      ...data, 
      courses: courses.map((course, idx) => {
        if (idx === currentId) {
          const newResourses = course.resourses.filter(el => el.id !== updateEducationResourse.resourse.id)
          return {
            ...course,
            resourses: [...newResourses, updateEducationResourse.resourse]
          }
        }
        return course
      }),
      forms: updateEducationResourse.forms
    }
  })
}

const updateAfterDeleteResourse = (cache, mutationResults, query, currentId) => {
  const { data } = mutationResults
  const { deleteEducationResourse } = data
  const { courses } = cache.readQuery({ query })

  cache.writeQuery({
    query,
    data: { 
      ...data, 
      courses: courses.map((course, idx) => {
        if (idx === currentId) {
          return {
            ...course,
            resourses: course.resourses.filter(el => el.id !== deleteEducationResourse.resourse.id)
          }
        }
        return course
      }),
      forms: deleteEducationResourse.forms
    }
  })
}

export {updateAfterCreate, updateAfterDelete, updateAfterCreateResourse, updateAfterDeleteResourse, updateAfterUpdateResourse}