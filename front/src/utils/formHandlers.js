
  const getValue = (type, isForUpdate, oldData, control, label, required) => {
    if (type === 'file') {return ''}
    if (isForUpdate) {
      if (type === 'date') {
        return {
        day: new Date(oldData[control]).getDate(), 
        month: new Date(oldData[control]).getMonth(), 
        year: new Date(oldData[control]).getFullYear()
        }
      }
      if (type === 'time') {
        return {
          hours: oldData[control] ? oldData[control].split(':')[0] : '',
          minutes: oldData[control] ? oldData[control].split(':')[1] : ''
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
      if (type === 'course') {
        return {
        course: oldData[control].course,  
        year: new Date(oldData[control]).getFullYear(),
        term: oldData[control].term
        }
      }
      if (type === 'resourse') {
        return {
        educationFormId: oldData.form.parentForm? oldData.form.parentForm.id : oldData.form.id,  
        file: '',
        subSectionId: oldData.form.parentForm ? oldData.form.id : '',
        subSectionText:''
        }
      }
       if (type === 'radio' || type === 'check') {
        return oldData[control]
       }
      return oldData[control] || ''
    }
    if (type === 'date') {return {day: '', month: new Date().getMonth(), year: new Date().getFullYear()}}
    if (type === 'datetime') {return {day: '', month: new Date().getMonth(), year: new Date().getFullYear(), hours: '', minutes: '' }}
    if (type === 'time') {return {hours: '', minutes: ''}}
    if (type === 'radio') { return label[0].value}
    if (type === 'check') { return false}
    if (type === 'course') {return {course: '', year: new Date().getFullYear(), term: 1}}
    if (type === 'resourse') {return {educationFormId: label[0].id, file: '', subSectionId: '', subSectionText: ''}}

    return ''
  }

  const getTouched = (type, subType = null, old = null, check = false) => {
    if (!check) {
      if (type === 'datetime') return {
          day: false,
          hours: false,
          minutes: false
        }
      else if (type === 'time') return {
        hours: false,
        minutes: false
      }
      else if (type === 'day') return {
        day: false,
      }
      return check
    }
    else {
      if (subType) return {...old, [subType]: true}
      else return true
    }
  }
  
 const createPostForm = (template, post) => {
   const forUpdate = Object.entries(post).length !== 0
   return template.map(element => {
      return {
      ...element,
      value: getValue(element.type, forUpdate, post, element.title, element.label, element.required),
      valid: forUpdate || !element.required || element.type === 'radio' || element.type === 'check',
      touched: getTouched(element.type),
      validationErrors:[]
    } 
    }) 
 }
 
 const postInputChange = (form, id, value, isForUpdate) => {

    let valueForCheck = value
    let isValid = true
    
    if (form[id].type === 'course') {
      valueForCheck = value.course
    }
    if (form[id].type === 'resourse') {
      if (!isForUpdate) {
        valueForCheck = value.file
      }
      else {valueForCheck = 'exists'}   
    }
 
    if (form[id].validators && form[id].validators.length > 0) {
      for (const validator of form[id].validators) {
          isValid = isValid && validator(valueForCheck)
      }
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

  const postInputBlur = (form, id, subType = null) => {
    return form.map((control, idx) => {
      if (idx !== id) {
        return control
      }
      return {
        ...control,
        touched: getTouched(control.type, subType, control.touched, true)
      }
    })
  }

  export { postInputChange, postInputBlur, createPostForm }