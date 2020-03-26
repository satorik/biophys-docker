import React from 'react'
export default ({className, onChanged, onBlur, label, value}) => 
<div className="form-group" style={{marginLeft: '1.25rem'}}>
    <input
      type="checkbox"
      className="form-check-input"
      checked={value}
      placeholder={label}
      onChange={onChanged}
      />
    <label className="form-check-label">{label}</label>
  </div>