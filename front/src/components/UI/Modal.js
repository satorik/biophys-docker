import React from 'react'
import Backdrop from './Backdrop'

const Modal = ({isOpen, title, children, onClose}) => {

  const styleModal = {
    overflowY:'auto',
    maxHeight:'85%',
    position: 'fixed',
    zIndex: 500,
    width:'60%',
    left: '20%',
    top: '10%',
    transition: 'all 0.3s ease-out',
    transform: isOpen ? 'translateY(0)' :'translateY(-100vh)',
    opacity: isOpen ? '1' : '0'
  }


  return (
    <>
    <Backdrop 
      show={isOpen}
      clicked={onClose}
    />
    <div className="card "
      style={styleModal}
    >
        <div className="card-header d-flex justify-content-between">
          <h3>{title}</h3>
          <button type="button" className="close" aria-label="Close" onClick={onClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-body">
          {children}
        </div>
    </div>
    </>
  )
}

export default Modal
