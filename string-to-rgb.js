/**
 * @function
 * @param {string} str
 * @returns {number[]}
 */

function stringToRGB (str) {
  var RGX = /[\d\w]{2}/g;
  var hex = str.match(RGX);
  for (var i = 0; i < 3; ++i) hex[i] = parseInt(hex[i], 16);
  return hex;
}

module.exports = stringToRGB;