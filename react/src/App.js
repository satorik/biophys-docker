import React from 'react';

import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleLeft, faAngleRight, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

import NavBarTop from './components/Navigantion/NavBarTop'
import { ThemeContextProvider } from './context/ThemeContext'
import News from './News'
import Blog from './Blog'
import Seminar from './Seminar'
import Conference from './Conference'
import Department from './Department'
import Science from './Science'
import Education from './Education'
import Spinner from './components/UI/Spinner'
import Header from './components/UI/Header/Header';


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


const STYLES = {
  backgroundColor: {
    main:'#150C42',
    note:'#6811FC',
    seminar:'#0B2CA5',
    conference:'#13663C',
    blogpost:'rgb(9, 100, 116)'
  }
}

library.add(faAngleLeft, faAngleRight, faCaretDown, faCaretUp)

const App = () => {

  const { loading, error, data } = useQuery(GET_LINKS)
  if (loading) return <Spinner />
  if (error) return <p>Error :(</p>

  return (
      <BrowserRouter>
        <ThemeContextProvider value={STYLES}>
         <div>
          <NavBarTop links={data.links} />
          <Switch>
            <Redirect from="/" exact to="/news" />
            <Route path="/news" component={News} />
            <Route path="/blogpost" component={Blog} />
            <Route path="/seminar" component={Seminar} />
            <Route path="/conference" component={Conference} />
            <Route path="/department" 
              render={(props) => <Department {...props} links={data.links.find(o => o.path === '/department')} />} />
            <Route 
              path="/science" 
              render={(props) => <Science {...props} links={data.links.find(o => o.path === '/science')} />} 

            />
            <Route path="/education" render={(props) => <Education {...props} links={data.links.find(o => o.path === '/education')} />} /> 
          </Switch>
          </div>
        </ThemeContextProvider>
      </BrowserRouter>
  )
}

export default App;
