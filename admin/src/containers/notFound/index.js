import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Jumbotron, Button } from 'react-bootstrap';

import componentStyle from '../../constants/componentStyles';

function NotFound() {
  return (
    <Jumbotron>
      <h1>Dear User!</h1>
      <p>It seems like you are looking for non existing page.</p>
      <LinkContainer to="/">
        <Button variant={componentStyle.error}>Return home</Button>
      </LinkContainer>
    </Jumbotron>
  );
}

export default NotFound;
