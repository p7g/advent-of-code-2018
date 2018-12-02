const { readFileSync } = require('fs');
const { join } = require('path');

const inputPath = join(__dirname, 'input.txt');
module.exports = function commonLetters(file = inputPath) {
  const ids = readFileSync(file)
    .toString()
    .trim()
    .split('\n');

  let common;

  for (let i = 0; i < ids.length; i += 1) {
    const str1 = ids[i];
  comparing: // eslint-disable-line
    for (let j = i + 1; j < ids.length; j += 1) {
      const str2 = ids[j];
      let differentIndex;
      for (let k = 0; k < str1.length; k += 1) {
        if (str1[k] !== str2[k]) {
          if (differentIndex !== undefined) {
            continue comparing; // eslint-disable-line
          }
          differentIndex = k;
        }
      }
      if (differentIndex !== undefined) {
        common = str1.substring(0, differentIndex)
          + str1.substring(differentIndex + 1);
      }
    }
  }

  return common;
};
