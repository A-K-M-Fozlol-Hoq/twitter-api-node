// const { TwitterApi } = require('twitter-api-v2');
const Twitter = require('twitter-v2');

require('dotenv').config();

const twitterClient = new Twitter({
  consumer_key: process.env.consumer_key_f,
  consumer_secret: process.env.consumer_secret_f,
  access_token_key: process.env.access_token_key_f,
  access_token_secret: process.env.access_token_secret_f,
});
// console.log(twitterClient);

(async () => {
  await twitterClient
    .get(`tweets/1550502679868235776/liking_users`)
    .then(async (response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
})();
