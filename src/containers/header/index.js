import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

function HeaderContainer() {
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="mr-auto">
        <LinkContainer to="/">
          <Nav.Link>Home</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/airplanes">
          <Nav.Link>Airplanes</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/airports">
          <Nav.Link>Airports</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/flights">
          <Nav.Link>Flights</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/auth">
          <Nav.Link>Sign in / Sign out</Nav.Link>
        </LinkContainer>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-light">Search</Button>
      </Form>
    </Navbar>
  );
}

export default HeaderContainer;
