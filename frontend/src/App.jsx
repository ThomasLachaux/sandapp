import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Router } from '@reach/router';
import Navbar from './components/Navbar';
import { theme } from './utils/style';
import Order from './pages/Order';
import Login from './pages/Login';
import PastOrders from './pages/PastOrders';
import Admin from './pages/Admin';

const Container = styled.div`
  padding: 10px 30px;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container>
        <Router>
          <Order path="/" />
          <PastOrders path="/past-orders" />
          <Login path="/login" />
          <Admin path="/admin" />
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
