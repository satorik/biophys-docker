import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import { render } from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import App from './App'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'

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

const link = errorLink.concat(createUploadLink({uri: process.env.REACT_APP_GRAPHQL_URI}))

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const Index = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

render(<Index />, document.getElementById('root'));

