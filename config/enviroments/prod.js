module.exports = {
  env: 'prod',
  url: 'http://localhost:5000' || process.env.URL,
  port: process.env.PORT || 3000,
  considerBlacklist: true,
  rabbitmq: {
    url: process.env.RABBITMQ_URL || '',
    channel: process.env.RABBITMQ_CHANNEL || '',
  },
  redis: {
    host: process.env.REDIS_HOST || '',
    port: process.env.REDIS_PORT || 0,
    password: process.env.REDIS_PASS || '',
  },
  mail: {
    from: process.env.MAIL_FROM || '"Test Me 👻" <admin@erdemkosk.com>',
    subject: process.env.MAIL_SUBJECT || 'Test-Me\'den mesajınız var!',
    user: process.env.MAIL_USER || '',
    pass: process.env.MAIL_PASS || '',
    host: process.env.MAIL_HOST || '',
    port: process.env.MAIL_PORT || 0,
  },

};
