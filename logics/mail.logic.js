const config = require('../config');
const { encrypt } = require('./cyrpto.logic');

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
        unsubscribe: `${config.url}/unsubscribe?email=${encrypt(mailInfo.email)}`,
      },
    };
    break;
  case 'forget':
    message.context = {
      ...message.context,
      ...{
        nameSurname: mailInfo.nameSurname,
        unsubscribe: `${config.url}/unsubscribe?email=${encrypt(mailInfo.email)}`,
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
