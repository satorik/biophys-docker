import React from 'react'
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
}

const quillFormats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]

const InputQuill = ({onChanged, onBlur, label, value, children}) => {
  return (
  <div className="form-group">
    <ReactQuill 
      value={value}
      placeholder={label}
      onChange={onChanged} 
      onBlur={onBlur}
      formats={quillFormats}
      modules={quillModules}
      theme='snow'
    />
    {children}
  </div>  
  )
}

export default InputQuill
