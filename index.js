var contains = require('lodash.contains');
var forEach = require('lodash.foreach');
var indexOf = require('lodash.indexof');

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

  var endOfCommand = indexOf(message, ' ');

  if (endOfCommand < 0) {
    endOfCommand = message.length;
  }

  command.command = message.substring(start === ';;' ? 2 : 1, endOfCommand);

  if (endOfCommand === message.length) {
    return command;
  }

  var params = message.substring(endOfCommand + 1, message.length).split(' ');
  command.params = params;

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