const { readFileSync } = require('fs');

const ids = readFileSync('./input.txt')
  .toString()
  .trim()
  .split('\n');

function countLetters(str) {
  const letters = {};
  for (let i = 0; i < str.length; i += 1) {
    letters[str[i]] = letters[str[i]] + 1 || 1;
  }
  return letters;
}

const start = Date.now();
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

process.stdout.write(`
double: ${double}
triple: ${triple}
checksum: ${double * triple}
time: ${Date.now() - start}ms
`);
