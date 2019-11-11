const bulk = (times, data) => {
  const bulkArray = []
  for (let i = 0; i < times; i++) {

    bulkArray.push(data())
  }

  return bulkArray
}

export default bulk