import React from 'react'
import EditButtons from '../UI/EditButtons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ShortPersonCard = ({firstname, lastname, middlename, description, onEditClick, onDeleteClick, onClickUp, onClickDown, firstElement, 
  lastElement, tel, mail, urlIstina, urlRints, urlOrcid, urlResearcher, urlScopus, englishName}) => {
    
  return (
    <div className="pl-2 mb-2" style={{borderLeft: '4px solid #fd7e14'}}>
      <div className="d-flex align-items-start" >
        <p className="font-weight-bold mr-2 my-0">{lastname} {firstname} {middlename}</p>
        <p className="text-muted mr-2 my-0">{englishName && `(${englishName})`}</p>
        <EditButtons 
          onClickEdit={onEditClick}
          onClickDelete={onDeleteClick}
          onClickUp={onClickUp}
          onClickDown={onClickDown}
          size="sm"
          color="black"
          row
          withArrowUp={!firstElement}
          withArrowDown={!lastElement}
      />
      </div>
      <small className="text-muted">{description}</small>
      <div>
          { tel && <><span className="mr-1"><FontAwesomeIcon icon="phone" style={{color: 'var(--green)'}} size="sm"/></span> <span className="mr-4">{tel}</span></>}
          { mail && <><span className="mr-1"><FontAwesomeIcon icon="envelope" style={{color: 'var(--green)'}} size="sm"/></span><span>{mail}</span></>}
      </div>
      <div>
        { urlIstina && <a href={urlIstina} className="mr-1">ИСТИНА</a>}
        { urlRints && <a href={urlRints} className="mr-1">РИНЦ</a>}
        { urlOrcid && <a href={urlOrcid} className="mr-1">ORCID</a>}
        { urlResearcher && <a href={urlResearcher} className="mr-1">Researcher</a>}
        { urlScopus && <a href={urlScopus} className="mr-1">Scopus</a>}
      </div>
    </div>
  )
}

export default ShortPersonCard
