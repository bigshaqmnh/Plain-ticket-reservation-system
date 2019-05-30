import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

const links = [
  { path: '/', name: 'Home' },
  { path: '/airplanes', name: 'Airplanes' },
  { path: '/airports', name: 'Airports' },
  { path: '/flights', name: 'Flights' },
  { path: '/auth', name: 'Sign in / Sign out' }
];

function HeaderContainer() {
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
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-light">Search</Button>
      </Form>
    </Navbar>
  );
}

export default HeaderContainer;
