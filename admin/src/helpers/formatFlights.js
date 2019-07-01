const toLocaleDate = date => new Date(date).toLocaleString();

const formatFlights = flights =>
  flights.map(flight => ({
    ...flight,
    departureTime: toLocaleDate(flight.departureTime),
    arrivalTime: toLocaleDate(flight.arrivalTime),
    isCancelled: flight.isCancelled ? '\u2714' : '\u274c'
  }));

export default formatFlights;
