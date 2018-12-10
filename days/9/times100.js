const { readFileSync } = require('fs');
const { join } = require('path');

const getPlayerScores = require('./.getPlayerScores');

const inputPath = join(__dirname, 'input.txt');
module.exports = function times100(file = inputPath) {
  const contents = readFileSync(file).toString().trim();
  let [,
    numPlayers,
    lastMarbleScore,
  ] = /^(\d+) players; last marble is worth (\d+) points$/.exec(contents);
  numPlayers = Number.parseInt(numPlayers, 10);
  lastMarbleScore = Number.parseInt(lastMarbleScore, 10) * 100;

  const players = getPlayerScores(numPlayers, lastMarbleScore);

  return Math.max(...players);
};
