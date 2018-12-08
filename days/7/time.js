const { readFileSync } = require('fs');
const { join } = require('path');

const inputPath = join(__dirname, 'input.txt');
module.exports = function time(file = inputPath) {
  const alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z',
  ];
  const offset1 = 'Step '.length;
  const offset2 = 'Step _ must be finished before step '.length;

  const prerequisites = new Map();
  const dependents = new Map();
  /* eslint-disable */
  const time = {
    A: 61, B: 62, C: 63, D: 64, E: 65, F: 66, G: 67, H: 68, I: 69, J: 70,
    K: 71, L: 72, M: 73, N: 74, O: 75, P: 76, Q: 77, R: 78, S: 79, T: 80,
    U: 81, V: 82, W: 83, X: 84, Y: 85, Z: 86,
  };
  /* eslint-enable */

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

  const workers = Array.from({ length: 5 }, () => ({
    step: null,
    completionTime: null,
  }));

  let t = 0;
  for (;; t += 1) {
    let shouldBreak = true;
    for (let i = 0; i < 2; i += 1) {
      workers.forEach((worker) => { // eslint-disable-line
        const { step, completionTime } = worker;
        if (t === completionTime) {
          worker.step = null; // eslint-disable-line
          worker.completionTime = null; // eslint-disable-line
          const after = prerequisites.get(step);
          if (after !== undefined) {
            after.forEach((next) => {
              const stillNeeded = dependents.get(next);
              const j = stillNeeded.indexOf(step);
              stillNeeded.splice(j, 1);
              if (stillNeeded.length === 0) {
                queue.push(next);
                queue.sort();
              }
            });
          }
        }
        if (step === null && queue.length !== 0) {
          worker.step = queue.shift(); // eslint-disable-line
          worker.completionTime = t + time[worker.step]; // eslint-disable-line
        }
        if (worker.step !== null) {
          shouldBreak = false;
        }
      });
    }
    if (shouldBreak) {
      break;
    }
  }

  return t;
};
