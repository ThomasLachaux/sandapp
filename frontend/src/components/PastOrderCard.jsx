import React, { useState } from 'react';
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
  border: 1px solid #e2e2e2;
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
  const [visible, setVisible] = useState(false);

  return (
    <RootContainer>
      <Flex>
        <Flex direction="column">
          <Title level={4}>Order #543</Title>
          <span>
            <Text>
              <Text color="gray">15.03.2021 14:00 · </Text>
              <Status>Delivered</Status>
            </Text>
          </span>
        </Flex>
        <IconButton onClick={() => setVisible(!visible)}>
          <i className={`fa fa-chevron-down ${visible ? 'rotate' : ''}`} />
        </IconButton>
      </Flex>
      <Title level={3} stickedLeft>
        3 sandwiches
      </Title>
      {visible && (
        <>
          <Text>1 BLT</Text>
          <Text>1 BLT</Text>
          <Text>1 BLT</Text>
        </>
      )}
    </RootContainer>
  );
};

export default OrderCard;
