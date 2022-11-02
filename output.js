const validate = require('deep-email-validator');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'check_by_csv.csv',
  header: [{ id: 'email', title: 'EMAIL' }],
});
const records = [];

const outputAtScrapyBird = [];
const validEmails = [];
const invalidEmails = [];
let totalMatches = 0;
fs.readFile('output.csv', 'utf8', async function (err, CSVData) {
  const data = CSVData.split('\n');
  data.map((email) => {
    const e1 = email.toLocaleLowerCase().trim();
    outputAtScrapyBird.push(e1);
  });
});
fs.readFile('email.csv', 'utf8', async function (err, CSVData) {
  /* parse data */
  const data = CSVData.split('\n');
  const a = data.map(async (d) => {
    const email = d.split(',')[0];
    const screen_api = d.split(',')[1];
    let res = await validate.validate(email);
    res.email = email?.toLowerCase()?.trim();
    res.screen_api = screen_api;
    // console.log(res.valid);
    if (res.valid) {
      validEmails.push(res);
      records.push({
        email: res.email,
      });
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
  execute();
});

const execute = () => {
  validEmails.map((email, index) => {
    const e1 = email;
    const e2 = email.email?.toLowerCase()?.trim();
    const e3 = email.email?.toLowerCase()?.trim();
    console.log(
      index,
      '->',
      'email.emailm-> ',
      email.email,
      ' validEmails.length -> ',
      validEmails.length,
      ' outputAtScrapyBird.includes(email) -> ',
      outputAtScrapyBird.includes(e1),
      ' outputAtScrapyBird.includes(email.email)-> ',
      outputAtScrapyBird.includes(e2),
      ' outputAtScrapyBird.length -> ',
      outputAtScrapyBird.length
    );
    if (outputAtScrapyBird.includes(e3)) {
      totalMatches += 1;
      console.log(`${index + 1} --->${email}`);
    }
  });
  console.log('Total matches: ' + totalMatches);
  csvWriter
    .writeRecords(records) // returns a promise
    .then(() => {
      console.log('Done...');
    });
};
