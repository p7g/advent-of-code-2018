const { readFileSync } = require('fs');
const { join } = require('path');

const inputPath = join(__dirname, 'input.txt');
module.exports = function order(file = inputPath) {
  const alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z',
  ];
  const offset1 = 'Step '.length;
  const offset2 = 'Step _ must be finished before step '.length;

  const prerequisites = new Map();
  const dependents = new Map();

  readFileSync(file).toString().trim().split('\n')
    .forEach((line) => {
      const prerequisite = line[offset1];
      const dependent = line[offset2];

      const prereq = prerequisites.get(prerequisite);
      if (!(prereq instanceof Array)) {
        prerequisites.set(prerequisite, [dependent]);
      } else {
        prereq.push(dependent);
      }

      const depend = dependents.get(dependent);
      if (!(depend instanceof Array)) {
        dependents.set(dependent, [prerequisite]);
      } else {
        depend.push(prerequisite);
      }
    });

  prerequisites.forEach(d => d.sort());
  dependents.forEach(prereqs => prereqs.sort());

  const queue = alphabet.filter(a => !dependents.has(a));

  let letters = '';
  while (queue.length) {
    const step = queue.shift();
    letters += step;
    const after = prerequisites.get(step);
    if (after !== undefined) {
      after.forEach((next) => {
        const stillNeeded = dependents.get(next);
        const i = stillNeeded.indexOf(step);
        stillNeeded.splice(i, 1);
        if (stillNeeded.length === 0) {
          queue.push(next);
          queue.sort();
        }
      });
    }
  }

  return letters;
};
