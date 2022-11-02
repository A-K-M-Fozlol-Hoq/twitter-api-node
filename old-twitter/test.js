const Twitter = require('Twitter');
require('dotenv').config();

var client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret,
});

// GET recent tweets
(async () => {
  client.get(
    'account/verify_credentials',
    { screen_name: 'zawwadx', include_email: true },
    // { include_email: true },
    function (err, data, response) {
      //   const tweets = data;
      // const tweets = data.statuses;
      // const tweets = data.statuses.map((tweet) => tweet.text);
      //   const tweets = data.statuses.filter((tweet) =>
      //     tweet.text.toLowerCase().includes('elon')
      //   );
      console.log(data);
    }
  );
})();
