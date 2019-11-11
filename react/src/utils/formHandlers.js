  const getValue = (type, isForUpdate, oldData, control) => {
    if (type === 'file') {return ''}
    if (isForUpdate) {
      if (type === 'date') {
        return {
        day: new Date(oldData[control]).getDate(), 
        month: new Date(oldData[control]).getMonth(), 
        year: new Date(oldData[control]).getFullYear()
        }
      }
      if (type === 'datetime') {
        return {
        day: new Date(oldData[control]).getDate(), 
        month: new Date(oldData[control]).getMonth(), 
        year: new Date(oldData[control]).getFullYear(),
        hours: new Date(oldData[control]).getHours(),
        minutes: new Date(oldData[control]).getMinutes()
        }
      }
      return oldData[control] 
    }
    if (type === 'date') {return {day: '', month: new Date().getMonth(), year: new Date().getFullYear()}}
    if (type === 'datetime') {return {day: '', month: new Date().getMonth(), year: new Date().getFullYear(), hours: '00', minutes: '00' }}
    return ''
  }

 const createPostForm = (template, post) => {
   const forUpdate = Object.entries(post).length !== 0
   return template.map(element => {
        return {
        ...element,
        value: getValue(element.type, forUpdate, post, element.title),
        valid: forUpdate,
        touched: false
      } 
    }) 
 }
 
 const postInputChange = (form, id, value) => {
    
    let isValid = true
    
    for (const validator of form[id].validators) {
        isValid = isValid && validator(value)
    }
    const updatedForm = form.map((control, idx) => {
      if (idx !== id ) {
        return control
      }
      return {
        ...control,
        value: value,
        valid: isValid
      }
    })

    let formIsValid = true

    updatedForm.forEach( item =>
      {formIsValid = formIsValid && item.valid}
    )

    return {
      postForm: updatedForm,
      formIsValid: formIsValid
    }
  }

  const postInputBlur = (form, id) => {
    return form.map((control, idx) => {
      if (idx !== id) {
        return control
      }
      return {
        ...control,
        touched: true
      }
    })
  }

  export { postInputChange, postInputBlur, createPostForm }