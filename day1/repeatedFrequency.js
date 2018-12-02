const { readFileSync } = require('fs');

const fileContents = readFileSync('./input.txt').toString();
const lines = fileContents.trim().split('\n').map(n => Number.parseInt(n, 10));

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

process.stdout.write(`found ${frequency} twice\n`);
