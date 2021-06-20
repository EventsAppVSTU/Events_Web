import express from 'express';//для роутинга
const app = express();
import https from 'https'
import fs from 'fs'
import bodyParser from 'body-parser';
const urlencodedParser = bodyParser.urlencoded({extended: false})

import fetch from 'node-fetch';
const { Headers } = fetch
global.Headers = Headers;

app.use(bodyParser.json());
// const urlencodedParser = urlencoded({extended: false}) //включение парсера
console.log("hello!!!!! how are you ?))))")

app.use(express.static('dist/'));

import routes from './routing.js';
routes(app)


const server = https.createServer(
  {
      cert: fs.readFileSync('./security/server-crt.pem'),
      key: fs.readFileSync('./security/server-key.pem'),
      ca: fs.readFileSync('./security/ca-crt.pem'),
      requestCert: true,
      rejectUnauthorized: false,
  }, 
  app
).listen(3090);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
