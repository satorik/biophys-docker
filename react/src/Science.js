import React from 'react'
import Carousel from './components/Carousel'
import NavigationList from './components/Shared/SecondaryNavigation/NavigationList'
import ScienceGroup from './components/Science/ScienceGroup'
import {Route, Redirect} from 'react-router-dom'



const Science = ({links}) => {
 
  const {subLinks} = links
  const [selectedScienceRoute, setSelectedScienceRoute] = React.useState(subLinks[0].id)
 
  const handleNavigationItemClick = (sublinkId) => {
    setSelectedScienceRoute(sublinkId)
  }

  console.log(subLinks)
  console.log(subLinks[0].id)
  return (
    <div>
      <Carousel />
      <NavigationList subLinks={subLinks} navigationChange={handleNavigationItemClick} selectedLink={selectedScienceRoute}/>
      <Redirect from="/science" to={`/science${subLinks[0].path}`} /> 
      <Route
          path="/science/route/:id"
          component={ScienceGroup}
        />
    </div>
  )
}

export default Science
