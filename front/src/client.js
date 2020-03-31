import { ApolloClient, InMemoryCache, ApolloLink  } from '@apollo/client'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'

const { createUploadLink } = require('apollo-upload-client')


const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) 
    graphQLErrors.map(({ message, locations, path, extensions }) => {
      console.log(
      `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      )
       if (extensions.code === "UNAUTHENTICATED") {
        localStorage.removeItem('userId')
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('tokenExpiration')
       } 
      }
    )

  if (networkError) console.log(`[Network error]: ${networkError}`)

})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  } 
})

const link = ApolloLink.from([
  errorLink,
  authLink,
  createUploadLink({uri: process.env.REACT_APP_GRAPHQL_URI})
])

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    freezeResults: true
  }),
  connectToDevTools: true
})

export default client