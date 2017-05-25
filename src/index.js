var program = require('commander');
program
  .allowUnknownOption()
  .option('-d, --date', 'display current time')
  .option('-l, --language <lang>', 'which language are u good at')
  .option('-b, --database [db]', 'which database are u good at', 'MySQL')
  .parse(process.argv);

if (program.language) {
    console.log('language: U are good at `' + program.language + '`')
}
if (program.database) {
    console.log('db: U are good at `' + program.database + '`')
}