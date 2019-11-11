import React from 'react'

const styles= {
  carousel: {
    height: '20rem',
    width: '100%',
    margin: '0 auto',
    overflow: 'hidden',
    padding: 0
  },
  
  carouselImg: {
    display:'block',
    width:'100%',
    margin: '-15rem 0'
  },

  quote: {
    backgroundColor:'rgba(0, 0, 0, 0.5)',
    marginLeft: '0px',
    marginBottom:'20px',
    width:'30rem'
  },

  gallery: {
    marginLeft: '0px',
    marginBottom:'20px'
  }
}

const gallery = [
  'http://localhost:5000/images/blog/001.jpg',
  'http://localhost:5000/images/blog/002.jpg',
  'http://localhost:5000/images/blog/003.jpg',
  'http://localhost:5000/images/blog/004.jpg'
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


const Carousel = ({page}) => {
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

  if (page === 'blog') {
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
                          style={{'height':'5rem', 'width':'5rem', 'marginLeft':'5px', 'cursor':'pointer'}} 
                          onClick = {() => handleImageClick(idx)}/>
              }
              return null
            })}
        </div>
      </div> 
    )
  }

  return (
    <div style={styles.carousel}>
      <img style={styles.carouselImg} src="https://images.unsplash.com/photo-1513569536235-bf46baacc948?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2622&q=80" alt=""/>
    </div>
  )
}

export default Carousel
