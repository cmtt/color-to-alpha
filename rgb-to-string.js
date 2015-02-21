/**
 * @function
 * @param {number[]} color
 * @returns {number[]}
 */

function rgbToString (color) {  
  var hex = [];
  for (var i = 0, s = ''; i < 3; ++i) {
    s = color[i].toString(16);
    hex[i] = s.length === 1 ? '0' + s : s;
  }

  return '#'+hex.join('');
}

module.exports = rgbToString;