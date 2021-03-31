import React from 'react';
import { Button } from '../components/Button';
import { Form, Input } from '../components/Form';
import { Flex, Title } from '../components/Helpers';

export const Login = () => (
  <Flex justifyContent="center" margin="100px">
    <Form>
      <Title level={2}>Log In</Title>
      <Input type="text" placeholder="Username" />
      <Input type="password" placeholder="Password" />
      <Button type="submit" fullWidth>
        Log in
      </Button>
    </Form>

    <Form>
      <Title level={2}>Sign up</Title>
      <Input type="text" placeholder="Username" />
      <Input type="password" placeholder="Password" />
      <Input type="password" placeholder="Confirm password" />
      <Button type="submit" fullWidth>
        Sign up
      </Button>
    </Form>
  </Flex>
);

export default Login;
