import styled from 'styled-components';
import React from 'react';
import { Flex, Text, Title } from './Helpers';
import { IconButton } from './Button';

const RootContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
  min-width: 400px;
  width: calc(50% - 40px);
  border: 1px solid #e2e2e2;

  @media screen and (max-width: 1000px) {
    width: 100%;
  }
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

const SandwichCard = ({ name, toppings, breadType, onQuantityUpdate, quantity }) => (
  <RootContainer>
    <Flex>
      <Thumbnail src="https://dummyimage.com/300" />
      <InfoContainer>
        <div>
          <SandwichName level={3}>{name}</SandwichName>
          <Text color="gray">{toppings.join(', ')}</Text>
          <br />
          <Text color="gray">{breadType}</Text>
        </div>
        <Availibility />
      </InfoContainer>
    </Flex>
    <Flex margin="5px" alignItems="center">
      <Quantity style={{ visibility: quantity === 0 ? 'hidden' : 'visible' }}>x{quantity}</Quantity>

      <IconButton
        style={{ visibility: quantity === 0 ? 'hidden' : 'visible' }}
        onClick={() => onQuantityUpdate(Math.max(quantity - 1, 0))}>
        <i className="fa fa-minus" />
      </IconButton>
      <IconButton onClick={() => onQuantityUpdate(Math.min(quantity + 1, 9))}>
        <i className="fa fa-plus" />
      </IconButton>
    </Flex>
  </RootContainer>
);

export default SandwichCard;
