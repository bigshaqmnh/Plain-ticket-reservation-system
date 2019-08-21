const airportService = require('../services/airport');

const groupByParam = {
  country: airports => {
    const groupedByCountries = {};

    for (const airport of airports) {
      Array.isArray(groupedByCountries[airport.country])
        ?
        groupedByCountries[airport.country].push(airport)
        :
        groupedByCountries[airport.country] = [airport];
    }

    return groupedByCountries;
  }
};

const getAll = async params => {
  const airports = await airportService.find(params);
  const { groupBy } = params;

  if (!groupBy) {
    return airports;
  }

  return groupByParam[groupBy](airports.data);
};

const getById = async airportId => {
  const airport = await airportService.findById(airportId);

  return { data: airport };
};

const add = async airport => {
  const { id, name, country, city, latitude, longitude } = await airportService.add(airport);

  return { id, name, country, city, latitude, longitude };
};

module.exports = { getAll, getById, add };
