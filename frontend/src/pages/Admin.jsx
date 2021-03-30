import React from 'react';
import styled from 'styled-components';
import AdminSandwichCard from '../components/AdminSandwichCard';
import { Button } from '../components/Button';
import { Flex, Title } from '../components/Helpers';
import UserCard from '../components/UserCard';

const SubContainer = styled(Flex)`
  width: 40%;
  min-width: 600px;
`;

const UsersContainer = () => (
  <SubContainer direction="column">
    <Title stickedLeft>Users</Title>
    <UserCard />
    <UserCard />
    <UserCard />
  </SubContainer>
);

const SandwichesContainer = () => (
  <>
    <SubContainer direction="column">
      <Title stickedLeft>Sandwiches</Title>
      <AdminSandwichCard />
      <AdminSandwichCard />
      <AdminSandwichCard />
      <AdminSandwichCard />
      <Button>Add new</Button>
    </SubContainer>
  </>
);

const Admin = () => (
  <Flex justifyContent="center" margin="20px">
    <UsersContainer />
    <SandwichesContainer />
  </Flex>
);
export default Admin;
