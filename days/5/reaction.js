const { readFileSync } = require('fs');
const { join } = require('path');
const assert = require('assert').strict;

const inputPath = join(__dirname, 'input.txt');
module.exports = function reaction(ignore = '', file = inputPath) {
  let str = readFileSync(file).toString().trim();
  let toIgnore;
  let toIgnoreUpper;
  if (ignore !== '') {
    assert(ignore === ignore.toLowerCase(), 'ignored char must be lowercase');
    toIgnore = ignore.charCodeAt(0);
    toIgnoreUpper = toIgnore - 32;
  }

  let i = 0;
  while (str[i]) {
    const current = str.charCodeAt(i);

    if (current === toIgnore || current === toIgnoreUpper) {
      str = str.substring(0, i) + str.substring(i + 1);
      if (i !== 0) {
        i -= 1;
      }
      continue; // eslint-disable-line
    }

    const next = str.charCodeAt(i + 1);

    const diff = current - next;
    if (diff === 32 || diff === -32) {
      str = str.substring(0, i) + str.substring(i + 2);
      if (i !== 0) {
        i -= 1;
      }
      continue; // eslint-disable-line
    }

    i += 1;
  }

  return str.length;
};
