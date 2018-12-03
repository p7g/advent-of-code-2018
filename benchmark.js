const { readdirSync } = require('fs');
const { join } = require('path');
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

const days = readdirSync(join(__dirname, 'days'));
days.forEach((day) => {
  const name = `day ${day}`;
  const dir = join(__dirname, 'days', day);
  const parts = readdirSync(dir).filter(file => file.endsWith('.js'));
  // eslint-disable-next-line
  doSuite(name, parts.map((file) => require(join(dir, file))));
});
