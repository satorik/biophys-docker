export const getUpdateData = (oldData, newData) => {

  if (typeof newData !== 'object') {
    throw new Error('Invalid update data')
  }

  return Object
    .keys(newData)
    .reduce( (acc, value) => {
      if (oldData[value] !== newData[value]){
        return {...acc, [value]: newData[value]}
      }
      return acc
    }, {})
}

export const trasformPostData = (data) => {

  return data.reduce((obj, item) => {
  
    if (item.title !== 'passwordRepeat' && item.title !== 'resourse') {
      obj[item.title] = item.value
    }

    if(item.type === 'datetime') {
      const fullDate = new Date(item.value.year, item.value.month, item.value.day, item.value.hours, item.value.minutes)
      obj[item.title] = fullDate.toISOString()
    }  
    if(item.type === 'date') {
      if (item.value.day !== '') {
        const fullDate = new Date(item.value.year, item.value.month, item.value.day)
        obj[item.title] = fullDate
      }
      else obj[item.title] = null
    }

    if (item.type === 'resourse') {
      Object.keys(item.value).forEach(key => obj[key] = item.value[key])
    }

    if(item.type === 'time') {
      if ( item.value.hours === '') {obj[item.title] = null}
      if ( item.value.minutes === '') {obj[item.title] = item.value.hours+':00'}
      else {obj[item.title] = item.value.hours+':'+item.value.minutes} 
    }

    if (item.title === 'isEven'){
      obj[item.title] = +item.value
    }

    return obj

  } ,{})

}