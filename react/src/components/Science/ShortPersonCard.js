import React from 'react'

const ShortPersonCard = ({firstname, lastname, middlename, description}) => {
  return (
    <div>
      <p className="font-weight-bold m-0">{lastname} {firstname} {middlename}</p><small className="text-muted">{description}</small>
    </div>
  )
}

export default ShortPersonCard
