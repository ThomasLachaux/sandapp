import React, { useState } from 'react';
import styled from 'styled-components';
import { Flex, IconButton, Title, Subtitle } from './Helpers';

const RootContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin: 10px 0px;
	padding: 15px 10px;
	width: 500px;
	border: 3px solid black;
	border-radius: 10px;
`;

const OrderItem = styled(Title)`
	margin: 0px;
`;

const Status = styled.span`
	color: ${({ theme, children }) => {
		switch (children.toLowerCase()) {
			case 'delivered':
				return theme.green;

			case 'pending':
				return theme.orange;

			default:
				return theme.red;
		}
	}};
`;

const OrderCard = () => {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<RootContainer>
			<Flex>
				<Flex direction="column">
					<Title level={5}>Order #543</Title>
					<span>
						<Subtitle>
							15.03.2021 14:00 - <Status>Delivered</Status>
						</Subtitle>
					</span>
				</Flex>
				<IconButton onClick={() => setCollapsed(!collapsed)}>
					<i className={`fa fa-sort-${collapsed ? 'up' : 'down'}`} />
				</IconButton>
			</Flex>
			{!collapsed && (
				<>
					<OrderItem level={2}>1 BLT</OrderItem>
					<OrderItem level={2}>3 Chicken</OrderItem>
				</>
			)}
		</RootContainer>
	);
};

export default OrderCard;
