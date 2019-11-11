import React from 'react'
import {Link} from 'react-router-dom'

const NavigationItems = ({title, id, onNavigationChange, selected, path}) => {

  const  divStyle = selected === id ? {
      cursor:'pointer',
      backgroundColor:'#6c757d'
    } : {
      cursor:'pointer'}

  return (
  <div 
      className="text-wrap py-3 d-flex align-items-center justify-content-center" 
      style={divStyle}
      onClick={() => onNavigationChange(id)}
      >
        <Link to={path} className="font-weight-bold text-center px-5 text-white" style={{ textDecoration: 'none'}}>{title}</Link>
    </div>
)
}

export default NavigationItems
