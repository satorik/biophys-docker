import React from 'react'
import Carousel from './components/Carousel'
import {Route, Redirect} from 'react-router-dom'
import NavigationList from './components/Shared/SecondaryNavigation/NavigationList'
import Schedule from './components/Education/Schedule'
import Admission from './components/Education/Admission'
import Courses from './components/Education/Courses'

const Education = ({links}) => {
  const {subLinks} = links
  const [selectedSubLink, setSelectedSubLink] = React.useState(subLinks[0].id)
 
  const handleNavigationItemClick = (sublinkId) => {
    setSelectedSubLink(sublinkId)
  }

  return (
    <div>
      <Carousel />
      <NavigationList subLinks={subLinks} navigationChange={handleNavigationItemClick} selectedLink={selectedSubLink}/>
      <Redirect from="/education" to="/education/schedule" />
      <Route
          path="/education/schedule"
          component={Schedule}
      />
      <Route
          path="/education/admission"
          component={Admission}
      />
      <Route
          path="/education/courses"
          component={Courses}
      />
    </div>
  )
}

export default Education
