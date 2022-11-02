const axios = require('axios');

async function main() {
  var apiUrl = 'https://apps.emaillistverify.com/api/verifyEmail';
  var apiKey = 'key';
  var email = 'akmfozlolohgherpgihwgphwhoq@gmail.com';
  var requestUrl = `${apiUrl}?secret=${apiKey}&email=${email}`;
  let res = await axios.get(requestUrl);
  console.log(res);
}

main();
