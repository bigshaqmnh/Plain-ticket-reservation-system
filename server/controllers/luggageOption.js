const luggageOptionService = require('../services/luggageOption');

const getAll = async () => await luggageOptionService.find();

const getById = async luggageOptionId => await luggageOptionService.findById(luggageOptionId);

module.exports = { getAll, getById };
