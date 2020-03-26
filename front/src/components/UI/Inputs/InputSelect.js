import React from 'react'
export default ({onChanged, label, value}) => 
<div className="form-group">
      <select
       className='form-control'
      value={value}
      onChange={onChanged}
      >
    {label.map((select, idx) => <option key={idx} value={select}>{select}</option>)} 
    </select>
</div>