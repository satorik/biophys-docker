import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ButtonAddNew = ({onClickAddButton, color, fixed, size}) => {

  const divStyle = fixed ? {position:'fixed', bottom:'35px', right:'35px', cursor:'pointer'} : {cursor:'pointer'}
  const spanClass = `fa-layers fa-fw fa-${size}x`

  return (
    <div style={divStyle} onClick={onClickAddButton}>
      <span className={spanClass}>
        <FontAwesomeIcon icon="circle" style={{color: `var(--${color})`}}/>
        <FontAwesomeIcon icon="plus" color="white" transform="shrink-6"/>
      </span>
    </div>
  )
}

export default ButtonAddNew
