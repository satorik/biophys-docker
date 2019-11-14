import React from 'react'
import GroupCard from './GroupCard'

const ScienceGroupListItem = ({groupTitle, onClickHandle, active,  groupInfo, onClickEdit, onClickDelete}) => {
  
  const buttonClass = `btn mr-1 ${active ? 'btn-outline-light' : 'btn-outline-dark'}`
  const divClass='d-flex justify-content-between card-header'
  const divStyle = active ? {backgroundColor:'#dc3545', color:'white', fontWeight: 'bold'} : null

  return (
    <>
    <div className={divClass} style={divStyle} onClick={onClickHandle}>
      <p>{groupTitle}</p>
      <div>
        <button className={buttonClass} onClick={onClickEdit}>E</button>
        <button className={buttonClass} onClick={onClickDelete}>D</button> 
      </div>
    </div>
      {active && 
        <GroupCard groupInfo={groupInfo} />
      }
    </>
  )
}

export default ScienceGroupListItem
