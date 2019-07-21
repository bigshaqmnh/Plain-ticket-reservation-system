import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Image } from 'react-bootstrap';

import useFetchData from '../../hooks/useFetchData';
import userApi from '../../api/user';

import logo from '../../assets/img/logo.svg';
import defaultAccountImage from '../../assets/img/account.svg';

import './style.scss';

const links = [
  { path: '/home', name: 'Home' },
  { path: '/airplanes', name: 'Airplanes' },
  { path: '/airports', name: 'Airports' },
  { path: '/flights', name: 'Flights' },
  { path: '/account' }
];

function HeaderContainer() {
  const { items: user, isLoading } = useFetchData(userApi.getUserInfo);

  return (
    <Navbar bg="light">
      <LinkContainer to="/home">
        <Navbar.Brand className="logo">
          <Image height="40" width="40" src={logo} alt="main" />
          Ticket Reservation System
        </Navbar.Brand>
      </LinkContainer>
      <Nav>
        {links.map(link => {
          const { path, name } = link;

          if (path === '/account') {
            return (
              !isLoading && (
                <div className="account-link">
                  <Image
                    height="30"
                    width="30"
                    src={user.photo ? `data:image/jpg;base64, ${user.photo}` : defaultAccountImage}
                    roundedCircle
                  />
                  <LinkContainer to="/account">
                    <Nav.Link className="link">{user.username}</Nav.Link>
                  </LinkContainer>
                </div>
              )
            );
          }

          return (
            <LinkContainer key={path} to={path}>
              <Nav.Link className="link">{name}</Nav.Link>
            </LinkContainer>
          );
        })}
      </Nav>
    </Navbar>
  );
}

export default HeaderContainer;
