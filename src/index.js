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
        answers = answersFormat(answers)
        util.makeFiles(sourceDir, targetDir, answers, filter);
    });
  })

program
  .parse(process.argv);


// answer for mod
var answersFormat = function(answers) {
    answers.name = answers.name.toLowerCase();
    answers.Name = answers.name.replace(/[\W_]+(.)/g, function(p, p1) {
        return p1.toUpperCase();
    }).replace(/^./, function(p) {
        return p.toUpperCase();
    });
    return answers;
}

// filter out files
var source = 'src/pages/__name__/Page__Name__.styl';
var data = {
  store: true
}
var filter = function(source, data) {
    if (!data.store) {
        return !/(actions|store)\.js$/.test(source);
    }
};

console.log(filter(source, data))
