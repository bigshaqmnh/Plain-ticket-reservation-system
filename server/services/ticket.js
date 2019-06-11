const findByUserId = async (userId, pageNum = 1, limit = 20) => {
  const offset = pageNum * limit - limit;

  try {
    const tickets = await db.ticket.findAll({
      where: { userId },
      offset,
      limit,
      order: [['createdAt', 'DESC']],
      attributes: ['seatId', 'costId']
    });
    return {
      data: tickets.map(ticket => ticket.dataValues),
      nextPage: +pageNum + 1
    };
  } catch (err) {
    throw new Error(err);
  }
};

const add = async ticket => {
  try {
    await db.ticket.create(ticket);
  } catch (err) {
    throw new Error(err);
  }
};

const update = async (id, ticket) => {
  try {
    await db.ticket.update(ticket, { where: { id } });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { findByUserId, add, update };
