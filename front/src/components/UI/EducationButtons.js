import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const EducationButtons = ({title, onClick, onDelete, selected}) => {

  return (
    <div className={`d-inline-flex mr-2 mb-2 align-items-center ${selected ? 'education-button-active' : 'education-button'}`}>
      <div className="d-inline mr-2"  onClick={onClick}>
        {title}
      </div>
      <button className="btn p-0" onClick={onDelete}><span><FontAwesomeIcon icon={['far', 'trash-alt']} color={selected ? 'white' : '#6610f2'} /></span></button>
    </div>
  )
}
