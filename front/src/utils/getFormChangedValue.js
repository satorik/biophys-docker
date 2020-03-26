import { generateBase64FromImage } from './image';
export const getValue = async (e, type, prevValue) => {
  if (type === 'file') {
    if (e.target.files.length !== 0) {
      const files = e.target.files
      try {
        const b64 = await generateBase64FromImage(files[0])
        return {value: files[0], imagePreview: b64}
      } catch(e) {
        throw new Error('Failed to generate b64')
      }
    }
    return {value: '', imagePreview: null}
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
        [e.target.title]: e.target.files ? e.target.files[0] : e.target.value
      }
    }
  }

  return {value: e.target.value}
} 