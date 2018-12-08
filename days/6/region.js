const { readFileSync } = require('fs');
const { join } = require('path');

const inputPath = join(__dirname, 'input.txt');
module.exports = function part2(file = inputPath) {
  const lines = readFileSync(file).toString().trim().split('\n');
  const numPoints = lines.length;

  const pointX = new Uint16Array(numPoints);
  const pointY = new Uint16Array(numPoints);

  lines.forEach((line, id) => {
    const [x, y] = line.split(', ');
    pointX[id] = Number.parseInt(x, 10);
    pointY[id] = Number.parseInt(y, 10);
  });

  const maxX = Math.max(...pointX) + 10000;
  const minX = Math.min(...pointX) - 10000;
  const maxY = Math.max(...pointY) + 10000;
  const minY = Math.min(...pointY) - 10000;

  let area = 0;
  for (let x = minX; x <= maxX; x += 1) {
yAxis: // eslint-disable-line
    for (let y = minY; y <= maxY; y += 1) {
      let sum = 0;
      for (let i = 0; i < numPoints; i += 1) {
        sum += Math.abs(x - pointX[i]) + Math.abs(y - pointY[i]);
        if (sum >= 10000) {
          continue yAxis; // eslint-disable-line
        }
      }
      if (sum < 10000) {
        area += 1;
      }
    }
  }
  return area;
};
