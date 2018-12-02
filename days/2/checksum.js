const { readFileSync } = require('fs');
const { join } = require('path');

function countLetters(str) {
  /* eslint-disable */
  const letters = {
    a: 0, b: 0, c: 0, d: 0, e: 0, f: 0,
    g: 0, h: 0, i: 0, j: 0, k: 0, l: 0,
    m: 0, n: 0, o: 0, p: 0, q: 0, r: 0,
    s: 0, t: 0, u: 0, v: 0, w: 0, x: 0,
    y: 0, z: 0,
  };
  /* eslint-enable */
  for (let i = 0; i < str.length; i += 1) {
    const letter = str[i];
    if (letters[letter]) {
      letters[letter] += 1;
    } else {
      letters[letter] = 1;
    }
  }
  return letters;
}

const inputPath = join(__dirname, 'input.txt');
module.exports = function checksum(file = inputPath) {
  const ids = readFileSync(file)
    .toString()
    .trim()
    .split('\n');

  const [double, triple] = ids.reduce(([twice, thrice], id) => {
    const letters = Object.values(countLetters(id));
    let two = twice;
    let three = thrice;
    if (letters.includes(3)) {
      three += 1;
    }
    if (letters.includes(2)) {
      two += 1;
    }
    return [two, three];
  }, [0, 0]);

  return double * triple;
};
