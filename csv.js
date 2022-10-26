const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'file.csv',
  header: [
    { id: 'name', title: 'NAME' },
    { id: 'lang', title: 'LANGUAGE' },
  ],
});

const records = [
  { name: 'Bob' },
  { name: 'Mary' },
  { name: 'Mary' },
  { name: 'Mary' },
];

csvWriter
  .writeRecords(records) // returns a promise
  .then(() => {
    console.log('...Done');
  });
