const { readFileSync } = require('fs');
const { join } = require('path');

const inputPath = join(__dirname, 'input.txt');
module.exports = function overlap(file = inputPath) {
  const regex = /^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/;
  const claims = [];
  const fabric = [];
  for (let i = 0; i < 1000; i += 1) {
    fabric[i] = new Uint8Array(1000);
  }

  let totalOverlapped = 0;
  const input = readFileSync(file).toString().trim().split('\n');
  input.forEach((line) => {
    const match = regex.exec(line);
    const id = match[1];
    const x = Number.parseInt(match[2], 10);
    const y = Number.parseInt(match[3], 10);
    const w = Number.parseInt(match[4], 10);
    const h = Number.parseInt(match[5], 10);

    let overlapped = 0;
    const rightSide = x + w;
    const bottom = y + h;
    for (let i = y; i < bottom; i += 1) {
      for (let j = x; j < rightSide; j += 1) {
        if (fabric[j][i] === 1) {
          overlapped += 1;
        }
        fabric[j][i] += 1;
      }
    }
    totalOverlapped += overlapped;

    if (overlapped === 0) {
      const area = w * h;
      claims.push({ id, x, y, w, h, area }); // eslint-disable-line
    }
  });

  let noOverlap;
  claims.forEach((claim) => {
    const { id, x, y, w, h, area } = claim; // eslint-disable-line
    const rightSide = x + w;
    const bottom = y + h;

    let sum = 0;
    for (let i = y; i < bottom; i += 1) {
      for (let j = x; j < rightSide; j += 1) {
        const timesOverlapped = fabric[j][i];
        if (timesOverlapped > 1) {
          return;
        }
        sum += timesOverlapped;
      }
    }

    if (sum === area) {
      noOverlap = id;
    }
  });

  return [totalOverlapped, noOverlap];
};
