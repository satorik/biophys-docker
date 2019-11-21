import React from 'react'
import NavigationItems from './NavigationItems'

const NavigationList = ({subLinks, navigationChange, selectedLink}) => {
  return (
    <div className="container-fluid bg-dark text-white d-flex flex-nowrap justify-content-center">
      {subLinks.map((subLink, idx) =>
        <NavigationItems 
          key={subLink.id} 
          title={subLink.title} 
          id={subLink.id} 
          path={subLink.root+subLink.path}
          onNavigationChange={navigationChange} 
          selected={selectedLink}
          onEdit={subLink.onEdit}
          onDelete={subLink.onDelete}
        />
      )}
    </div>
  )
}

export default NavigationList
