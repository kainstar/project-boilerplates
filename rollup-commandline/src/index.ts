import commander from 'commander';

function sleep(time: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

commander
  .version('{{VERSION}}')
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq-sauce', 'Add bbq sauce')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv);

commander.command('test').action(async function() {
  await sleep(1000);
  console.log('test');
});

console.log('you ordered a pizza with:');
if (commander.peppers) console.log('  - peppers');
if (commander.pineapple) console.log('  - pineapple');
if (commander.bbqSauce) console.log('  - bbq');
console.log('  - %s cheese', commander.cheese);
