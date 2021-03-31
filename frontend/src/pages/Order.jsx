import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import React, { useState } from 'react';
import SandwichCard from '../components/SandwichCard';
import { Flex, Title } from '../components/Helpers';
import { Button } from '../components/Button';
import api from '../utils/api';

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

const convertBasket = (basket) =>
  Object.entries(basket)
    .map(([name, quantity]) => ({ name, quantity }))
    .filter(({ quantity }) => quantity !== 0);

export const Home = () => {
  const sandwiches = useSelector((state) => state.sandwiches);

  const [basket, setBasket] = useState({});

  const orderSandwich = async () => {
    const content = convertBasket(basket);

    await api.post('orders', {
      madeBy: 'random',
      content,
    });

    toast.success('The order was successfully queued');
    setBasket({});
  };

  return (
    <Flex direction="column" alignItems="center">
      <Title center>Sandwiches</Title>
      <RootContainer justifyContent="start">
        {sandwiches.map((sandwich) => (
          <SandwichCard
            key={sandwich._id}
            name={sandwich.name}
            toppings={sandwich.toppings}
            breadType={sandwich.breadType}
            quantity={basket[sandwich.name] ? basket[sandwich.name] : 0}
            onQuantityUpdate={(quantity) => setBasket(() => ({ ...basket, [sandwich.name]: quantity }))}
          />
        ))}
      </RootContainer>
      <OrderButton onClick={orderSandwich} primary disabled={convertBasket(basket).length === 0}>
        Order
      </OrderButton>
    </Flex>
  );
};

export default Home;
