module.exports = {
  env: 'dev',
  url: 'http://localhost:5000' || process.env.URL,
  port: process.env.PORT || 5000,
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
    from: '"Test Me 👻" <admin@erdemkosk.com>',
    subject: 'Test-Me\'den mesajınız var!',
    user: process.env.MAIL_USER || '',
    pass: process.env.MAIL_PASS || '',
    host: process.env.MAIL_HOST || '',
    port: process.env.MAIL_PORT || 465,
  },
};
