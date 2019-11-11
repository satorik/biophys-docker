import React from 'react'

const LinkCard = ({imageUrl, link, desc, title}) => {
  return (
    <div className="card bg-light mb-3" style={{maxWidth: '22rem'}}>
      <div className="card-header d-flex justify-content-between align-items-center">
      <img src={imageUrl} alt="" className="img-fluid w-25" />
      <a href={link}>{title}</a></div>
      <div className="card-body">
        <p className="card-text">{desc}</p>
      </div>
    </div>
  )
}

export default LinkCard
