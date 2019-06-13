const findByUserId = async (userId, pageNum = 1, limit = 20) => {
  const offset = pageNum * limit - limit;

  try {
    const tickets = await db.ticket.findAll({
      where: { userId },
      offset,
      limit,
      order: [['createdAt', 'DESC']]
    });
    return {
      data: tickets.map(ticket => ticket.dataValues),
      nextPage: ++pageNum
    };
  } catch (err) {}
};

const add = async ticket => {
  try {
    const newTicket = await db.ticket.create(ticket);
    return newTicket.dataValues;
  } catch (err) {}
};

const update = async ticket => {
  try {
    const updatedTicket = await db.ticket.update(ticket, { where: { id: ticket.id } });
    return updatedTicket;
  } catch (err) {}
};

module.exports = { findByUserId, add, update };
