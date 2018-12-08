const { readFileSync } = require('fs');
const { join } = require('path');

const inputPath = join(__dirname, 'input.txt');
module.exports = function makeTree(file = inputPath) {
  const numbers = readFileSync(file).toString().trim().split(' ')
    .map(n => Number.parseInt(n, 10));

  const [root] = (function parseNode(index) {
    let i = index;
    const [numChildren, numMeta] = numbers.slice(i, i + 2);
    i += 2;
    const children = [];
    for (let j = 0; j < numChildren; j += 1) {
      const [child, end] = parseNode(i);
      children.push(child);
      i = end;
    }
    const iMeta = i + numMeta;
    const metadata = numbers.slice(i, iMeta);
    return [
      {
        children,
        metadata,
      },
      iMeta,
    ];
  }(0));

  return root;
};
