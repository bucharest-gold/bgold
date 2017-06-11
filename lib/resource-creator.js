'use strict';

const fs = require('fs');
const path = require('path');

const missing = (dir, file) => !fs.existsSync(path.join(dir, file));

const createTestDir = (dir) => {
  if (missing(dir, 'test')) {
    fs.mkdirSync(path.join(dir, 'test'));
  }
};

const createLicense = (dir) => {
  const content =
`Copyright 2016 Red Hat, Inc.

Licensed under the Apache License, Version 2.0 (the "License")
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.`;

  if (missing(dir, 'LICENSE')) {
    fs.writeFileSync(path.join(dir, 'LICENSE'), content);
  }
};

const createEslint = (dir) => {
  const content =
`{
  "extends": "semistandard",
  "rules": {
    "prefer-const": "error",
    "block-scoped-var": "error",
    "no-use-before-define": ["error", "nofunc"]
  }
}`;

  if (missing(dir, '.eslintrc.json')) {
    fs.writeFileSync(path.join(dir, '.eslintrc.json'), content);
  }
};

const createGitignore = (dir) => {
  const content =
`npm-debug.log
node_modules`;

  if (missing(dir, '.gitignore')) {
    fs.writeFileSync(path.join(dir, '.gitignore'), content);
  }
};

const createPackageJson = (dir, content) => {
  if (missing(dir, 'package.json')) {
    fs.writeFileSync(path.join(dir, 'package.json'), content);
  }
};

module.exports = {
  createLicense,
  createEslint,
  createGitignore,
  createTestDir,
  createPackageJson
};
