#! /usr/bin/env node

const program = require('commander');
const bgold = require('../lib/bgold.js');

program
  .version(require('../package.json').version)
  .option('-i, --install', 'Install')
  .parse(process.argv);

if (program.install) {
  console.log('install');
}

const user = bgold.user(__dirname.split('/').slice(-1)[0]);
console.log(__dirname.split('/').slice(-1)[0]);
console.log(user);

// get the user()

// createLicense()

// createEslint()

// createGitignore();

// createTest();