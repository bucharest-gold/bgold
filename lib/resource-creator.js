'use strict';

const fs = require('fs');
const path = require('path');

function exists (root, file) {
  return fs.existsSync(path.join(root, file));
}

function createTest (root) {
  if (!exists(root, 'test')) {
    fs.mkdirSync('test');
  }
}

function createLicense (root) {
  const LICENSE = `
Copyright 2016 Red Hat, Inc.

Licensed under the Apache License, Version 2.0 (the "License")
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
`;

  if (!exists(root, 'LICENSE')) {
    fs.writeFileSync('LICENSE', LICENSE);
  }
}

function createEslint (root) {
  const ESLINT = `
{
  "extends": "semistandard",
  "rules": {
    "prefer-const": "error",
    "block-scoped-var": "error",
    "no-use-before-define": ["error", "nofunc"]
  }
}
  `;
  if (!exists(root, '.eslintrc.json')) {
    fs.writeFileSync('.eslintrc.json', ESLINT);
  }
}

function createGitignore (root) {
  const GITIGNORE = `
npm-debug.log
node_modules
`;
  if (!exists(root, '.gitignore')) {
    fs.writeFileSync('.gitignore', GITIGNORE);
  }
}

module.exports = {
  createLicense,
  createEslint,
  createGitignore,
  createTest
};
