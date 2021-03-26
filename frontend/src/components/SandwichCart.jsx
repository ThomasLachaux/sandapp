import styled from 'styled-components';
import React, { useState } from 'react';
import { Flex, IconButton, Subtitle, Title } from './Helpers';

const RootContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 10px 0px;
	width: 500px;
`;

const InfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100px;
`;

const Thumbnail = styled.img`
	width: 100px;
	height: 100px;
	margin-right: 10px;
`;

const SandwichName = styled(Title)`
	margin: 0px;
`;

const StyledAvailibility = styled.div`
	color: ${({ theme, available }) => (available ? theme.green : theme.red)};
`;

const Availibility = ({ available }) => (
	<StyledAvailibility available={available}>{available ? 'Available' : 'Not available'}</StyledAvailibility>
);

const Quantity = styled.span`
	color: ${({ theme }) => theme.primaryLight};
	font-size: 1.5em;
`;

const SandwichCard = () => {
	const [quantity, setQuantity] = useState(0);

	return (
		<RootContainer>
			<Flex>
				<Thumbnail src="https://dummyimage.com/300" />
				<InfoContainer>
					<div>
						<SandwichName level={3}>BLT</SandwichName>
						<Subtitle>Bacon, Lettuce, Tomato</Subtitle>
					</div>
					<Availibility />
				</InfoContainer>
			</Flex>
			<Flex margin="5px" alignItems="center">
				<Quantity style={{ visibility: quantity === 0 ? 'hidden' : 'visible' }}>x{quantity}</Quantity>

				<IconButton
					style={{ visibility: quantity === 0 ? 'hidden' : 'visible' }}
					onClick={() => setQuantity(Math.max(quantity - 1, 0))}>
					<i className="fa fa-minus" />
				</IconButton>
				<IconButton onClick={() => setQuantity(Math.min(quantity + 1, 9))}>
					<i className="fa fa-plus" />
				</IconButton>
			</Flex>
		</RootContainer>
	);
};

export default SandwichCard;
