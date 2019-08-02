import * as React from 'react';

import InputAutoComplete from './components/InputAutoComplete';

function MainScreen() {
  return (
    <InputAutoComplete
      label="Departure Airport"
      name="departureAirport"
      placeholder="Choose departure airport"
      required
      onChange={({ currentTarget }: React.FormEvent<HTMLInputElement>) => console.log('value: ', currentTarget.value)}
    />
  );
}

export default MainScreen;
