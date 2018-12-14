const { readFileSync } = require('fs');
const { join } = require('path');

const Cart = require('./Cart');
const Point = require('./Point');

function sortCarts(a, b) {
  const { x: ax, y: ay } = a.location;
  const { x: bx, y: by } = b.location;
  if (ay < by) {
    return -1;
  }
  if (by < ay) {
    return 1;
  }
  if (ax < bx) {
    return -1;
  }
  if (bx < ax) {
    return 1;
  }
  return 0;
}

function charToDirection(c) {
  switch (c) {
    case '<': return 'left';
    case '>': return 'right';
    case 'v': return 'down';
    case '^': return 'up';
    default: throw new Error(`Invalid direction: ${c}`);
  }
}

const inputPath = join(__dirname, 'input.txt');
module.exports = function part2(file = inputPath) {
  const grid = readFileSync(file).toString().split('\n')
    .map(str => str.split(''));

  let carts = [];

  for (let y = 0; y < grid.length; y += 1) {
    const line = grid[y];
    for (let x = 0; x < line.length; x += 1) {
      const current = line[x];
      if ('<>v^'.includes(current)) {
        const direction = charToDirection(current);
        carts.push(new Cart(new Point(x, y), direction));
      }
    }
  }

loop: // eslint-disable-line
  while (true) { // eslint-disable-line
    let someDeleted = false;
    for (const cart of carts) { // eslint-disable-line
      if (cart.deleted) {
        continue; // eslint-disable-line
      }
      const { x, y } = cart.move();
      for (const cart2 of carts) { // eslint-disable-line
        if (cart === cart2 || cart2.deleted) {
          continue; // eslint-disable-line
        }
        if (x === cart2.location.x && y === cart2.location.y) {
          cart.deleted = true;
          cart2.deleted = true;
          someDeleted = true;
        }
      }
      switch (grid[y][x]) {
        case '+':
          cart.turn();
          break;
        case '/':
          if (['left', 'right'].includes(cart.direction)) {
            cart.turn('left');
          } else if (['up', 'down'].includes(cart.direction)) {
            cart.turn('right');
          }
          break;
        case '\\':
          if (['left', 'right'].includes(cart.direction)) {
            cart.turn('right');
          } else if (['up', 'down'].includes(cart.direction)) {
            cart.turn('left');
          }
          break;
        default: break;
      }
    }
    if (someDeleted) {
      carts = carts.filter(c => !c.deleted);
    }

    if (carts.length === 1) {
      const { x, y } = carts.find(c => !c.deleted).location;
      return [x, y];
    }
    carts.sort(sortCarts);
  }
};
