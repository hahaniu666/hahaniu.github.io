'use strict';

var mustache = require('mustache')
  , cssesc = require('cssesc')
  , extend = require('extend')
  , pairs = require('lodash.pairs')
  , zipmap = require('zipmap');

var fs = require('fs');


var source = fs.readFileSync(__dirname + '/template.css', {
  encoding: 'utf8'
});


var escapeString = function (string) {
  return cssesc(string, {quotes: 'double'});
};

var escapeIdentifier = function (identifier) {
  return cssesc(identifier, {isIdentifier: true});
};


/**
 * Spit out CSS based on the specified config.
 *
 * @arg {Object} config
 * @return {string}
 */
module.exports = function (config) {
  // Make a working copy to avoid committing accidental changes.
  config = extend({}, config || {});

  config.fontFamily = escapeString(config.fontFamily);
  config.prefix = escapeIdentifier(config.prefix);

  // Stringify code points: no-op for strings, base conversion for numbers.
  // Rewrite in array-of-objects notation.
  // Escape as identifiers.
  if (config.icons) {
    config.icons = pairs(config.icons).map(function (icon) {
      return {
        name: escapeIdentifier(icon[0]),
        codepoint: icon[1].toString(0x10)
      };
    });
  }

  // Rewrite in array-of-objects notation.
  // Escape as strings.
  if (config.formats) {
    config.formats = pairs(config.formats).map(function (format) {
      return zipmap(['type', 'url'], format.map(escapeString));
    });
  }

  return mustache.render(source, extend({
    // Remove extra comma.
    _commaSeparated: function () {
      return function (text, render) {
        return render(text).trim().slice(0, -1);
      };
    }
  }, config));
};
