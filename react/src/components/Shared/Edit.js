import React from 'react'
import Input from '../UI/Input'
import { getValue } from '../../utils/getFormChangedValue'
import { postInputChange, postInputBlur, createPostForm } from '../../utils/formHandlers'


const Edit = ({onClickSubmit, onClickCancel, formTemplate, isAbleToSave, post, border}) => {
  
  const [postForm, setPostForm] = React.useState(createPostForm(formTemplate, post))
  const [formIsValid, setFormIsValid] = React.useState(false)
  const [imagePreview, setImagePreview] = React.useState(post.imageUrl ? process.env.REACT_APP_STATIC_URI+post.imageUrl : null)

  React.useEffect(() => {
    if(isAbleToSave) {
      setPostForm(createPostForm(formTemplate, post))
      setImagePreview(post.imageUrl ? process.env.REACT_APP_STATIC_URI+post.imageUrl : null)
    }
  }, [formTemplate])

  const postInputChangeHandler = (event, id) => {
    getValue(event, postForm[id].type, postForm[id].value)
    .then(valueObj => {
      if (postForm[id].title === 'image') {
         setImagePreview(valueObj.imagePreview)
      }
      const updatedState = postInputChange(postForm, id, valueObj.value)
      setPostForm(updatedState.postForm)
      setFormIsValid(updatedState.formIsValid)
    })
    .catch(e => console.log(e))
  }

  const inputBlurHandler = (id, subType) => {
    if (!postForm[id].touched || (typeof(postForm[id].touched) === 'object' && !postForm[id].touched[subType])) {
      setPostForm(postInputBlur(postForm, id, subType))
    }
  }

  return (
    <div className={`text-left my-3 ${border ? "border border-secondary p-3" : ""}`}>
      {!isAbleToSave && <p className="text-danger text-center">Заполните форму верно</p>}
      <p>* - обязательное поле</p>
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
                idx = {idx}
                id={control.title}
                label={control.label}
                control={control.type}
                onChanged={(e) => postInputChangeHandler(e, idx)}
                onBlur={inputBlurHandler}
                valid={control.valid}
                touched={control.touched}
                value={control.value}
                required={control.required}
            />
            )
          }
            <button type="submit" className="btn btn-primary mr-3" onClick={(e) => onClickSubmit(e, postForm, formIsValid)}>Сохранить</button>
            <button type="reset" className="btn btn-secondary" onClick={onClickCancel}>Отменить</button>
      </form>
    </div>
  )
}

export default Edit
