const crypto = require('crypto');
const config = require('../config');

const algorithm = 'aes-256-ctr';

function encrypt(text) {
  const cipher = crypto.createCipher(algorithm, config.rabbitmq.url);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text) {
  const decipher = crypto.createDecipher(algorithm, config.rabbitmq.url);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

module.exports = {
  encrypt,
  decrypt,
};
