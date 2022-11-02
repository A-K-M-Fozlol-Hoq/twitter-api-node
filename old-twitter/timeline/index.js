// const needle = require('needle');
// const axios = require('axios');
// require('dotenv').config();

// const token = process.env.BEARER_TOKEN;

// const endpointURL = 'https://api.twitter.com/1.1/followers/ids.json';

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
function extractEmails(text) {
  //   console.log(text);
  return text.match(/([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}

(async () => {
  client.get(
    'followers/ids',
    // { screen_name: 'AFozlol' },
    { screen_name: 'zawwadx' },
    function (err, data, response) {
      const ids = data.ids;
      ids.map(function (id) {
        client.get(
          'statuses/user_timeline',
          { user_id: id },
          // { screen_name: 'zawwadx' },
          function (err, tweets, response) {
            console.log('tweets length --->', tweets?.length);
            if (tweets?.length > 0) {
              tweets?.map((tweet) => {
                if (!tweet?.text.startsWith('RT')) {
                  // console.log('tweet -> ', tweet?.text);
                  const emails = extractEmails(tweet?.text);
                  let email = '';
                  if (emails && emails.length > 0) {
                    email = emails[0];
                  }
                  console.log(email || 'email not found');
                }
              });
            }
          }
        );
      });
      //   for (i = 0; i < ids.length; i++) {
      //     const id = ids[i];
      //     client.get(
      //       'users/show',
      //       { user_id: id, include_entities: false },
      //       function (err, data2, response) {
      //         // console.log(data2);
      //         if (data2.description) {
      //           // console.log(data2.description, data2.screen_name, data2);
      //           //   const emails = extractEmails(
      //           //     'data2.description sad@bed.com df df@23.3'
      //           //   )
      //           const emails = extractEmails(data2.description);
      //           let email = '';
      //           if (emails && emails.length > 0) {
      //             email = emails[0];
      //           }
      //           console.log(email || 'email not found', data2.screen_name);
      //           //   console.log(extractEmails(data2.description));
      //         }
      //         // const tweets = data.statuses;
      //         // const tweets = data.statuses.map((tweet) => tweet.text);
      //         //   const tweets = data.statuses.filter((tweet) =>
      //         //     tweet.text.toLowerCase().includes('elon')
      //         //   );
      //       }
      //     );
      //   }
      //   ids.map(function (id) {
      //     client.get(
      //       'users/show',
      //       { user_id: id, include_entities: false, include_email: true },
      //       function (err, data2, response) {
      //         console.log(data2);
      //         // extractEmails(data2.description);
      //         // const tweets = data.statuses;
      //         // const tweets = data.statuses.map((tweet) => tweet.text);
      //         //   const tweets = data.statuses.filter((tweet) =>
      //         //     tweet.text.toLowerCase().includes('elon')
      //         //   );
      //       }
      //     );
      //   });

      // const tweets = data.statuses;
      // const tweets = data.statuses.map((tweet) => tweet.text);
      //   const tweets = data.statuses.filter((tweet) =>
      //     tweet.text.toLowerCase().includes('elon')
      //   );
    }
  );
})();

// (async () => {
//   console.log('statuses/user_timeline');
//   client.get(
//     'statuses/user_timeline',
//     { screen_name: 'zawwadx' },
//     function (err, tweets, response) {
//       tweets.map((tweet) => {
//         if (!tweet?.text.startsWith('RT')) {
//           // console.log('tweet -> ', tweet?.text);
//           const emails = extractEmails(tweet?.text);
//           let email = '';
//           if (emails && emails.length > 0) {
//             email = emails[0];
//           }
//           console.log(email || 'email not found');
//         }
//       });
//     }
//   );
// })();

// // t - > 7:49

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
