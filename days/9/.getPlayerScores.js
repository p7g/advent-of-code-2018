const Node = require('./Node');

module.exports = function getPlayerScores(numPlayers, lastMarbleScore) {
  const players = new Uint32Array(numPlayers);
  let node = new Node(0);
  let currentMarbleScore = 0;
loop: // eslint-disable-line
  while (currentMarbleScore <= lastMarbleScore) { // eslint-disable-line
    for (let playerNum = 0; playerNum < numPlayers; playerNum += 1) {
      currentMarbleScore += 1;
      if (currentMarbleScore > lastMarbleScore) {
        break loop; // eslint-disable-line
      }
      if (currentMarbleScore % 23 === 0) {
        const deleted = node.removeBefore(6);
        node = deleted.next;
        const scoreAdd = currentMarbleScore + deleted.value;
        players[playerNum] += scoreAdd;
      } else {
        const newNode = new Node(currentMarbleScore);
        node.addAfter(1, newNode);
        node = newNode;
      }
    }
  }
  return players;
};
