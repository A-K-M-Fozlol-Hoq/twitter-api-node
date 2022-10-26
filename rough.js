// https://twitter.com/i/lists/1537272475754582016
const Twitter = require('Twitter');
require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  var client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.CENTRAL_TOKEN,
    access_token_secret: process.env.CENTRAL_TOKEN_SECRET,
  });

  // GET recent tweets
  (async () => {
    client.get(
      'account/verify_credentials',
      {
        screen_name: 'ShahriarRizvi03',
        screen_api: 'ShahriarRizvi03',
        name: 'Shahriar Rizvi',
        include_email: true,
      },
      function (err, data, response) {
        res.send({ data, client });
      }
    );
  })();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
