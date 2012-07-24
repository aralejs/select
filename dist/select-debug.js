define("#select/0.8.0/select-debug", ["#popup/0.9.5/dropdown-debug", "#popup/0.9.5/popup-debug", "#jquery/1.7.2/jquery-debug", "#overlay/0.9.7/overlay-debug", "#position/0.9.2/position-debug", "#iframe-shim/0.9.2/iframe-shim-debug", "#widget/0.9.16/widget-debug", "#base/0.9.16/base-debug", "#class/0.9.2/class-debug", "#events/0.9.1/events-debug", "#base/0.9.16/aspect-debug", "#base/0.9.16/attribute-debug", "#widget/0.9.16/daparser-debug", "#widget/0.9.16/auto-render-debug", "#widget/0.9.16/templatable-debug", "widget/0.9.16/ast-printer-debug", "#handlebars/1.0.0/handlebars-debug"], function(require, exports, module) {

    var Dropdown = require('#popup/0.9.5/dropdown-debug');
    var $ = require('#jquery/1.7.2/jquery-debug');
    var Templatable = require('#widget/0.9.16/templatable-debug');

    var Select = Dropdown.extend({

        Implements: Templatable,

        attrs: {
            prefix: 'ui-select',
            template: '<div class="{{prefix}}"><ul class="{{prefix}}-content" data-role="content">{{#each select}}<li data-role="item" class="{{../prefix}}-item" data-value="{{value}}" data-defaultSelected="{{defaultSelected}}" data-selected="{{selected}}">{{text}}</li>{{/each}}</ul></div>',
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

        // popup 绑定 trigger 无法在 disabled 阻止，所以全覆盖
        setup: function() {
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

            // 调用 dropdown
            this._tweakAlignDefaultValue();
            // 调用 overlay
            this._setupShim();
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

            this.trigger('change', selector);
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
        for (i in model) {
            var o = model[i];
            o.defaultSelected = o.defaultSelected ? 'true' : 'false';
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
            for (j in selectIndexArray) {
                newModel[0].selected = 'false';
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
