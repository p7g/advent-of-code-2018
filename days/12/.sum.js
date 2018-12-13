const { readFileSync } = require('fs');
const { join } = require('path');

const inputPath = join(__dirname, 'input.txt');
module.exports = function sum2(generations, file = inputPath) {
  const input = readFileSync(file).toString().trim().split('\n')
    .filter(s => s.trim());

  class Pot {
    constructor(s, n) {
      this.s = s;
      this.n = n;
    }

    toString() {
      return this.s;
    }
  }

  const initialState = input.shift().substring(15).split('')
    .map((s, i) => new Pot(s, i));

  const rules = input.reduce((map, line) => {
    const [, condition, result] = /^([.#]+) => ([.#])$/.exec(line);
    map.set(condition, result);
    return map;
  }, new Map());

  let state = initialState;
  for (let gen = 0; gen < generations; gen += 1) {
    const newState = [];
    for (let i = 0; i < state.length + 4; i += 1) {
      let condition;
      if (i < 5) {
        condition = state.slice(0, i + 1).join('').padStart(5, '.');
      } else if (i > state.length - 1) {
        condition = state.slice(i - 4).join('').padEnd(5, '.');
      } else {
        condition = state.slice(i - 4, i + 1).join('');
      }
      const result = rules.get(condition) || '.';
      newState.push(new Pot(
        result,
        state[i] ? state[i].n - 2 : newState[newState.length - 1].n + 1,
      ));
    }
    state = newState;
  }

  return state.reduce((sum, { s, n }) => (s === '#' ? sum + n : sum), 0);
};
