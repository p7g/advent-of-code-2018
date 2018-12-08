const { join } = require('path');

const makeTree = require('./makeTree');

const inputPath = join(__dirname, 'input.txt');
module.exports = function sumMetadata(file = inputPath) {
  const tree = makeTree(file);

  let sum = 0;

  (function sumMeta(node) {
    sum += node.metadata.reduce((acc, i) => acc + i);
    node.children.forEach(sumMeta);
  }(tree));

  return sum;
};
