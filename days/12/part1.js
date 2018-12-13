const { join } = require('path');

const sum = require('./.sum');

const inputPath = join(__dirname, 'input.txt');
module.exports = function part1(file = inputPath) {
  return sum(20, file);
};
