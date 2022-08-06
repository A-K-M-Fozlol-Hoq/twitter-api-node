// have to learn about api limits
require('dotenv').config();
const express = require('express');
const axios = require('axios').default;
const Twitter = require('twitter-lite');

const app = express();
const port = process.env.PORT || 4000;

(async function () {
  const user = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
  });

  try {
    let response = await user.getBearerToken();
    const app = new Twitter({
      bearer_token: response.access_token,
    });

    // Search for recent tweets from the twitter API
    response = await app.get(`/search/tweets`, {
      q: 'Mizanur Rahman', // The search term
      lang: 'en', // Let's only get English tweets
      count: 100, // Limit the results to 100 tweets
    });

    // Loop over all the tweets and print the text
    for (tweet of response.statuses) {
      console.dir(tweet.text);
    }
  } catch (e) {
    console.log('There was an error calling the Twitter API');
    console.dir(e);
  }
})();

app.get('/', (req, res) => {
  axios
    .get('/https://api.twitter.com/2/users/Ahmadul82596161')
    .then((response) => {
      // handle success
      //   console.log(response);
      res.send(response);
    })
    .catch((error) => {
      // handle error
      console.log(error, 'error');
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
