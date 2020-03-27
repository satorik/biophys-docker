import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import { render } from 'react-dom'
import { ApolloProvider, ApolloClient, InMemoryCache  } from '@apollo/client'
import App from './App'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'

const { createUploadLink } = require('apollo-upload-client')


const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    )

  if (networkError) console.log(`[Network error]: ${networkError}`);
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

const link = errorLink.concat(createUploadLink({uri: process.env.REACT_APP_GRAPHQL_URI})).concat(authLink)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    freezeResults: true
  }),
  connectToDevTools: true
})

const Index = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

render(<Index />, document.getElementById('root'));

