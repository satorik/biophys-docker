import React from 'react'


import { InputFile, InputText, InputDate, InputTextarea, InputQuill, InputCheck, InputRadio, InputCourse, InputSelect, InputResourse } from './Inputs'

const Input = ({control, value, onChanged, onBlur, touched, valid, label, required, idx}) => {

  const inputClasses = control === 'file' ? ['custom-file-input'] : ['form-control']
  let validationError = null

  if ( !valid ) {
    if (typeof(touched) === 'boolean' && touched) {
      inputClasses.push('is-invalid')
      const field = typeof(label) === 'string' ? label : 'Материалы' //сделать лучше
      validationError = <p className="d-inline text-danger text-right">Пожалуйста, заполните {field} верно</p>
    }
    else if (typeof(touched) !== 'boolean') {
      let allTouched = true
      Object.keys(touched).forEach( key => {
        allTouched = allTouched && touched[key]
      })
      if (allTouched) {
        inputClasses.push('is-invalid')
        validationError = <p className="d-inline text-danger text-right">Пожалуйста, заполните {label} верно</p>
      }
    }
  }

  const getControlElement = () => {
    if (control === 'file') {
      return <InputFile 
              className={inputClasses.join( ' ' )}
              label='Выберите файл'
              onChanged={onChanged}
              onBlur={() => onBlur(idx)}
              required={required}
              value = {value}
              >{validationError}</InputFile>
    }
    else if (control === 'input') {
      return <InputText
              required={required}
              className={inputClasses.join( ' ' )}
              label={label}
              value={value}
              onChanged={onChanged}
              onBlur={() => onBlur(idx)}
              >{validationError}</InputText> 
    }
    else if (control === 'date' || control === 'datetime' || control === 'time') {
      return <InputDate
              idx = {idx}
              className={null}
              label={label}
              value={value}
              onChanged={onChanged}
              required={required}
              onBlur={onBlur}
              withTime={control === 'date' ? false : true}
              withDate={control === 'time' ? false : true}
              >{validationError}</InputDate>
    }
    else if (control === 'course') {
      return <InputCourse
              className={null}
              label={label}
              value={value}
              onChanged={onChanged}
              required={required}
              onBlur={() => onBlur(idx)}
              >{validationError}</InputCourse>
    }
    else if (control === 'resourse') {
      return <InputResourse
              className={null}
              label={label}
              value={value}
              onChanged={onChanged}
              required={required}
              onBlur={() => onBlur(idx)}
              >{validationError}</InputResourse>
    }
    else if (control === 'textarea'){
      return <InputTextarea
              className={inputClasses.join( ' ' )}
              label={label}
              value={value}
              required={required}
              onChanged={onChanged}
              onBlur={() => onBlur(idx)}
              >{validationError}</InputTextarea>
    }
    else if (control === 'textarea-long') {
      return <InputQuill
              label={label}
              value={value}
              required={required}
              onChanged={onChanged}
              onBlur={() => onBlur(idx)}
              >{validationError}</InputQuill>
    }
    else if (control === 'check') {
      return <InputCheck
              label={label}
              value={value}
              required={required}
              onChanged={onChanged}
              />
    }
    else if (control === 'radio') {
      return <InputRadio
              label={label}
              required={required}
              value={value}
              onChanged={onChanged}
              />
    }
    else if (control === 'select') {
      return <InputSelect
              label={label}
              required={required}
              value={value}
              onChanged={onChanged}
              />
    }
  }


  return getControlElement()
  
}

export default Input
