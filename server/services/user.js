const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const findUser = async (field, value) => {
  try {
    const user = await db.models.user.findOne({
      where: {
        [field]: value
      }
    });
    return user.dataValues;
  } catch (err) {}
};

const comparePasswords = async (reqPassword, dbPassword) => await bcrypt.compare(reqPassword, dbPassword);

const generateToken = async payload => await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 36000 });

module.exports = { findUser, comparePasswords, generateToken };
