import React from 'react'
import './NavigationItem.css'
import {NavLink} from 'react-router-dom'

const NavigationItem = (props) => {
  return (
    <li className={props.class_item}>
      <NavLink to={props.path} activeClassName={props.activeClassName}> {props.title}</NavLink>
    </li>
  )
}

export default NavigationItem
