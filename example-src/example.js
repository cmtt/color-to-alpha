var processImageData = require('../process-image-data.js');
var rgbToString = require('../rgb-to-string');

var HIGHLIGHT_SIZE = 16;
var HIGHLIGHT_OPACITY = 0.8;
var MAX_CACHE_ENTRIES = 20;

var src = '4-cube-4-4.png';

var position = null;
var selectedColor = null;
var selectedColorEl = null;
var selectedColorCodeEl = null;
var noSelectionText = null;
var boundDraw = null;
var locked = false;
var cache = {};
var c = null;

document.addEventListener('DOMContentLoaded', function () {
  selectedColorEl = document.getElementById('selected-color');
  selectedColorCodeEl = document.getElementById('selected-color-code');
  noSelectionText = selectedColorCodeEl.innerHTML;

  var img = new Image();

  img.onload = function () {
    _init(img);
  };

  img.onerror = function (e) {
    throw e;
  }

  img.src = src;

});

/**
 * @function
 * @param {object} img
 */

function _init (img) {
  c = document.getElementById('view');

  _bindEvents(img);
  boundDraw = _getBoundDraw(img);
  boundDraw();
}

/**
 * @function
 * @param {object} img
 */

function _getBoundDraw (c, img) {
  return function () {
    requestAnimationFrame(function () {
      _draw(c, img);
    });        
  }
}

/**
 * @function
 * @param {object} img
 */

function _bindEvents(img) {
  var ctx = c.getContext('2d');

  function _getXY (e) {
    var rect = c.getBoundingClientRect();

    var x = ~~(e.clientX - rect.left - img.width);
    var y = ~~(e.clientY - rect.top);

    if (x < 0 || y < 0 || x > img.width || y > img.height) {      
      return null;
    };
    return [x,y]
  }

  document.body.addEventListener('mousemove', function (e) {
    if (locked) return;
    selectedColor = [];

    position = _getXY(e);
    if (!position) {
      return boundDraw();
    }

    var data = ctx.getImageData(img.width,0,img.width, img.height);
    var offset = (position[0] + position[1] * img.width) * 4;
    for (var i = 0; i < 3; ++i) selectedColor.push(data.data[offset+i]);
    boundDraw();
  });

  document.body.addEventListener('mouseup', function (e) {
    position = _getXY(e);
    if (!position) {
      return;
    }
    locked = !!!locked;
    boundDraw();
  });
}

/**
 * @function
 * @param {object} img
 */

function _draw(img) {

  var ctx = c.getContext('2d');

  c.width = img.width * 2;
  c.height = img.height;

  ctx.drawImage(img, img.width, 0);
  var data = ctx.getImageData(img.width,0,img.width, img.height);

  if (selectedColor && selectedColor.length === 3) {
    var colorCode = rgbToString(selectedColor);

    var transparentData = cache[colorCode];
    if (!transparentData) {
      transparentData = ctx.createImageData(data);    
      transparentData = processImageData(data, transparentData, selectedColor);           
      cache[colorCode] = transparentData;
    }

    ctx.putImageData(transparentData, 0, 0);

    ctx.globalAlpha = HIGHLIGHT_OPACITY;
    ctx.fillStyle = colorCode;
    var x = 0.5 + ~~(position[0] + img.width - (HIGHLIGHT_SIZE*0.5));
    var y = 0.5 + ~~(position[1] - (HIGHLIGHT_SIZE*0.5));
    ctx.fillRect(x, y, HIGHLIGHT_SIZE, HIGHLIGHT_SIZE);
    ctx.strokeStyle = locked ? '#ffffff' : '#000000';

    ctx.strokeRect(x, y, HIGHLIGHT_SIZE, HIGHLIGHT_SIZE);
    ctx.globalAlpha = 1;

    selectedColorCodeEl.innerHTML = colorCode;
    selectedColorEl.style.backgroundColor = colorCode;
  } else {
    selectedColorEl.style.backgroundColor = 'transparent';
    selectedColorCodeEl.innerHTML = noSelectionText;
    ctx.putImageData(data, 0, 0);
  }

  var rKeys = [];
  for (var key in cache) rKeys.push(key);
  rKeys.splice(-MAX_CACHE_ENTRIES);
  for (var i = 0, l = rKeys.length; i < l; ++i) delete cache[rKeys[i]];
}
