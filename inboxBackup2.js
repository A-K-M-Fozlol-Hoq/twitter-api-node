const Twitter = require('Twitter');
const axios = require('axios'); //response.url
require('dotenv').config();

const TwitterV2Client = require('twitter-v2');
var client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret,
});

const TwitterV2 = new TwitterV2Client({
  consumer_key: 'HCErdTtFjSh1asS4WK0GYpep2',
  consumer_secret: 'uhdoei9oxwLFoSX29c5I0bKkTuKwH4hXkB2Qy69HjuUFKPVuah',
  access_token_key: '1172153224448499712-2Lw2DRsHmWIqZxtx91NBNZ1qNdfsFI',
  access_token_secret: 'DioL9cN6uLhvKVUXxzMzFfrbIZrEXhESSDIj0WyrbPFRb',
});

function extractEmails(text) {
  //   console.log(text);
  return text.match(/([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}

// GET recent tweets
(async () => {
  client.get(
    'users/show',
    { screen_name: 'zawwadx', include_entities: false },
    async function (err, data, response) {
      console.log(data.id_str);
      await TwitterV2.get(`users/${data.id_str}/followers`, {
        max_results: 10,
        'user.fields': [
          'created_at',
          'description',
          'entities',
          'id',
          'location',
          'name',
          'pinned_tweet_id',
          'profile_image_url',
          'protected',
          'public_metrics',
          'url',
          'username',
          'verified',
          'withheld',
        ],
      }).then((response) => {
        // console.log(response.data);
        response.data.map(async (data) => {
          const url = data.entities?.url?.urls[0].display_url;
          const description = data.description;
          const name = data.name;
          let firstName = name.split(' ')[0] || 'none';
          let lastName = name.split(' ')[1];
          let totalSampleEmail = 0;
          let emailFound = false;
          let email = '';
          let emailAtDestination = '';
          let emailFromNameAndCompany = '';

          const emails = extractEmails(description);
          if (emails && emails.length > 0) {
            //email found at description
            const email = emails[0];
            emailFound = true;
            console.log('email found at description', email);
            emailAtDestination = email;
          }

          if (firstName) {
            totalSampleEmail = 1;
          }
          if (firstName && lastName) {
            totalSampleEmail = 3;
          }
          let company = '';
          let extension = '';
          try {
            if (url) {
              company = url.split('.')[0];
              extension = url.split('.')[1];
            }
          } catch (e) {
            console.log('error');
          }
          if (totalSampleEmail === 1 && company && extension) {
            const email1 = `${firstName}@${company}.${extension}`;
            console.log('email 1 of 1 --->', email1);
            const result = await axios.get(
              `https://api.apilayer.com/email_verification/${email1}`,
              {
                headers: { apikey: `c7WyfRS5yQFfl2OHWGqt8NGdDiUQWV67` },
              }
            );
          }

          if (totalSampleEmail === 3 && company && extension) {
            const email1 = `${firstName}@${company}.${extension}`;
            const email2 = `${lastName}@${company}.${extension}`;
            const email3 = `${firstName}.${lastName}@${company}.${extension}`;
            console.log('email 1 of 3 --->', email1);
            console.log('email 2 of 3 --->', email2);
            console.log('email 3 of 3 --->', email3);
          }
        });
      });
    }
  );
})();
