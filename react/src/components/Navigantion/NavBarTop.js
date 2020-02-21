import React from 'react'
import NavBarTopItem from './NavBarTopItem'
import {useLocation} from 'react-router-dom'


const LINKS = [
  {
    path: '/department',
    title: 'Кафедра'
  },
  {
    path: '/seminar',
    title: 'Семинары'
  },
  {
    path: '/conference',
    title: 'Конференции'
  },
  {
    path: '/blogpost',
    title: 'Блог'
  },
  {
    path: '/education',
    title: 'Учебный процесс'
  },
  {
    path: '/science',
    title: 'Наука'
  }
]


const NavBarTop = () => {

  const currentPath = useLocation().pathname

  return (
      <nav className="navbar navbar-dark navbar-expand-md bg-dark" >
        <a className="navbar-brand" href="/">БИОФИЗИКА</a>
          <ul className="navbar-nav">
            {LINKS.map((link, idx) => <NavBarTopItem link={link} key={idx} selectedPath={currentPath.split('/')[1]} /> )}
          </ul>
      </nav>
  )
}

export default NavBarTop
