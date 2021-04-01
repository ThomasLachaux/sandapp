import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Flex, Title } from '../components/Helpers';
import PastOrderCard from '../components/PastOrderCard';
import api from '../utils/api';

const OrdersContainer = styled(Flex)`
  max-width: 1000px;
`;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await api.get('/users/me/orders');

      setOrders(response.data);
      setLoaded(true);
    };

    fetchOrders();
  }, []);

  return (
    <Flex direction="column" alignItems="center">
      <Title center>Your orders</Title>
      <OrdersContainer justifyContent="start">
        {loaded && orders.map((order) => <PastOrderCard key={order._id} order={order} />)}
        {loaded && orders.length === 0 && "You haven't made an order yet"}
      </OrdersContainer>
    </Flex>
  );
};

export default Orders;
