import React from 'react'

const header = process.env.REACT_APP_STATIC_URI+'images/conference/header.jpg'

const imageBackground = {
  height: '20rem',
  width: '100%',
  backgroundImage: `linear-gradient(rgba(0, 0, 255, 0.5), rgba(255, 255, 0, 0.5)), url(${header})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  overflow: 'hidden',
}


const ConferenceHeader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={imageBackground}>
      <div className="d-inline p-3 text-center" style={{backgroundColor:'rgba(255, 255, 255, 0.7)',}}>
        <h1>CONFERENCE</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
    </div>
  )
}

export default ConferenceHeader
