import React, { useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Flex, Title, Text } from './Helpers';
import { IconButton } from './Button';

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 5px;
  padding: 15px 10px;
  width: 100%;
  min-width: 400px;
  border-radius: 5px;
  border: 1px solid #e2e2e2;
`;

const Status = styled.span`
  text-transform: capitalize;
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

const OrderCard = ({ order }) => {
  const [visible, setVisible] = useState(false);

  const totalSandwiches = order.content.reduce((previous, current) => previous + current.quantity, 0);

  return (
    <RootContainer>
      <Flex>
        <Flex direction="column">
          <Title level={4}>Order #{order.displayId}</Title>
          <span>
            <Text>
              <Text color="gray">{moment(order.createdAt).format('DD.MM.YYYY HH.mm')} · </Text>
              <Status>{order.status}</Status>
            </Text>
          </span>
        </Flex>
        <IconButton onClick={() => setVisible(!visible)}>
          <i className={`fa fa-chevron-down ${visible ? 'rotate' : ''}`} />
        </IconButton>
      </Flex>
      <Title level={3} stickedLeft>
        {totalSandwiches} sandwich{totalSandwiches !== 1 && 'es'}
      </Title>
      {visible && (
        <>
          {order.content.map((sandwich) => (
            <Text key={sandwich.name}>
              {sandwich.quantity} {sandwich.name}
            </Text>
          ))}
        </>
      )}
    </RootContainer>
  );
};

export default OrderCard;
