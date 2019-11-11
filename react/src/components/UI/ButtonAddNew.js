import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCircle } from '@fortawesome/free-solid-svg-icons'

const ButtonAddNew = ({onClickAddButton, color}) => {

  return (
    <div style={{position:'fixed', bottom:'35px', right:'35px', cursor:'pointer'}} onClick={onClickAddButton}>
      <span className="fa-layers fa-fw fa-4x">
        <FontAwesomeIcon icon={faCircle} style={{color: `var(--${color})`}}/>
        <FontAwesomeIcon icon={faPlus} color="white" transform="shrink-6"/>
      </span>
    </div>
  )
}

export default ButtonAddNew
