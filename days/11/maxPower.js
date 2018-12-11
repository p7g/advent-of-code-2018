const getGrid = require('./.getGrid');

const inputSerial = 7989;
module.exports = function maxPower(serial = inputSerial) {
  const grid = getGrid(serial);

  let prevMax = -Infinity;
  let prevMaxX;
  let prevMaxY;
  for (let x = 0; x < 297; x += 1) {
    for (let y = 0; y < 297; y += 1) {
      let sum = 0;
      for (let i = 0; i < 3; i += 1) {
        for (let j = 0; j < 3; j += 1) {
          sum += grid[x + i][y + j];
        }
      }
      if (sum > prevMax) {
        prevMax = sum;
        prevMaxX = x;
        prevMaxY = y;
      }
    }
  }

  return [prevMaxX, prevMaxY];
};
