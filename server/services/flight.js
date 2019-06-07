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

const getAll = async ({ page, inputString, resLimit } = {}) => {
  const limit = resLimit || 20;
  const pageNum = page || 1;
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
      nextPage: ++pageNum
    };
  } catch (err) {}
};

const findByParams = async (params, limit = 20) => {
  const { departureTime: from } = params;
  const to = new Date(from.getTime() + 86400000);
  try {
    const flights = await db.flight.findAll({
      where: {
        ...params,
        departureTime: {
          [db.op.between]: [from, to]
        }
      },
      limit
    });
    return flights.map(flight => flight.dataValues);
  } catch (err) {}
};

const findById = async id => {
  try {
    const flight = await db.flight.findOne({
      where: { id },
      include: [
        { model: db.airport, as: 'departureAirport', attributes: ['name', 'country', 'city'] },
        { model: db.airport, as: 'arrivalAirport', attributes: ['name', 'country', 'city'] },
        { model: db.airplane, attributes: ['name'] }
      ],
      attributes: ['departureTime', 'arrivalTime', 'isCancelled', 'airplaneId']
    });
    const { dataValues, departureAirport, arrivalAirport } = flight;
    return {
      flight: dataValues,
      departureAirport: departureAirport.dataValues,
      arrivalAirport: arrivalAirport.dataValues
    };
  } catch (err) {}
};

const add = async flight => {
  try {
    const newflight = await db.flight.create(flight);
    return newflight.dataValues;
  } catch (err) {}
};

const update = async flight => {
  try {
    const updatedflight = await db.flight.update(flight, { where: { id: flight.id } });
    return updatedflight;
  } catch (err) {}
};

module.exports = { getAll, findByParams, findById, add, update };
