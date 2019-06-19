const ticketService = require('../services/ticket');
const seatService = require('../services/seat');
const costService = require('../services/cost');
const flightService = require('../services/flight');
const CustomError = require('../classes/CustomError');

const getByUserId = async ({ userId, page: pageNum, limit }) => {
  try {
    const tickets = await ticketService.findByUserId(userId, pageNum, limit);

    const seatIds = tickets.data.map(ticket => ticket.seatId);
    const costIds = tickets.data.map(ticket => ticket.costId);

    const seats = await seatService.findByIds(seatIds);
    const costs = await costService.findByIds(costIds);

    const flightIds = costs.map(cost => cost.flightId);

    const flights = await flightService.findByIds(flightIds);

    const ticketsInfo = tickets.data.map(ticket => {
      const seat = seats.find(seat => seat.id === ticket.seatId);
      const cost = costs.find(cost => cost.id === ticket.costId);
      const flight = flights.find(flight => flight.id === cost.flightId);

      return {
        ...flight,
        ...cost,
        seat
      };
    });

    return { data: ticketsInfo, nextPage: tickets.nextPage };
  } catch (err) {
    throw err instanceof CustomError ? err : new CustomError(err);
  }
};

const add = async ticket => {
  try {
    await ticketService.add(ticket);
  } catch (err) {
    throw err;
  }
};

const update = async ({ id, ticket }) => {
  try {
    await ticketService.update(id, ticket);
  } catch (err) {
    throw err;
  }
};

module.exports = { getByUserId, add, update };
