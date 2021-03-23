import express from 'express';//для роутинга
const app = express();
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
