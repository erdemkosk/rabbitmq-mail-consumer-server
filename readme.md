# rabbitmq-mail-consumer-server

Rabbitmq-mail-consumer-server is an independent mail sending server that abstracts the sending mails from system. Services that want to send mail do not need to know where and how this server works 😎. Just make sure you're looking at the same rabbit mq channel.

> Sending mail is abstracted from the whole system. You don't have to think ✌️.




### Tech
![Tech](https://i.imgur.com/hlDKK7Z.png)
Rabbitmq-mail-consumer-server uses a number of open source projects to work properly:


* [Node Js] - for runnig server
* [Rabbit MQ] - for getting messages from another server
* [Redis] - for checking email blacklist

### For Blacklist
You need to add a mail adress to redis.
> /unsubscribe?email=(with encrypted mail)
![Redis](https://i.imgur.com/saREwA7.png)
### Installation

Rabbitmq-mail-consumer-server requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd rabbitmq-mail-consumer-server
$ npm install 
$ node app
```

### Running Stages
You need to send messages from your server to rabbit mq channel when you need to send mail.
Forget Password Mail:
```sh
 rabbitMq.sendRabbitMQ('mailChannel', JSON.stringify({
    email: 'testme-app@yandex.ru',
    nameSurname: 'Erdem Köşk',
    type: 'forget',
  }));
```
Register Mail:
```sh
 rabbitMq.sendRabbitMQ('mailChannel', JSON.stringify({
    email: 'testme-app@yandex.ru',
    nameSurname: 'Erdem Köşk',
    type: 'register',
  }));
```
When messages arrvied rabbitmq-mail-consumer-server, it controls mail in blacklist (from redis).
If In Not Blacklist:
![In Not Blacklist](https://i.imgur.com/2cWUecy.png)
If In Blacklist:
![In Blacklist](https://i.imgur.com/bFe9r4e.png)


### Env Variables

| Env        | Example           
| ------------- |:-------------:
| NODE_ENV      | dev 
| RABBITMQ_URL   | amqp url      
| RABBITMQ_CHANNEL | amqp channel 
| MAIL_USER      | user mail 
| MAIL_PASS   | yser mail password      
| MAIL_HOST | smtp mail server
| MAIL_PORT      | smtp mail port 
| REDIS_HOST   | redis url      
| REDIS_PASS | redis password
| REDIS_PORT | redis port
| URL | unsubscribe url path


### Mail Types

There are two types of mail. Its type can be easily increased and different parameters can be sent for each.🙏

- Register
- Forget

Register:
![Register](https://i.imgur.com/A6AjOVU.png)
Forget:
![Forget](https://i.imgur.com/QnXD8Bg.png)

