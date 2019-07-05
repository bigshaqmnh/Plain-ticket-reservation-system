const formatFlights = flights =>
  flights.map(flight => ({
    ...flight,
    departureTime: new Date(flight.departureTime),
    arrivalTime: new Date(flight.arrivalTime),
    departureAirport: flight.departureAirport.name,
    arrivalAirport: flight.arrivalAirport.name
  }));

export default formatFlights;
