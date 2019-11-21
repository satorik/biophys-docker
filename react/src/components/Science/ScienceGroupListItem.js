import React from 'react'
import GroupCard from './GroupCard'
import EditButtons from '../UI/EditButtons'

const ScienceGroupListItem = ({groupObject, active, save, updatedArticle, updatedPerson}) => {

  const color = active ? 'white' : 'dark-grey'
  const divClass='d-flex justify-content-between card-header'
  const divStyle = active ? {backgroundColor:'#dc3545', color:'white', fontWeight: 'bold', cursor:'pointer'} : {cursor:'pointer'}

  return (
    <>
    <div className={divClass} style={divStyle}>
      <div className="w-100">
        <p onClick={groupObject.onViewInfo} >{groupObject.title}</p>
      </div>
      
      <EditButtons 
          onClickEdit={groupObject.onEditInfo}
          onClickDelete={groupObject.onDelete}
          size="sm"
          color={color}
      />
    </div>
      {active && 
        <GroupCard 
          group={groupObject} 
          save={save} 
          articleForUpdate = {updatedArticle}
          personForUpdate = {updatedPerson}
        />
      }
    </>
  )
}

export default ScienceGroupListItem
