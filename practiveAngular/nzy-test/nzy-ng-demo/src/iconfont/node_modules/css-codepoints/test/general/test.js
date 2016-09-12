'use strict';

var cssCodepoints = require('../..')
  , equal = require('../equality');

var assert = require('assert')
  , fs = require('fs')
  , util = require('util');


var predefinedOutput = fs.readFileSync(__dirname + '/output.css', {
  encoding: 'utf8'
});

var config = {
  fontFamily: 'MySuperFont',
  prefix: 'icon-',
  formats: {
    svg: 'my_super_font.svg',
    ttf: 'my_super_font.ttf'
  },
  icons: {
    foo: 0x1337,
    bar: '266e'
  }
};


module.exports = function () {
  util.puts(module.filename);
  assert(equal(cssCodepoints(config), predefinedOutput));
};