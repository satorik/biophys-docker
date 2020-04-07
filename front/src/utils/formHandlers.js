import { getIntitialValue } from './valueHandlers'
  
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
        value: getIntitialValue(element.type, forUpdate, post, element.title, element.label, element.required),
        valid: forUpdate || !element.required || element.type === 'radio' || element.type === 'check',
        touched: getTouched(element.type),
        validationErrors:[]
      } 
      }) 
  }
 
  const postInputChange = (form, id, value, isForUpdate) => {

    let valueForCheck = value
    let isValid = true
    let validationError = null
    
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
        const checkValid = validator(valueForCheck)
        isValid = isValid && checkValid.valid
        if (!checkValid.valid) validationError = checkValid.error
      }
    }
    return form.map((control, idx) => {
      if (idx !== id ) {
        return control
      }
      return {
        ...control,
        value: value,
        valid: isValid,
        validationErrors: validationError
      }
    })

  }

  const checkFormIsValid = (form) => {

    let formValid = true
    
    const setTouchedTrue = (obj) => {
      let newObj = {}
      Object.keys(obj).forEach(key => {
        newObj = {
          ...newObj,
          [key]: true
        }
      })
      return newObj
    }
    const updatedForm = form.map( item =>
      {
        let newItem = {}
        if (item.value === '' && item.required === true) {
          newItem = {
            ...item, 
            touched: true,
            validationErrors: 'Поле обязательно для заполнения'
          }
        }
        else if (typeof(item.value) === 'object' && item.required === true) {
          let allExist = true
          Object.keys(item.value).forEach(key => { allExist = allExist && item.value[key] != ''})
          newItem = {
            ...item, 
            touched: setTouchedTrue(item.touched),
            validationErrors: 'Поле обязательно для заполнения'
          }
        }
        else newItem = item
        formValid = formValid && newItem.valid
        return newItem
      }
    )

    return {
      postForm: updatedForm,
      formValid: formValid
    }
  }

  const postInputBlur = (form, id, subType = null) => {
    return form.map((control, idx) => {
      if (idx !== id) {
        return control
      }
      return {
        ...control,
        touched: getTouched(control.type, subType, control.touched, true),
        validationErrors: (control.required && !control.valid) ? 'Поле обязательно для заполнения' : ''
      }
    })
  }

  export { postInputChange, postInputBlur, createPostForm, checkFormIsValid }