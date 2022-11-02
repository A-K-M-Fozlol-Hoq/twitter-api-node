const rwClient = require('./tweetClient');

const tweet = async () => {
  try {
    console.log('hello world');
    await rwClient.v1.tweet(
      'Hello world! This is the third test post given by twitter api.'
    );
  } catch (err) {
    console.log(err);
  }
};
tweet();
