// const { TwitterApi } = require('twitter-api-v2');
const Twitter = require('twitter-v2');

require('dotenv').config();

const TwitterV2 = new Twitter({
  //   consumer_key: process.env.consumer_key_f,
  //   consumer_secret: process.env.consumer_secret_f,
  //   access_token_key: process.env.access_token_key_f,
  //   access_token_secret: process.env.access_token_secret_f,'
  consumer_key: process.env.CONSUMER_KEY_C,
  consumer_secret: process.env.CONSUMER_SECRET_C,
  access_token_key: process.env.CENTRAL_TOKEN,
  access_token_secret: process.env.CENTRAL_TOKEN_SECRET,
});
// console.log(twitterClient);
// curl --request GET \
//   --url ',author_id,created_at,conversation_id' \curl --request GET \
// --&expansions=,,&user.fields=name,username' \
// --header 'Authorization: Bearer $BEARER_TOKEN'
//   --header 'Authorization: Bearer $BEARER_TOKEN'
(async () => {
  const tweetId = 1560208382874763265;
  // const res = await axios.get('http://localhost:5000/getActivity', { params });
  // console.log(res);
  await TwitterV2.get(`tweets/search/recent`, {
    query: `${tweetId}`,
    'tweet.fields': [
      'in_reply_to_user_id',
      'lang',
      'non_public_metrics',
      'public_metrics',
      'promoted_metrics',
      'organic_metrics',
      'referenced_tweets',
    ],
  })
    .then(async (response) => {
      console.log('response');
      console.log(response);
      // const listMembers = {
      //   listId: listId,
      //   users: response.data || [],
      // };
      // res.status(200).send({ isSuccess: true, data: listMembers });
    })
    .catch((err) => {
      res.status(500).send({
        isSuccess: false,
        data: 'internal server error, ListMembers controller',
      });
    });
})();
