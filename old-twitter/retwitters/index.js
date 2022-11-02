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
    'statuses/retweeters/ids',
    { id: '1554812326339026944', count: 100 },
    function (err, data, response) {
      data.ids.map(async function (id) {
        console.log(id);
        // client.get(
        //   'users/show',
        //   { user_id: '1470512602216382466' },
        //   // { user_id: id },
        //   function (err, data, response) {
        //     console.log(data);
        //   }
        // );
      });
    }
  );
})();
