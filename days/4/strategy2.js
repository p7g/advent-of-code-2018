const getStuff = require('./getStuff');

module.exports = function strategy2() {
  const [sleepTimes] = getStuff();

  const [id, biggest] = Object.entries(sleepTimes).reduce((max, current) => {
    const currentMax = Math.max(...current[1]);
    if (currentMax > max[1]) {
      return [current[0], currentMax];
    }
    return max;
  }, [-1, 0]);

  return Number.parseInt(id, 10) * sleepTimes[id].indexOf(biggest);
};
