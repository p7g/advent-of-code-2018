const { readFileSync } = require('fs');
const { join } = require('path');

const inputPath = join(__dirname, 'input.txt');
module.exports = function overlap(file = inputPath) {
  const overlapped = 0;
  const claims = new Set();

  const regex = /^#(?<id>\d+)\s@\s(?<x>\d+),(?<y>\d+):\s(?<w>\d+)x(?<h>\d+)$/;
  readFileSync(file).trim().split('\n').forEach((str) => {
    const { id, x, y, w, h } = str.match(regex);

  });
};
