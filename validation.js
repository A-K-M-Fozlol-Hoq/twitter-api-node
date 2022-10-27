const fs = require('fs');
var parse = require('csv-parse');
fs.readFile('email.csv', function (err, fileData) {
  parse(fileData, { columns: false, trim: true }, function (err, rows) {
    // Your CSV data is in an array of arrys passed to this callback as rows.
  });
});
