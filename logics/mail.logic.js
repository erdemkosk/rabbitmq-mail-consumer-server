const Cryptr = require('cryptr');
const config = require('../config');

const cryptr = new Cryptr(config.url);

function generateMessageWithType({ mailInfo }) {
  const message = {
    to: mailInfo.email,
    from: config.mail.from,
    template: `${mailInfo.type}`,
    subject: config.mail.subject,
    context: {},
  };

  switch (mailInfo.type) {
  case 'register':
    message.context = {
      ...message.context,
      ...{
        nameSurname: mailInfo.nameSurname,
        unsubscribe: `${config.url}/unsubscribe?email=${cryptr.encrypt(mailInfo.email)}`,
      },
    };
    break;
  case 'forget':
    message.context = {
      ...message.context,
      ...{
        nameSurname: mailInfo.nameSurname,
        unsubscribe: `${config.url}/unsubscribe?email=${cryptr.encrypt(mailInfo.email)}`,
      },
    };
    break;
  default:
    break;
  }

  return message;
}

module.exports = {
  generateMessageWithType,
};
