import React from 'react'
import GroupCard from './GroupCard'

const ScienceGroupListItem = ({groupClass, groupTitle, onClickHandle, showInfo, style, groupInfo}) => {
  return (
    <>
    <p 
      className={groupClass} 
      onClick={onClickHandle}
      style={style}
      >{groupTitle}</p>
      {showInfo && 
        <GroupCard groupInfo={groupInfo} />
      }
    </>
  )
}

export default ScienceGroupListItem
