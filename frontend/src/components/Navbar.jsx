import styled from 'styled-components';
import React from 'react';
import { Link } from '@reach/router';

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

const NavItem = styled(Link)`
  text-transform: uppercase;
  padding: 5px 10px;
  color: ${(props) => props.theme.light};
  border-radius: 20px;

  &:hover {
    background-color: ${(props) => props.theme.darkLighten};
  }
`;

const BrandItem = styled.span`
  text-transform: uppercase;
  padding: 5px 10px;
  font-size: 1.5em;

  color: ${(props) => props.theme.light};
`;

export const Navbar = () => (
  <Nav>
    <NavGroup>
      <Link to="/">
        <BrandItem>
          Sand'App <i className="fa fa-hamburger" />
        </BrandItem>
      </Link>

      <NavItem to="/">Get a sandwich</NavItem>
      <NavItem to="/past-orders">My orders</NavItem>
      <NavItem to="/admin">Administration panel</NavItem>
    </NavGroup>
    <NavGroup>
      <NavItem to="/login">
        Thomas <i className="fa fa-user" />
      </NavItem>
    </NavGroup>
  </Nav>
);

export default Navbar;
