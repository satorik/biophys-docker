import React from 'react'
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'

const Quill = () => {

  const [value, setValue] = React.useState('')

  const changeValue = (value) => {
    setValue(value)
    console.log(value)
  }
  return <ReactQuill value={value}
  onChange={changeValue} />
}

export default Quill
