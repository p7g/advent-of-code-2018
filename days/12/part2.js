const { join } = require('path');

const sum = require('./.sum');

const inputPath = join(__dirname, 'input.txt');
module.exports = function part1(file = inputPath) {
  return sum(111, file) + (50000000000 - 111) * 87;
};
