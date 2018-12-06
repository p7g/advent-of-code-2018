const reaction = require('./reaction');

module.exports = function remove() {
  const letters = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
    'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  ];

  let best;
  letters.forEach((letter) => {
    const result = reaction(letter);
    if (result.length < best || best === undefined) {
      best = result.length;
    }
  });

  return best;
};
