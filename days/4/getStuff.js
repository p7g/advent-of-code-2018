const { readFileSync } = require('fs');
const { join } = require('path');

const inputPath = join(__dirname, 'input.txt');
module.exports = function getStuff(file = inputPath) {
  const lines = readFileSync(file).toString().trim().split('\n')
    .sort();
  const regex = /^\[([^\]]+)\] (f)?(w)?(?:G[^#]+#(\d+))?.*$/;

  const guardSleepTimes = {};
  const guardTotalSleep = {};
  let currentGuard;
  let timeAsleep;
  lines.forEach((line) => {
    const match = regex.exec(line);
    const date = match[1];
    const sleep = match[2];
    const wake = match[3];
    const id = match[4];

    const time = Number.parseInt(date.substring(date.length - 2), 10);

    if (id) {
      currentGuard = id;
      if (!guardSleepTimes[id]) {
        guardSleepTimes[id] = new Uint8ClampedArray(60);
      }
    }

    if (sleep) {
      timeAsleep = time;
    }

    if (wake) {
      for (let i = timeAsleep; i < time; i += 1) {
        guardSleepTimes[currentGuard][i] += 1;
      }

      const timeSlept = time - timeAsleep;
      if (!guardTotalSleep[currentGuard]) {
        guardTotalSleep[currentGuard] = timeSlept;
      } else {
        guardTotalSleep[currentGuard] += timeSlept;
      }
    }
  });
  return [guardSleepTimes, guardTotalSleep];
};
