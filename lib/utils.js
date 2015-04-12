'use strict';

var htmlparser = require('htmlparser2'),
    crypto = require('crypto');

module.exports.filterElementsByTagNames = function(dom, tagsArray) {
  var checkTags = function(elem) {
    if (htmlparser.DomUtils.isTag(elem)) {
      return tagsArray.indexOf(elem.name) !== -1;
    }
  };
  return htmlparser.DomUtils.filter(checkTags, dom);
};

module.exports.filterElementsByAttributes = function(dom, attributesArray) {
  var checkAttrs = function(elem) {
    if (elem.attribs) {
      for (var i = 0; i < attributesArray.length; i++) {
        if (elem.attribs.hasOwnProperty(attributesArray[i])) {
          return true;
        }
      }
    }
    return false;
  };
  return htmlparser.DomUtils.filter(checkAttrs, dom);
};

module.exports.extractStringsFromAttributes = function(dom, attributesArray) {
  var strings = [];
  var elements = exports.filterElementsByAttributes(dom, attributesArray);
  for (var i = 0; i < elements.length; i++) {
    for (var j = 0; j < attributesArray.length; j++) {
      if (elements[i].attribs.hasOwnProperty(attributesArray[j])) {
        strings.push(elements[i].attribs[attributesArray[j]]);
      }
    }
  }
  return strings;
};

module.exports.hash = function(str, algorithm, length) {
  return crypto.createHash(algorithm).update(str).digest('hex').slice(0, length);
};