import React, {useEffect} from 'react'
import EditButtons from '../UI/EditButtons'

const ScheduleLecture = ({timeFrom, timeTo, discipline, lector, lectureHall, width, color, isShift, startFrom, onEditClick, onDeleteClick}) => {

  const refDiv = React.createRef()

  const isOverflown = ({ clientWidth, clientHeight, scrollWidth, scrollHeight }) => {
    return scrollHeight > clientHeight || scrollWidth > clientWidth;
  }

  // useEffect(() => {
  //   //console.log(discipline, isOverflown(refDiv.current.clientWidth, refDiv.current.clientHeight, refDiv.current.clientWidth, refDiv.current.scrollHeight))
  //   console.log(discipline, refDiv.current.clientHeight)
  // });

  return <>
          {isShift && <div className="col-6"></div>}
          <div className="col-2 bg-danger text-white border-bottom border-white d-flex flex-row justify-content-between">
            <div className="align-self-start">
              <EditButtons 
                onClickEdit={onEditClick}
                onClickDelete={onDeleteClick}
                size="sm"
                color="white"
                row
              />
            </div>
            <div className="d-flex flex-column justify-content-around align-self-center">
              <p className="m-0 font-weight-bold">{timeFrom}</p>
              <p className="m-0 font-weight-bold">{timeTo}</p>
            </div>
          </div>
          <div ref={refDiv} className={`${width} border-bottom border-white d-flex flex-column justify-content-center`} style={{backgroundColor:color}}>
            <div className="d-flex justify-content-between">
              <p className="m-0 text-danger">{startFrom ? startFrom : null}</p>
              <p className="m-0 text-danger">{lectureHall}</p>
            </div>
            <div>
              <p className="font-weight-bold m-0">{discipline}</p>
              <p className="font-italic m-0">{lector}</p>
            </div>
          </div>
        </>
}

export default ScheduleLecture
