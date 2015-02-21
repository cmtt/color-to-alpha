color-to-alpha
==============

A function which turns a given color for the given pixel transparent while attempting to preserve anti-aliasing.

[Live demo](http://cmtt.github.io/color-to-alpha)

Adapted from GIMP's [color-to-alpha plugin](https://git.gnome.org/browse/gimp/tree/plug-ins/common/color-to-alpha.c?h=gimp-2-8) by Seth Burgess, licenced under GPLv3:

> (...) It will attempt to preserve anti-aliasing information by using a partially intelligent routine that replaces weak color information with weak alpha information. In this way, areas that contain an element of the selected color will maintain a blended appearance with their surrounding pixels.

Source: [http://docs.gimp.org/en/plug-in-colortoalpha.html](http://docs.gimp.org/en/plug-in-colortoalpha.html)

## Usage

This module exports solely the actual color_to_alpha function:

```js
  var col = cta([128, 128, 128, 1], [128, 128, 128]);
  // col equals [0,0,0,0]

```

Please refer to the spec/ folder as well as the example folder for more usage examples.

## Helper functions


### ``processImageData(srcImageData, dstImageData, color)``

This function removes the given color (a RGB array) from srcImageData and stores
the result in dstImageData.

```js
  var processImageData = require('color-to-alpha/process-image-data');
  var color = stringToRGB('14aaeb');

  var imageData = context.getImageData(0,0,img.width, img.height);
  var dstData = context.createImageData(imageData);

  processImage(imageData, dstData, color);

  context.putImageData(dstData, 0, 0);

```

### ``stringToRGB(string)``

Returns a RGB array for the given hexdecimal color code ('#00000-#ffffff').
```js
  var stringToRGB = require('color-to-alpha/string-to-rgb');
  var color = stringToRGB('14aaeb');
  // color === [ 20, 170, 235 ]
```

### ``rgbToString(string)``

Returns an hexdecimal color string for the given RGB(a) array.

```js
  var rgbToString = require('color-to-alpha/rgb-to-string');
  var color = rgbToString([ 20, 170, 235 ]);
  // color === '#14aaeb'
```

## Demonstration

In order to try this module out interactively, you will need to build the examples.
Make sure to install the module's depencencies, have the [Gulp](http://www.gulpjs.com) build system installed.

Then run the following commands to build the example and run the tiny test suite:

```bash
npm install
gulp
```

## Developing

If you want to adjust something, you can start the "watch" task in order to run the unit tests as well as build the example at every file change.

Credits
-------

* Seth Burgess wrote the original plugin for the GNU Image Manipulation Program
* clahey

License
-------

GPLv3