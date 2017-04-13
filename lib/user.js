'use strict';

const path = require('path');
const fs = require('fs');
const execSync = require('child_process').execSync;

function gitConfigUser (root) {
  let user = '';
  if (fs.existsSync(path.join(root, '.git/config'))) {
    const content = fs.readFileSync('.git/config').toString().split('\n');
    let remoteFound = false;
    for (let i = 0; i < content.length; i++) {
      if (content[i] === '[remote "origin"]') {
        remoteFound = true;
        break;
      }
    }
    if (remoteFound) {
      for (let i = 0; i < content.length; i++) {
        if (content[i] === '[remote "origin"]') {
          user = content[++i].split(':')[1].split('/')[0];
          break;
        }
      }
    }
  }
  return user;
}

function user (root) {
  const gitUser = execSync('git config user.name').toString().replace('\n', '');
  return gitConfigUser(root) || gitUser || 'USER';
}

module.exports = {
  user
};
