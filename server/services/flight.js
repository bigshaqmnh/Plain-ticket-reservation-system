const getAll = async (limit = 20, pageNum = 1) => {
  const offset = pageNum * limit - limit;

  try {
    const flights = await db.flight.findAll({ offset, limit, order: [['id', 'ASC']] });
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

const _searchByDepAirport = async inputString => {
  try {
    const flights = await db.flight.findAll({
      include: [
        {
          model: db.airport,
          as: 'departureAirport',
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
      ]
    });
    return flights.map(flight => flight.dataValues);
  } catch (err) {}
};

const _searchByArrAirport = async inputString => {
  try {
    const flights = await db.flight.findAll({
      include: [
        {
          model: db.airport,
          as: 'arrivalAirport',
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
      ]
    });
    return flights.map(flight => flight.dataValues);
  } catch (err) {}
};

const search = async (inputString, limit = 20) => {
  try {
    const depFlights = await _searchByDepAirport(inputString);
    const arrFlights = await _searchByArrAirport(inputString);

    return Array.prototype.concat(depFlights, arrFlights).slice(0, limit);
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

module.exports = { getAll, findByParams, findById, search, add, update };
