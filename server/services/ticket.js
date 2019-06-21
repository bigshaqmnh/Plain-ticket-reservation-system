const CustomError = require('../classes/CustomError');
const error = require('../constants/error');

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
      throw new CustomError({ ...err, type: error.NO_DATA_WAS_FOUND });
    }

    return {
      data: tickets.map(ticket => ticket.dataValues),
      nextPage: +pageNum + 1
    };
  } catch (err) {
    throw new CustomError({ ...err, type: error.FAILED_TO_FIND_DATA });
  }
};

const add = async ticket => {
  try {
    await db.ticket.create(ticket);
  } catch (err) {
    throw new CustomError({ ...err, type: error.FAILED_TO_ADD_DATA });
  }
};

const update = async (id, ticket) => {
  try {
    const updated = await db.ticket.update(ticket, { where: { id } });

    if (!updated[0]) {
      throw new CustomError({ ...err, type: error.NO_DATA_WAS_FOUND });
    }
  } catch (err) {
    throw new CustomError({ ...err, type: error.FAILED_TO_UPDATE_DATA });
  }
};

module.exports = { findByUserId, add, update };
