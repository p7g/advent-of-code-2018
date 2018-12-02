const { readFileSync } = require('fs');

const ids = readFileSync('./input.txt')
  .toString()
  .trim()
  .split('\n');

function countLetters(str) {
  const letters = {};
  for (let i = 0; i < str.length; i++) {
    letters[str[i]] = letters[str[i]] + 1 || 1;
  }
  return letters;
}

const start = Date.now();
const [double, triple] = ids.reduce(([double, triple], id) => {
  const letters = Object.values(countLetters(id));
  if (letters.includes(3)) {
    triple += 1;
  }
  if (letters.includes(2)) {
    double += 1;
  }
  return [double, triple];
}, [0, 0]);

console.log(
  `double: ${double}`,
  `triple: ${triple}`,
  double * triple,
  `time: ${Date.now() - start}ms`,
);
