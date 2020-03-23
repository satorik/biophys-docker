import React from 'react'

const QuoteHeader = ({header, title, quote, author, when}) => {

  const [selectedQuote, setSelectedQuote] = React.useState(0)

  const imageBackground = {
    height: '20rem',
    width: '100%',
    backgroundImage: `url(${header})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden'
  }

  const qouteStyle = {
    backgroundColor:'rgba(0, 0, 0, 0.5)',
    marginLeft: '0px',
    marginBottom:'20px',
    width:'30rem'
  }

  return (
      <div style={imageBackground} className="p-5 text-left">
        {quote && <div className="card p-3 text-left" style={qouteStyle}>
            <blockquote className="blockquote mb-0">
              <p className="text-white">{quote}</p>
              <footer className="blockquote-footer">
                <small className="text-white">
                  {author} <cite title="Source Title">{when}</cite>
                </small>
              </footer>
            </blockquote>
          </div>}
      </div> 
  )
}

export default QuoteHeader

