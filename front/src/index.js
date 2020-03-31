import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import { render } from 'react-dom'
import { ApolloProvider  } from '@apollo/client'
import client from './client'
import App from './App'

const Index = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

render(<Index />, document.getElementById('root'));

