import React from 'react'
import {ThemeContext} from '../../context/ThemeContext'
import NavBarTopItem from './NavBarTopItem'

const NavBarTop = ({links}) => {

  const theme = React.useContext(ThemeContext)
  const style = {
    backgroundColor: theme.backgroundColor.main 
  }

  return (
      <nav className="navbar navbar-dark navbar-expand-md" style={style}>
        <a className="navbar-brand" href="/">БИОФИЗИКА</a>
          <ul className="navbar-nav">
            {links.map(link => <NavBarTopItem link={link} key={link.id} /> )}
          </ul>
      </nav>
  )
}

export default NavBarTop
