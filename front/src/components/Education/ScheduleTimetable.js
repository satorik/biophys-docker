import React from 'react'

const ScheduleTimetable = ({headers}) => {

  return (
    <div className="col-md-1 d-flex flex-column p-0">
      {headers.map(header => 
        <div key={header.id}>
          <div className="bg-light text-center border-bottom" style={{height:'10rem'}}>
            <p>{header.timeFrom}</p>
            <p>{header.timeTo}</p>
          </div>
          <div className="bg-light text-center border-bottom" style={{height:'4rem'}}>
          </div>
        </div>
        )
      }
    </div>
   
  )

}

export default ScheduleTimetable
