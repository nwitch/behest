var behest = require('../');
var test = require('tape');

test('behest', function(t) {
  var TEST_ARRAY = [
    ['!command', {start: '!', command: 'command'}],
    ['/command', {start: '/', command: 'command'}],
    ['.command', {start: '.', command: 'command'}],
    [';;command', {start: ';;', command: 'command'}],

    ['!command github is cool', {
      start: '!',
      command: 'command',
      params: ['github', 'is', 'cool']
    }],
    [';;command github is cool', {
      start: ';;',
      command: 'command',
      params: ['github', 'is', 'cool']
    }]
  ];

  t.plan(TEST_ARRAY.length);

  TEST_ARRAY.forEach(function(value) {
    t.deepEqual(behest(value[0]), value[1]);
  });
});

test('is valid', function(t) {
  var TEST_ARRAY = [
    ['!command', true],
    ['/command', true],
    ['.command', true],
    [';;command', true],

    ['!command param', true],
    ['/command param', true],
    ['.command param', true],
    [';;command param', true],

    ['!command param params', true],
    ['/command param params', true],
    ['.command param params', true],
    [';;command param params', true],

    ['run !command', false],
    ['run /command please', false],
    ['./command', false],
    ['.', false],
    ['!', false],
    [';;', false],
    [';', false],
    ['/', false],
    ['command', false],

    ['!command ', false],
    ['/command ', false],
    ['.command ', false],
    [';;command ', false],
  ];

  t.plan(TEST_ARRAY.length);

  TEST_ARRAY.forEach(function(value) {
    t.equal(behest.isValid(value[0]), value[1]);
  });
});