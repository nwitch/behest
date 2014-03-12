# behest

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