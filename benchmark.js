#!/usr/bin/env node

const yargs = require('yargs');
const { readdirSync } = require('fs');
const { join } = require('path');
const Benchmark = require('benchmark');

function doSuite(name, functions) {
  process.stdout.write(`${name}\n`);
  const s = new Benchmark.Suite(name);
  functions.forEach(fn => s.add(fn.name, fn));
  s.on('cycle', e => process.stdout.write(
    `${e.target} = ${JSON.stringify(e.target.fn())} (${
      (e.target.times.period * 1000).toFixed(2)
    }ms)\n`,
  )).run({ async: false });
  process.stdout.write('\n');
}

const days = readdirSync(join(__dirname, 'days'));

const args = yargs
  .usage('$0 <cmd> [args]')
  .command('run [day]', 'Benchmark the files for the given day', (yrgs) => {
    yrgs.positional('day', {
      type: 'number',
      choices: [null, ...days.map(d => Number.parseInt(d, 10))],
      default: null,
      describe: 'the day to benchmark, or all if none provided',
    });
  }, ({ day: d }) => {
    ([d.toString()] || days).forEach((day) => {
      const name = `day ${day}`;
      const dir = join(__dirname, 'days', day);
      const parts = readdirSync(dir).filter(file => file.endsWith('.js'));
      // eslint-disable-next-line
      doSuite(name, parts.map(file => require(join(dir, file))));
    });
  })
  .demandCommand()
  .recommendCommands()
  .showHelpOnFail(true)
  .strict()
  .help()
  .argv;

if (!args._[0]) {
  yargs.showHelp();
}
