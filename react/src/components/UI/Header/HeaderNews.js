import React from 'react'

const header = process.env.REACT_APP_STATIC_URI+'/images/header/header-news.jpg'
console.log(header)

const headerImage = {
  height: '20rem',
  width: '100%',
  backgroundImage: `url(${header})`,
  backgroundSize: 'cover',
  backgroundPosition: 'top',
  overflow: 'hidden'
}

const HeaderNews = ({title, description}) => {
  return (
    <div style={headerImage}>
      <div className='card col-md-4 ml-auto mr-5 mt-3 text-white' style={{backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
        <div className='card-header'>{title}</div>
         <div className="card-content">
           {description}
         </div>
      </div>
    </div>
  )
}

export default HeaderNews



