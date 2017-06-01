'use strict';
const program = require('commander');
const path = require('path');
const inquirer = require('inquirer');

const pkg = require('../package.json');
const util = require('./util')

program
  .allowUnknownOption()
  .version(pkg.version)

program
  .command('init <type>')
  .description(pkg.description)
  .action(function(type, command) {
    console.log('\nWelcome to nowa ' + type + ' generator!\n');
    inquirer.prompt(util.prompt(type)).then(function (answers) {
        var sourceDir = path.join(__dirname, 'templates', type);
        var targetDir = process.cwd();
        answers = util.answersFormat(answers)
        util.makeFiles(sourceDir, targetDir, answers, util.filter(type));
    });
  })

program
  .parse(process.argv);


