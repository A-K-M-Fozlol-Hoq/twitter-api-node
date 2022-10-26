const validate = require('deep-email-validator');
// console.log(validate);
const main = async () => {
  let res = await validate.validate('asdf@gmail.com');
  console.log(res);

  const res2 = await validate.validate('akmfozlolhoq@gmail.com');
  console.log(res2);

  const rest3 = await validate.validate(
    'akmfozloluaweghfuywhnwerythoq@gmail.com'
  );
  console.log(rest3);
};
main();

//code and output using rapidAPI
// const axios = require('axios');

// const options = {
//   method: 'GET',
//   url: 'https://email-checker.p.rapidapi.com/verify/v1',
//   params: { email: 'akmfozlolhoq@gmail.com' },
//   headers: {
//     'X-RapidAPI-Key': '37dd2acf7cmsh176874a4b201d12p11327fjsn64f142035145',
//     'X-RapidAPI-Host': 'email-checker.p.rapidapi.com',
//   },
// };

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });
// /*
// {
//   email: 'coin@cryptocoinsky.com',
//   user: 'coin',
//   domain: 'cryptocoinsky.com',
//   status: 'unknown',
//   reason: 'The SMTP server is taking too much time to respond.',
//   disposable: false
// }
// {
//   email: 'akmfozlolhoq.com',
//   user: 'akmfozlolhoq.com',
//   domain: null,
//   status: 'invalid',
//   reason: 'The email address format is not valid.',
//   disposable: false
// }
// {
//   email: 'akmfozlolhoq@gmail.com',
//   user: 'akmfozlolhoq',
//   domain: 'gmail.com',
//   status: 'valid',
//   reason: 'The email address is valid.',
//   disposable: false
// }
// */
