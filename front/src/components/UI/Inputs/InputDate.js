import React from 'react'

const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const currentYear = new Date().getFullYear()

const YEARS = [currentYear-1, currentYear, currentYear+1]

const InputDate = ({onChanged, onBlur, label, value, withTime, children, required, withDate, idx}) => {
 
  // if (!required && MONTHS) {
  //   MONTHS.push('')
  //   YEARS.push('')
  // }

  return (
    <div className="d-flex">
        <div className="input-group form-group align-items-center">
          <div className="input-group-prepend">
            <span className="input-group-text">{label}</span>
          </div>
          {withDate && <>
                <input
                  type='text'
                  className='form-control col-1'
                  value={value.day}
                  title='day'
                  placeholder={`День${required ? '*': ''}`}
                  onChange={onChanged}
                  onBlur={() => onBlur(idx, 'day')}
                />
                <select
                  className='form-control col-2'
                  value={value.month}
                  title='month'
                  onChange={onChanged}
                >
                {MONTHS.map((month, idx) => <option key={idx} value={idx}>{month}</option>)} 
                </select>
                <select
                  className='form-control col-1 mr-2'
                  title='year'
                  value={value.year}
                  onChange={onChanged}
                >
                {YEARS.map(year => <option key={year} value={year}>{year}</option>)} 
                </select></>
            }
            {withTime && <>
              <input
              type='text'
              className='form-control col-1 mr-1'
              value={value.hours}
              title='hours'
              placeholder={`Часы${required ? '*': ''}`}
              onChange={onChanged}
              onBlur={() => onBlur(idx, 'hours')}
            />
            <span className="px-1">:</span>
            <input
              type='text'
              className='form-control col-1 mx-1'
              value={value.minutes}
              title='minutes'
              placeholder={`Минуты${required ? '*': ''}`}
              onChange={onChanged}
              onBlur={() => onBlur(idx, 'minutes')}
            /></>
            
            }
            {children}
        </div>
      </div>
  )
}

export default InputDate