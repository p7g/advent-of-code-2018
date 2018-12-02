const { readFileSync } = require('fs');

const sum = readFileSync('./input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(n => Number.parseInt(n, 10))
  .reduce((acc, n) => acc + n);

process.stdout.write(`${sum}\n`);
