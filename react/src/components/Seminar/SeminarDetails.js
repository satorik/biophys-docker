import React from 'react'

export default ({title, location, content}) => 
<div className="col-8 bg-light p-3">
  <h4>{title}</h4>
  <hr/>
  <p className="text-justify">{content}</p>
</div>
