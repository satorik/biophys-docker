
export const required = value => {
  if (value instanceof File) return true
  else if (typeof(value) === 'object') {
    console.log(value)
    let allExist = true
    Object.keys(value).forEach(item => {
      allExist = allExist && value[item] != ''
    })
    console.log(allExist)
    return allExist
  }
  else return value.trim() !== ''
}
export const length = config => value => {
  let isValid = true;
  if (config.min) {
    isValid = isValid && value.trim().length >= config.min;
  }
  if (config.max) {
    isValid = isValid && value.trim().length <= config.max;
  }
  return isValid;
};

export const date = value => {
  const daysInMonth = (m, y) => {
    switch(m) {
      case 1:
        return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? 29 : 28
      case 8: case 3: case 5: case 10: return 30
      default: return 31
    }
  }

  if (!Number.isInteger(value.year) && !Number.isInteger(value.month) && !Number.isInteger(value.day)) {return false}
  const daysThisMonth = daysInMonth(value.month, value.year)
  return value.day >= 0 && value.day <= daysThisMonth
}

export const email = value =>
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    value
  );

export const isUrl = value => true

export const time = value => {
  const checkValue = (param, min, max) => {
    return Number.isInteger(param) && param >= min && param <= max
  }

  return checkValue(value.hours, 0, 24) && checkValue(value.minutes, 0, 60)
}

export const datetime = value => {
  const ifDate = date(value)
  const ifTime = time(value)

  return ifDate && ifTime
}