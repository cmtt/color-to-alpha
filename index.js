/**
 * Removes color from src, attempting to preserve anti-aliasing.
 *
 * Adapted from GIMP's color-to-alpha plugin by Seth Burgess, algorithm by clahey
 *
 * https://git.gnome.org/browse/gimp/tree/plug-ins/common/color-to-alpha.c?h=gimp-2-8
 *
 * @param {number[]} src
 * @param {number[]} color
 * @return {number[]} 
 */

function color_to_alpha (src, color) {
  var alphaR, alphaG, alphaB, alphaA;

  var srcR = src[0] / 255.0; // enforce floats
  var srcG = src[1] / 255.0;
  var srcB = src[2] / 255.0;
  var srcA = src[3] / 255.0;
  var colorR = color[0] / 255.0;
  var colorG = color[1] / 255.0;
  var colorB = color[2] / 255.0;

  alphaA = srcA;

  if (colorR < 0.0001) {
    alphaR = srcR;
  } else if (srcR > colorR) {
    alphaR = (srcR - colorR) / (1.0 - colorR);
  } else if (srcR < colorR) {
    alphaR = (colorR - srcR) / colorR;
  } else {
    alphaR = 0.0;
  }

  if (colorG < 0.0001) {
    alphaG = srcG;
  } else if (srcG > colorG) {
    alphaG = (srcG - colorG) / (1.0 - colorG);
  } else if (srcG < colorG) {
    alphaG = (colorG - srcG) / colorG;
  } else {
    alphaG = 0.0;
  }

  if (colorB < 0.0001) {
    alphaB = srcB;
  } else if (srcB > colorB) {
    alphaB = (srcB - colorB) / (1.0 - colorB);
  } else if (srcB < colorB) {
    alphaB = (colorB - srcB) / colorB;
  } else {
    alphaB = 0.0;
  }

  if (alphaR > alphaG) {
    if (alphaR > alphaB) {
      srcA = alphaR;
    } else {
      srcA = alphaB;
    }
  } else if (alphaG > alphaB) {
    srcA = alphaG;
  } else {
    srcA = alphaB;
  }

  srcR = (srcR - colorR)/srcA + colorR;
  srcG = (srcG - colorG)/srcA + colorG;
  srcB = (srcB - colorB)/srcA + colorB;
  srcA = srcA * alphaA;

  return [~~(255*srcR), ~~(255*srcG), ~~(255*srcB), ~~(255*srcA)];
};

module.exports = color_to_alpha;
