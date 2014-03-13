/**
 * 风格主题管理模块
 * @module mokit
 * @class Style
 */
define(function(require, exports, module) {
	"require:nomunge,exports:nomunge,module:nomunge";
	"use strict";

	var $ = require('./jquery'),
		utils = require('./utils'),
		store = require('./store'),
		eventMgr = require('./event');

	var styleTable = store.dataCache["$style"] = {};

	exports.styleChange = eventMgr.create(exports, 'styleChange');

	exports.storeKey="current-name";

	utils.defineProperty(exports, 'currentName', {
		get: function() {
			return store.local.get('style:'+ exports.storeKey);
		},
		set: function(name) {
			return store.local.set('style:'+ exports.storeKey, name);
		}
	}, true);

	/**
	 * 添加风格
	 * @method addStyle
	 * @param {Object} styles 风格配置表
	 * @param {Module} srcModule 当前模块
	 * @static
	 */
	exports.addStyle = function(styles, srcModule) {
		utils.each(styles, function(name) {
			styleTable[name] = (srcModule && srcModule.resovleUri) ? srcModule.resovleUri(this) : this;
		});
	};

	/**
	 * 设置风格
	 * @method setStyle
	 * @param {String} name 设置当前风格
	 * @static
	 */
	exports.setStyle = function(name, callback) {
		if (!utils.isString(name)) return callback();
		if (styleTable[name]) {
			module.unrequire(styleTable[exports.currentName()]);
			require(styleTable[name], function(rs) {
				exports.currentName(name);
				exports.styleChange.trigger(name, rs);
				if (callback) callback(name, rs);
			});
		} else {
			console.error('style "' + name + '" not found.');
		}
	};
});