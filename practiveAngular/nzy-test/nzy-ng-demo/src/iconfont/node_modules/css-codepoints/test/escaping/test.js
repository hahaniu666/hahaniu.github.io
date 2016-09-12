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
  fontFamily: '<> Sans',
  prefix: '1 < 2 -',
  formats: {
    '<format>': 'path/to/font'
  },
  icons: {
    '>': 0x3e
  }
};


module.exports = function () {
  util.puts(module.filename);
  assert(equal(cssCodepoints(config), predefinedOutput));
};
