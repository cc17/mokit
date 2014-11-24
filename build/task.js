/*csd*/define(function(require,exports,module){"use strict";var a=require("class");var c=require("utils");var b=a.create({"await":0,"list":[],"calls":[],"state":0,"result":{},"initialize":function(d){var e=this;e.list=[];e.await=e.list.length;e.calls=[];e.state=0;e.result={};e.addMult(d);},"addMult":function(d){var e=this;c.each(d,function(g,f){e.addOne(g,f);});return e;},"addOne":function(e,d){var f=this;if(!e&&!d){return this;}if(e&&!d){d=e;e=f.list.length;}f.list.push({"name":e,"func":d});f.await=f.list.length;f.result.length=f.list.length;return f;},"add":function(d,e){var f=this;if(c.isString(d)||c.isFunction(d)){return f.addOne(d,e);}else{return f.addMult(d);}},"execute_done":function(d){var e=this;if(e.await<1){e.state=2;c.each(e.calls,function(g,f){if(c.isFunction(f)){f(e.result);}});}else{if(d){e.execute_start(d);}}},"execute_start":function(d){var e=this;e.state==1;if(e.list&&e.list.length<1){return;}var f=e.list.shift();if(c.isNull(f)||c.isNull(f.name)||c.isNull(f.func)){e.await--;e.execute_done(d);}else{f.func(function(g){e.await--;e.result[f.name]=g;e.execute_done(d);});}if(!d){e.execute_start(d);}return e;},"end":function(d,e){var f=this;if(f.list&&f.list.length<1){if(d){d(f.result);}return;}if(f.state==2){d(f.result);}else{if(f.state==1){f.calls.push(d);}else{if(f.state==0){f.calls.push(d);f.execute_start(e);}}}return f;},"seq":function(d){return this.end(d,true);}});exports.create=function(d){return new b(d);};});