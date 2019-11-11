import React from 'react'

const backdropStyle= {
    width: '100%',
    height:' 100%',
    position: 'fixed',
    zIndex: '100',
    left: '0',
    top: '0',
    backgroundColor:'rgba(0,0,0, 0.5)'
}

const Backdrop = ({show, clicked}) => (
  show ? 
  <div 
   style={backdropStyle} 
   onClick={clicked}></div> 
  : null
);

export default Backdrop