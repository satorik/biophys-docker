import React from 'react'

import {Route, Redirect} from "react-router-dom"

import NavigationList from '../../components/NavigationList/NavigationList'
import Text from '../../components/Text/Text'
import ListOfLinks from '../../components/ListOfLinks/ListOfLinks'
import Staff from '../../components/Staff/Staff'
import Prints from '../../components/Prints/Prints'
import Schedule from '../../components/Schedule/Schedule'
import PageNotFound from '../../pages/PageNotFound/PageNotFound'
import CourseList from '../../components/CourseList/CourseList'
import ScienceRoute from '../../components/ScienceRoute/ScienceRoute';


const Routing = (props) => {
  const link = props.links.find(link => {return link.path === props.path})
  console.log('WIND', window.location.pathname)

  const newLinks = []
  link.subLinks.forEach(subLink => {
    newLinks.push({
      ...subLink,
      path: link.path + subLink.path
    })
  })

  
  return (<>
    <NavigationList
      links={newLinks}
      class_group="navigation__panel_list_group"
      class_item="navigation__label"
      activeClassName="active_label"
    />

    { (link.path === window.location.pathname) ? <Redirect from={link.path} exact to={link.path + link.subLinks[0].path} /> : null}
    {/* <Redirect from={link.path} exact to={link.path + link.subLinks[0].path} /> */}

    {link.subLinks.map(subLink => {
      console.log(subLink.path)
      if (subLink.path === '/admission' || subLink.path === '/history') {
        console.log('Route ', subLink.path)
        return <Route path={link.path + subLink.path} key={subLink.id}  render={()=> <Text section={subLink.path.replace('/','')} />}/>
      }
      else if (subLink.path === '/staff') {
        console.log('Route ',subLink.path)
        return <Route path={link.path + subLink.path} component={Staff} key={subLink.id} />
      }
      else if (subLink.path === '/partnership') {
        console.log('Route ',subLink.path)
        return <Route path={link.path + subLink.path} component={ListOfLinks} key={subLink.id} />
      }
      else if (subLink.path === '/prints') {
        console.log('Route ',subLink.path)
        return <Route path={link.path + subLink.path} component={Prints} key={subLink.id} />
      }
      else if (subLink.path === '/schedule') {
        console.log('Route ',subLink.path)
        return <Route path={link.path + subLink.path} component={Schedule} key={subLink.id} />
      }
      else if (subLink.path === '/courses') {
        console.log('Route ',subLink.path)
        return <Route path={link.path + subLink.path} component={CourseList} key={subLink.id} />
      }
      else if (subLink.path.indexOf('route') !== -1) {
        console.log('Route ',subLink.path)
        return <Route path={link.path + subLink.path} component={ScienceRoute} key={subLink.id} />
      }
      else {
        console.log('WTF ',subLink.path)
        return <Route component={PageNotFound} />
      }
    })}

  </>
  )
}
export default Routing

