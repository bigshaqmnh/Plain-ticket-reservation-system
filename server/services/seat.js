const CustomError = require('../classes/CustomError');
const responseStatus = require('../constants/responseStatus');

const findByAirplaneId = async airplaneId => {
  try {
    const seats = await db.seat.findAll({
      where: { airplaneId },
      include: [{ model: db.seatType, attributes: ['id', 'name'] }],
      attributes: ['id', 'row', 'seat', 'isBooked']
    });

    if (!seats) {
      throw new CustomError({ status: responseStatus.notFound });
    }

    return seats.map(seat => seat.dataValues);
  } catch (err) {
    throw new CustomError(err);
  }
};

const getNumberOfUnbooked = async airplaneIds => {
  try {
    const seats = await db.seat.findAll({
      where: { airplaneId: { [db.op.in]: airplaneIds }, isBooked: false },
      attributes: ['airplaneId']
    });

    if (!seats) {
      throw new CustomError({ status: responseStatus.notFound });
    }

    const numberOfUnbookedSeats = airplaneIds.map(airplaneId => ({
      airplaneId,
      numberOfUnbookedSeats: seats.reduce(
        (count, seat) => (seat.dataValues.airplaneId === airplaneId ? count + 1 : count),
        0
      )
    }));

    return numberOfUnbookedSeats;
  } catch (err) {
    throw new CustomError(err);
  }
};

const findByIds = async ids => {
  try {
    const seats = await db.seat.findAll({
      where: { id: { [db.op.in]: ids } },
      include: [{ model: db.seatType, attributes: ['name'] }],
      attributes: ['id', 'row', 'seat', 'floor']
    });

    if (!seats) {
      throw new CustomError({ status: responseStatus.notFound });
    }

    return seats.map(seat => ({ ...seat.dataValues }));
  } catch (err) {
    throw new CustomError(err);
  }
};

const add = async seat => {
  try {
    await db.seat.create(seat);
  } catch (err) {
    throw new CustomError({ status: responseStatus.conflict, message: err.message });
  }
};

const update = async (id, seat) => {
  try {
    const updated = await db.seat.update(seat, { where: { id } });

    if (!updated[0]) {
      throw new CustomError({ status: responseStatus.notFound });
    }
  } catch (err) {
    throw new CustomError({ status: responseStatus.conflict, message: err.message });
  }
};

module.exports = { findByAirplaneId, getNumberOfUnbooked, findByIds, add, update };
