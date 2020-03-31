import React from 'react'

export default ({title, location, content}) => 
<div className="col-8 bg-light p-3">
  <h4>{title}</h4>
  <p className="text-muted">{'Место проведения: '+location}</p>
  <hr/>
  <p className="text-justify" dangerouslySetInnerHTML={{__html: content}}></p>
</div>
