//TODO 动态的去 disable 某项
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
            classPrefix: 'ui-select',
            template: template,
            // 定位配置
            align: {
                baseXY: [0, '100%-1px']
            },
            // 指定如何渲染 trigger
            renderTrigger: function(selectedItem) {
                // normailly selectedItem is a li
                selectedItem = selectedItem.clone();
                $('ul', selectedItem).remove();
                var html = $.trim(selectedItem.html());
                selectedItem.remove();
                return html;
            },

            // 原生 select 的属性
            name: '',
            value: '',
            length: 0,
            selectedIndex: -1,
            multiple: false,
            disabled: false,

            // 以下不要覆盖
            selectSource: null // 原生表单项的引用，select/input
        },

        events: {
            'click [data-role=item]': function(e) {
                e.stopPropagation();
                var target = $(e.currentTarget);
                if (target.attr('data-disabled') != 'true') {
                    this.select(target);
                }
            },
            'mouseenter [data-role=item]': function(e) {
                $(e.currentTarget).addClass(this.get('classPrefix') + '-item-hover');
                //$('>ul', e.currentTarget).show();
                var o = $(e.currentTarget).data('sub-overlay');
                //o && o.show();
                if (o) {
                    o._setPosition().show();
                }
            },
            'mouseleave [data-role=item]': function(e) {
                $(e.currentTarget).removeClass(this.get('classPrefix') + '-item-hover');
                //$('>ul', e.currentTarget).hide();
                var o = $(e.currentTarget).data('sub-overlay');
                o && o.hide();
            }
        },

        // 覆盖父类
        // --------

        initAttrs: function(config, dataAttrsConfig) {
            Select.superclass.initAttrs.call(this, config, dataAttrsConfig);

            var trigger = this.get('trigger');
            if (trigger[0].tagName.toLowerCase() == 'select') {
                // 初始化 name
                // 如果 select 的 name 存在则覆盖 name 属性
                var selectName = trigger.attr('name');
                if (selectName) {
                    this.set('name', selectName);
                }

                // 替换之前把 select 保存起来
                this.set('selectSource', trigger);
                // 替换 trigger
                var triggerTemplate = '<a href="#" class="' +
                    this.get('classPrefix') + '-trigger"></a>';
                var newTrigger = $(triggerTemplate);
                this.set('trigger', newTrigger);
                trigger.after(newTrigger).hide();

                // trigger 如果为 select 则根据 select 的结构生成
                this.model = convertSelect(trigger[0], this.get('classPrefix'));

            } else {
                // 如果 name 存在则创建隐藏域
                var selectName = this.get('name');
                if (selectName) {
                    var input = $('input[name=' + selectName + ']').eq(0);
                    if (!input[0]) {
                        input = $(
                            '<input type="hidden" id="select-' + selectName +
                            '" name="' + selectName +
                            '" />'
                        ).insertBefore(trigger);
                    }
                    this.set('selectSource', input);
                }

                // trigger 如果为其他 DOM，则由用户提供 model
                this.model = completeModel(this.model, this.get('classPrefix'));
            }
        },

        setup: function() {
            var that = this;
            var trigger = this.get('trigger')
                .on('click', {self: this}, this._trigger_click)
                .on('mouseenter', function(e) {
                    trigger.addClass(that.get('classPrefix') + '-trigger-hover');
                })
                .on('mouseleave', function(e) {
                    trigger.removeClass(that.get('classPrefix') + '-trigger-hover');
                });

            this.options = this.$('[data-role=content]').children();
            this.set('multiple', isMulitple(this.model.options));
            // 初始化 select 的参数
            // 必须在插入文档流后操作
            if ($('[data-selected=true]', this.element).is($('[data-disabled=true]', this.element))) {
                throw new Error('A disabled item cannot be selected, check your model.');
            }
            this.select('[data-selected=true]');
            this.set('length', this.options.length);

            this._tweakAlignDefaultValue();

            // 调用 overlay，点击 body 隐藏
            this._blurHide(trigger);

            // 初始化多级菜单的位置
            this._initSubSelectPosition();

            Select.superclass.setup.call(this);
        },

        render: function() {
            Select.superclass.render.call(this);
            this._setTriggerWidth();
            return this;
        },

        show: function() {
            Select.superclass.show.call(this);
            //this._setPosition();
            return this;
        },

        // trigger 的宽度和浮层保持一致
        _setTriggerWidth: function() {
            var trigger = this.get('trigger');
            var width = this.element.outerWidth();
            var pl = parseInt(trigger.css('padding-left'), 10);
            var pr = parseInt(trigger.css('padding-right'), 10);
            var bl = parseInt(trigger.css('border-left-width'), 10);
            var br = parseInt(trigger.css('border-right-width'), 10);
            trigger.css('width', width - pl - pr - bl - br);
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

        _trigger_click: function(e) {
            var self = e.data.self;
            e.preventDefault();
            if (!self.get('disabled')) {
                self.show();
            }
        },

        destroy: function() {
            $.each(this._overlays, function(i, o) {
                o.destroy();
            });
            this.element.remove();
            Select.superclass.destroy.call(this);
        },

        // 方法接口
        // --------

        select: function(option) {
            var selectIndex = getOptionIndex(option, this.options, this.get('multiple'));
            var oldSelectIndex = this.get('selectedIndex');
            this.set('selectedIndex', selectIndex);

            // 如果不是原来选中的则触发 change 事件
            if (oldSelectIndex !== selectIndex) {
                var selected = getItemByIndex(selectIndex, this.options);
                this.trigger('change', selected);
            }

            this.hide();
            return this;
        },

        syncModel: function(model) {
            this.model = completeModel(model, this.get('classPrefix'));
            this.set('multiple', isMulitple(this.model.options));
            this.renderPartial('[data-role=content]');
            // 渲染后重置 select 的属性
            this.options = this.$('[data-role=content]').children();
            this.set('length', this.options.length);
            this.set('selectedIndex', -1);
            this.set('value', '');
            this.select('[data-selected=true]');

            // 重新设置 trigger 宽度
            this._setTriggerWidth();
            return this;
        },

        getOption: function(option) {
            var index = getOptionIndex(option, this.options, this.get('multiple'));
            //return this.options.eq(index);
            return getItemByIndex(index, this.options);
        },

        // TODO 如果是多级的 addOption 需要变化一下
        addOption: function(option) {
            var model = this.model.options;
            model.push(option);
            this.syncModel(model);
            return this;
        },

        removeOption: function(option) {
            var removedIndex = getOptionIndex(option, this.options, this.get('multiple')),
                oldIndex = this.get('selectedIndex'),
                //removedOption = this.options.eq(removedIndex);
                removedOption = getItemByIndex(removedIndex, this.options);

            // 删除 option，更新属性
            removedOption.remove();
            this.options = this.$('[data-role=content]').children();
            this.set('length', this.options.length);

            // 如果被删除的是当前选中的，则选中第一个
            if (removedIndex === oldIndex) {
                this.set('selectedIndex', 0);

            // 如果被删除的在选中的前面，则选中的索引向前移动一格
            } else if (removedIndex < oldIndex) {
                this.set('selectedIndex', oldIndex - 1);
            }
            return this;
        },

        // set 后的回调
        // ------------

        _onRenderSelectedIndex: function(index) {
            if (index == -1) return;

            /*
            var indexes = index instanceof Array ? index : [index];
            var selected, options = this.options;
            $.each(indexes, function(i, v) {
                selected = options.eq(v);
                options = $('ul', selected).children();
            });
            */
            var selected = getItemByIndex(index, this.options);

            //var selected = this.options.eq(index),
            var currentItem = this.currentItem,
                value = selected.attr('data-value');

            // 如果两个 DOM 相同则不再处理
            if (currentItem && selected[0] == currentItem[0]) {
                return;
            }

            // 设置原来的表单项
            var source = this.get('selectSource');
            source && (source[0].value = value);

            // 处理之前选中的元素
            if (currentItem && this.element.has(currentItem)) {
                currentItem.attr('data-selected', false)
                    .removeClass(this.get('classPrefix') + '-item-selected');
                var m = getModelByIndex(getOptionIndex(currentItem, this.options, this.get('multiple')), this.model.options);
                m && (m.selected = 'false');
            }

            // 处理当前选中的元素
            selected.attr('data-selected', 'true')
                .addClass(this.get('classPrefix') + '-item-selected');
            var m = getModelByIndex(index, this.model.options);
            m.selected = 'true';
            this.set('value', value);

            // 填入选中内容，位置先找 "data-role"="trigger-content"，再找 trigger
            var trigger = this.get('trigger');
            var triggerContent = trigger.find('[data-role=trigger-content]');
            var html = this.get('renderTrigger').call(this, selected);
            if (triggerContent.length) {
                triggerContent.html(html);
            } else {
                trigger.html(html);
            }
            this.currentItem = selected;
        },

        _onRenderDisabled: function(val) {
            var className = this.get('classPrefix') + '-disabled';
            var trigger = this.get('trigger');
            trigger[(val ? 'addClass' : 'removeClass')](className);
        },

        _initSubSelectPosition: function() {
            this._overlays = [];
            var items = $('li[data-role=item]', this.element);
            var self = this;
            items.each(function(i, item) {
                item = $(item);
                var sub = item.children('ul');
                if (sub.length > 0) {
                    var o = new Overlay({
                        element: sub,
                        align: {
                            baseElement: item,
                            baseXY: ['100%', 0],
                            selfXY: [0, 0]
                        }
                    });
                    item.data('sub-overlay', o);
                    self._overlays.push(0);
                }
            });
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
    //      defaultSelected: false, selected: false, disabled: true|false}
    //   {value: 'value2', text: 'text2',
    //      defaultSelected: true, selected: true}
    // ]
    function convertSelect(select, classPrefix) {
        var i, model = [], options = select.options,
            l = options.length, hasDefaultSelect = false;
        for (i = 0; i < l; i++) {
            var j, o = {}, option = options[i];
            var fields = ['text', 'value', 'defaultSelected', 'selected', 'disabled'];
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
        return {options: model, classPrefix: classPrefix};
    }

    // 补全 model 对象
    function completeModel(model, classPrefix) {
        var i, j, l, ll, newModel = [], selectedArray = [];
        for (i = 0, l = model.length; i < l; i++) {
            var o = model[i];
            if (o.selected) {
                o.selected = o.defaultSelected = 'true';
                selectedArray.push(o);
            } else {
                o.selected = o.defaultSelected = 'false';
            }
            if (o.options && o.options.length > 0) {
                o.options = completeModel(o.options, classPrefix).options;
            }
            newModel.push(o);
        }
        if (selectedArray.length > 0) {
            // 如果有多个 selected 则选中最后一个
            selectedArray.pop();
            for (j = 0, ll = selectedArray.length; j < ll; j++) {
                selectedArray[j].selected = 'false';
            }
        } else { //当所有都没有设置 selected 则默认设置第一个
            newModel[0].selected = 'true';
        }
        return {options: newModel, classPrefix: classPrefix};
    }

    function getOptionIndex(option, options, multi) {
        var index;
        if ($.isNumeric(option)) { // 如果是索引
            index = option;
        } else { // 如果是选择器或者 DOM
            //index = options.index(options.parent().find(option));
            option = options.parent().find(option);
            if (option.length == 0) {
                return multi ? [] : -1;
            }
            index = options.index(option);
        }

        if (index < 0) {
            $.each(options, function(i, item) {
                item = $(item);
                if (item.find(option).length > 0) {
                    index = i;
                    return false;
                }
            });
            var subIndex = getOptionIndex(option, options.eq(index).children('ul').children(), true);
            if (!(subIndex instanceof Array)) {
                subIndex = [subIndex];
            }
            return [index].concat(subIndex);
        } else {
            return multi ? [index] : index;
        }
    }

    // 如果是多级的，index 是数组
    function getItemByIndex(index, options) {
        var indexes = index instanceof Array ? index : [index];
        var selected;
        $.each(indexes, function(i, v) {
            selected = options.eq(v);
            options = $('ul', selected).children();
        });
        return selected;
    }

    function getModelByIndex(index, model) {
        if (index == -1) {
            return null;
        }
        var indexes = index instanceof Array ? index : [index];
        var m;
        $.each(indexes, function(i, v) {
            m = model[v];
            model = m.options;
        });
        return m;
    }

    function isMulitple(model) {
        var b = false;
        $.each(model, function(i, v) {
            if ($.isArray(v.options) && v.options.length > 0) {
                b = true;
                return false;
            }
        });
        return b;
    }
});
