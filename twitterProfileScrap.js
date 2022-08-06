require('dotenv').config();
const express = require('express');
const Twitter = require('twitter');
const app = express();
const port = process.env.PORT || 4000;

var client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret,
});

const getUsersInfo = async ({ twitterHandler }) => {
  try {
    const params = { screen_name: twitterHandler };
    const user = await client.get('users/lookup', params);
    console.log(user[0]);
  } catch (err) {
    console.log(err);
  }
};

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  try {
    // const user = await getUsersInfo({ twitterHandler: 'divdev_' });
    const user = await getUsersInfo({ twitterHandler: 'mizanurazhario' });
    // console.log(user);
  } catch (err) {
    console.log(err);
  }
});
