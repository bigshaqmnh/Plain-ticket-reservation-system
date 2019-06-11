const ticketService = require('../services/ticket');
const seatService = require('../services/seat');
const costService = require('../services/cost');
const flightService = require('../services/flight');
const TicketResponse = require('../classes/TicketResponse');
const { dbError } = require('../constants/errors');

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

    return new TicketResponse(false, { ...ticketsInfo, nextPage: tickets.nextPage });
  } catch (err) {
    return new TicketResponse(true, dbError.get);
  }
};

const add = async ticket => {
  try {
    await ticketService.add(ticket);

    return new TicketResponse();
  } catch (err) {
    return new TicketResponse(true, dbError.create);
  }
};

const update = async (id, ticket) => {
  try {
    await ticketService.update(id, ticket);

    return new TicketResponse();
  } catch (err) {
    return new TicketResponse(true, dbError.update);
  }
};

module.exports = { getByUserId, add, update };
