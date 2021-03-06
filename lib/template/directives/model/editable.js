const Directive = require('../../directive');
const EventEmitter = require('../../../events');
const Scope = require('../../scope');

module.exports = new Directive({

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.backExpr = new this.Expression(`${this.attribute.value}=_value_`);
    this.emiter = new EventEmitter(this.node);
    this.emiter.addListener('input', function () {
      if (this.utils.isNull(this.scope)) return;
      this.backExpr.execute(new Scope(this.scope, {
        _value_: this.node.innerHTML
      }));
    }.bind(this), false);
  },

  unbind: function () {
    this.emiter.removeListener();
  },

  execute: function (scope) {
    let value = this.expression.execute(scope);
    if (this.node.innerHTML !== value) {
      this.node.innerHTML = value;
    }
  }

});