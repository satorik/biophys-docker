import React from 'react'


import { InputFile, InputText, InputDate, InputTextarea, InputQuill, InputCheck } from './Inputs'

const Input = ({control, value, onChanged, onBlur, touched, valid, label}) => {

  const inputClasses = control === 'file' ? ['custom-file-input'] : ['form-control']
  let validationError = null
 
  if ( !valid && touched ) {
    inputClasses.push('is-invalid')
    validationError = <p className="d-inline text-danger text-right">Пожалуйста, заполните {label}</p>
  }

  const getControlElement = () => {
    if (control === 'file') {
      return <InputFile 
              className={inputClasses.join( ' ' )}
              label='Выберите файл'
              onChanged={onChanged}
              onBlur={onBlur}
              >{validationError}</InputFile>
    }
    else if (control === 'input') {
      return <InputText
              className={inputClasses.join( ' ' )}
              label={label}
              value={value}
              onChanged={onChanged}
              onBlur={onBlur}
              >{validationError}</InputText> 
    }
    else if (control === 'date' || control === 'datetime') {
      return <InputDate
              className={null}
              label={label}
              value={value}
              onChanged={onChanged}
              onBlur={onBlur}
              withTime={control === 'datetime' ? true : false}
              >{validationError}</InputDate>
    }
    else if (control === 'textarea'){
      return <InputTextarea
              className={inputClasses.join( ' ' )}
              label={label}
              value={value}
              onChanged={onChanged}
              onBlur={onBlur}
              >{validationError}</InputTextarea>
    }
    else if (control === 'textarea-long') {
      return <InputQuill
              label={label}
              value={value}
              onChanged={onChanged}
              onBlur={onBlur}
              >{validationError}</InputQuill>
    }
    else if (control === 'check') {
      return <InputCheck
              label={label}
              value={value}
              onChanged={onChanged}
              />
    }
  }


  return getControlElement()
  
}

export default Input
