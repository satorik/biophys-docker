import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope} from '@fortawesome/free-solid-svg-icons'

const FullPersonCard = ({imageUrl, lastname, middlename, firstname, jobTitle, desc, tel, mail}) => {
  return (
  <div className="col-md-6 mb-3">
    <h5 className="bg-dark text-white text-center p-2">{lastname} {firstname} {middlename}</h5>
    <div className="container d-flex align-items-center">
      <div className="col-md-4 p-0">
        <img src={'http://localhost:4000'+imageUrl} alt="" className="img-fluid rounded-circle w-75 mb-3"/>
      </div>
      <div className="col-md-8">
        <p className="text-muted font-weight-bold">{jobTitle}</p>
        <p>{desc}</p>
        <p className="text-danger"><FontAwesomeIcon icon={faPhone} size="lg"/> {tel}</p>
        <p className="text-danger"><FontAwesomeIcon icon={faEnvelope} size="lg"/> {mail}</p>
      </div>
  </div>
  </div>
  )
}

export default FullPersonCard
