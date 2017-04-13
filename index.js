'use strict';

var fs = require('fs');
var execSync = require('child_process').execSync;

// var gitUser = execSync('git config user.name').toString().replace('\n','');
// var user = gitConfigUser() || gitUser || 'USER';

// createLicense()

// createEslint()

// createGitignore();

// createTest();

var baseData = {
  name: basename || package.name,
  version: '0.0.1',
  main: 'index.js',
  author: 'Red Hat, Inc.',
  license: 'Apache-2.0',
  scripts: {
    test: 'tape test/*.js | tap-spec',
    lint: 'eslint test/*.js index.js',
    prepublish: 'nsp check',
    coverage: 'istanbul cover tape test/*.js',
    dependencyCheck: 'szero . --ci',
    release: 'standard-version'
  },
  repository: {
    type: 'git',
    url: `git://github.com/${user}/${basename}.git`
  },
  files: [
    'package.json',
    'README.md',
    'LICENSE',
    'index.js'
  ],
  bugs: {url: `https://github.com/${user}/${basename}/issues`},
  homepage: `https://github.com/${user}/${basename}`,
  devDependencies: {
    eslint: '~3.8.1',
    'eslint-config-semistandard': '~7.0.0',
    'eslint-config-standard': '~6.2.0',
    'eslint-plugin-promise': '~3.3.0',
    'eslint-plugin-react': '~6.4.1',
    'eslint-plugin-standard': '~2.0.1',
    istanbul: '~0.4.5',
    nsp: '~2.6.2',
    'tap-spec': '~4.1.1',
    tape: '~4.6.2',
    'szero': '^0.7.1',
    'standard-version': '^3.0.0'
  }
};

var customizedData = {};
Object.assign(customizedData, baseData);

customizedData.gitHubUser = prompt('GitHub user name', user, n => user = n);
customizedData.name = prompt('name', basename || package.name);
customizedData.description = prompt(s => s);
customizedData.main = prompt('entry point', 'index.js',
  ep => !exists(ep) && fs.writeFileSync(ep, 'module.exports = exports = {};\n\n' ));
customizedData.keywords = prompt('Enter keywords separated by a space', s => s.split(/\s+/));

Object.defineProperties(customizedData, {
  repository: {
    get: () => {
      return {
        type: 'git',
        url: `git://github.com/${user}/${basename}.git`
      };
    }
  },
  bugs: {
    get: () => {
      return {url: `https://github.com/${user}/${basename}/issues`};
    }
  },
  homepage: {
    get: () => `https://github.com/${user}/${basename}`
  }
});

if (yes) {
  console.log('Assuming all defaults.');
  module.exports = baseData;
} else {
  module.exports = customizedData;
}

function exists (name) {
  try {
    fs.statSync(name);
    return true;
  } catch (e) {
    return false;
  }
}

var needInstall = true;
for (var i = 0; i < process.argv.length; i++) {
  if (process.argv[i] === '--no-install' || process.argv[i] === '-n') {
    needInstall = false;
    break;
  }
}

if (needInstall) {
  process.on('exit', () => {
    console.log('Installing dependencies...');
    let out = require('child_process').spawnSync('npm', ['install']);
    console.log(out.output.toString('utf8'));
  });
}
