import React from 'react'
import {Link} from 'react-router-dom'

const BlogpostCard = ({imageUrl, id, title, description}) => {
  return (
    <div className="col-md-12" id={id}>
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={process.env.REACT_APP_STATIC_URI+imageUrl} className="card-img " alt="..." style={{'height':'12rem','objectFit': 'cover', 'width': '100%'}} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p className="card-text"><small className="text-muted"><Link to={`/blogpost?id=${id}`}>читать дальше</Link></small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogpostCard