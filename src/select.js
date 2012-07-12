define(function(require, exports, module) {

    var Dropdown = require('dropdown');
    var $ = require('jquery');
    var Templatable = require('templatable');

    var Select = Dropdown.extend({

        Implements: Templatable,

        attrs: {
            prefix: 'ui-select',
            triggerTemplate: '<a href="#"></a>',
            template: '<div class="{{prefix}}"><ul class="{{prefix}}-content" data-role="content">{{#each select}}<li data-role="item" class="{{../prefix}}-item" data-value="{{value}}" data-defaultSelected="{{defaultSelected}}" data-selected="{{selected}}">{{text}}</li>{{/each}}</ul></div>',
            // select 的参数
            value: '',
            length: 0,
            selectedIndex: 0,
            multiple: false, // TODO
            disabled: false,
            // 以下不要覆盖
            selectSource: null,
            triggerType: 'click'
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
                var newTrigger = $(this.get('triggerTemplate'));
                this.set('trigger', newTrigger);
                select.after(newTrigger).hide();

                this.model = convertSelect(select[0], this.get('prefix'));
            } else {
                this.model = completeModel(this.model, this.get('prefix'));
            }
        },

        setup: function() {
            Select.superclass.setup.call(this);

            var that = this;
            this.get('trigger').on('click', function(e) {
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

        select: function(selector) {
            var selectIndex = getSelectedIndex(selector, this.options);
            this.set('selectedIndex', selectIndex);
            this.hide();
            return this;
        },

        syncModel: function(model) {
            this.model = completeModel(this.model, this.get('prefix'));
            this.renderPartial('[data-role=content]');
            this.select('[data-selected=true]');
            return this;
        },

        getOption: function() {

        },
        addOption: function(item) {
            return this;
        },

        removeOption: function(item) {
            return this;
        },

        // set 后的回调
        // ------------

        _onRenderSelectedIndex: function(index) {
            var selector = this.options.eq(index);

            // 处理之前选中的元素
            if (this.currentItem) {
                this.currentItem.attr('data-selected', false)
                .removeClass(this.get('prefix') + '-selected');
            }

            // 处理当前选中的元素
            selector.attr('data-selected', true)
                .addClass(this.get('prefix') + '-selected');
            this.set('value', selector.html());
            this.currentItem = selector;

            this.trigger('change', selector);
        },

        _onRenderValue: function(val) {
            this.get('trigger').html(val);
        },

        _onRenderDisabled: function(val) {
            if (val) {
                var className = this.get('prefix') + '-disabled';
                this.get('trigger').addClass(className);
            }
        }

    });

    module.exports = Select;

    // Helper
    // ------

    // 转换 select 对象为 model
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
            newModel[0].selected = true;
        }
        return {select: model, prefix: prefix};
    }

    // 补全 model 对象
    function completeModel(model, prefix) {
        var i, newModel = [], hasDefaultSelect = false;
        for (i in model) {
            var o = model[i];
            !o.defaultSelected && o.defaultSelected = false;
            o.selected && (hasDefaultSelect = true);
            newModel.push(o);
        }
        // 当所有都没有设置 selected，默认设置第一个
        if (!hasDefaultSelect) {
            newModel[0].selected = true;
        }
        return {select: newModel, prefix: prefix};
    }

    function getSelectedIndex(selector, options) {
        var index;
        if ($.isNumeric(selector)) { // 如果是索引
            index = selector;
        } else if (typeof selector === 'string') { // 如果是选择器
            index = options.index(options.parent().find(selector));
        } else { // 如果是 DOM
            index = options.index(selector);
        }
        return index;
    }
});
