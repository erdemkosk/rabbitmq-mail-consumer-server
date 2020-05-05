/* eslint-disable consistent-return */
const Redis = require('ioredis');
const config = require('../config');

const client = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
  reconnectOnError(err) {
    const targetError = 'READONLY';
    if (err.message.includes(targetError)) {
      // Only reconnect when the error contains "READONLY"
      return true; // or `return 1;`
    }
  },
});

client.on('connect', () => {
  console.log('[*] Redis connected.');
});

client.on('end', () => {
  console.log('[*] Redis disconnected.');
});

client.on('reconnecting', () => {
  console.log('[*] Redis reconnected.');
});

client.on('error', (error) => {
  client.disconnect(true);
  console.log(`[*] Redis error:\n${error}`);
});

process.on('SIGINT', () => {
  client.quit();
  console.log('[*] Redis disconnected through app termination (SIGINT).');
});

module.exports = {
  client,
};
