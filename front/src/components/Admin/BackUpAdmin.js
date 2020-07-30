import React from 'react'

export const BackUpAdmin = () => {

  const onClickBackup = () => {

  }

  return (
    <div className = "bg-light p-3 col-9">
       <h4 className="text-center mb-2">Управление пользователями</h4>
       <button className="btn btn-primary" onClick={() => onClickBackup()}>BackUp</button>
    </div>
      
  )
}
