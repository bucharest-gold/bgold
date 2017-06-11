'use strict';

const test = require('tape');
const fs = require('fs');
const path = require('path');
const resourceCreator = require('../lib/resource-creator.js');

const dir = path.join(__dirname, 'projectfoo');

test('create test.', (t) => {
  t.plan(1);
  resourceCreator.createTestDir(dir);
  t.true(fs.existsSync(path.join(dir, 'test')), 'test directory was created.');
  t.end();
});

test('create license.', (t) => {
  t.plan(1);
  resourceCreator.createLicense(dir);
  t.true(fs.existsSync(path.join(dir, 'LICENSE')), 'LICENSE was created.');
  t.end();
});

test('create gitignore.', (t) => {
  t.plan(1);
  resourceCreator.createGitignore(dir);
  t.true(fs.existsSync(path.join(dir, '.gitignore')), 'gitignore was created.');
  t.end();
});

test('create eslintrc.json.', (t) => {
  t.plan(1);
  resourceCreator.createEslint(dir);
  t.true(fs.existsSync(path.join(dir, '.eslintrc.json')), 'eslintrc.json was created.');
  t.end();
});

test('create package.json.', (t) => {
  t.plan(1);
  const content = `
{
  "name": "foo",
  "version": "0.0.1",
  "main": "index.js",
  "author": "Red Hat, Inc.",
  "license": "MIT",
  "scripts": {
    "test": "tape test/*.js | tap-spec",
    "lint": "eslint test/*.js index.js",
    "prepublish": "nsp check",
    "release": "standard-version"
  },
  "repository": {
    "type": "git",
    "url": "git://github.com/foo/foo.git"
  },
  "files": [
    "package.json",
    "README.md",
    "LICENSE",
    "index.js"
  ],
  "bugs": {"url": "https://github.com/foo/foo/issues"},
  "homepage": "https://github.com/foo/foo",
  "devDependencies": {
    "eslint": "~3.8.1",
    "eslint-config-semistandard": "~7.0.0",
    "eslint-config-standard": "~6.2.0",
    "eslint-plugin-promise": "~3.3.0",
    "eslint-plugin-react": "~6.4.1",
    "eslint-plugin-standard": "~2.0.1",
    "nsp": "~2.6.2",
    "tap-spec": "~4.1.1",
    "tape": "~4.6.2",
    "standard-version": "^3.0.0"
  }
}`;
  resourceCreator.createPackageJson(dir, content);
  t.true(fs.existsSync(path.join(dir, 'package.json')), 'package.json was created.');
  t.end();
});

test('cleanup.', (t) => {
  t.plan(5);
  fs.unlinkSync(path.join(dir, 'LICENSE'));
  fs.unlinkSync(path.join(dir, '.gitignore'));
  fs.unlinkSync(path.join(dir, '.eslintrc.json'));
  fs.unlinkSync(path.join(dir, 'package.json'));
  fs.rmdirSync(path.join(dir, 'test'));
  t.false(fs.existsSync(path.join(dir, 'LICENSE')), 'LICENSE deleted.');
  t.false(fs.existsSync(path.join(dir, '.gitignore')), '.gitignore deleted.');
  t.false(fs.existsSync(path.join(dir, '.eslintrc.json')), 'eslintrc.json deleted.');
  t.false(fs.existsSync(path.join(dir, 'package.json')), 'package.json deleted.');
  t.false(fs.existsSync(path.join(dir, 'test')), 'test deleted.');
  t.end();
});
