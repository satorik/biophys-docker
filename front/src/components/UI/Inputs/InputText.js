import React from 'react'
export default ({className, onChanged, onBlur, label, value, children, required, type}) => 
<div className="form-group">
  <input
    className={className}
    value={value}
    placeholder={label+`${required ? '*': ''}`}
    onChange={onChanged}
    onPaste={onChanged}
    onBlur={onBlur}
    type={type}
    />
    {children}
</div>