/*csd*/(function(){var a=typeof require!="undefined"&&require;define(function(require,exports,module){"use strict";var b=require("ajax");exports.load=function(d,f,e,c){var g=f.toUrl(d);if(a&&a.nodeRequire){e(a.nodeRequire("fs").readFileSync(g,"utf8"));}else{b.get({url:g,callback:e,dataType:"text"});}};});})();