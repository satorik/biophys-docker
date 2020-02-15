import React from 'react'

const InputTime = ({onChanged, value, children}) => {
  return (
      <div className="d-flex align-items-baseline">
        <div className="input-group form-group">
          <div className="input-group-prepend">
            <span className="input-group-text">С</span>
          </div>
            <input
              type='text'
              className='form-control col-1 mr-1 ml-2'
              value={value.hoursFrom}
              title='hoursFrom'
              placeholder='Часы'
              onChange={onChanged}
            /> : <input
              type='text'
              className='form-control col-1 mx-1'
              value={value.minutesFrom}
              title='minutesFrom'
              placeholder='Минуты'
              onChange={onChanged}
            />
          <div className="input-group-prepend">
            <span className="input-group-text">По</span>
          </div>
            <input
              type='text'
              className='form-control col-1 mr-1 ml-2'
              value={value.hoursTo}
              title='hours'
              placeholder='ЧасыTo'
              onChange={onChanged}
            /> : <input
              type='text'
              className='form-control col-1 mx-1'
              value={value.minutesTo}
              title='minutesTo'
              placeholder='Минуты'
              onChange={onChanged}
            />
            }
            {children}
        </div>
      </div>
  )
}

export default InputTime