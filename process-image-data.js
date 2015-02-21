var color_to_alpha = require('./index.js');

/**
 * @function
 * @param {object} srcData
 * @param {object} dstData
 * @param {object} color
 * @returns {object} srcData
 */

function _processImageData (srcData, dstData, color) {
  var pixels = srcData.data;
  var l = pixels.length;

  for (var i = 0; i < l; i+=4) {
    var r = pixels[i];
    var g = pixels[i+1];
    var b = pixels[i+2];
    var a = pixels[i+3];
    var retval = color_to_alpha([r, g, b, a], color);
    dstData.data[i] = retval[0];
    dstData.data[i+1] = retval[1];
    dstData.data[i+2] = retval[2];
    dstData.data[i+3] = retval[3];
  }

  return dstData;
}

module.exports = _processImageData;
