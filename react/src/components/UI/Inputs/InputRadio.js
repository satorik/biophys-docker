import React from 'react'
export default ({className, onChanged, onBlur, label, value}) => 
<div className="form-group" style={{marginLeft: '1.25rem'}}>
  {label.map( radio =>  
    <div className="form-check">
      <input className="form-check-input" key={radio.value} type="radio" value={radio.value} checked={value === radio.value} onChange={onChanged} />
      <label className="form-check-label">
        {radio.title}
      </label>
    </div>
  )}
</div>