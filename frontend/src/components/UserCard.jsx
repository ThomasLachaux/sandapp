import React, { useState } from 'react';
import styled from 'styled-components';
import { IconButton } from './Button';
import { Flex, Title, Text } from './Helpers';

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  width: 100%;
  border: 1px solid #e2e2e2;
  padding: 10px 15px;
  border-radius: 5px;
`;

const UserCard = ({ key }) => {
  const [visible, setVisible] = useState(false);

  return (
    <RootContainer>
      <Flex justifyContent="space-between">
        <Title level={2}>Thomas</Title>
        <IconButton onClick={() => setVisible(!visible)}>
          <i className={`fa fa-chevron-up ${visible ? '' : 'rotate'}`} />
        </IconButton>
      </Flex>
      {visible && (
        <>
          <Title level={4}>Past orders</Title>
          <Text color="gray">#888 - 15.03.2021, 14:00 · Pending · 1 BLT, 3 CHICKEN</Text>
          <Text color="gray">#888 - 15.03.2021, 14:00 · Pending · 1 BLT, 3 CHICKEN, BONJOUR</Text>
          <Text color="gray">#888 - 15.03.2021, 14:00 · Pending · 1 BLT, 3 CHICKEN, LOREM</Text>

          <Title level={4}>User Management</Title>
          <div>
            <input type="checkbox" id={`admin-checkbox-${key}`} />
            <label htmlFor={`admin-checkbox-${key}`}>Admin rights</label>
          </div>
        </>
      )}
    </RootContainer>
  );
};

export default UserCard;
