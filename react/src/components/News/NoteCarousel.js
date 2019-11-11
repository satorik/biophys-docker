import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NoteCarousel = ({selectedNote, showContent, last, onClickLeft, onClickRight, onClickDown, content, title, 
  description, onClickEdit, onClickDelete, onClickNew}) => {

  const buttonClass = 'btn mr-1 btn-outline-light'

  return (
    <div className="container-fluid bg-dark">
      <div className="row">
        <div className="col-2 d-flex align-items-center text-white justify-content-center">      
            {selectedNote !== 0 && <FontAwesomeIcon icon="angle-left" size="lg" onClick={onClickLeft} />}
          </div>
          <div className="col-8 text-center" style={{position:'relative'}}>
              <div style={{position:'absolute', right: '2%', top: '10%'}}>
                  <button className={buttonClass} onClick={onClickNew}>N</button>
                  <button className={buttonClass} onClick={onClickEdit}>E</button>
                  <button className={buttonClass} onClick={onClickDelete}>D</button>
                </div>
            <div className="text-white py-3">
                <h3>{title}</h3>
                <p>{description}</p>
                {showContent && <p className="text-justify">{content}</p>}
                {content && 
                <p className="d-block m-0 text-center">
                  <FontAwesomeIcon 
                    icon={showContent ? "caret-up" : "caret-down"} 
                    size="lg" 
                    onClick={onClickDown} 
                  />
                </p>}
            </div>
          </div>
          <div className="col-2 d-flex align-items-center text-white justify-content-center">
            {selectedNote !== last && <FontAwesomeIcon icon="angle-right" size="lg" onClick={onClickRight} />}
          </div>
      </div>
    </div>
  )
}

export default NoteCarousel
