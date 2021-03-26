import styled from 'styled-components';
import React from 'react';
import SandwichCard from '../components/SandwichCart';
import { Flex, Title } from '../components/Helpers';
import { Button } from '../components/Button';

const OrderButton = styled(Button)`
	margin-top: 50px;
`;

export const Home = () => {
	return (
		<>
			<Title>Sandwiches</Title>
			<Flex>
				<SandwichCard />
				<SandwichCard />
				<SandwichCard />
				<SandwichCard />
				<SandwichCard />
				<SandwichCard />
			</Flex>
			<OrderButton>Order</OrderButton>
		</>
	);
};

export default Home;
