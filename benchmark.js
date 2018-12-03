#!/usr/bin/env node

const yargs = require('yargs');
const { readdirSync } = require('fs');
const { join } = require('path');
const Benchmark = require('mini-bench');

function doSuite(name, functions) {
  return new Promise((resolve) => {
    const result = {};
    const s = new Benchmark.Suite({
      start: () => process.stdout.write(`${name}\n`),
      result: (n, stats) => process.stdout.write(
        `${n}: got ${result[n]} in ${
          (stats.elapsed / stats.iterations).toFixed(2)
        }ms\n`,
      ),
      done: () => {
        process.stdout.write('\n');
        resolve();
      },
    });
    functions.forEach(fn => s.bench(fn.name, (next) => {
      result[fn.name] = fn();
      next();
    }));
    s.run({ async: false });
  });
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
    ((d && [d.toString()]) || days).reduce(async (promise, day) => {
      const name = `day ${day}`;
      const dir = join(__dirname, 'days', day);
      const parts = readdirSync(dir).filter(file => file.endsWith('.js'));
      await promise;
      // eslint-disable-next-line
      return doSuite(name, parts.map(file => require(join(dir, file))));
    }, Promise.resolve());
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
