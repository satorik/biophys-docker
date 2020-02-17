import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default ({onClickEdit, onClickDelete, size, color, row, withArrowUp, withArrowDown, onClickUp, onClickDown, withNew, onClickNew}) => {
  
  return (
    <div className={`d-inline-flex justify-content-start ${row ? 'flex-row' : 'flex-column'}`}>
      {withNew &&
        <button className={`btn p-0 ${row ? 'mr-1' : ''}`} onClick={onClickNew}><span><FontAwesomeIcon icon={['far', 'plus-square']} color={color} size={size}/></span></button>
      }
      <button className={`btn p-0 ${row ? 'mr-1' : ''}`} onClick={onClickEdit}><span><FontAwesomeIcon icon={['far', 'edit']} color={color} size={size}/></span></button>
      <button className={`btn p-0 ${withArrowUp || withArrowDown ? 'mr-1' : ''}`} onClick={onClickDelete}><span><FontAwesomeIcon icon={['far', 'trash-alt']} color={color} size={size}/></span></button>
      {withArrowUp && 
        <button className={`btn p-0 ${withArrowDown ? 'mr-1' : ''}`} onClick={onClickUp}><span><FontAwesomeIcon icon="arrow-up" style={{color: 'var(--green)'}} size={size}/></span></button>}
      {withArrowDown && 
        <button className="btn p-0" onClick={onClickDown}><span><FontAwesomeIcon icon='arrow-down' style={{color: 'var(--danger)'}} size={size}/></span></button>}
    </div>
  )
}
