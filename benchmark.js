const Benchmark = require('benchmark');

function doSuite(name, functions) {
  process.stdout.write(`${name}\n`);
  const s = new Benchmark.Suite(name);
  functions.forEach(fn => s.add(fn.name, fn));
  s.on('cycle', e => process.stdout.write(
    `${e.target} (${(e.target.times.period * 1000).toFixed(2)}ms)\n`,
  )).run({ async: false });
  process.stdout.write('\n');
}

doSuite('Day 1', [
  require('./day1/totalFrequency'),
  require('./day1/repeatedFrequency'),
]);
doSuite('Day 2', [
  require('./day2/checksum'),
  require('./day2/commonLetters'),
]);
