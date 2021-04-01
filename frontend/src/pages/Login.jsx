import { useLocation, useNavigate } from '@reach/router';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { loadUser } from '../reducers/user';
import { Button } from '../components/Button';
import { Form, Input } from '../components/Form';
import { Flex, Text, Title } from '../components/Helpers';
import api from '../utils/api';

const LoginForm = () => {
  const { register, handleSubmit, errors, formState } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const response = await api.post('/auth/login', {
      username: data.username,
      password: data.password,
    });

    toast.success(`Welcome to SandApp, ${data.username} !`);

    loadUser(dispatch, response.data, response.data.token);

    navigate('/');
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title level={2}>Log In</Title>
      <Text color="red">
        {Object.values(errors).map((error, index) => (
          <div key={index}>{error.message}</div>
        ))}
      </Text>
      <Input
        type="text"
        placeholder="Username"
        name="username"
        ref={register({
          required: 'Please enter a username',
        })}
      />
      <Input
        type="password"
        placeholder="Password"
        name="password"
        ref={register({
          required: 'Please enter a password',
        })}
      />
      <Button type="submit" fullWidth disabled={formState.isSubmitting}>
        Log in
      </Button>
    </Form>
  );
};

const RegisterForm = () => {
  const { register, handleSubmit, watch, errors, formState, reset } = useForm();

  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = async (data) => {
    await api.post('/auth/register', {
      username: data.username,
      password: data.password,
    });

    toast.success('Your account has been created, please log in now to continue !');
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title level={2}>Sign up</Title>
      <Text color="red">
        {Object.values(errors).map((error, index) => (
          <div key={index}>{error.message}</div>
        ))}
      </Text>
      <Input
        type="text"
        placeholder="Username"
        name="username"
        ref={register({
          required: 'Please enter a username',
        })}
      />
      <Input
        type="password"
        placeholder="Password"
        name="password"
        ref={register({
          required: 'Please enter a password',
        })}
      />
      <Input
        type="password"
        placeholder="Confirm password"
        name="confirmPassword"
        ref={register({
          required: 'Please confirm your password',
          validate: (value) => value === password.current || 'The passwords do not match',
        })}
      />
      <Button type="submit" fullWidth disabled={formState.isSubmitting}>
        Sign up
      </Button>
    </Form>
  );
};

export const Login = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // Disconnects the user if connected
    if (user.token && location.search === '?logout=true') {
      dispatch({ type: 'CLEAR_USER' });
    }
  }, []);

  return (
    <Flex justifyContent="center" margin="100px">
      <LoginForm />
      <RegisterForm />
    </Flex>
  );
};

export default Login;
