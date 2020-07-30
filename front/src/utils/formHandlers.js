  import { getIntitialValue } from './valueHandlers'

  const checkValueEmpty = (value) => {
    if (value instanceof File) return false
    else if (typeof(value) === 'object') {
      let nonExist = true
      Object.keys(value).forEach(item => {
        nonExist = nonExist && value[item] === ''
      })
      return nonExist
    }
    else return value === ''
  }

  const createPostForm = (template, post) => {
    const forUpdate = Object.entries(post).length !== 0
    return template.map(element => {
        return {
        ...element,
        value: getIntitialValue(element.type, forUpdate, post, element.title, element.label, element.required),
        valid: forUpdate || !element.required || element.type === 'radio' || element.type === 'check',
        touched: false, //getTouched(element.type),
        validationErrors:[]
      } 
      }) 
  }
 
  // const checkResourseInput = (validators, value, isForUpdate) => {
  //   let isValid = true
  //   let validationError = null
    
  //   for (const validator of validators) {
  //     if (validator.name !== 'isUrl') {
  //       const checkValid = validator(value.file)
  //       isValid = isValid && checkValid.valid
  //       validationError = checkValid.error
  //     }
  //   }
    
  //   return {valid: isValid, validationError: validationError}
  // }

  const postInputChange = (form, id, value, isForUpdate) => {

    let valueForCheck = value
    let isValid = true
    let validationError = null
    
    if (form[id].type === 'course') {
      valueForCheck = value.course
    }
    if (form[id].type === 'resourse') {
      valueForCheck = value.file
    }

    if (form[id].validators && form[id].validators.length > 0) {
      for (const validator of form[id].validators) {
        //console.log('formHandlers', form[id].type, value.educationFormId, validator.name)
        if(!(form[id].type === 'resourse' && value.educationFormId === '4' && validator.name === 'isPdf')
            && !(form[id].type === 'resourse' && value.educationFormId !== '4' && validator.name === 'isUrl') ){
            const checkValid = validator(valueForCheck)
            isValid = isValid && checkValid.valid
            validationError = checkValid.error
            }
      }
    }
    
    if (form[id].title === 'passwordRepeat') {
     const password = form.find(control => control.title === 'password').value
     isValid = isValid && password === valueForCheck
     validationError = !isValid ? 'Пароли не совпадают' : null
    }


    if (!form[id].required && checkValueEmpty(valueForCheck)) {
      isValid = true
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
          Object.keys(item.value).forEach(key => { allExist = allExist && item.value[key] !== ''})
          newItem = {
            ...item, 
            touched: true, //setTouchedTrue(item.touched),
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
      secondCheck: [],
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
        touched: true, //getTouched(control.type, subType, control.touched, true),
        validationErrors: (control.required && !control.valid &&  control.validationErrors.length === 0) ? 'Поле обязательно для заполнения' : control.validationErrors
      }
    })
  }

  export { postInputChange, postInputBlur, createPostForm, checkFormIsValid }