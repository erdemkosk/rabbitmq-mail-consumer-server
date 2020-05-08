/* eslint-disable consistent-return */
/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');

const { connectAndListenRabbitMQ } = require('./services/rabbitmq.service');
const { addMailToUnsubscribe } = require('./services/mail.service');

const app = express();
const { decrypt } = require('./logics/cyrpto.logic');
const config = require('./config');


app.get('/health', (req, res) => res.status(200).send({
  upTime:
    `${Math.floor(Math.floor(process.uptime() * 1000) / 60000)} min.`,
  status: 'OK',
}));

app.get('/unsubscribe', (req, res) => {
  const { email } = req.query;

  let decryptedEmail;

  try {
    decryptedEmail = decrypt(email);
  }

  catch (error) {
    console.log(error);
  }

  if (!email || !decryptedEmail) {
    return res.status(400).send({
      message: 'Paramater Error!',
    });
  }

  addMailToUnsubscribe({ decryptedEmail });

  return res.status(200).send({
    message: `${decryptedEmail} mail was removed from the list.`,
  });
});

app.listen(config.port, () => console.log(`[*] rabbitmq-mail-consumer-server running on ${config.port}`));

connectAndListenRabbitMQ();
