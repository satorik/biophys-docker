import React from 'react'

const InputResourse = ({onChanged, onBlur, label, value, children, required}) => {

  const isLink = label.find(el => el.id === value.educationFormId).filetype === 'URL'
  const isMulty = label.find(el => el.id === value.educationFormId).type === 'MULTY'
  const selectedForm = label.find(el => el.id === value.educationFormId)

  console.log(selectedForm.subSections)
  return (
      <div>
          <select
              className='form-control mb-3'
              value={value.educationFormId}
              title='educationFormId'
              onChange={onChanged}
          >
             {label.map(select => <option key={select.id} value={select.id}>{select.title}</option>)} 
          </select> 
          {selectedForm.subSections.length !== 0 && <div className="form-group">
          <select
              className='form-control mb-3'
              value={value.subSectionId}
              title='subSectionId'
              onChange={onChanged}
          >
              <option key='zero' value=''></option>
             {selectedForm.subSections.map(select => <option key={select.id} value={select.id}>{select.title}</option>)} 
          </select>
          <small className="form-text text-muted">Выберите подзаголовок из имеющихся или введите новый</small>
          </div>}
          {value.subSectionId === '' && isMulty && <input
            type='text'
            className='form-control mb-3'
            value={value.subSectionText}
            placeholder="Подзаголовок"
            title='subSectionText'
            onChange={onChanged}
            />}
          {
            isLink && 
            <input
            type='text'
            className='form-control mb-3'
            value={value.file}
            placeholder={'Ссылка на видеозапись'+`${required ? '*': ''}`}
            title='file'
            onChange={onChanged}
            onBlur={onBlur}
            />
          }
          {
            !isLink && 
            <div className="form-group">
              <div className="custom-file">
                <input 
                  type="file" 
                  className="custom-file-input"
                  onChange={onChanged}
                  onBlur={onBlur}
                  title='file'
                  id="customFile"/>
                <label className="custom-file-label" htmlFor="customFile">{value.file.name ? value.file.name : 'Выберите файл'+`${required ? '*': ''}`}</label>
              </div>
            </div>
          }
            
        {children}
      </div>
  )
}

export default InputResourse