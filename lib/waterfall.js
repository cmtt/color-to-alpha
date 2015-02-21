var __slice = [].slice;

/**
 * @function
 * @param {Function[]} fns
 * @param {Function} callback
 */

function _waterfall (fns, callback) {
  var fnArgs = __slice.apply(arguments);
  if (fnArgs.length === 1) callback = fns.pop();
  if (typeof callback !== 'function') throw new Error('Function expected');

  function _next (err) {
    var args = __slice.apply(arguments);
    err = args.shift() || null;
    process.nextTick(function () {
      if (err) return callback(err);
      var fn = fns.shift();
      if (typeof fn !== 'function') {
        fn = callback;
        args.unshift(null);
      } else {
        args.push(_next);
      }
      fn.apply(null, args);
    });
  }
  _next(null);
}

module.exports = _waterfall;