// eslint-disable-next-line import/no-dynamic-require
const enviromentConfig = require(`./enviroments/${process.env.NODE_ENV || 'dev'}`);

module.exports = enviromentConfig;
