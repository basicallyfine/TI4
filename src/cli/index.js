const { Command } = require('commander');
const program = new Command();

require('./' + process.argv[2])(...process.argv.slice(3));