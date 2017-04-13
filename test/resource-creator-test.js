'use strict';

const test = require('tape');
const fs = require('fs');
const path = require('path');
const resourceCreator = require('../lib/resource-creator.js');

const root = path.join(__dirname, 'projectfoo');

test('create test.', (t) => {
  t.plan(1);
  resourceCreator.createTest(root);
  t.true(fs.existsSync(path.join(root, 'test')), 'test directory was created.');
  t.end();
});

test('create license.', (t) => {
  t.plan(1);
  resourceCreator.createLicense(root);
  t.true(fs.existsSync(path.join(root, 'LICENSE')), 'LICENSE was created.');
  t.end();
});

test('create gitignore.', (t) => {
  t.plan(1);
  resourceCreator.createGitignore(root);
  t.true(fs.existsSync(path.join(root, '.gitignore')), 'gitignore was created.');
  t.end();
});

test('create eslintrc.json.', (t) => {
  t.plan(1);
  resourceCreator.createEslint(root);
  t.true(fs.existsSync(path.join(root, '.eslintrc.json')), 'eslintrc.json was created.');
  t.end();
});

test('cleanup.', (t) => {
  t.plan(4);
  fs.unlinkSync(path.join(root, 'LICENSE'));
  fs.unlinkSync(path.join(root, '.gitignore'));
  fs.unlinkSync(path.join(root, '.eslintrc.json'));
  fs.rmdirSync(path.join(root, 'test'));
  t.false(fs.existsSync(path.join(root, 'LICENSE')), 'LICENSE not exists anymore.');
  t.false(fs.existsSync(path.join(root, '.gitignore')), '.gitignore not exists anymore.');
  t.false(fs.existsSync(path.join(root, '.eslintrc.json')), 'eslintrc.json not exists anymore.');
  t.false(fs.existsSync(path.join(root, 'test')), 'test not exists anymore.');
  t.end();
});
