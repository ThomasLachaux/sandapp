import styled, { css } from 'styled-components';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import { modalStyle } from '../utils/style';
import { Flex, Title } from './Helpers';
import { ModalInput } from './Form';
import { Button } from './Button';

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

const EditUserModal = ({ isOpen, onRequestClose }) => (
  <Modal style={modalStyle} isOpen={isOpen} contentLabel="Edit User" onRequestClose={onRequestClose}>
    <Flex direction="column" alignItems="center" margin="10px">
      <Title level={3}>Edit user</Title>
      <ModalInput type="text" placeholder="Username" />
      <ModalInput type="text" placeholder="Password (not updated if empty)" />
      <ModalInput type="text" placeholder="Confirm password (not updated if empty)" />

      <Flex margin="10px">
        <Button onClick={onRequestClose}>Close</Button>
        <Button primary>Edit profile</Button>
      </Flex>
    </Flex>
  </Modal>
);

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
              <NavItem to="/admin">Administration panel</NavItem>
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
      <EditUserModal isOpen={editModalVisible} onRequestClose={() => setEditModalVisible(false)} />
    </>
  );
};

export default Navbar;
