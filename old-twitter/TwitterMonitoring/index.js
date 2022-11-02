// const Twit = require('twit');
const Twitter = require('Twitter');
const notifier = require('node-notifier');
const open = require('open');
require('dotenv').config();

// var client = new Twit({
//   consumer_key: process.env.consumer_key,
//   consumer_secret: process.env.consumer_secret,
//   access_token_key: process.env.access_token_key,
//   access_token_secret: process.env.access_token_secret,
//   timeout_ms: 60 * 1000,
//   strictSSL: true,
// });

var client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret,
});

// GET recent tweets
(async () => {
  client.get(
    'search/tweets',
    { q: '#tesla since:2022-07-15', count: 10 },
    function (err, data, response) {
      //   const tweets = data;
      // const tweets = data.statuses;
      // const tweets = data.statuses.map((tweet) => tweet.text);
      const tweets = data.statuses.map((tweet) => tweet);
      // const tweets = data.statuses.filter((tweet) =>
      //   tweet.text.toLowerCase().includes('elon')
      // );
      console.log(tweets);
    }
  );
})();

// t - > 7:49
