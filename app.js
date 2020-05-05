/* eslint-disable consistent-return */
/* eslint-disable no-console */
require('dotenv').config();
const amqp = require('amqplib/callback_api');
const express = require('express');

const app = express();
const config = require('./config');
const mailService = require('./services/mail.service');

function connectRabbitMQ() {
  amqp.connect(config.rabbitmq.url, (connectionError, connection) => {
    if (connectionError) {
      console.error('[*] RabbitMq', connectionError.message);
      return setTimeout(connectRabbitMQ, 1000);
    }

    connection.on('error', (err) => {
      if (err.message !== 'Connection closing') {
        console.error('[*] RabbitMq connection error', err.message);
      }
    });

    connection.on('close', () => {
      console.error('[*] RabbitMq reconnecting.');
      return setTimeout(connectRabbitMQ, 1000);
    });

    console.log('[*] RabbitMq connected.');

    connection.createChannel((channelError, channel) => {
      if (channelError) {
        throw channelError;
      }
      const queue = config.rabbitmq.channel;

      channel.assertQueue(queue, {
        durable: false,
      });

      console.log('[*] Waiting for messages in %s. Check blacklist from redis: %s. Waiting messages...', queue, config.considerBlacklist);

      channel.consume(queue, (data) => {
        const mailInfo = JSON.parse(data.content.toString());

        if (!mailInfo || !mailInfo.type) {
          console.log('[x] Wrong paramters from client!');
          return;
        }

        mailService.sendMail({ mailInfo });

        console.log(`[x] Mail Message Received [x] Type: ${mailInfo.type}, nameSurname: ${mailInfo.nameSurname}, email: ${mailInfo.email} `);
      }, {
        noAck: true,
      });
    });
  });
}

app.get('/health', (req, res) => {
  res.send({
    upTime:
    `${Math.floor(Math.floor(process.uptime() * 1000) / 60000)} min.`,
    status: 'OK',
  });
});

app.listen(config.port, () => console.log(`[*] Health url on /health ${config.port}`));

connectRabbitMQ();
