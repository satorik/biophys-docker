import React from 'react'
import Input from '../UI/Input'
import { getChangedValue } from '../../utils/valueHandlers'
import { postInputChange, postInputBlur, createPostForm, checkFormIsValid } from '../../utils/formHandlers'
import { generateBase64FromImage } from '../../utils/image'
import { trasformPostData } from '../../utils/postDataHandlers'


const Edit = ({onClickSubmit, onClickCancel, formTemplate, post, border}) => {
  
  const [postForm, setPostForm] = React.useState(createPostForm(formTemplate, post))
  const [imagePreview, setImagePreview] = React.useState(post.imageUrl ? process.env.REACT_APP_STATIC_URI+post.imageUrl : null)
  const [canSave, setCanSave] = React.useState(true)

  // React.useEffect(() => {
  //   if(isAbleToSave) {
  //     setPostForm(createPostForm(formTemplate, post))
  //     setImagePreview(post.imageUrl ? process.env.REACT_APP_STATIC_URI+post.imageUrl : null)
  //   }
  // }, [formTemplate])

  const postInputChangeHandler = async (event, id) => {
    if (!canSave) setCanSave(true)

    const newValue = getChangedValue(event, postForm[id].type, postForm[id].value)
    setPostForm(postInputChange(postForm, id, newValue.value, Object.entries(post).length !== 0))

    if (postForm[id].title === 'image') {
      try {
          const b64 = await generateBase64FromImage(newValue)
          setImagePreview(b64)
        } catch(e) {
          throw new Error('Failed to generate b64')
        }
    }
  }

  const inputBlurHandler = (id, subType) => {
    if (!postForm[id].touched || (typeof(postForm[id].touched) === 'object' && !postForm[id].touched[subType])) {
      setPostForm(postInputBlur(postForm, id, subType))
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()

     const formValidity = checkFormIsValid(postForm)
     setPostForm(formValidity.postForm)
 
     if (formValidity.formValid) {
       const postData = trasformPostData(postForm)     
       onClickSubmit(postData)
     
      }
     else {
      setCanSave(false)
     }
  }
 
  console.log(postForm)

  return (
    <div className={`text-left my-3 ${border ? "border border-secondary p-3" : ""}`}>
      {!canSave && <p className="text-danger text-center">Заполните форму верно</p>}
      <p>* - обязательное поле</p>
      <form>
          <div> {imagePreview && (<img className="img-thumbnail w-25" src={imagePreview} />)} </div>    
          {postForm.map((control, idx) => 
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
                errors = {control.validationErrors}
                required={control.required}
            />
            )
          }
            <button type="submit" className="btn btn-primary mr-3" onClick={(e) => submitHandler(e)}>Сохранить</button>
            <button type="reset" className="btn btn-secondary" onClick={onClickCancel}>Отменить</button>
      </form>
    </div>
  )
}

export default Edit
