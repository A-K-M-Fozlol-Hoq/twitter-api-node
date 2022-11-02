const { TwitterApi } = require('twitter-api-v2');
require('dotenv').config();

const client = new TwitterApi({
  appKey: process.env.consumer_key_f,
  appSecret: process.env.consumer_secret_f,
  accessToken: process.env.access_token_key_f,
  accessSecret: process.env.access_token_secret_f,
});

(async () => {
  console.log(client);
  try {
    client.v2
      .singleTweet('tweets/counts/recent', {
        'tweet.fields': ['organic_metrics'],
      })
      .then((val) => {
        console.log('val', val);
      })
      .catch((err) => {
        console.log('err', err);
      });
  } catch (e) {
    console.log(e);
  }
  process.exit();
})();
