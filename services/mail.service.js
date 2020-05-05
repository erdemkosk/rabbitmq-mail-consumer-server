/* eslint-disable no-console */
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const config = require('../config');
const redisService = require('../services/redis.service');
const { generateMessageWithType } = require('../logics/mail.logic');

const transport = nodemailer.createTransport({
  direct: true,
  host: config.mail.host,
  port: config.mail.port,
  auth: {
    user: config.mail.user,
    pass: config.mail.pass,
  },
  secure: true,
});

const options = {
  viewEngine: {
    extname: '.hbs',
    layoutsDir: 'templates/',
    defaultLayout: '',
    partialsDir: 'templates/',
  },
  viewPath: 'templates/',
  extName: '.hbs',
};


transport.use('compile', hbs(options));

async function checkMailInBlacklist({ mailInfo }) {
  let inBlackList = false;

  if (!config.considerBlacklist) {
    return inBlackList;
  }
  // redisService.getClient().SADD('mail_blacklist', 'testme-app@yandex.ru');
    inBlackList = await redisService.client.sismember('mail_blacklist', mailInfo.email);


  if (inBlackList) {
    console.log(`[*] ${mailInfo.email} in blacklist !`);
  }

  return inBlackList;
}

async function sendMail({ mailInfo }) {
  const isMailInBlackList = await checkMailInBlacklist({ mailInfo });

  if (isMailInBlackList) {
    return;
  }

  const message = generateMessageWithType({ mailInfo });

  transport.sendMail(message, (err, info) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(info);
    }
  });
}

module.exports = {
  sendMail,
};
