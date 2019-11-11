import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem';


const NavigationList = (props) => {
  return (
      <ul className={props.class_group}>
        {props.links.map(link => 
          <NavigationItem 
            key={link.id} 
            title={link.title} 
            sublinks={link.sublinks} 
            path={link.path} 
            class_item={props.class_item} 
            activeClassName={props.activeClassName}  
            />)}
      </ul>
  )
}

export default NavigationList
