const fs = require('fs');

const ourEmails = [];
const rightEmails = [];
let matchedEmails = 0;

fs.readFile('email.csv', 'utf8', async function (err, CSVData) {
  /* parse data */
  const emailsAndNames = CSVData.split('\n');
  emailsAndNames.map(async (emailAndName, i) => {
    let email = emailAndName.split(',')[0];
    if (email) {
      email = email.toLowerCase().trim();
      ourEmails.push(email);
    }
  });
});

fs.readFile('50.csv', 'utf8', async function (err, CSVData) {
  /* parse data */
  const emailsAndStatus = CSVData.split('\r\n');
  emailsAndStatus.map(async (emailAndStatus, i) => {
    let email = emailAndStatus.split(',')[1];
    if (email) {
      email = email.toLowerCase().trim();
      rightEmails.push(email);
    }
  });
});

setTimeout(() => {
  ourEmails.map((ourEmail) => {
    if (rightEmails.includes(ourEmail)) {
      matchedEmails += 1;
    }
  });
  console.log(
    'Generatee emails---> ',
    ourEmails.length - 1,
    ` Email found at ${rightEmails.length}---> ` + matchedEmails
  );
}, 1000);
