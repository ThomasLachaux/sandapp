import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styled, { css } from 'styled-components';
import React, { useRef, useState } from 'react';
import Modal from 'react-modal';
import { Link } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import { modalStyle } from '../utils/style';
import { Flex, Text, Title } from './Helpers';
import { ModalInput } from './Form';
import { Button } from './Button';
import api from '../utils/api';
import { loadUser } from '../reducers/user';

const Nav = styled.nav`
  width: 100%;
  height: 50px;
  background-color: ${(props) => props.theme.dark};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
`;

const NavGroup = styled.div`
  display: flex;
  align-items: center;
`;

const navLinkStyle = css`
  text-transform: uppercase;
  padding: 5px 10px;
  color: ${(props) => props.theme.light};
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.darkLighten};
  }
`;

const NavItem = styled(Link)`
  ${navLinkStyle}
`;
const NavItemSpan = styled.span`
  ${navLinkStyle}
`;

const BrandItem = styled.span`
  text-transform: uppercase;
  padding: 5px 10px;
  font-size: 1.5em;

  color: ${(props) => props.theme.light};
`;

const EditUserModal = ({ isOpen, onRequestClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const { register, handleSubmit, errors, watch, reset } = useForm({
    defaultValues: {
      username: user.username,
    },
  });

  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = async (data) => {
    const body = data.password
      ? {
          username: data.username,
          password: data.password,
        }
      : { username: data.username };

    const response = await api.patch('/users/me', body);

    toast.success('You have been correctly updated !');

    loadUser(dispatch, response.data, user.token);
    reset({ username: response.data.username });

    onRequestClose();
  };

  return (
    <Modal style={modalStyle} isOpen={isOpen} contentLabel="Edit User" onRequestClose={onRequestClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" alignItems="center" margin="10px">
          <Title level={3}>Edit user</Title>
          <Text color="red">
            {Object.values(errors).map((error, index) => (
              <div key={index}>{error.message}</div>
            ))}
          </Text>
          <ModalInput
            type="text"
            placeholder="Username"
            name="username"
            ref={register({
              required: 'Please enter a username',
            })}
          />
          <ModalInput type="password" placeholder="Password (not updated if empty)" name="password" ref={register} />
          <ModalInput
            type="password"
            placeholder="Confirm password (not updated if empty)"
            name="confirmPassword"
            ref={register({
              validate: (value) => value === password.current || 'The passwords do not match',
            })}
          />

          <Flex margin="10px">
            <Button onClick={onRequestClose} type="button">
              Close
            </Button>
            <Button primary type="submit">
              Edit profile
            </Button>
          </Flex>
        </Flex>
      </form>
    </Modal>
  );
};

export const Navbar = () => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <>
      <Nav>
        <NavGroup>
          <Link to="/">
            <BrandItem>
              Sand'App <i className="fa fa-hamburger" />
            </BrandItem>
          </Link>

          {user.token && (
            <>
              <NavItem to="/">Get a sandwich</NavItem>
              <NavItem to="/past-orders">My orders</NavItem>
              {user.isAdmin && <NavItem to="/admin">Administration panel</NavItem>}
            </>
          )}
        </NavGroup>
        <NavGroup>
          {user.token && (
            <>
              <NavItemSpan onClick={() => setEditModalVisible(true)}>
                {user.username} <i className="fa fa-user" />
              </NavItemSpan>
              <NavItemSpan onClick={() => dispatch({ type: 'CLEAR_USER' })}>
                Log out <i className="fa fa-sign-out-alt" />
              </NavItemSpan>
            </>
          )}
        </NavGroup>
      </Nav>
      {user.token && <EditUserModal isOpen={editModalVisible} onRequestClose={() => setEditModalVisible(false)} />}
    </>
  );
};

export default Navbar;
