import React from 'react'

const NetworkErrorComponent = ({error}) => {

  const {graphQLErrors, networkError} = error
  let errorInfo = []

  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      errorInfo.push(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    )

  if (networkError) {
   if (networkError.result) 
    networkError.result.errors.map(({ message }) => 
    errorInfo.push(`[Network error]: Message: ${message}`)
    )
    else errorInfo.push(`[Network error]: Message: ${networkError.message}`)
  }


  return (
    <div className="container mt-5 text-center">
      <h2>Произошла ошибка</h2>
      <details style={{ whiteSpace: "pre-wrap" }}>
        {error && error.toString()}
        <br />
        {errorInfo.join(', ')}
      </details>
    </div>
  )
}

export default NetworkErrorComponent
