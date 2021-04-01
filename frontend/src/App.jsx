import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import Navbar from './components/Navbar';
import { theme } from './utils/style';

import 'react-toastify/dist/ReactToastify.css';

import store from './reducers';
import Router from './pages';

const Container = styled.div`
  padding: 10px 30px;
`;

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Container>
          <Router />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHove
          />
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
