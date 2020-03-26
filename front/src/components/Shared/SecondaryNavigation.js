import React from 'react'

const SecondaryNavigation = ({title, index}) => {

  //const divStyle = index % 2 == 1 ? {backgroundColor: '#007bff', width:"10rem"} : {backgroundColor: '#3396ff', width:"10rem"}
  //console.log(divStyle)
  return (
        <div className="text-wrap p-3 d-flex align-items-ceter" style={{width:"10rem"}}>
          <p>{title}</p>
        </div>
  )
}

export default SecondaryNavigation
