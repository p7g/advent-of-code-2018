const { readFileSync } = require('fs');

const ids = readFileSync('./input.txt')
  .toString()
  .trim()
  .split('\n');

let common;
let index;
let word1;
let word1Index;
let word2;
let word2Index;

const start = Date.now();
for (let i = 0; i < ids.length; i++) {
  const str1 = ids[i];
comparing:
  for (let j = i + 1; j < ids.length; j++) {
    const str2 = ids[j];
    let differentIndex;
    for (let k = 0; k < str1.length; k++) {
      if (str1[k] !== str2[k]) {
        if (differentIndex !== undefined) {
          continue comparing;
        }
        differentIndex = k;
      }
    }
    if (differentIndex !== undefined) {
      index = differentIndex;
      word1 = str1;
      word1Index = i;
      word2 = str2;
      word2Index = j;
      common = str1.substring(0, differentIndex)
        + str1.substring(differentIndex + 1);
    }
  }
}

if (common) {
  console.log(`
found difference at index ${index} in ${Date.now() - start}ms
  ${common.substring(0, index)} ${common.substring(index)} (in common)
  ${word1} (word ${word1Index})
  ${word2} (word ${word2Index})
  ${' '.repeat(index) + '^'}
`);
}
else {
  console.log('found nothing');
}
