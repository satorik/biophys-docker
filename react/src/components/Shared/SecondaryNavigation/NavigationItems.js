import React from 'react'
import {Link} from 'react-router-dom'
import EditButtons from '../../UI/EditButtons'

const NavigationItems = ({title, id, onNavigationChange, selected, path, onEdit, onDelete}) => {
  
  let divClass = 'text-wrap p-2 d-flex align-items-center justify-content-center'

  divClass = selected === id ? divClass+' nav-link-secondary-active' : divClass+' nav-link-secondary'

  return (
  <div 
      className={divClass}
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
