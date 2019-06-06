const findByAirplaneId = async airplaneId => {
  try {
    const seats = await db.seat.findAll({
      where: { airplaneId },
      include: [{ model: db.seatType, attributes: ['name'] }],
      attributes: ['id', 'row', 'seat', 'isBooked']
    });
    return seats.map(seat => seat.dataValues);
  } catch (err) {}
};

const getAmountOfUnbooked = async airplaneId => {
  try {
    const amountOfUnbookedSeats = await db.seat.count({
      where: { airplaneId, isBooked: false }
    });
    return amountOfUnbookedSeats;
  } catch (err) {}
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
  } catch (err) {}
};

const update = async seat => {
  try {
    const updatedSeat = await db.seat.update(seat, { where: { id: seat.id } });
    return updatedSeat;
  } catch (err) {}
};

module.exports = { findByAirplaneId, getAmountOfUnbooked, findById, update };
