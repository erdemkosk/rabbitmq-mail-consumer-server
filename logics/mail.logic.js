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
        appName: mailInfo.appName || 'Test Me',
        welcomeTitle: mailInfo.welcomeTitle || 'Hoş Geldin!',
        nameSurname: mailInfo.nameSurname,
        welcomeMessage: mailInfo.welcomeMessage || 'Seni aramızda görmek çok güzel nameSurname .',
        mailIcon: mailInfo.mailIcon || 'https://img.icons8.com/clouds/100/000000/america.png',
        webSiteLink: mailInfo.webSiteLink || 'http://localhost:3000',
        webSiteLinkButton: mailInfo.webSiteLinkButton || 'Hadi Başlayalım!',
        thanksText: mailInfo.thanksMessage || 'Projemize destek verdiğin için teşekkür ederiz!',
        sincerelyText: mailInfo.sincerelyMessage || 'Sevgilerle',
        needHelpText: mailInfo.needHelpText || 'Yardım mı lazım?',
        needHelpLink: mailInfo.needHelpLink || 'http://erdemkosk.com',
        unsubscribe: `${config.url}/unsubscribe?email=${encrypt(mailInfo.email)}`,
      },
    };
    break;
  case 'forget':
    message.context = {
      ...message.context,
      ...{
        appName: mailInfo.appName || 'Test Me',
        forgetTitle: mailInfo.forgetTitle || 'Şifreni Unutmuşsun :(',
        nameSurname: mailInfo.nameSurname,
        forgetMessage: mailInfo.forgetMessage || '<b>nameSurname</b> şifreni unutmuşsun! Aşağıdaki adımları takip edelim.',
        mailIcon: mailInfo.mailIcon || 'https://img.icons8.com/clouds/100/000000/jake.png',
        webSiteLink: mailInfo.webSiteLink || 'http://localhost:3000',
        webSiteLinkButton: mailInfo.webSiteLinkButton || 'Şifremi Sıfırla!',
        warningText: mailInfo.thanksMessage || 'Şifre sıfırlama talebini siz yollamadıysanız, lütfen dikkate almayın !',
        sincerelyText: mailInfo.sincerelyMessage || 'Sevgilerle',
        needHelpText: mailInfo.needHelpText || 'Yardım mı lazım?',
        needHelpLink: mailInfo.needHelpLink || 'http://erdemkosk.com',
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
