const config = require('../config');

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
      },
    };
    break;
  case 'forget':
    message.context = {
      ...message.context,
      ...{
        nameSurname: mailInfo.nameSurname,
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
