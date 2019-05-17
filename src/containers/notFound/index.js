import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Jumbotron, Button } from 'react-bootstrap';

import buttonVariant from '../../constants/button/buttonVariants';

function NotFound() {
  return (
    <Jumbotron>
      <h1>Dear User!</h1>
      <p>It seems like you are looking for non existing page.</p>
      <LinkContainer to="/">
        <Button variant={buttonVariant.error}>Return home</Button>
      </LinkContainer>
    </Jumbotron>
  );
}

export default NotFound;
