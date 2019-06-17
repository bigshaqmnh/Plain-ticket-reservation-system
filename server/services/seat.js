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

const getNumberOfUnbooked = async airplaneId => {
  try {
    const numberOfUnbookedSeats = await db.seat.count({
      where: { airplaneId, isBooked: false }
    });

    if (!numberOfUnbookedSeats) {
      throw new CustomError({ status: responseStatus.notFound });
    }

    return numberOfUnbookedSeats;
  } catch (err) {
    throw new CustomError(err);
  }
};

const findById = async id => {
  try {
    const seat = await db.seat.findOne({
      where: { id },
      include: [{ model: db.seatType, attributes: ['name'] }],
      attributes: ['row', 'seat', 'floor']
    });

    if (!seat) {
      throw new CustomError({ status: responseStatus.notFound });
    }

    const { dataValues, seatType } = seat;
    return {
      seat: dataValues,
      seatType: seatType.dataValues
    };
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

module.exports = { findByAirplaneId, getNumberOfUnbooked, findById, add, update };
