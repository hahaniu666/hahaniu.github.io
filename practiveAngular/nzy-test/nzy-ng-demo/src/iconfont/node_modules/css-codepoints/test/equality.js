'use strict';


/**
 * Compare strings with insignificant whitespace.
 */
module.exports = function (a, b) {
  return a.replace(/\s/g, '') == b.replace(/\s/g, '');
};
