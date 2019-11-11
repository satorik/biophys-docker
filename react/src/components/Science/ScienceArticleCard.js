import React from 'react'

const ScienceArticleCard = ({author, title, journal}) => {
  return (
    <div className="card bg-light mb-3 w-100">
      <div className="card-body text-secondary">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{author}</p>
        <p className="card-text"><small className="text-muted">{journal}</small></p>
      </div>
    </div>
  )
}

export default ScienceArticleCard
