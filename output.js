const validate = require('deep-email-validator');
const fs = require('fs');

fs.readFile('email.csv', 'utf8', async function (err, CSVData) {
  /* parse data */
  const data = CSVData.split('\n');
  const validEmails = [];
  const invalidEmails = [];
  const a = data.map(async (d) => {
    const email = d.split(',')[0];
    const screen_api = d.split(',')[1];
    let res = await validate.validate(email);
    res.email = email;
    res.screen_api = screen_api;
    // console.log(res.valid);
    if (res.valid) {
      validEmails.push(res);
    } else {
      invalidEmails.push(res);
    }
    console.log(
      `total valid emails: ${validEmails.length} and total invalid emails: ${invalidEmails.length} and total emails are ${data.length}`
    );
  });
  const b = await Promise.all(a);
  console.log(b, '<--- this is the value of b');
  validEmails.map((email, index) => {
    console.log(`${index + 1} --->`);
    console.log(email);
  });
});
