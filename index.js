const Twitter = require('Twitter');
require('dotenv').config();
const TwitterV2Client = require('twitter-v2');
var validator = require('email-validator');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'email.csv',
  header: [
    { id: 'email', title: 'EMAIL' },
    { id: 'screen_api', title: 'Screen API' },
  ],
});
const records = [];

var client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret,
});
console.log(process.env.consumer_key_z);
const TwitterV2 = new TwitterV2Client({
  consumer_key: process.env.consumer_key_z,
  consumer_secret: process.env.consumer_secret_z,
  access_token_key: process.env.access_token_key_z,
  access_token_secret: process.env.access_token_secret_z,
});

function extractEmails(text) {
  return text.match(/([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}
let totalExtraUser = 0;
let extraUserExist = false;
let lastIdToScrap = '';
// GET recent tweets
(async () => {
  client.get(
    'users/show',
    // { screen_name: 'AFozlol', include_entities: false },
    // { screen_name: 'zawwadx', include_entities: false },
    // { screen_name: 'FirstX_ai', include_entities: false },
    { screen_name: 'officialpbuster', include_entities: false },
    // { screen_name: 'Solidinbox', include_entities: false },
    async function (err, data, response) {
      await TwitterV2.get(`users/${data.id_str}/followers`, {
        max_results: 1000,
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
        response.data.map(async (data) => {
          const name = data.name;
          const nameOfFirstProfile = name;
          let firstName = name.split(' ')[0] || '';
          let lastName = name.split(' ')[1] || '';

          if (data.description?.includes('@')) {
            const candidateUserNames = data.description.split(' ');
            const namerAtDescriptions = [];
            candidateUserNames.map((name) => {
              if (name.startsWith('@')) {
                let nameToPush = name.split('@')[1];
                nameToPush = nameToPush.split(/[.,\-=+/~`!@#$%^&*();:"|]/)[0];
                namerAtDescriptions.push(nameToPush);
              }
            });

            namerAtDescriptions.map(async (nameAtDesc) => {
              if (nameAtDesc) {
                extraUserExist = true;
                console.log('work with this id now ---->', nameAtDesc);
                lastIdToScrap = nameAtDesc;
                totalExtraUser += 1;

                client.get(
                  'users/lookup',
                  { screen_name: nameAtDesc },

                  function (err, userData, response) {
                    if (userData[0]) {
                      const data = userData[0];
                      const urlArray = [];
                      const urlArray1 = data.entities?.url?.urls || [];
                      const urlArray1Length =
                        data.entities?.url?.urls?.length || 0;
                      const urlArray2 = data.entities?.description?.urls || [];
                      const urlArray2Length =
                        data.entities?.description?.urls?.length || 0;
                      for (let i = 0; i < urlArray1Length; i++) {
                        urlArray.push(urlArray1[i]?.display_url);
                      }

                      for (let i = 0; i < urlArray2Length; i++) {
                        urlArray.push(urlArray2[i]?.display_url);
                      }
                      const totalUrl = urlArray.length;
                      let url = '';
                      const description = data.description;
                      const name = data.name;
                      const screen_name = data.screen_name;

                      const emails = extractEmails(description);
                      let emailFoundAtBio = false;
                      if (emails && emails.length > 0) {
                        const isEmailValid = validator.validate(emails[0]);
                        if (isEmailValid) {
                          records.push({
                            email: emails[0],
                            screen_api: data.screen_name,
                          });
                          emailFoundAtBio = true;
                        }
                      }
                      if (!emailFoundAtBio) {
                        for (let i = 0; i < totalUrl; i++) {
                          url = urlArray[i];

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
                          if (screen_name) {
                            const cleanExtension = extension.includes('/')
                              ? extension.split('/')[0]
                              : extension;
                            if (cleanExtension) {
                              const email1 = `${screen_name}@${company}.${extension}`;
                              const isEmailValid = validator.validate(email1);
                              if (isEmailValid) {
                              }
                            }
                          }

                          if (firstName) {
                            totalSampleEmail = 1;
                          } else if (firstName && lastName) {
                            totalSampleEmail = 3;
                          }
                          if (
                            nameOfFirstProfile.split(' ').length === 1 &&
                            company &&
                            extension
                          ) {
                            const cleanExtension = extension.includes('/')
                              ? extension.split('/')[0]
                              : extension;
                            if (cleanExtension) {
                              const email1 = `${firstName}@${company}.${extension}`;
                              const isEmailValid = validator.validate(email1);
                              if (isEmailValid) {
                                records.push({
                                  email: email1,
                                  screen_api: data.screen_name,
                                });
                              }
                            }
                          } else if (
                            nameOfFirstProfile.split(' ').length === 2 &&
                            company &&
                            extension
                          ) {
                            const cleanExtension = extension.includes('/')
                              ? extension.split('/')[0]
                              : extension;
                            if (cleanExtension) {
                              const email1 = `${firstName}@${company}.${cleanExtension}`;
                              const email3 = `${firstName}.${lastName}@${company}.${cleanExtension}`;
                              const isEmail1Valid = validator.validate(email1);
                              const isEmail3Valid = validator.validate(email3);
                              if (isEmail1Valid) {
                                records.push({
                                  email: email1,
                                  screen_api: data.screen_name,
                                });
                              }
                              if (isEmail3Valid) {
                                records.push({
                                  email: email3,
                                  screen_api: data.screen_name,
                                });
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                );
              }
            });
          }

          const description = data.description;
          const emails = extractEmails(description);
          let emailFoundAtBio = false;
          if (emails && emails.length > 0) {
            const isEmailValid = validator.validate(emails[0]);
            if (isEmailValid) {
              records.push({ email: emails[0], screen_api: data.username });
              emailFoundAtBio = true;
            }
          }
          if (!emailFoundAtBio) {
            const urlArray = [];
            const urlArray1 = data.entities?.url?.urls || [];
            const urlArray1Length = data.entities?.url?.urls?.length || 0;
            const urlArray2 = data.entities?.description?.urls || [];
            const urlArray2Length =
              data.entities?.description?.urls?.length || 0;
            for (let i = 0; i < urlArray1Length; i++) {
              urlArray.push(urlArray1[i]?.display_url);
            }

            for (let i = 0; i < urlArray2Length; i++) {
              urlArray.push(urlArray2[i]?.display_url);
            }
            const totalUrl = urlArray.length;
            let url = '';
            for (let i = 0; i < totalUrl; i++) {
              url = urlArray[i];
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
              if (firstName) {
                totalSampleEmail = 1;
              }

              if (firstName && lastName) {
                totalSampleEmail = 3;
              }
              if (name.split(' ').length === 1 && company && extension) {
                const cleanExtension = extension.includes('/')
                  ? extension.split('/')[0]
                  : extension;
                if (cleanExtension) {
                  const email1 = `${firstName}@${company}.${extension}`;
                  const isEmailValid = validator.validate(email1);
                  if (isEmailValid) {
                    records.push({ email: email1, screen_api: data.username });
                  }
                }
              } else if (name.split(' ').length === 2 && company && extension) {
                const cleanExtension = extension.includes('/')
                  ? extension.split('/')[0]
                  : extension;
                if (cleanExtension) {
                  const email1 = `${firstName}@${company}.${cleanExtension}`;
                  const email3 = `${firstName}.${lastName}@${company}.${cleanExtension}`;
                  const isEmail1Valid = validator.validate(email1);
                  const isEmail3Valid = validator.validate(email3);
                  if (isEmail1Valid) {
                    records.push({ email: email1, screen_api: data.username });
                  }
                  if (isEmail3Valid) {
                    records.push({ email: email3, screen_api: data.username });
                  }
                }
              } else if (name.split(' ').length === 3 && company && extension) {
                const cleanExtension = extension.includes('/')
                  ? extension.split('/')[0]
                  : extension;
                if (cleanExtension) {
                  const first_name = name.split(' ')[0];
                  const email1 = `${first_name}@${company}.${cleanExtension}`;
                  const isEmail1Valid = validator.validate(email1);
                  if (isEmail1Valid) {
                    records.push({ email: email1, screen_api: data.username });
                  }
                }
              }
            }
          }
        });
      });

      setTimeout(function () {
        csvWriter
          .writeRecords(records) // returns a promise
          .then(() => {
            console.log('Done...');
            console.log('totalExtraUser -->', totalExtraUser);
          });
      }, 5000);
    }
  );
})();
