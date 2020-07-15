import React from 'react'
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'video'],
    ['clean']
  ],
}

const quillFormats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'video'
]
const InputQuill = ({onChanged, onBlur, label, value, children, required}) => {
  return (
  <div className="form-group">
    <ReactQuill 
      value={value}
      placeholder={label+`${required ? '*': ''}`}
      onChange={onChanged} 
      onPaste={onChanged} 
      onBlur={onBlur}
      formats={quillFormats}
      modules={quillModules}
      bounds='.quill'
      theme='snow'
    />
    {children}
  </div>  
  )
}

export default InputQuill
