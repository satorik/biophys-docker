import React from 'react'

export default ({ error, errorInfo }) =>  
<div className="container mt-5 text-center">
  <h2>Произошла ошибка</h2>
  <details style={{ whiteSpace: "pre-wrap" }}>
    {error && error.toString()}
    <br />
    {errorInfo.componentStack}
  </details>
</div>