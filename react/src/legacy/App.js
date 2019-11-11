import React from 'react';
import './App.css';

import NavigationList from '../components/NavigationList/NavigationList'
import Carousel from '../components/Carousel/Carousel'
import Main from '../pages/Main/Main'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import PageNotFound from '../pages/PageNotFound/PageNotFound'
import Routing from '../hoc/Routing/Routing'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'


const GET_LINKS = gql`
{
  links {
    id,
    title,
    path,
    subLinks {
      id,
      title,
      path,
      upLink {
        path
      }
    }
  }
}
`


const App = () => {

  const { loading, error, data } = useQuery(GET_LINKS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
      <BrowserRouter>
        <div className="App">
          <NavigationList  links = {data.links} class_group="navigation__list_group" class_item="navigation__link_item" />
          <Carousel />
          <Switch>
            <Redirect from="/" exact to="/news" />
            <Route path="/news" component={Main} key='sdf23' />
            {data.links.map(link => {
              if (link.subLinks.length !== 0) {
                return <Route path={link.path} key={link.id} render={() => <Routing links={data.links} path={link.path}/>}/>
              }
              else {
                return <Route path={link.path} component={Main} key={link.id} />
              }
            })}  
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
  )
}

export default App;
