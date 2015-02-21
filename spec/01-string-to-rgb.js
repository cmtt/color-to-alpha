describe('stringToRGB', function () {

  var stringToRGB = require(basePath('string-to-rgb'));

  it ('converts a string to a RGB array', function () {
    assert.deepEqual(stringToRGB('#14aaeb'), [ 20, 170, 235 ]);
    assert.deepEqual(stringToRGB('14aaeb'), [ 20, 170, 235 ]);
  });

});