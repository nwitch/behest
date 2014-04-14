# behest

[![Build Status](https://travis-ci.org/nwitch/behest.svg?branch=master)](https://travis-ci.org/nwitch/behest)
[![Dependency Status](https://gemnasium.com/nwitch/behest.svg)](https://gemnasium.com/nwitch/behest)

Parser for commands to IRC bots.

Let's first examine the different syntaxes used by various IRC bots:

```
Classic:                   /help
TwitchTV bots:             !topic
TwitchTV IRC mod commands: .timeout 2 KenanY
#bitcoin-otc:              ;;book MTGUSD
```

Okay, so IRC bot commands typically:

  1. Start with a `!`, `.`, `/`, or two `;`s
  2. Are immediately followed by the command, which is alphanumeric
  3. (optional) Followed by parameter(s), separated by spaces

If a regex was written for this pattern, it would hopefully look like this:

```
/^(([!.\/])|(;{2}))\w+(\s[^\s]+)*$/
```

And if you were to make a railroad diagram of this regex, you would have this:

![trainwreck](https://rawgithub.com/nwitch/behest/master/command.svg)

## Example

``` javascript
var behest = require('behest');

var message = '/give KenanY 5 bitcoins';

behest.isValid(message);
// => true

behest(message);
// => {
// =>   start: '/',
// =>   command: 'give',
// =>   params: ['KenanY', '5', 'bitcoins']
// => }
```

## Installation

``` bash
$ npm install behest
```

## API

### behest(message)

Parses the _String_ `message`. If `message` is not a valid IRC command (the
syntax of which has already been described), an empty _Object_ is returned.
Otherwise, an _Object_ (let's call it `command`) is returned:

  - `command.start` is what began the command (`!`, `/`, `.`, or `;;`)
  - `command.command` is the command (`topic`, `help`, `timeout`, etc.)
  - `command.params` is an _Array_ of what followed the command

### behest.isValid(message)

Returns `true` if `message` passes the command regex. Returns `false` otherwise.