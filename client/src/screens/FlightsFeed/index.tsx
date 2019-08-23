import React from 'react';
import { connect } from 'react-redux';

function FlightsFeed(props) {
  return <h1>Flights Feed</h1>;
}

const mapStateToProps = (state) => ({
  flights: state.flights.data
});

export default connect(mapStateToProps)(FlightsFeed);
