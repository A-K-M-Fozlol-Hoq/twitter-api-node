const { TwitterApi } = require('twitter-api-v2');
require('dotenv').config();
const client = new TwitterApi({
  // consumer_key: consumer_key_fconsumer_key,
  // consumer_secret: process.env.consumer_secret,
  // access_token_key: process.env.access_token_key,
  // access_token_secret: process.env.access_token_secret,
  appKey: process.env.consumer_key_f,
  appSecret: process.env.consumer_secret_f,
  accessToken: process.env.access_token_key_f,
  accessSecret: process.env.access_token_secret_f,
});
const rwClient = client.readWrite;
module.exports = rwClient;
