import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import Carousel from './components/Carousel'
import NavigationList from './components/Shared/SecondaryNavigation/NavigationList'
import Staff from './components/Department/Staff'
import History from './components/Department/History'
import Partnership from './components/Department/Partnership'
import Prints from './components/Department/Prints'

const Department = ({links}) => {

  const {subLinks} = links
  const [selectedSubLink, setSelectedSubLink] = React.useState(subLinks[0].id)
 
  const handleNavigationItemClick = (sublinkId) => {
    setSelectedSubLink(sublinkId)
  }

  return (
    <div>
      <Carousel />
      <NavigationList subLinks={subLinks} navigationChange={handleNavigationItemClick} selectedLink={selectedSubLink}/>
      <Redirect from="/department" to="/department/history" />
      <Route
          path="/department/history"
          component={History}
      />
      <Route
          path="/department/staff"
          component={Staff}
      />
      <Route
          path="/department/partnership"
          component={Partnership}
      />
      <Route
          path="/department/prints"
          component={Prints}
      />
    </div>
  )
}
export default Department
