import React from 'react'
export default ({className, onChanged, onBlur, label, value, children, required}) => 
<div className="form-group">
  <textarea
    className={className}
    value={value}
    rows='3'
    placeholder={label+`${required ? '*': ''}`}
    onChange={onChanged}
    onPaste={onChanged}
    onBlur={onBlur}
  />
  {children}
</div>


