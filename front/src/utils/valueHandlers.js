export const getChangedValue =  (e, type, prevValue) => {
  if (type === 'file') {
    if (e.target.files.length !== 0) {
      const files = e.target.files
      return {value: files[0]}
    }
    return {value: ''}
  }
  else if (type === 'textarea-long') return {value: e}
  else if (type === 'check'){ return {value: e.target.checked}}
  else if (type === 'date' || type === 'datetime' || type === 'course' || type === 'time') {
    return { 
      value: {
        ...prevValue,
        [e.target.title]: e.target.value
      }
    }
  }
  else if (type === 'resourse') {
    if (e.target.title === 'form') return {
      value : {
        ...prevValue,
        subSectionSelect: '',
        subSectionText: '',
        [e.target.title]: e.target.files ? e.target.files[0] : e.target.value
      }
    }
    else return {
      value : {
        ...prevValue,
        [e.target.title]: e.target.files ? e.target.files[0] : e.target.value.value
      }
    }
  }

  return {value: e.target.value}
} 

export const getIntitialValue = (type, isForUpdate, oldData, control, label) => {
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