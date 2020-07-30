import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import NavigationList from './components/Shared/SecondaryNavigation/NavigationList'
import Schedule from './components/Education/Schedule'
import Admission from './components/Education/Admission'
import Courses from './components/Education/Courses'

const sections = [
  {path:'schedule', title:'Расписание'}, 
  {path: 'admission', title:'Прием на кафедру'}, 
  {path: 'courses', title:'Учебные курсы'}
]

const links = sections.map((section, idx) => {
  return {
    id: idx,
    path: section.path,
    title: section.title,
    root: `/education/`
  }
})

const Education = () => {
  return (
    <div>
      <NavigationList subLinks={links}/>
      <Route exact path="/education">
            <Redirect to="/education/schedule" />
      </Route>
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
