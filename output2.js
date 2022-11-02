const axios = require('axios');
const validate = require('deep-email-validator');
const fs = require('fs');

fs.readFile('email.csv', 'utf8', async function (err, CSVData) {
  /* parse data */
  const emailsAndNames = CSVData.split('\n');
  emailsAndNames.map(async (emailAndName, i) => {
    const email = emailAndName.split(',')[0];
    const res = await validate.validate(email);
    console.log(res);
  });
});
