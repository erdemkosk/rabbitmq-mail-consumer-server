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

Rabbitmq-mail-consumer-server requires [Node.js](https://nodejs.org/) v8+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd rabbitmq-mail-consumer-server
$ npm install 
$ node app
```
For Make A Docker Image:

```sh
$ docker build -t  rabbitmq-mail-consumer-server .
$ docker run --env-file .env -p 5000:5000 rabbitmq-mail-consumer-server
```

Pull From Docker Hub

- latest
- rpi => ARM build for raspperry pi

```sh
$ docker run --env-file .env -p 5000:5000 erdemkosk/rabbitmq-mail-consumer-server:latest
or
$ docker run --env-file .env -p 5000:5000 erdemkosk/rabbitmq-mail-consumer-server:rpi
```
For Docker-Compose

- latest
- rpi => ARM build for raspperry pi

```sh
$ docker-compose -f docker-compose-latest.yml up
or
$ docker-compose -f docker-compose-rpi.yml up
```

### Running Stages
You need to send messages from your server to rabbit mq channel when you need to send mail.
Forget Password Mail:
```sh
  rabbitMq.sendRabbitMQ('mailChannel', JSON.stringify({
    email: 'testme-app@yandex.ru',
    nameSurname: 'Erdem Köşk',
    type: 'forget',
    appName: 'Test Me',
    forgetTitle: 'Şifreni Unutmuşsun :(',
    forgetMessage: '<b>nameSurname</b> şifreni unutmuşsun! Aşağıdaki adımları takip edelim.',
    mailIcon: 'https://img.icons8.com/clouds/100/000000/jake.png',
    webSiteLink: 'http://localhost:3000',
    webSiteLinkButton: 'Hadi Başlayalım!',
    warningText: 'Şifre sıfırlama talebini siz yollamadıysanız, lütfen dikkate almayın !',
    sincerelyText: 'Sevgilerle',
    needHelpText: 'Yardım mı lazım?',
    needHelpLink: 'http://erdemkosk.com',
  }));
```
Register Mail:
```sh
 rabbitMq.sendRabbitMQ('mailChannel', JSON.stringify({
    email: 'testme-app@yandex.ru',
    nameSurname: 'Erdem Köşk',
    type: 'register',
    appName: 'Test Me',
    welcomeTitle: 'Hoş Geldin!',
    welcomeMessage: 'Seni aramızda görmek çok güzel <b> nameSurname </b> ! <br/> İngilizce kelime öğrenmenin en kolay yolu 🤙. Boş zamanlarında senin için oluşturulan rastgele ingilizce kelime testlerini cevapla 🙏 Kendini geliştir!',
    mailIcon: 'https://img.icons8.com/clouds/100/000000/america.png',
    webSiteLink: 'http://localhost:3000',
    webSiteLinkButton: 'Hadi Başlayalım!',
    thanksText: 'Projemize destek verdiğin için teşekkür ederiz!',
    sincerelyText: 'Sevgilerle',
    needHelpText: 'Yardım mı lazım?',
    needHelpLink: 'http://erdemkosk.com',
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
![Register](https://i.imgur.com/72AEhxE.png)
Forget:
![Forget](https://i.imgur.com/9up6jB3.png)

