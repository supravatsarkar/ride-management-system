const bcrypt = require("bcrypt");
const config = require("../config");
const constants = require("../config/constants");
const _encryptPassword = (password) => {
  return bcrypt.hash(password, config.bcrypt_salt_round);
};

const _randomString = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const _generateOtp = (length) => {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};

const _removePrivateFields = (obj) => {
  const newObj = JSON.parse(JSON.stringify(obj));
  for (const key in newObj) {
    if (constants.PRIVATE_FIELDS.includes(key)) {
      delete newObj[key];
    }
  }
  return newObj;
};

module.exports = {
  _encryptPassword,
  _generateOtp,
  _randomString,
  _removePrivateFields,
};
