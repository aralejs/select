define(function(require, exports, module) {

  var $ = require('$');
  var Select = require('./select');

  var COPY_ATTRS = ['classPrefix', 'template'];

  var AdvancedSelect = Select.extend({

    attrs: {
      child: null,
      parant: null
    },

    setup: function() {
      this._crateSubSelect(this.model.select);
      AdvancedSelect.superclass.setup.call(this);
    },

    _clickEvent: function(e) {
      AdvancedSelect.superclass._clickEvent.call(this, e);

      var parent = this.get('parent');
      if (parent) {
        parent.select(this._relatedOption);
      }
      return this;
    },

    _mouseEnterEvent: function(e) {
      AdvancedSelect.superclass._mouseEnterEvent.call(this, e);
      var child = this.get('child');
      var parent = this.get('parent');
      var index = this.options.index(e.currentTarget);
      var model = this.model.select[index].options;
      if (child && model) {
        //child._relatedOption = this.options[index];
        // 根据当前 hover 的 option 定位
        var align = child.get('align');
        align.baseElement = e.currentTarget;
        child.set('align', align);
        // 重新渲染子菜单的元素
        child.syncModel(model).show();
      }

      clearTimeout(this._childHide);

      if (parent) {
        clearTimeout(parent._childHide);
      }
    },

    _mouseLeaveEvent: function(e) {
      AdvancedSelect.superclass._mouseLeaveEvent.call(this, e);
      var that = this;
      this._childHide = setTimeout(function() {
        that.hide();
        var child = that.get('child');
        child && child.hide();
      }, 70);
    },

    _crateSubSelect: function(model) {
      var select;
      for (var i = 0, l = model.length; i < l; i++) {
        var item = model[i];
        if (item.options) {
          // 只要有一个存在 options，则创建一个 AdvancedSelect 子节点
          if (!select) {
            var option = {
              model: item.options,
              align: {
                baseXY: ['100%', 0],
                selfXY: [0, 0]
              },
              parent: this
            };
            for (var j in COPY_ATTRS) {
              var attr = COPY_ATTRS[j];
              option[attr] = this.get(attr);
            }
            select = new AdvancedSelect(option);
            this.set('child', select);
            break;
          }
        }
      }
    }

  });

  module.exports = AdvancedSelect;

});
