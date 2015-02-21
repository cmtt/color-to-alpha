describe('rgbToString', function () {

  var rgbToString = require(basePath('rgb-to-string'));

  it ('converts a RGB array to a string', function () {
    assert.deepEqual(rgbToString([ 20, 170, 235 ]), '#14aaeb');
  });

});