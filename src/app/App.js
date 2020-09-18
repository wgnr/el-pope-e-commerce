import React from 'react';
// Material UI
import {
  Container,
} from '@material-ui/core';
// Components
import Header from './components/Header';
// Contexts
import { CartProvider } from './contexts/CartContext'
import { LoadingProvider } from './contexts/LoadingContext'
// Routing
import Routes from './routes/'

function App() {
  return (
    <LoadingProvider>
      <CartProvider>

        <Container maxWidth="xl" >
          <Header />
          <Routes />

        </Container>

      </CartProvider>
    </LoadingProvider>
  );
}

export default App;