const { readFileSync } = require('fs');
const { join } = require('path');

const int = n => Number.parseInt(n, 10);

const inputPath = join(__dirname, 'input.txt');
module.exports = function message(file = inputPath) {
  const regex = /^position=<\s*(-?\d+),\s*(-?\d+)> velocity=<\s*(-?\d+),\s*(-?\d+)>$/;
  const MIN_ADJACENT = 5;
  const MIN_COLUMNS = 3;

  const min = {
    x: Infinity,
    y: Infinity,
  };
  const max = {
    x: -Infinity,
    y: -Infinity,
  };

  function resetLimits() {
    min.x = Infinity;
    min.y = Infinity;
    max.x = -Infinity;
    max.y = -Infinity;
  }

  function updateLimits(x, y) {
    if (x > max.x) max.x = x;
    if (x < min.x) min.x = x;
    if (y > max.y) max.y = y;
    if (y < min.y) min.y = y;
  }

  const points = readFileSync(file).toString().trim().split('\n')
    .map((line) => {
      let [, x, y, vx, vy] = regex.exec(line);
      x = int(x);
      y = int(y);
      vx = int(vx);
      vy = int(vy);
      updateLimits(x, y);
      return {
        x,
        y,
        vx,
        vy,
      };
    });

  let seconds = 0;
  function move() {
    seconds += 1;
    resetLimits();
    points.forEach((point) => {
      const {
        x,
        y,
        vx,
        vy,
      } = point;
      const newX = x + vx;
      const newY = y + vy;
      updateLimits(newX, newY);
      point.x = newX; // eslint-disable-line
      point.y = newY; // eslint-disable-line
    });
  }

  while (true) { // eslint-disable-line
    let columns = 0;
    if (max.x - min.x <= 100 && max.y - min.y <= 50) {
      const xs = new Set(points.map(({ x }) => x));
      xs.forEach((x) => {
        const ys = points.filter(({ x: px }) => px === x).map(({ y }) => y);
        const [adjacent] = ys.sort().reduce(
          ([count, prev], current) => [
            current === prev + 1 ? count + 1 : count,
            current,
          ],
          [0, -Infinity],
        );
        if (adjacent >= MIN_ADJACENT) {
          columns += 1;
        }
      });
      if (columns >= MIN_COLUMNS) {
        break;
      }
    }
    move();
  }

  const [px, py] = points.reduce(
    ([xs, ys], { x, y }) => [[...xs, x], [...ys, y]],
    [[], []],
  );

  let msgstr = '';
  for (let { y } = min; y <= max.y; y += 1) {
    const xs = py.reduce(
      (xss, pointy, i) => (pointy === y ? [...xss, px[i]] : xss),
      [],
    );
    for (let { x } = min; x <= max.x; x += 1) {
      if (xs.includes(x)) {
        msgstr += '#';
      } else {
        msgstr += ' ';
      }
    }
    msgstr += '\n';
  }
  return [`\n${msgstr}`, seconds];
};
