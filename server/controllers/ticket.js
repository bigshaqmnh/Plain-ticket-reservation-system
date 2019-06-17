const ticketService = require('../services/ticket');
const seatService = require('../services/seat');
const costService = require('../services/cost');
const flightService = require('../services/flight');
const CustomError = require('../classes/CustomError');

const getByUserId = async ({ userId, page: pageNum, limit }) => {
  try {
    const tickets = await ticketService.findByUserId(userId, pageNum, limit);

    const ticketsInfo = await Promise.all(
      tickets.data.map(async ticket => {
        const seat = await seatService.findById(ticket.seatId);
        const cost = await costService.findById(ticket.costId);
        const flightInfo = await flightService.findById(cost.cost.flightId);

        return {
          ...ticket,
          ...seat,
          ...cost,
          ...flightInfo
        };
      })
    );

    return { ...ticketsInfo, nextPage: tickets.nextPage };
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
