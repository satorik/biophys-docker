import React from 'react'

const currentYear = new Date().getFullYear()
const YEARS = [currentYear-1, currentYear, currentYear+1]
const TERMS = [1, 2]

const InputCourse = ({onChanged, onBlur, label, value, children, required}) => {
  return (
      <div className="container">
         <div className="row p-0">
            <label className='col-8'>Название*</label>
            <label className='col-2'>Год*</label>
            <label className='col-2'>Семестр*</label>
        </div>
        <div className="row mb-2">
            <input
              type='text'
              className='form-control col-8'
              value={value.course}
              title='course'
              onChange={onChanged}
              onBlur={onBlur}
            />
            <select
              className='form-control col-2 text-center'
              title='year'
              value={value.year}
              onChange={onChanged}
            >
             {YEARS.map(year => <option key={year} value={year}>{year}</option>)} 
            </select>
            <select
              className='form-control col-2 text-center'
              value={value.term}
              title='term'
              onChange={onChanged}
            >
             {TERMS.map((term, idx) => <option key={idx} value={term}>{term}</option>)} 
            </select>  
        </div>
        {children}
      </div>
  )
}

export default InputCourse