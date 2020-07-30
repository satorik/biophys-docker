import React from 'react'
import { gql, useQuery } from '@apollo/client'

const header = process.env.REACT_APP_STATIC_URI+'/images/header/header-news.jpg'

const headerImage = {
  height: '20rem',
  width: '100%',
  backgroundImage: `url(${header})`,
  backgroundSize: 'cover',
  backgroundPosition: 'top',
  overflow: 'hidden'
}

const GET_NEWS = gql`                    
  query getNotes{  
    notes(limit: 5) {
      id
      title
      description
      content
      onTop
    }
  }
`

const HeaderNews = () => {

  const { data } = useQuery(GET_NEWS)

  const [topNote, setTopNote] = React.useState({title: '', description: ''})
 
  React.useEffect(() => {
    if (data && data.notes.length > 0) {
      const topNote = data.notes.find(note => note.onTop)
      if (topNote) setTopNote(topNote)
      else setTopNote({title: '', description: ''})
    }
  }, [data])


  return (
    <div style={headerImage}>
      <div className="card col-md-4 ml-auto mr-5 mt-3 text-white" style={{backgroundColor:'rgba(0, 0, 0, 0.7)'}}>
        <div className="card-body">
          <h5 className="card-title">{topNote.title}</h5>
          <p className="card-text">{topNote.description}</p>
        </div>
      </div>
    </div>
  )
}

export default HeaderNews



