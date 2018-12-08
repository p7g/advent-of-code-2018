const { readFileSync } = require('fs');
const { join } = require('path');

function manhattanDistance([x1, y1], [x2, y2]) {
  const x = Math.abs(x1 - x2);
  const y = Math.abs(y1 - y2);
  return x + y;
}

const inputPath = join(__dirname, 'input.txt');
module.exports = function maxArea(file = inputPath) {
  const lines = readFileSync(file).toString().trim().split('\n');
  const numPoints = lines.length;

  const pointX = new Uint16Array(numPoints);
  const pointY = new Uint16Array(numPoints);
  const areas = new Uint16Array(numPoints);
  const infinite = new Set();

  lines.forEach((line, i) => {
    const [x, y] = line.split(', ');
    pointX[i] = Number.parseInt(x, 10);
    pointY[i] = Number.parseInt(y, 10);
  });

  const maxX = Math.max(...pointX);
  const maxY = Math.max(...pointY);

  for (let x = 0; x < maxX; x += 1) {
    for (let y = 0; y < maxY; y += 1) {
      let minDistance;
      let point;
      let tie = false;

      for (let n = 0; n < numPoints; n += 1) {
        const x2 = pointX[n];
        const y2 = pointY[n];

        const distance = manhattanDistance(
          [x, y],
          [x2, y2],
        );
        if (distance < minDistance || minDistance === undefined) {
          minDistance = distance;
          point = n;
          tie = false;
        } else if (distance === minDistance) {
          tie = true;
        }
      }

      if (tie) {
        continue; // eslint-disable-line
      }
      if (x === 0 || y === 0 || x === maxX - 1 || y === maxY - 1) {
        infinite.add(point);
      }

      areas[point] += 1;
    }
  }

  return Math.max(...areas.filter((n, i) => !infinite.has(i)));
};
