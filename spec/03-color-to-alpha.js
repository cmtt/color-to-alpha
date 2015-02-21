describe('color to alpha', function () {
  var fs = require('fs');
  var Canvas = require('canvas');
  var Image = Canvas.Image;
  var cta = require(basePath('index.js'));

  var processImage = require(basePath('process-image-data.js'));
  var stringToRGB = require(basePath('string-to-rgb.js'));

  it ('is a function', function () {
    assert.ok(typeof cta === 'function');
  });

  it ('returns an RGBA array', function () {
    var col = cta([128, 128, 128, 1], [128, 128, 128]);
    assert.deepEqual(col, [0,0,0,0]);
  });

  it ('removes a specific color from an image', function (done) {

    var img = null;
    var canvas = null;
    var context = null;

    waterfall([
      function (next) {
        fs.readFile(basePath('spec', 'fixtures', '4-cube-4-4.png'), next);
      },
      function (buffer, next) {
        img = new Image();
        img.onload = function () { next(null); };
        img.onerror = function (e) { next(e); };
        img.src = buffer;
      },
      function (next) {
        canvas = new Canvas(img.width, img.height);
        context = canvas.getContext('2d');
        context.drawImage(img, 0, 0, img.width, img.height);
        var imageData = context.getImageData(0,0,img.width, img.height);
        var dstData = context.createImageData(imageData);

        var color = stringToRGB('14aaeb');
        processImage(imageData, dstData, color);
        context.putImageData(dstData, 0, 0);

        // If you want to preview the result, comment the next line out and
        // uncomment the following one.

        next(null);               
        // fs.writeFile(basePath('spec-example.png'), canvas.toBuffer('png'), next);
      }
    ], function (err) {
      if (err) throw err;
      done();
    });
    

  });

});