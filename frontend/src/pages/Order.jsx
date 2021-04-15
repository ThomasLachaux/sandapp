import { toast } from 'react-toastify';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
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
  const [sandwiches, setSandwiches] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [basket, setBasket] = useState({});

  useEffect(() => {
    api.get('/sandwiches').then((response) => {
      setSandwiches(response.data);
      setLoaded(true);
    });
  }, []);

  const [orderSandwichLoading, setOrderSandwichLoading] = useState(false);
  const orderSandwich = async () => {
    setOrderSandwichLoading(true);
    const content = convertBasket(basket);

    await api.post('orders', {
      content,
    });

    toast.success('The order was successfully queued');
    setBasket({});
    setOrderSandwichLoading(false);
  };

  return (
    <Flex direction="column" alignItems="center">
      <Title center>Sandwiches 🥪</Title>
      <RootContainer justifyContent="start">
        {loaded &&
          sandwiches.map((sandwich) => (
            <SandwichCard
              key={sandwich._id}
              sandwich={sandwich}
              quantity={basket[sandwich.name] ? basket[sandwich.name] : 0}
              onQuantityUpdate={(quantity) => setBasket(() => ({ ...basket, [sandwich.name]: quantity }))}
            />
          ))}
        {loaded && sandwiches.length === 0 && 'There are no sandwiches to order'}
      </RootContainer>
      <OrderButton
        onClick={orderSandwich}
        primary
        disabled={convertBasket(basket).length === 0 || orderSandwichLoading}>
        Order {convertBasket(basket).length === 0 || orderSandwichLoading || '🚀'}
      </OrderButton>
    </Flex>
  );
};

export default Home;
