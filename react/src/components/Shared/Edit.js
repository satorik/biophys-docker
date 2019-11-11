import React from 'react'
import Input from '../UI/Input'
import { getValue } from '../../utils/getFormChangedValue'
import { postInputChange, postInputBlur, createPostForm } from '../../utils/formHandlers'


const Edit = ({onClickSubmit, onClickCancel, formTemplate, isAbleToSave, post, config}) => {
  
  const [postForm, setPostForm] = React.useState(createPostForm(formTemplate, post))
  const [formIsValid, setFormIsValid] = React.useState(false)
  const [imagePreview, setImagePreview] = React.useState(post.imageUrl ? process.env.REACT_APP_STATIC_URI+post.imageUrl : null)

  const postInputChangeHandler = (event, id) => {
    getValue(event, postForm[id].type, postForm[id].value)
    .then(valueObj => {
      if (postForm[id].type === 'file') {
         setImagePreview(valueObj.imagePreview)
      }
      const updatedState = postInputChange(postForm, id, valueObj.value)
      setPostForm(updatedState.postForm)
      setFormIsValid(updatedState.formIsValid)
    })
    .catch(e => console.log(e))
  }

  const inputBlurHandler = (id) => {
    if (!postForm[id].touched) {
      setPostForm(postInputBlur(postForm, id))
    }
  }

  return (
    <div>
      {!isAbleToSave && <p className="text-danger text-center">Заполните форму верно</p>}
      <form>
           <div>
              {imagePreview && (
                  <img 
                    className="img-thumbnail w-25"
                    src={imagePreview}
                  />
              )}
            </div>
            
          {
            postForm.map((control, idx) => 
              <Input
                key={idx}
                id={control.title}
                label={control.label}
                control={control.type}
                onChanged={(e) => postInputChangeHandler(e, idx)}
                onBlur={() => inputBlurHandler(idx)}
                valid={control.valid}
                touched={control.touched}
                value={control.value}
            />
            )
          }
            <button type="submit" className="btn btn-primary mr-3" onClick={(e) => onClickSubmit(e, postForm, formIsValid, post.id)}>Сохранить</button>
            <button type="reset" className="btn btn-secondary" onClick={onClickCancel}>Отменить</button>
      </form>
    </div>
  )
}

export default Edit
