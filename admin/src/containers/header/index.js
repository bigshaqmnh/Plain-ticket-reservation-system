import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Image } from 'react-bootstrap';

import useFetchData from '../../hooks/useFetchData';
import userApi from '../../api/user';

import defaultAccountImage from '../../assets/img/account.svg';

const links = [
  { path: '/', name: 'Home' },
  { path: '/airplanes', name: 'Airplanes' },
  { path: '/airports', name: 'Airports' },
  { path: '/flights', name: 'Flights' }
];

function HeaderContainer() {
  const { items: user, isLoading } = useFetchData(userApi.getUserInfo);

  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="mr-auto">
        {links.map(link => (
          <LinkContainer key={link.path} to={link.path}>
            <Nav.Link>{link.name}</Nav.Link>
          </LinkContainer>
        ))}
      </Nav>
      {!isLoading && (
        <Nav className="account-link">
          <Image src={defaultAccountImage} roundedCircle />
          <LinkContainer to="/account">
            <Nav.Link>{user.username}</Nav.Link>
          </LinkContainer>
        </Nav>
      )}
    </Navbar>
  );
}

export default HeaderContainer;
