import React from 'react';
import { connect } from 'react-redux';

function FlightsFeed(props) {
  const { isLoading, flights } = props;

  return !isLoading && <>
    <h1>Flights Feed</h1>
    <br />
    <h3>Forward flights:</h3>
    <ol>
      {flights.forward && flights.forward.map((flight) =>
        <li>{`From ${flight.departureAirport.name}, at ${new Date(flight.departureTime)} -> ` +
          `To ${flight.arrivalAirport.name}, at ${new Date(flight.arrivalTime)}`}</li>)
      }
    </ol>
    <br />
    <h3>Backward flights:</h3>
    <ol>
      {flights.backward && flights.backward.map((flight) =>
        <li>{`From ${flight.departureAirport.name}, at ${new Date(flight.departureTime)} -> ` +
          `To ${flight.arrivalAirport.name}, at ${new Date(flight.arrivalTime)}`}</li>)
      }
    </ol>
  </>;
}

const mapStateToProps = (state) => ({
  isLoading: state.flights.isFetching,
  flights: state.flights.data
});

export default connect(mapStateToProps)(FlightsFeed);
