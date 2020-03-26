import React from 'react'

const GradientHeader = ({header, title, quote, author, when}) => {

  const imageBackground = {
    height: '20rem',
    width: '100%',
    backgroundColor: 'black',
    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${header})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top',
  }

  return (
    <div style={imageBackground} className="p-5">
        <div className="d-flex flex-column align-items-start"> 
          <div className="bg-warning p-2 d-inline mb-5"><h2>{title}</h2></div>
          <blockquote className="blockquote border border-light text-white d-inline p-2">
            <p className="mb-0">{quote}</p>
            <footer className="blockquote-footer">{author}<cite title="Source Title">{when}</cite></footer>
          </blockquote>
        </div>
    </div>
  )
}

export default GradientHeader
