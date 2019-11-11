import React from 'react'

const Print = ({print}) => {
  return (
    <div>
      <img src={print.imageUrl} alt=""/>
      <p>{print.desc}</p>
      <p>{print.link}</p>
    </div>
  )
}

export default Print
