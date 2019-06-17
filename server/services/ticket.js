const CustomError = require('../classes/CustomError');
const error = require('../constants/errors');

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

    if (!tickets) {
      throw new CustomError({ status: error.notFound });
    }

    return {
      data: tickets.map(ticket => ticket.dataValues),
      nextPage: +pageNum + 1
    };
  } catch (err) {
    throw new CustomError(err);
  }
};

const add = async ticket => {
  try {
    await db.ticket.create(ticket);
  } catch (err) {
    throw new CustomError({ status: error.conflict, message: err.message });
  }
};

const update = async (id, ticket) => {
  try {
    const updated = await db.ticket.update(ticket, { where: { id } });

    if (!updated[0]) {
      throw new CustomError({ status: error.notFound });
    }
  } catch (err) {
    throw new CustomError({ status: error.conflict, message: err.message });
  }
};

module.exports = { findByUserId, add, update };
