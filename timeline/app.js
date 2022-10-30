const Twitter = require('Twitter');
require('dotenv').config();

var client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret,
});

// // GET recent tweets
// (async () => {
//   client.get(
//     'statuses/user_timeline',
//     // { user_id: 'NpZEIUw9RBXYZMiNgd5bUY4otCB2', screen_name: 'zawwadx' },
//     { user_id: '4QRhOGvNjYMlctZgI1a3uSNeyv02', screen_name: 'AFozlol' },
//     // { user_id: 'ze2yaXChk8Xvoers6vbq1h35sP53', screen_name: 'FoysalBN' },
//     function (err, data) {
//       const tweetsAtLastMonth = data.filter((tweet) => {
//         var tweetData = new Date(tweet.created_at);
//         var today = Date.now();
//         // To calculate the time difference of two dates
//         var Difference_In_Time = today - tweetData.getTime();

//         // To calculate the no. of days between two dates
//         var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
//         // console.log(Difference_In_Days);
//         return Difference_In_Days <= 30;
//       });
//       const tweets = tweetsAtLastMonth.map((tweet) => tweet.retweet_count);
//       const totalRetweet = tweets.reduce(function (total, num) {
//         return total + num;
//       }, 0);
//       const likes = tweetsAtLastMonth.map((tweet) => tweet.favorite_count);
//       const totalLike = likes.reduce(function (total, num) {
//         return total + num;
//       }, 0);
//       console.log(data);
//       // console.log('totalRetweet = ', totalRetweet, ' totalLike= ', totalLike);
//     }
//   );
// })();

// Filter realtime Tweets

(async () => {
  client.get(
    'users/lookup',
    // { screen_name: 'searchzakir' },
    { screen_name: 'kenyarmosh' },
    // { user_id: 'NpZEIUw9RBXYZMiNgd5bUY4otCB2', screen_name: 'zawwadx' },
    // { user_id: '4QRhOGvNjYMlctZgI1a3uSNeyv02', screen_name: 'AFozlol' },
    // { user_id: 'ze2yaXChk8Xvoers6vbq1h35sP53', screen_name: 'FoysalBN' },
    function (err, data) {
      // const tweetsAtLastMonth = data.filter((tweet) => {
      //   var tweetData = new Date(tweet.created_at);
      //   var today = Date.now();
      //   // To calculate the time difference of two dates
      //   var Difference_In_Time = today - tweetData.getTime();

      //   // To calculate the no. of days between two dates
      //   var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      //   // console.log(Difference_In_Days);
      //   return Difference_In_Days <= 30;
      // });
      // const tweets = tweetsAtLastMonth.map((tweet) => tweet.retweet_count);
      // const totalRetweet = tweets.reduce(function (total, num) {
      //   return total + num;
      // }, 0);
      // const likes = tweetsAtLastMonth.map((tweet) => tweet.favorite_count);
      // const totalLike = likes.reduce(function (total, num) {
      //   return total + num;
      // }, 0);
      console.log(data);
      const dataArray = [];
      const urlArray1 = data[0].entities?.url?.urls || [];
      const urlArray1Length = data[0].entities?.url?.urls?.length || 0;
      const urlArray2 = data[0].entities?.description?.urls || [];
      const urlArray2Length = data[0].entities?.description?.urls?.length || 0;
      for (let i = 0; i < urlArray1Length; i++) {
        dataArray.push(urlArray1[i]?.display_url);
      }

      for (let i = 0; i < urlArray2Length; i++) {
        dataArray.push(urlArray2[i]?.display_url);
      }

      console.log(dataArray);
      // console.log('totalRetweet = ', totalRetweet, ' totalLike= ', totalLike);
    }
  );
})();
