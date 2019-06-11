const luggageOptionService = require('../services/luggageOption');
const LuggageOptionResponse = require('../classes/LuggageOptionResponse');
const { dbError } = require('../constants/errors');

const getAll = async () => {
  try {
    const luggageOptions = await luggageOptionService.find();

    return new LuggageOptionResponse(false, luggageOptions);
  } catch (err) {
    return new LuggageOptionResponse(true, dbError.get);
  }
};

const getById = async ({ luggageOptionId }) => {
  try {
    await luggageOptionService.findById(luggageOptionId);

    return new LuggageOptionResponse();
  } catch (err) {
    return new LuggageOptionResponse(true, dbError.create);
  }
};

module.exports = { getAll, getById };
