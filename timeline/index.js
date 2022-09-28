// const needle = require('needle');
// const axios = require('axios');
// require('dotenv').config();

// const token = process.env.BEARER_TOKEN;

// const endpointURL = 'https://api.twitter.com/1.1/users/show.json';

// async function getRequest() {
//   // These are the parameters for the API request
//   // specify User names to fetch, and any additional fields that are required
//   // by default, only the User ID, name and user name are returned
//   const params = {
//     user_id: '4QRhOGvNjYMlctZgI1a3uSNeyv02',
//     screen_name: 'AFozlol',
//   };

//   // this is the HTTP header that adds bearer token authentication
//   const res = await needle('get', endpointURL, params, {
//     headers: {
//       'User-Agent': 'v2UserLookupJS',
//       authorization: `Bearer ${token}`,
//     },
//   });

//   if (res.body) {
//     return res.body;
//   } else {
//     throw new Error('Unsuccessful request');
//   }
// }

// (async () => {
//   try {
//     // Make request
//     const response = await getRequest();
//     console.dir(response, {
//       depth: null,
//     });
//   } catch (e) {
//     console.log(e);
//     process.exit(-1);
//   }
//   process.exit();
// })();
// ================================================================

// // const Twit = require('twit');
// const Twitter = require('Twitter');
// require('dotenv').config();

// var client = new Twitter({
//   consumer_key: process.env.consumer_key,
//   consumer_secret: process.env.consumer_secret,
//   access_token_key: process.env.access_token_key,
//   access_token_secret: process.env.access_token_secret,
// });

// // GET recent tweets
// (async () => {
//   client.get(
//     'users/show',
//     { user_id: '4QRhOGvNjYMlctZgI1a3uSNeyv02', screen_name: 'AFozlol' },
//     function (err, data, response) {
//       //   const tweets = data;
//       // const tweets = data.statuses;
//       // const tweets = data.statuses.map((tweet) => tweet.text);
//       //   const tweets = data.statuses.filter((tweet) =>
//       //     tweet.text.toLowerCase().includes('elon')
//       //   );
//       console.log(data);
//     }
//   );
// })();

// =============================================

// const Twit = require('twit');
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
    'users/lookup',
    { user_id: '4QRhOGvNjYMlctZgI1a3uSNeyv02', screen_name: 'AFozlol' },
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
