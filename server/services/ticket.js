const findByUserId = async (userId, pageNum = 1, limit = 20) => {
  const offset = pageNum * limit - limit;

  const tickets = await db.ticket.findAll({
    where: { userId },
    offset,
    limit,
    order: [['createdAt', 'DESC']],
    attributes: ['seatId', 'costId']
  });

  if (!tickets.length) {
    return;
  }

  return {
    data: tickets.map(ticket => ticket.dataValues),
    nextPage: +pageNum + 1
  };
};

const add = async ticket => await db.ticket.create(ticket);

module.exports = { findByUserId, add };
