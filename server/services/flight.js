const CustomError = require('../classes/CustomError');
const error = require('../constants/error');

const _genIncludeStatement = (foreignKey, inputString) => {
  return [
    {
      model: db.airport,
      as: foreignKey,
      where: {
        [db.op.or]: [
          {
            name: { [db.op.iLike]: `%${inputString}%` }
          },
          {
            country: { [db.op.iLike]: `%${inputString}%` }
          },
          {
            city: { [db.op.iLike]: `%${inputString}%` }
          }
        ]
      }
    }
  ];
};

const find = async ({ page, query: inputString, limit: resLimit } = {}) => {
  const limit = resLimit || 20;
  const pageNum = +page || 1;
  const offset = pageNum * limit - limit;

  try {
    let flights = [];

    if (inputString) {
      const depFlights = await db.flight.findAll({
        include: _genIncludeStatement('departureAirport', inputString),
        offset,
        order: [['id', 'ASC']]
      });

      const arrFlights = await db.flight.findAll({
        include: _genIncludeStatement('arrivalAirport', inputString),
        offset,
        order: [['id', 'ASC']]
      });

      flights = Array.prototype.concat(depFlights, arrFlights).slice(0, limit);
    } else {
      flights = await db.flight.findAll({
        offset,
        limit,
        order: [['id', 'ASC']]
      });
    }

    return {
      data: flights.map(flight => flight.dataValues),
      nextPage: pageNum + 1
    };
  } catch (err) {
    throw new CustomError({ ...err, type: error.FAILED_TO_FIND_DATA });
  }
};

const findByParams = async ({ depCountry, depCity, arrCountry, arrCity, departureTime, limit: resLimit }) => {
  const limit = resLimit || 20;
  const from = new Date(departureTime);
  const to = new Date(from).setDate(from.getDate() + 1);

  try {
    const flights = await db.flight.findAll({
      where: {
        departureTime: {
          [db.op.between]: [from, to]
        }
      },
      include: [
        {
          model: db.airport,
          as: 'departureAirport',
          attributes: ['name'],
          where: { country: depCountry, city: depCity }
        },
        {
          model: db.airport,
          as: 'arrivalAirport',
          attributes: ['name'],
          where: { country: arrCountry, city: arrCity }
        },
        { model: db.airplane, attributes: ['name'] }
      ],
      limit,
      attributes: ['id', 'departureTime', 'arrivalTime', 'luggageOverweightCost', 'isCancelled', 'airplaneId']
    });

    return flights.map(flight => flight.dataValues);
  } catch (err) {
    throw new CustomError({ ...err, type: error.FAILED_TO_FIND_DATA });
  }
};

const findByIds = async ids => {
  try {
    const flights = await db.flight.findAll({
      where: { id: { [db.op.in]: ids } },
      include: [
        { model: db.airport, as: 'departureAirport', attributes: ['name', 'country', 'city'] },
        { model: db.airport, as: 'arrivalAirport', attributes: ['name', 'country', 'city'] },
        { model: db.airplane, attributes: ['name'] }
      ],
      attributes: ['id', 'departureTime', 'arrivalTime', 'isCancelled']
    });

    if (!flights) {
      throw new CustomError({ ...err, type: error.NO_DATA_WAS_FOUND });
    }

    return flights.map(flight => ({
      ...flight.dataValues,
      departureAirport: flight.departureAirport.dataValues,
      arrivalAirport: flight.arrivalAirport.dataValues,
      airplane: flight.airplane.dataValues
    }));
  } catch (err) {
    throw new CustomError({ ...err, type: error.FAILED_TO_FIND_DATA });
  }
};

const add = async flight => {
  try {
    await db.flight.create(flight);
  } catch (err) {
    throw new CustomError({ ...err, type: error.FAILED_TO_ADD_DATA });
  }
};

const update = async (id, flight) => {
  try {
    const updated = await db.flight.update(flight, { where: { id } });

    if (!updated[0]) {
      throw new CustomError({ ...err, type: error.NO_DATA_WAS_FOUND });
    }
  } catch (err) {
    throw new CustomError({ ...err, type: error.FAILED_TO_UPDATE_DATA });
  }
};

module.exports = { find, findByParams, findByIds, add, update };
