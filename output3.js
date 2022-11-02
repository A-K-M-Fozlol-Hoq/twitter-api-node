const axios = require('axios');
const validate = require('deep-email-validator');
const emailCheck = require('node-email-check');
const fs = require('fs');

fs.readFile('22.csv', 'utf8', async function (err, CSVData) {
  /* parse data */
  const emailsAndStatus = CSVData.split('\r\n');
  emailsAndStatus.map(async (emailAndStatus, i) => {
    let email = emailAndStatus.split(',')[1];
    console.log(email);
    const res = await emailCheck.isValid(email);
    const obj = {
      suc: res,
      email: email,
    };
    console.log(obj);
  });
});
