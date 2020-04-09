
export const required = value => {
  if (value instanceof File) return {valid: true}
  else if (typeof(value) === 'object') {
    let allExist = true
    Object.keys(value).forEach(item => {
      allExist = allExist && value[item] !== ''
    })
    return {valid: allExist, error: !allExist ? 'Поле обязательно для заполнения' : ''}
  }
  else return {valid: value.trim() !== '', error: value.trim() !== '' ? '' : 'Поле обязательно для заполнения'}
}

export const isPdf = value => {
  if (!(value instanceof File)) return {valid: false, error: 'Попытка закачать неверный файл'}
  if (value.type !== 'application/pdf') return {valid: false, error: 'Попытка закачать неверный формат файла. Разрешен только PDF.'}

  return {valid: true}
}

export const isImage = value => {
  if (!(value instanceof File)) return {valid: false, error: 'Попытка закачать неверный файл'}
  if (!(value.type === 'image/png' || value.type === 'image/jpeg' || value.type === 'image/jpg')) {
    return {valid: false, error: 'Попытка закачать неверный формат файла. Разрешены только JPG и PNG.'}
  }
  
  return {valid: true}
}

export const length = config => value => {
  let isValid = true
  let error = ''
  if (config.min) {
    const optionValid = value.trim().length >= config.min
    isValid = isValid && optionValid  
    if (!optionValid) error = `Поле не должно быть менее ${config.min} знаков`
  }
  if (config.max) {
    const optionValid = value.trim().length <= config.max
    isValid = isValid && optionValid
    if (!optionValid) error = `Поле не должно быть более ${config.max} знаков`
  }

  return {valid: isValid, error: !isValid ? error : ''}
}

export const date = value => {
  const daysInMonth = (m, y) => {
    switch(m) {
      case 1:
        return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? 29 : 28
      case 8: case 3: case 5: case 10: return 30
      default: return 31
    }
  }

  if (!Number.isInteger(value.year) && !Number.isInteger(value.month) && !Number.isInteger(value.day)) {
    return {valid: false, error: 'Недопустимые символы в поле Дата'}
  }
  const daysThisMonth = daysInMonth(value.month, value.year)
  const isValid = value.day >= 0 && value.day <= daysThisMonth
  return {valid: isValid, error: !isValid ? 'Такой даты не существует' : ''}
}

export const email = value => {
  const isValid = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    value
  )
  return {valid: isValid, error: !isValid ? 'Неправильный формат емейл' : ''}
}

export const isUrl = value => {
  const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

  const isValid = pattern.test(value)
  return {valid: isValid, error: !isValid ? 'Неправильный формат ссылки' : ''}
}

export const time = value => {
  const checkValue = (param, min, max) => {
    if (!Number.isInteger(+param)) return false
    return +param >= min && +param <= max
  }

  const isValid = checkValue(value.hours, 0, 23) && checkValue(value.minutes, 0, 59)
  return {valid: isValid, error: !isValid ? 'Неправильный формат времени' : ''}
}

export const datetime = value => {
  const ifDate = date(value)
  const ifTime = time(value)
  
  if (!ifDate) {
    return {valid: false, error: 'Неправильный формат даты' }
  }
  if (!ifTime) {
    return {valid: false, error: 'Неправильный формат времени' }
  }

  return {valid: true, error: '' }
}

export const password = value => {return {valid: true, error: ''}}
export const passwordRepeat = value => {return {valid: true, error: ''}}