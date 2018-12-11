const getGrid = require('./.getGrid');

const inputSerial = 7989;
module.exports = function maxPower22(serial = inputSerial) {
  const grid = getGrid(serial);

  const soFar = Array.from({ length: 301 }, () => new Int16Array(301));

  let max = -Infinity;
  let mx;
  let my;
  let ms;
  for (let size = 1; size <= 300; size += 1) {
    for (let x = size; x <= 300; x += 1) {
      for (let y = size; y <= 300; y += 1) {
        soFar[x][y] = grid[x - 1][y - 1]
                    + soFar[x - 1][y]
                    + soFar[x][y - 1]
                    - soFar[x - 1][y - 1];
        const current = soFar[x][y]
                      - soFar[x - size][y]
                      - soFar[x][y - size]
                      + soFar[x - size][y - size];
        if (current > max) {
          max = current;
          mx = x;
          my = y;
          ms = size;
        }
      }
    }
  }

  return [mx - ms, my - ms, ms];
};
