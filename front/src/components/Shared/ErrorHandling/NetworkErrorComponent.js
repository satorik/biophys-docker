import React from 'react'

const NetworkErrorComponent = ({error, onDismiss, type}) => {

  //console.log(error)
  
  const {graphQLErrors, networkError} = error
  let errorInfo = []
  let errorType = []
  let errorText = []

  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path, extensions }) => {
      if (extensions.code === "UNAUTHENTICATED") {
        errorType.push('Ошибка авторизации') 
      }
      else {
        errorType.push('Неизвестная ошибка') 
      }
      errorText.push(message)
      errorInfo.push(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)}
    )

  if (networkError) {
   if (networkError.result) 
    networkError.result.errors.map(error => {
      errorInfo.push(`[Network error]: Message: ${error.message}`)
      }        
    )
    // else {
    //   if (networkError.extensions.code === "INTERNAL_SERVER_ERROR") {
    //     errorType.push('Ошибка сервера') 
    //   }
    //   else {
    //     errorType.push('Неизвестная ошибка') 
    //   }
    //   errorText.push(networkError.message)
    //   errorInfo.push(`[Network error]: Message: ${networkError.message}`)

    // }
  }

  if (errorInfo.length > 1) console.log('MNOGA', errorInfo)

  return (
    <div className="container mt-5 text-center">
      <h2>Что-то пошло не так.</h2>
      {
        errorType.map((error, idx) => <div>
          <p className="text-center text-danger d-inline">{error+': '}</p>
          <p className="text-center d-inline">{errorText[idx]}</p>
          {type === 'queryError' && <p className="text-muted">{'(Обратитесь к администрации сайта по адресу: ВСТАВИТЬ АДРЕС)'}</p>}
          <details className="mb-3" style={{ whiteSpace: "pre-wrap" }}>
            {errorInfo[idx]}
          </details>
        </div>)
        
      }
      {onDismiss && <button className="btn btn-secondary" onClick={onDismiss}>Вернуться</button>}
    </div>
  )
}

export default NetworkErrorComponent
