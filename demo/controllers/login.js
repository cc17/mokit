define(function(require, exports, module) {
	"use strict";

	var app = require('mokit/app'),
		User = require('../models/user'),
		LoginView = require('../views/login'),
		lang = require('mokit/language'),
		navigation = require('mokit/navigation');

	/**
	 * 登陆页控制器
	 */
	return app.controller.create({

		/**
		 * 默认action
		 */
		index: function(context) {
			navigation.reset();
			var self = this;
			self.setView(new LoginView({
				model: User.current()
			}));
		},

		/**
		 * 登录action
		 */
		login: function(context) {
			var self = this;
			context.view.updateModel();
			if (User.current().login()) {
				app.start('/about');
			} else {
				self.rootView.alert(lang.current().login_failed);
			}
		}
	});

});