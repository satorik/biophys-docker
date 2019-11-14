export const required = value => value instanceof File || value.trim() !== ''

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