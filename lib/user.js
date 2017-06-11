'use strict';

const path = require('path');
const fs = require('fs');
const execSync = require('child_process').execSync;

const hasGitConfig = (dir) => fs.existsSync(path.join(dir, '.git/config'));

const hasRemoteOrigin = (dir) => {
  let found = false;
  if (hasGitConfig(dir)) {
    const content = fs.readFileSync('.git/config').toString().split('\n');
    for (let i = 0; i < content.length; i++) {
      if (content[i] === '[remote "origin"]') {
        found = true;
        break;
      }
    }
  }
  return found;
};

const gitUser = (dir) => {
  let user = '';
  if (hasRemoteOrigin(dir)) {
    const content = fs.readFileSync('.git/config').toString().split('\n');
    for (let i = 0; i < content.length; i++) {
      if (content[i] === '[remote "origin"]') {
        user = content[++i].split(':')[1].split('/')[0];
        break;
      }
    }
  }
  return user;
};

const user = (dir) => {
  const userName = execSync('git config user.name').toString().replace('\n', '');
  return gitUser(dir) || userName || 'USER';
};

module.exports = { user };
