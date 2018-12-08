const { join } = require('path');

const makeTree = require('./makeTree');

const inputPath = join(__dirname, 'input.txt');
module.exports = function value(file = inputPath) {
  const tree = makeTree(file);

  return (function getValue(node) {
    if (node.children.length) {
      const cache = new Map();
      return node.metadata.reduce((acc, meta) => {
        if (meta > 0) {
          const child = node.children[meta - 1];
          if (child !== undefined) {
            let val;
            if (cache.has(child)) {
              val = cache.get(child);
            } else {
              val = getValue(child);
            }
            return acc + val;
          }
        }
        return acc;
      }, 0);
    }
    return node.metadata.reduce((acc, i) => acc + i, 0);
  }(tree));
};
