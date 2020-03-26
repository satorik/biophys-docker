import React from 'react'

const Spinner = () => {

  const spinnerStyle = {
    position: 'absolute',
    top: '50%',
    left:'50%',
    width: '3rem',
    height: '3rem'
  }

  return (
    <div className="container text-center">
      <div className="spinner-border" style={spinnerStyle} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default Spinner
