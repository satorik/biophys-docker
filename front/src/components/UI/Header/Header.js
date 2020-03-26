import React from 'react'
import HeaderNews from './HeaderNews'
import HeaderBlog from './HeaderBlog'



const Header = ({page}) => {


  const styles = {
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
    },

    imageThumbnail:{
      height:'5rem', 
      width:'5rem', 
      marginLeft:'5px', 
      cursor:'pointer'
    }
  }

    if (page === 'news') {return  <HeaderNews />}
    if (page === 'blog') {return <HeaderBlog styles={styles} />}
}

export default Header
