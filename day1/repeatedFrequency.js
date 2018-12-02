const { readFileSync } = require('fs');
const { join } = require('path');

const inputPath = join(__dirname, 'input.txt');
module.exports = function repeatedFrequency(file = inputPath) {
  const fileContents = readFileSync(file).toString();
  const lines = fileContents
    .trim()
    .split('\n')
    .map(n => Number.parseInt(n, 10));

  let frequency;
  const seen = new Set();
  let previous = 0;

  const findFn = (number) => {
    const newFrequency = previous + number;
    if (seen.has(newFrequency)) {
      frequency = newFrequency;
      return true;
    }

    seen.add(newFrequency);
    previous = newFrequency;
    return false;
  };

  while (!frequency) {
    lines.find(findFn);
  }

  return frequency;
};
