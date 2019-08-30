import React from 'react';
import { connect } from 'react-redux';
import { IFlightConfiguratorProps } from './interfaces';
import { IState } from '../../interfaces';

const FlightConfigurator = ({ flightIds }: IFlightConfiguratorProps) => {
  return <>
    <h1>Flights to configure: </h1>
    <h3>{`Forward flight id: ${flightIds[0]}`}</h3>
    <h3>{`Backward flight id: ${flightIds[1] || 'None'}`}</h3>
  </>;
};

const mapStateToProps = ({ flightsFeed }: IState) => {
  const { chosenForwardFlight, chosenBackwardFlight } = flightsFeed;
  const chosenFlights = chosenBackwardFlight
    ? [chosenForwardFlight, chosenBackwardFlight]
    : [chosenForwardFlight];

  return {
    flightIds: chosenFlights
  };
};

export default connect(mapStateToProps)(FlightConfigurator);
