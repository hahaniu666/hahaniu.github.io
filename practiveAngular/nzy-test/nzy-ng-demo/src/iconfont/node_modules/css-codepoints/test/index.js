'use strict';

var testGeneral = require('./general/test')
  , testEscaping = require('./escaping/test');

var util = require('util');

testGeneral();
testEscaping();
util.log('Tests passed.');
