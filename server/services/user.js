const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const CustomError = require('../classes/CustomError');
const error = require('../constants/error');

const findByEmail = async email => {
  try {
    const user = await db.user.findOne({
      where: { email }
    });

    if (!user) {
      throw new CustomError({ ...err, type: error.NO_DATA_WAS_FOUND });
    }

    return user.dataValues;
  } catch (err) {
    throw new CustomError({ ...err, type: error.FAILED_TO_FIND_DATA });
  }
};

const checkIfExists = async email => {
  try {
    const userExists = await db.user.count({
      where: { email }
    });

    if (!userExists) {
      throw new CustomError({ ...err, type: error.NO_DATA_WAS_FOUND });
    }

    return true;
  } catch (err) {
    throw new CustomError({ ...err, type: error.FAILED_TO_CHECK_IF_USER_EXISTS });
  }
};

const add = async user => {
  try {
    await db.user.create(user);
  } catch (err) {
    throw new CustomError({ ...err, type: error.FAILED_TO_ADD_DATA });
  }
};

const update = async (id, user) => {
  try {
    const updated = await db.user.update(user, { where: { id } });

    if (!updated[0]) {
      throw new CustomError({ ...err, type: error.NO_DATA_WAS_FOUND });
    }
  } catch (err) {
    throw new CustomError({ ...err, type: error.FAILED_TO_UPDATE_DATA });
  }
};

const comparePasswords = async (reqPassword, dbPassword) => {
  try {
    return await bcrypt.compare(reqPassword, dbPassword);
  } catch (err) {
    throw new CustomError({ ...err, type: error.FAILED_TO_COMPARE_PASSWORDS });
  }
};

const hashPassword = async password => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (err) {
    throw new CustomError({ ...err, type: error.FAILED_TO_HASH_PASSWORDS });
  }
};

const generateToken = async payload => {
  try {
    return await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });
  } catch (err) {
    throw new CustomError({ ...err, type: error.FAILED_TO_GENERATE_TOKEN });
  }
};

module.exports = { findByEmail, checkIfExists, add, update, comparePasswords, hashPassword, generateToken };
