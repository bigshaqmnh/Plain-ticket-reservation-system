const luggageOptionService = require('../services/luggageOption');

const getAll = () => luggageOptionService.find();

const getById = luggageOptionId => luggageOptionService.findById(luggageOptionId);

module.exports = { getAll, getById };
