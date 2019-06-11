const findByAirplaneId = async airplaneId => {
  try {
    const seats = await db.seat.findAll({
      where: { airplaneId },
      include: [{ model: db.seatType, attributes: ['id', 'name'] }],
      attributes: ['id', 'row', 'seat', 'isBooked']
    });
    return seats.map(seat => seat.dataValues);
  } catch (err) {
    throw new Error(err);
  }
};

const getNumberOfUnbooked = async airplaneId => {
  try {
    const numberOfUnbookedSeats = await db.seat.count({
      where: { airplaneId, isBooked: false }
    });
    return numberOfUnbookedSeats;
  } catch (err) {
    throw new Error(err);
  }
};

const findById = async id => {
  try {
    const seat = await db.seat.findOne({
      where: { id },
      include: [{ model: db.seatType, attributes: ['name'] }],
      attributes: ['row', 'seat', 'floor']
    });
    const { dataValues, seatType } = seat;
    return {
      seat: dataValues,
      seatType: seatType.dataValues
    };
  } catch (err) {
    throw new Error(err);
  }
};

const add = async seat => {
  try {
    await db.seat.create(seat);
  } catch (err) {
    throw new Error(err);
  }
};

const update = async (id, seat) => {
  try {
    await db.seat.update(seat, { where: { id } });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { findByAirplaneId, getNumberOfUnbooked, findById, add, update };
