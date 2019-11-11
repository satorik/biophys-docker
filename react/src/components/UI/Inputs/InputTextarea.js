import React from 'react'
export default ({className, onChanged, onBlur, label, value, children}) => 
<div className="form-group">
  <textarea
    className={className}
    value={value}
    rows='3'
    placeholder={label}
    onChange={onChanged}
    onBlur={onBlur}
  />
  {children}
</div>


