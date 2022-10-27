const validate = require('deep-email-validator');
// console.log(validate);
const main = async () => {
  let res = await validate.validate('philipp@power-of-storytelling.com');
  res.email = 'philipp@power-of-storytelling.com';
  console.log(res);

  const res2 = await validate.validate('ken@savvyapps.com');
  console.log(res2, 'ken@savvyapps.com');

  const rest3 = await validate.validate('adomas@liposentials.com');
  console.log(rest3, 'adomas@liposentials.com');

  const rest4 = await validate.validate('jconsu@asyouwish.es');
  console.log(rest4, 'jconsu@asyouwish.es');

  const rest5 = await validate.validate('alan@makemarketingmagic.com');
  console.log(rest5, 'alan@makemarketingmagic.com');

  const rest7 = await validate.validate('zs@xyinbox.com');
  console.log(rest7, 'zs@xyinbox.com');

  const rest8 = await validate.validate('dara@topdigitalmarketingcompany.com');
  console.log(rest8, 'dara@topdigitalmarketingcompany.com');

  const rest9 = await validate.validate('erfonseca@mac.com');
  console.log(rest9, 'erfonseca@mac.com');

  const rest10 = await validate.validate('sandeep.lakhina@uundergrad.com');
  console.log(rest10, 'sandeep.lakhina@uundergrad.com');

  const rest11 = await validate.validate('cindy.eich@bairdwarner.com');
  console.log(rest11, 'cindy.eich@bairdwarner.com');

  const rest12 = await validate.validate('peter@vndrmedia.com');
  console.log(rest12, 'peter@vndrmedia.com');
};
// main();

//code and output using rapidAPI
const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://email-checker.p.rapidapi.com/verify/v1',
  params: { email: 'philipp@power-of-storytelling.com' },
  headers: {
    'X-RapidAPI-Key': '37dd2acf7cmsh176874a4b201d12p11327fjsn64f142035145',
    'X-RapidAPI-Host': 'email-checker.p.rapidapi.com',
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

/*
{
  email: 'philipp@power-of-storytelling.com',
  user: 'philipp',
  domain: 'power-of-storytelling.com',
  status: 'valid',
  reason: 'The email address is valid.',
  disposable: false
}
{
  email: 'ken@savvyapps.com',
  user: 'ken',
  domain: 'savvyapps.com',
  status: 'valid',
  reason: 'The email address is valid.',
  disposable: false
}
{
  email: 'jconsu@asyouwish.es',
  user: 'jconsu',
  domain: 'asyouwish.es',
  status: 'unknown',
  reason: 'The SMTP server is taking too much time to respond.',
  disposable: false
}
{
  email: 'jconsu@asyouwish.es',
  user: 'jconsu',
  domain: 'asyouwish.es',
  status: 'unknown',
  reason: 'The SMTP server is taking too much time to respond.',
  disposable: false
}
{
  email: 'coin@cryptocoinsky.com',
  user: 'coin',
  domain: 'cryptocoinsky.com',
  status: 'unknown',
  reason: 'The SMTP server is taking too much time to respond.',
  disposable: false
}
{
  email: 'akmfozlolhoq.com',
  user: 'akmfozlolhoq.com',
  domain: null,
  status: 'invalid',
  reason: 'The email address format is not valid.',
  disposable: false
}
{
  email: 'akmfozlolhoq@gmail.com',
  user: 'akmfozlolhoq',
  domain: 'gmail.com',
  status: 'valid',
  reason: 'The email address is valid.',
  disposable: false
}
*/
