import React from 'react'
export default ({className, onChanged, onBlur, label, value, children}) => 
<div className="form-group">
  <input
    className={className}
    value={value}
    placeholder={label}
    onChange={onChanged}
    onBlur={onBlur}
    />
    {children}
</div>