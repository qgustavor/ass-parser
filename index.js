'use strict';

var parseDescriptor = require('./src/descriptor');


/**
 * Parse section lines.
 *
 * "Format" descriptor (if there is one) specifies format for subsequent
 * lines in the same section.
 *
 * @arg {string[]} lines
 * @arg {Object} [options]
 * @return {Object}
 */
var parseSection = function (lines, options) {
  options = options || {};

  // Format descriptor for subsequent section lines.
  var format = null;

  return lines.flatMap(function (line) {
    var descriptor = parseDescriptor(line, format);
    if (!descriptor) {
      // Empty line.
      return null;
    }

    if (descriptor.type == 'comment' && !options.comments) {
      return null;
    }

    if (!format && descriptor.key == 'Format') {
      format = descriptor.value;
    }

    return [descriptor];
  }).filter(function (descriptor) {
    return descriptor;
  });
};


var parseAss = function (text, options) {
  text = text.toString();
  var sections = Array.from(text.matchAll(/^\s*\[(.*)\]\s*$/mg));

  return sections.map(function (section, index) {
    var nextSection = sections[index + 1];
    var sectionName = section[1];

    var begin = section.index + section[0].length + 1;
    var end = nextSection ? nextSection.index : text.length;
    var lines = text.slice(begin, end).split('\n');

    return {
      section: sectionName,
      body: parseSection(lines, options)
    };
  });
};


module.exports = parseAss;
module.exports.default = parseAss;
