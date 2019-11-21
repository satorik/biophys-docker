import React from 'react'
import {Link} from 'react-router-dom'
import EditButtons from '../../UI/EditButtons'

const NavigationItems = ({title, id, onNavigationChange, selected, path, onEdit, onDelete}) => {
  const  divStyle = selected === id ? {
      cursor:'pointer',
      backgroundColor:'#6c757d'
    } : {
      cursor:'pointer'}

  return (
  <div 
      className="text-wrap p-2 d-flex align-items-center justify-content-center" 
      style={divStyle}
      onClick={() => onNavigationChange(id)}
      >
        <Link to={path} className="font-weight-bold text-center px-5 text-white" style={{ textDecoration: 'none'}}>{title}</Link>
        {
          onEdit && onDelete &&  <EditButtons 
          onClickEdit={() => onEdit(id)}
          onClickDelete={() => onDelete(id)}
          size="sm"
          color="white"
        />
        }

    </div>
)
}

export default NavigationItems
