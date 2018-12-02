const Benchmark = require('benchmark');
const newLine = () => process.stdout.write('\n');

const totalFrequency = require('./day1/totalFrequency');
const repeatedFrequency = require('./day1/repeatedFrequency');

const checksum = require('./day2/checksum');
const commonLetters = require('./day2/commonLetters');

process.stdout.write('day 1\n');
new Benchmark.Suite('day 1')
  .add('total frequency', totalFrequency)
  .add('repeated frequency', repeatedFrequency)
  .on('cycle', e => process.stdout.write(
    `${e.target} (${(e.target.times.period * 1000).toFixed(2)}ms)\n`,
  ))
  .run({ async: false });
newLine();

process.stdout.write('day 2\n');
new Benchmark.Suite('day 2')
  .add('checksum', checksum)
  .add('common letters', commonLetters)
  .on('cycle', e => process.stdout.write(
    `${e.target} (${(e.target.times.period * 1000).toFixed(2)}ms)\n`,
  ))
  .run({ async: false });
newLine();
