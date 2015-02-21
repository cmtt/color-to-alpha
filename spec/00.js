var path = require('path');

global.basePath = _basePath;
global.assert = require('assert');
global.waterfall = require(basePath('lib', 'waterfall'));

/**
 * @function
 * @returns {string}
 */

function _basePath () {
  var args = [].slice.apply(arguments);
  args.unshift(__dirname, '..');
  return path.join.apply(path, args);
}