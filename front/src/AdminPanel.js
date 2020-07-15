import React from 'react'
import {PageDetailsView} from './components/Admin/PageDetailsView'

const PANELLINKS = [
  {name: 'users',
  title: 'Пользователи'
  },
  {name: 'backup',
  title: 'Бэкапы базы данных'
  }
]



export const AdminPanel = () => {
  
  const [viewId, setViewId] = React.useState(0)

  const onSelectPanelLink = (idx) => {
    setViewId(idx)
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-3 p-0 flex-column" style={{borderRight: '3px solid #ffc107'}}>
          {PANELLINKS.map((link, idx) => 
            <div 
              key={idx}
              className={`d-flex justify-content-between p-3 ${idx === viewId ? 'bg-warning' : 'bg-light'}`}
              style={{cursor:'pointer'}}
              onClick={() => onSelectPanelLink(idx)}
             >{link.title}</div>
          )}
        </div>
        <PageDetailsView 
          section = {PANELLINKS[viewId]}
        />
      </div>
    </div>
  )
}
