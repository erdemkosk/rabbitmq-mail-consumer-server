const Cryptr = require('cryptr');
const config = require('../config');

const cryptr = new Cryptr(config.url);

function encrypt(text) {
  return cryptr.encrypt(text);
}

function decrypt(text) {
  return cryptr.decrypt(text);
}

module.exports = {
  encrypt,
  decrypt,
};
