const { readFileSync } = require('fs');

const fileContents = readFileSync('./input.txt').toString();
const lines = fileContents.trim().split('\n').map(n => Number.parseInt(n, 10));

let frequency;
const seen = new Set();
let previous = 0;

while (!frequency) {
  lines.find(number => {
    const newFrequency = previous + number;
    if (seen.has(newFrequency)) {
      frequency = newFrequency;
      return true;
    }

    seen.add(newFrequency);
    previous = newFrequency;
  });
}

console.log(`found %d twice`, frequency);
