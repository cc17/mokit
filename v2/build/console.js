/*csd*/define(function(require,exports,module){"use strict";var b=require("./utils");var a=exports;a.prefix="[mokit] ";a.enabled=true;a.log=function(c){if(a.enabled){console.log(a.prefix+c);}};a.error=function(c){if(a.enabled){console.error(a.prefix+c);}};a.info=function(c){if(a.enabled){console.info(a.prefix+c);}};a.warn=function(c){if(a.enabled){console.warn(a.prefix+c);}};});