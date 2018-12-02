const { readFileSync } = require('fs');
const { join } = require('path');

const inputPath = join(__dirname, 'input.txt');
module.exports = function totalFrequency(file = inputPath) {
  return readFileSync(file)
    .toString()
    .trim()
    .split('\n')
    .map(n => Number.parseInt(n, 10))
    .reduce((acc, n) => acc + n);
};
