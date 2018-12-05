const getStuff = require('./getStuff');

module.exports = function strategy1() {
  const [guardSleepTimes, guardTotalSleep] = getStuff();

  const [id] = Object.entries(guardTotalSleep).reduce((max, current) => {
    if (current[1] > max[1]) {
      return current;
    }
    return max;
  });

  const [maxMinute] = guardSleepTimes[id].reduce((max, current, i) => {
    if (current > max[1]) {
      return [i, current];
    }
    return max;
  }, [-1, 0]);

  return Number.parseInt(id, 10) * maxMinute;
};
