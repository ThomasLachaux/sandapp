import React from 'react';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { Flex, Title } from '../components/Helpers';

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  & > * {
    margin-top: 20px;
  }
`;

export const Input = styled.input`
  width: 100%;
  background-color: white;
  border: none;
  outline: none;
  padding: 5px 15px;
`;

export const Login = () => (
  <Flex justifyContent="center" margin="100px">
    <Form>
      <Title level={2}>Log In</Title>
      <Input type="text" placeholder="Username" />
      <Input type="password" placeholder="Password" />
      <Button type="submit">Log in</Button>
    </Form>

    <Form>
      <Title level={2}>Sign up</Title>
      <Input type="text" placeholder="Username" />
      <Input type="password" placeholder="Password" />
      <Input type="password" placeholder="Confirm password" />
      <Button type="submit">Sign up</Button>
    </Form>
  </Flex>
);

export default Login;
