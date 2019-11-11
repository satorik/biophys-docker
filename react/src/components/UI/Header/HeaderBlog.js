import React from 'react'

const gallery = [
  process.env.REACT_APP_STATIC_URI+'images/blog/001.jpg',
  process.env.REACT_APP_STATIC_URI+'images/blog/002.jpg',
  process.env.REACT_APP_STATIC_URI+'images/blog/003.jpg',
  process.env.REACT_APP_STATIC_URI+'images/blog/004.jpg'
]

const quotes = [
  {
    quote:`In science one tries to tell people, in such a way as to be understood
    by everyone, something that no one ever knew before. But in poetry, it's
    the exact opposite`,
    author:'Paul Dirac',
    when:'(1902 - 1984)'
  },
  {
    quote:`The important thing in science is not so much to obtain new facts as
    to discover new ways of thinking about them.`,
    author:'Sir William Lawrence Bragg',
    when:'(1890 - 1971)'
  },
  {
    quote:`The most important discoveries will provide answers to questions that we
    do not yet know how to ask and will concern objects we have not yet
    imagined.`,
    author:'John N. Bahcall)',
    when:'(1934 - 2005'
  },
  {
    quote:`Do not undertake a scientific career in quest of fame or money.  There are easier and better
    ways to reach them.  Undertake it only if nothing else will satisfy you; for nothing else is probably
    what you will receive.  Your reward will be the widening of the horizon as you climb. And if
    you achieve that reward you will ask no other.`,
    author:'Cecilia Payne-Gaposchkin',
    when:'(1900-1979)'
  }
]


const HeaderBlog = ({styles}) => {

  const [selectedQuote, setSelectedQuote] = React.useState(0)

  const imageBackground = {
    height: '20rem',
    width: '100%',
    backgroundImage: `url(${gallery[selectedQuote]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden'
  }

  const handleImageClick = (i) => {
    setSelectedQuote(i)
  }

  return (
    <div style={imageBackground} className="d-flex justify-content-around align-items-end">
          <div className="card p-3 text-left" style={styles.quote}>
            <blockquote className="blockquote mb-0">
              <p className="text-white">{quotes[selectedQuote].quote}</p>
              <footer className="blockquote-footer">
                <small className="text-white">
                  {quotes[selectedQuote].author} <cite title="Source Title">{quotes[selectedQuote].when}</cite>
                </small>
              </footer>
            </blockquote>
          </div>
        <div style={styles.gallery}>
            {gallery.map((image, idx) => {
              if (idx !== selectedQuote) {
                return <img 
                          src={image} 
                          key={idx}
                          alt="" 
                          className="img-thumbnail" 
                          style={styles.imageThumbnail} 
                          onClick = {() => handleImageClick(idx)}/>
              }
              return null
            })}
        </div>
      </div> 
  )
}

export default HeaderBlog
