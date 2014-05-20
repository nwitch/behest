var contains = require('lodash.contains');
var forEach = require('lodash.foreach');

var starts = ['!', '.', '/', ';;'];
var reCommand = new RegExp(/^(([!.\/])|(;{2}))\w+(\s[^\s]+)*$/);

/**
 * Parses the IRC command `message`.
 *
 * @param {String} message
 * @return {Object}
 * @api public
 */
function behest(message) {
  var command = {};

  if (!isValid(message)) {
    return command;
  }

  var start = message.substring(0, 2);

  forEach(starts, function(value) {
    if (contains(start, value)) {
      command.start = value;
      return false;
    }
  });

  var params = message.substring(start === ';;' ? 2 : 1).split(' ');

  command.command = params[0];

  if (params.length > 1) {
    command.params = params.slice(1);
  }

  return command;
}

/**
 * Check if `message` is a valid command.
 *
 * @param {String} message
 * @return {Boolean} is valid
 * @api public
 */
function isValid(message) {
  return reCommand.test(message);
}

behest.isValid = isValid;

module.exports = behest;