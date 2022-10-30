const validate = require('deep-email-validator');
const fs = require('fs');

fs.readFile('email.csv', 'utf8', async function (err, data) {
  /* parse data */
  const emails = data.split('\n');
  const validEmails = [];
  const invalidEmails = [];
  const a = emails.map(async (email) => {
    let res = await validate.validate(email);
    res.email = email;
    console.log(res.valid);
    if (res.valid) {
      validEmails.push(res);
    } else {
      invalidEmails.push(res);
    }
    console.log(
      `total valid emails: ${validEmails.length} and total invalid emails: ${invalidEmails.length} and total emails are ${emails.length}`
    );
  });
  const b = await Promise.all(a);
  console.log(b, '<--- this is the value of b');
  validEmails.map((email, index) => {
    console.log(`${index + 1} --->`);
    console.log(email);
  });
});
