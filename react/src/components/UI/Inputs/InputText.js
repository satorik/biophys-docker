import React from 'react'
export default ({className, onChanged, onBlur, label, value, children, required}) => 
<div className="form-group">
  <input
    className={className}
    value={value}
    placeholder={label+`${required ? '*': ''}`}
    onChange={onChanged}
    onBlur={onBlur}
    />
    {children}
</div>