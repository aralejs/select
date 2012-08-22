define(function(require, exports, module) {

    var Overlay = require('overlay');
    var $ = require('$');
    var Templatable = require('templatable');

    var template = require('./select.tpl');

    var Select = Overlay.extend({

        Implements: Templatable,

        attrs: {
            trigger: {
                value: null, // required
                getter: function(val) {
                    return $(val).eq(0);
                }
            },
            prefix: 'ui-select',
            template: template,
            // 定位配置
            align: {
                baseXY: [0, '100%']
            },
            // select 的参数
            value: '',
            length: 0,
            selectedIndex: -1,
            multiple: false, // TODO
            disabled: false,
            // 以下不要覆盖
            selectSource: null
        },

        events: {
            'click [data-role=item]': function(e) {
                var target = $(e.currentTarget);
                this.select(target);
            },
            'mouseenter [data-role=item]': function(e) {
                $(e.currentTarget).addClass(this.get('prefix') + '-hover');
            },
            'mouseleave [data-role=item]': function(e) {
                $(e.currentTarget).removeClass(this.get('prefix') + '-hover');
            }
        },

        // 覆盖父类
        // --------

        initAttrs: function(config, dataAttrsConfig) {
            Select.superclass.initAttrs.call(this, config, dataAttrsConfig);

            // trigger 如果为 select 则根据 select 的结构生成
            // trigger 如果为其他 DOM，则由用户提供 model
            var select = this.get('trigger');
            if (select[0].tagName.toLowerCase() == 'select') {
                // 替换之前把 select 保存起来
                this.set('selectSource', select);
                // 替换 trigger
                var triggerTemplate = '<a href="#" class="' +
                    this.get('prefix') + '-trigger"></a>';
                var newTrigger = $(triggerTemplate);
                this.set('trigger', newTrigger);
                select.after(newTrigger).hide();

                this.model = convertSelect(select[0], this.get('prefix'));
            } else {
                this.model = completeModel(this.model, this.get('prefix'));
            }
        },

        setup: function() {
            var that = this;
            var trigger = this.get('trigger').on('click', function(e) {
                e.preventDefault();
                if (!that.get('disabled')) {
                    that.show();
                }
            });

            var options = this.options = this.$('[data-role=content]').children();
            // 初始化 select 的参数
            // 必须在插入文档流后操作
            this.select('[data-selected=true]');
            this.set('length', options.length);

            this._tweakAlignDefaultValue();

            // 调用 overlay，点击 body 隐藏
            this._blurHide(trigger);

            Select.superclass.setup.call(this);
        },

        show: function() {
            Select.superclass.show.call(this);
            this._setPosition();
        },

        // borrow from dropdown
        // 调整 align 属性的默认值, 在 trigger 下方
        _tweakAlignDefaultValue: function() {
            var align = this.get('align');
            // 默认基准定位元素为 trigger
            if (align.baseElement._id === 'VIEWPORT') {
                align.baseElement = this.get('trigger');
            }
            this.set('align', align);
        },

        destroy: function() {
            this.element.remove();
            var select = this.get('selectSource');
            if (select) {
                this.get('trigger').remove();
                select.show();
            }
        },

        // 方法接口
        // --------

        select: function(option) {
            var selectIndex = getSelectedIndex(option, this.options);
            this.set('selectedIndex', selectIndex);

            // 如果不是原来选中的则触发 change 事件
            if (this.get('selectedIndex') !== selectIndex) {
                var selector = this.options.eq(selectIndex);
                this.trigger('change', selector);
            }

            this.hide();
            return this;
        },

        syncModel: function(model) {
            this.model = completeModel(model, this.get('prefix'));
            this.renderPartial('[data-role=content]');
            // 渲染后重置 select 的属性
            this.set('selectedIndex', -1);
            this.set('value', '');
            var options = this.options = this.$('[data-role=content]').children();
            this.set('length', options.length);

            this.select('[data-selected=true]');
            return this;
        },

        getOption: function() {},

        addOption: function(item) {
            return this;
        },

        removeOption: function(item) {
            return this;
        },

        // set 后的回调
        // ------------

        _onRenderSelectedIndex: function(index) {
            if (index == -1) return;

            var selector = this.options.eq(index);

            // 处理之前选中的元素
            if (this.currentItem) {
                this.currentItem.attr('data-selected', 'false')
                    .removeClass(this.get('prefix') + '-selected');
            }

            // 处理当前选中的元素
            selector.attr('data-selected', 'true')
                .addClass(this.get('prefix') + '-selected');
            this.set('value', selector.attr('data-value'));
            this.get('trigger').html(selector.html());
            this.currentItem = selector;
        },

        _onRenderDisabled: function(val) {
            var className = this.get('prefix') + '-disabled';
            var trigger = this.get('trigger');
            trigger[(val ? 'addClass' : 'removeClass')](className);
        }
    });

    module.exports = Select;

    // Helper
    // ------

    // 将 select 对象转换为 model
    //
    // <select>
    //   <option value='value1'>text1</option>
    //   <option value='value2' selected>text2</option>
    // </select>
    //
    // ------->
    //
    // [
    //   {value: 'value1', text: 'text1',
    //      defaultSelected: false, selected: false}
    //   {value: 'value2', text: 'text2',
    //      defaultSelected: true, selected: true}
    // ]
    function convertSelect(select, prefix) {
        var i, model = [], options = select.options,
            l = options.length, hasDefaultSelect = false;
        for (i = 0; i < l; i++) {
            var j, o = {}, option = options[i];
            var fields = ['text', 'value', 'defaultSelected', 'selected'];
            for (j in fields) {
                var field = fields[j];
                o[field] = option[field];
            }
            o.defaultSelected = option.defaultSelected ? 'true' : 'false';
            if (option.selected) {
                o.selected = 'true';
                hasDefaultSelect = true;
            } else {
                o.selected = 'false';
            }
            model.push(o);
        }
        // 当所有都没有设置 selected，默认设置第一个
        if (!hasDefaultSelect) {
            newModel[0].selected = 'true';
        }
        return {select: model, prefix: prefix};
    }

    // 补全 model 对象
    function completeModel(model, prefix) {
        var i, j, newModel = [], selectIndexArray = [];
        for (i = 0, l = model.length; i < l; i++) {
            var o = model[i];
            if (o.selected) {
                o.selected = o.defaultSelected = 'true';
                selectIndexArray.push(i);
            } else {
                o.selected = o.defaultSelected = 'false';
            }
            newModel.push(o);
        }
        if (selectIndexArray.length > 0) {
            // 如果有多个 selected 则选中最后一个
            selectIndexArray.pop();
            for (j = 0, ll = selectIndexArray.length; j < ll; j++) {
                newModel[j].selected = 'false';
            }
        } else { //当所有都没有设置 selected 则默认设置第一个
            newModel[0].selected = 'true';
        }
        return {select: newModel, prefix: prefix};
    }

    function getSelectedIndex(option, options) {
        var index;
        if ($.isNumeric(option)) { // 如果是索引
            index = option;
        } else if (typeof option === 'string') { // 如果是选择器
            index = options.index(options.parent().find(option));
        } else { // 如果是 DOM
            index = options.index(option);
        }
        return index;
    }
});
