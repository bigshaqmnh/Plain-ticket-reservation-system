import React from 'react';
import { connect } from 'react-redux';
import { History } from 'history';

import { IFlightState, IFlight, IState, IDispatch } from '../../interfaces';

interface IFlightsFeedProps {
  readonly history: History;
  isLoading: boolean;
  flights: IFlightState;
  readonly dispatch: IDispatch;
}

function FlightsFeed(props: IFlightsFeedProps) {
  const { isLoading, flights } = props;

  return !isLoading && <>
    <h1>Flights Feed</h1>
    <br/>
    <h3>Forward flights:</h3>
    <ol>
      {flights.forward && flights.forward.map((flight: IFlight) =>
        <li key={flight.id}>{`From ${flight.departureAirport.name}, at ${flight.departureTime.toString()} -> ` +
        `To ${flight.arrivalAirport.name}, at ${flight.arrivalTime.toString()}`}</li>)
      }
    </ol>
    <br/>
    <h3>Backward flights:</h3>
    <ol>
      {flights.backward && flights.backward.map((flight: IFlight) =>
        <li key={flight.id}>{`From ${flight.departureAirport.name}, at ${flight.departureTime.toString()} -> ` +
        `To ${flight.arrivalAirport.name}, at ${flight.arrivalTime.toString()}`}</li>)
      }
    </ol>
  </>;
}

const mapStateToProps = (state: IState) => ({
  isLoading: state.flights.isFetching,
  flights: state.flights.data
});

export default connect(mapStateToProps)(FlightsFeed);
