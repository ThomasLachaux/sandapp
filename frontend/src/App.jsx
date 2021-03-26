import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Router } from '@reach/router';
import Navbar from './components/Navbar';
import { theme } from './utils/style';
import Home from './pages/Home';
import Login from './pages/Login';
import Orders from './pages/Orders';

const Container = styled.div`
	padding: 10px 30px;
`;

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Navbar />
			<Container>
				<Router>
					<Home path="/" />
					<Orders path="/orders" />
					<Login path="/login" />
				</Router>
			</Container>
		</ThemeProvider>
	);
}

export default App;
