import React from 'react'

import Edit from './Edit'

const MultiEdit = ({formProp, onChangeGroupHandler}) => {

  const simpleInputs = formProp.filter(input => input.type !=='array')
  const complexInputs = formProp.filter(input => input.type ==='array')

  const sections = []
  if (Object.keys(simpleInputs).length > 0) {
    sections.push({
      title:'Общая информация',
      type:'simple',
      form_template: simpleInputs
    })
  } 
  complexInputs.forEach( input => sections.push({
    title:input.label,
    type:input.title,
    form_template: input.controls
  }))
                 

  const [tab, setTab] = React.useState(0) 
  const [isAbleToSave, setIsAbleToSave] = React.useState(true)
  const [updatedGroup, setUpdatedGroup] = React.useState({})

  const onChangeHandler = async (e, postData, valid, id) => {
    e.preventDefault()
    console.log(postData)
    if (!valid) {
      setIsAbleToSave(false)
    }
    else {
      const groupObject = postData.reduce((obj, item) => {
          obj[item.title] = item.value
          return obj
      } ,{})
      if (sections[tab].type === 'simple') {
        onChangeGroupHandler(groupObject, 'simple')
      }
      else {
        onChangeGroupHandler(groupObject, sections[tab].type)
      }

      if (tab !== sections.length - 1) {
        setTab(tab+1)
      }
      else {
        console.log('everything saved')
      }
   }
  }
  
  return (
    <>
    <ul className="nav nav-tabs m-2">
      {sections.map( (section, idx) => <li className="nav-item" style={{cursor:'pointer'}} key={idx} onClick={() => { if (isAbleToSave) setTab(idx)}}>
        <span className={`nav-link ${idx===tab ? 'active' : ''}`}>{section.title}</span>
      </li>)
      }
    </ul>
    <div className="my-2 mx-5">
      <Edit 
        onClickSubmit={onChangeHandler}
        isAbleToSave={isAbleToSave}
        post={updatedGroup}
        formTemplate={sections[tab].form_template}
      />
    </div>
  </>
  )
}

export default MultiEdit
