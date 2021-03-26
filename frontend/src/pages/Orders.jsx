import React from 'react';
import { Flex, Title } from '../components/Helpers';
import OrderCard from '../components/OrderCard';

const Orders = () => {
	return (
		<>
			<Title>Your orders</Title>
			<Flex>
				<OrderCard />
				<OrderCard />
				<OrderCard />
				<OrderCard />
				<OrderCard />
				<OrderCard />
			</Flex>
		</>
	);
};

export default Orders;
