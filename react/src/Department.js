import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import Carousel from './components/Carousel'
import NavigationList from './components/Shared/SecondaryNavigation/NavigationList'
import Staff from './components/Department/Staff'
import History from './components/Department/History'
import Partnership from './components/Department/Partnership'
import Prints from './components/Department/Prints'

const sections = [
  {path:'history', title:'История'}, 
  {path: 'staff', title:'Люди'}, 
  {path: 'partnership', title:'Сотрудничество'}, 
  {path: 'prints', title:'Печать'}]

const Department = () => {

  const links = sections.map((section, idx) => {
    return {
      id: idx,
      path: section.path,
      title: section.title,
      root: `/department/`
    }
  })

  return (
    <div>
      <Carousel />
      <NavigationList subLinks={links}/>
      <Route exact path="/department">
            <Redirect to="/department/history" />
      </Route>
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
