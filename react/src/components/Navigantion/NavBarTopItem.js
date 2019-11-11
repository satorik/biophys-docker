import React from 'react'
import {Link} from 'react-router-dom'

const NavBarTopItem = ({link}) => {
  
  //const isActive = window.location === link.path

  //console.log(isActive)
  //let className = isActive ? "active" : ""

  return (
    <li className="nav-item active">
       <Link to={link.path} className="nav-link"> {link.title}</Link>
    </li>
  )
}

export default NavBarTopItem
