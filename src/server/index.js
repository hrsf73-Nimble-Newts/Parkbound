const express = require('express');

const dotenv = require('dotenv').config();

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.status(200).send('hello world!!!');
});


const server = app.listen(process.env.PORT || port, () => {
  console.log('App is listening to port ' + port);
});

module.exports = server;
