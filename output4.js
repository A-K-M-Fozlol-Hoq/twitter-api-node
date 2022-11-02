const axios = require('axios');
const validate = require('deep-email-validator');
const fs = require('fs');
const emailCheck = require('node-email-check');
let totalValid = 0;
let totalInvalid = 0;
fs.readFile('email.csv', 'utf8', async function (err, CSVData) {
  /* parse data */
  const emailsAndNames = CSVData.split('\n');
  emailsAndNames.map(async (emailAndName, i) => {
    const email = emailAndName.split(',')[0];
    const isValid = await emailCheck.isValid(email);
    const obj = {
      isValid,
      email,
    };
    if (isValid) {
      totalValid += 1;
    } else {
      totalInvalid += 1;
    }
    console.log(
      obj,
      ' total valid -> ' + totalValid,
      'total invalid -> ' + totalInvalid
    );
  });
});
