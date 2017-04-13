'use strict';

const test = require('tape');
const user = require('../lib/user.js');

test('user.', (t) => {
  t.plan(1);
  t.true(user.user('../').length > 0, 'git user or \'USER\'.');
  t.end();
});
