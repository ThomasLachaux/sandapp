import styled from 'styled-components';
import React from 'react';
import SandwichCard from '../components/SandwichCard';
import { Flex, Title } from '../components/Helpers';
import { Button } from '../components/Button';

const RootContainer = styled(Flex)`
  padding: 10px;
  width: 100%;
  max-width: 1200px;
`;

const OrderButton = styled(Button)`
  margin-top: 50px;
  width: 200px;
  margin: 10px;
`;

export const Home = () => (
  <Flex direction="column" alignItems="center">
    <Title center>Sandwiches</Title>
    <RootContainer justifyContent="start">
      <SandwichCard />
      <SandwichCard />
      <SandwichCard />
      <SandwichCard />
      <SandwichCard />
    </RootContainer>
    <OrderButton primary>Order</OrderButton>
  </Flex>
);

export default Home;
