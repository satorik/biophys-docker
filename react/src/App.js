import React from 'react'
import './App.css'

import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleLeft, faAngleRight, faCaretUp, faCaretDown, faCircle, faPlus, faArrowUp, faArrowDown, faFileDownload, faEye } from '@fortawesome/free-solid-svg-icons'
import { faEdit, faTrashAlt, faPlusSquare } from '@fortawesome/free-regular-svg-icons'

import NavBarTop from './components/Navigantion/NavBarTop'
import News from './News'
import Blog from './Blog'
import Seminar from './Seminar'
import Conference from './Conference'
import Department from './Department'
import Science from './Science'
import Education from './Education'



library.add(faAngleLeft, faAngleRight, faCaretDown, faCaretUp, faCircle, 
  faPlus, faEdit, faTrashAlt, faArrowUp, faArrowDown, faFileDownload, faEye, faPlusSquare)

const App = () => {

  return (
      <BrowserRouter>
         <div>
          <NavBarTop />
          <Switch>
            <Redirect from="/" exact to="/news" />
            <Route path="/news" component={News} />
            <Route path="/blogpost" component={Blog} />
            <Route path="/seminar" component={Seminar} />
            <Route path="/conference" component={Conference} />
            <Route path="/department" 
              render={(props) => <Department {...props}  />} />
            <Route path="/science" component={Science} />
            <Route path="/education" render={(props) => <Education {...props}  />} /> 
          </Switch>
          </div>
      </BrowserRouter>
  )
}

export default App;
