import React from 'react'
export default ({className, onChanged, onBlur, label, children}) => <div className="form-group">
  <div className="custom-file">
    <input 
      type="file" 
      className={className} 
      onChange={onChanged}
      onBlur={onBlur}
      id="customFile"/>
    <label className="custom-file-label" htmlFor="customFile">{label}</label>
  </div>
  {children}
</div>