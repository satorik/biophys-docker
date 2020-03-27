import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AuthContext from '../../context/AuthContext'

const ButtonAddNew = ({onClickAddButton, color, fixed, size, block, border}) => {

  const { currentUser } = React.useContext(AuthContext)
  const isAuth = currentUser.token !== null

  if (!isAuth) return null

  const divStyle = fixed ? {position:'fixed', bottom:'35px', right:'35px', cursor:'pointer'} : {cursor:'pointer'}
  let divClass = block && border ? "d-block p-2 border border-success" : block ? "d-block p-2" : ""
  const spanClass = `fa-layers fa-fw fa-${size}x`

  return (
    <div className={divClass} style={divStyle} onClick={onClickAddButton}>
      <span className={spanClass}>
        <FontAwesomeIcon icon="circle" style={{color: `var(--${color})`}}/>
        <FontAwesomeIcon icon="plus" color="white" transform="shrink-6"/>
      </span>
    </div>
  )
}

export default ButtonAddNew
