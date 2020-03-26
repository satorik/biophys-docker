export default (oldData, newData) => {

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