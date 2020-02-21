import React from 'react'
import {Link} from 'react-router-dom'

const NavBarTopItem = ({link, selectedPath}) => {
  
  return (

    <li className={`nav-item ${'/'+selectedPath === link.path ? 'active' : ''}`}>
       <Link to={link.path} className="nav-link"> {link.title}</Link>
    </li>
  )
}

export default NavBarTopItem
