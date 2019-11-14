import React from 'react'

const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const currentYear = new Date().getFullYear()

const YEARS = [currentYear-1, currentYear, currentYear+1]

const InputDate = ({onChanged, onBlur, label, value, withTime, children, required}) => {
  return (
      <div className="d-flex align-items-baseline">
        <div className="input-group form-group">
          <div className="input-group-prepend">
            <span className="input-group-text">{label}</span>
          </div>
            <input
              type='text'
              className='form-control col-1'
              value={value.day}
              title='day'
              placeholder={`День+${required ? '*': ''}`}
              onChange={onChanged}
              onBlur={onBlur}
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
              className='form-control col-1'
              title='year'
              value={value.year}
              onChange={onChanged}
            >
             {YEARS.map(year => <option key={year} value={year}>{year}</option>)} 
            </select>
            {withTime && <>
              <input
              type='text'
              className='form-control col-1 mr-1 ml-2'
              value={value.hours}
              title='hours'
              placeholder='Часы'
              onChange={onChanged}
            /> : <input
              type='text'
              className='form-control col-1 mx-1'
              value={value.minutes}
              title='minutes'
              placeholder='Минуты'
              onChange={onChanged}
            /></>
            
            }
            {children}
        </div>
      </div>
  )
}

export default InputDate