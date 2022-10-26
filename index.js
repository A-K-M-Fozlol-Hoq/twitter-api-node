const nodemailer = require('nodemailer');
const Twitter = require('Twitter');
const axios = require('axios'); //response.url
require('dotenv').config();
const TwitterV2Client = require('twitter-v2');
var validator = require('email-validator');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'email.csv',
  header: [{ id: 'email', title: 'EMAIL' }],
});
const records = [];

// const sendMail = (email) => {
//   if (email) {
//     // sending reminder our user by email
//     var transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     var mailOptions = {
//       from: process.env.EMAIL,
//       to: email,
//       subject: 'Email checker',
//       text: `Text: This is an email to check if your email exists or not.`,
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error, '125', email);
//       } else {
//         console.log(info, '127', email);
//       }
//     });

//     // end mail
//   } else {
//     console.log('please send valid email at sendEmail function');
//   }
// };

var client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret,
});

const TwitterV2 = new TwitterV2Client({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret,
});

function extractEmails(text) {
  //   console.log(text);
  return text.match(/([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}
let totalExtraUser = 0;

// GET recent tweets
(async () => {
  client.get(
    'users/show',
    // { screen_name: 'AFozlol', include_entities: false },
    { screen_name: 'zawwadx', include_entities: false },
    async function (err, data, response) {
      // console.log(data.id_str);
      await TwitterV2.get(`users/${data.id_str}/followers`, {
        max_results: 50,
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
          if (data.description?.includes('@')) {
            // console.log(
            //   data.description,
            //   'this is the bio of ----->',
            //   data.username,
            //   data.name
            // );
            const candidateUserNames = data.description.split(' ');
            const namerAtDescriptions = [];
            candidateUserNames.map((name) => {
              if (name.startsWith('@')) {
                namerAtDescriptions.push(name.split('@')[1]);
              }
            });
            namerAtDescriptions.map(async (name) => {
              console.log('work with this id now ---->', name);
              totalExtraUser += 1;
              client.get(
                'users/lookup',
                { screen_name: name },
                // { screen_name: 'zawwadx' },
                function (err, userData, response) {
                  if (userData[0]) {
                    console.log('userData starts here');
                    const data = userData[0];
                    const url = data.entities?.url?.urls[0]?.display_url;
                    const description = data.description;
                    const name = data.name;
                    console.log(
                      'url = ' + url + '; description = ' + description,
                      '; name = ' + name
                    );
                    console.log('userData ends here');
                    let firstName = name.split(' ')[0] || '';
                    let lastName = name.split(' ')[1] || '';
                    let totalSampleEmail = 0;
                    let email = '';

                    const emails = extractEmails(description);
                    if (emails && emails.length > 0) {
                      //email found at description
                      // console.log('email found at description', emails[0]);
                      // sendMail(emails[0]);
                      const isEmailValid = validator.validate(emails[0]);
                      if (isEmailValid) {
                        records.push({ email: emails[0] });
                        emailFound = true;
                        email = emails[0];
                      }
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
                      const cleanExtension = extension.includes('/')
                        ? extension.split('/')[0]
                        : extension;
                      if (cleanExtension) {
                        const email1 = `${firstName}@${company}.${extension}`;
                        const isEmailValid = validator.validate(email1);
                        if (isEmailValid) {
                          // console.log('email 1 of 1 --->', email1);
                          records.push({ email: email1 });
                          // sendMail(email1);
                        }
                      }
                    }

                    if (totalSampleEmail === 3 && company && extension) {
                      const cleanExtension = extension.includes('/')
                        ? extension.split('/')[0]
                        : extension;
                      if (cleanExtension) {
                        const email1 = `${firstName}@${company}.${cleanExtension}`;
                        const email2 = `${lastName}@${company}.${cleanExtension}`;
                        const email3 = `${firstName}.${lastName}@${company}.${cleanExtension}`;
                        const isEmail1Valid = validator.validate(email1);
                        const isEmail2Valid = validator.validate(email2);
                        const isEmail3Valid = validator.validate(email3);
                        if (isEmail1Valid) {
                          records.push({ email: email1 });
                        }
                        if (isEmail2Valid) {
                          records.push({ email: email2 });
                        }
                        if (isEmail3Valid) {
                          records.push({ email: email3 });
                        }
                      }

                      // console.log('email 1 of 3 --->', email1);
                      // console.log('email 2 of 3 --->', email2);
                      // console.log('email 3 of 3 --->', email3);

                      // sendMail(email1);
                      // sendMail(email2);
                      // sendMail(email3);
                    }
                  }
                }
              );
            });
          }

          const name = data.name;
          let firstName = name.split(' ')[0] || '';
          let lastName = name.split(' ')[1] || '';
          let totalSampleEmail = 0;
          let emailFound = false;
          let email = '';

          const emails = extractEmails(description);
          if (emails && emails.length > 0) {
            //email found at description
            // console.log('email found at description', emails[0]);
            // sendMail(emails[0]);
            const isEmailValid = validator.validate(emails[0]);
            if (isEmailValid) {
              records.push({ email: emails[0] });
              emailFound = true;
              email = emails[0];
            }
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
            const cleanExtension = extension.includes('/')
              ? extension.split('/')[0]
              : extension;
            if (cleanExtension) {
              const email1 = `${firstName}@${company}.${extension}`;
              const isEmailValid = validator.validate(email1);
              if (isEmailValid) {
                // console.log('email 1 of 1 --->', email1);
                records.push({ email: email1 });
                // sendMail(email1);
              }
            }
          }

          if (totalSampleEmail === 3 && company && extension) {
            const cleanExtension = extension.includes('/')
              ? extension.split('/')[0]
              : extension;
            if (cleanExtension) {
              const email1 = `${firstName}@${company}.${cleanExtension}`;
              const email2 = `${lastName}@${company}.${cleanExtension}`;
              const email3 = `${firstName}.${lastName}@${company}.${cleanExtension}`;
              const isEmail1Valid = validator.validate(email1);
              const isEmail2Valid = validator.validate(email2);
              const isEmail3Valid = validator.validate(email3);
              if (isEmail1Valid) {
                records.push({ email: email1 });
              }
              if (isEmail2Valid) {
                records.push({ email: email2 });
              }
              if (isEmail3Valid) {
                records.push({ email: email3 });
              }
            }

            // console.log('email 1 of 3 --->', email1);
            // console.log('email 2 of 3 --->', email2);
            // console.log('email 3 of 3 --->', email3);

            // sendMail(email1);
            // sendMail(email2);
            // sendMail(email3);
          }
        });
        csvWriter
          .writeRecords(records) // returns a promise
          .then(() => {
            console.log('...Done');
            console.log('totalExtraUser -->', totalExtraUser);
          });
      });
    }
  );
})();
