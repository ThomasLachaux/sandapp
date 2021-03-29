import React from 'react';
import styled from 'styled-components';
import { Flex, Title } from '../components/Helpers';
import PastOrderCard from '../components/PastOrderCard';

const OrdersContainer = styled(Flex)`
  max-width: 1000px;
`;

const Orders = () => (
  <Flex direction="column" alignItems="center">
    <Title center>Your orders</Title>
    <OrdersContainer justifyContent="start">
      <PastOrderCard />
      <PastOrderCard />
      <PastOrderCard />
      <PastOrderCard />
      <PastOrderCard />
      <PastOrderCard />
    </OrdersContainer>
  </Flex>
);

export default Orders;
