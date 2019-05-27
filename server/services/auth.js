const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');

const findUserByEmail = async email => {
  try {
    const user = await models.user.findOne({
      where: {
        email
      }
    });
    return user.dataValues;
  } catch (err) {
    console.error('No users were found!', err);
  }
};

const findUserById = async id => {
  try {
    const user = await models.user.findOne({
      where: {
        id
      }
    });
    return user.dataValues;
  } catch (err) {
    console.error('No users were found!', err);
  }
};

const comparePasswords = async (reqPassword, dbPassword) => await bcrypt.compare(reqPassword, dbPassword);

const generateToken = async payload => await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 36000 });

module.exports = { findUserByEmail, findUserById, comparePasswords, generateToken };
