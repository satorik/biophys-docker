import React from 'react'

const header = process.env.REACT_APP_STATIC_URI+'/images/seminar/header.jpg'

const imageBackground = {
  height: '20rem',
  width: '100%',
  backgroundColor: 'black',
  backgroundImage: `url(${header})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right',
  overflow: 'hidden'
}

const SeminarHeader = () => {
  return (
    <div style={imageBackground} className="p-5">
        <div className="d-flex flex-column align-items-start"> 
          <div className="bg-warning p-2 d-inline mb-5"><h2>seminars & events</h2></div>
          <p className="border border-light text-white d-inline p-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
    </div>
  )
}

export default SeminarHeader
