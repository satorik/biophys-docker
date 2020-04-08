import React from 'react'

export default ({alert, onClose}) => {
  return (
    <div>
      <p className="h5 text-center">{alert}</p>
      <button className="btn btn-secondary" onClick={onClose}>Вернуться</button>
    </div>
  )
}
