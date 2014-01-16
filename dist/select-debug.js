define("arale/select/0.9.9/select-debug", [ "arale/overlay/1.1.4/overlay-debug", "$-debug", "arale/position/1.0.1/position-debug", "arale/iframe-shim/1.0.2/iframe-shim-debug", "arale/widget/1.1.1/widget-debug", "arale/base/1.1.1/base-debug", "arale/class/1.1.0/class-debug", "arale/events/1.1.0/events-debug", "arale/templatable/0.9.2/templatable-debug", "gallery/handlebars/1.0.2/handlebars-debug", "./select-debug.handlebars" ], function(require, exports, module) {
    var Overlay = require("arale/overlay/1.1.4/overlay-debug");
    var $ = require("$-debug");
    var Templatable = require("arale/templatable/0.9.2/templatable-debug");
    var template = require("./select-debug.handlebars");
    var Select = Overlay.extend({
        Implements: Templatable,
        attrs: {
            trigger: {
                value: null,
                // required
                getter: function(val) {
                    return $(val).eq(0);
                }
            },
            classPrefix: "ui-select",
            template: template,
            // 定位配置
            align: {
                baseXY: [ 0, "100%-1px" ]
            },
            // trigger 的 tpl
            triggerTpl: '<a href="#"></a>',
            // 原生 select 的属性
            name: "",
            value: "",
            length: 0,
            selectedIndex: -1,
            multiple: false,
            // TODO
            disabled: false,
            maxHeight: null,
            // 以下不要覆盖
            selectSource: null
        },
        events: {
            click: function(e) {
                e.stopPropagation();
            },
            "click [data-role=item]": function(e) {
                var target = $(e.currentTarget);
                if (!target.data("disabled")) {
                    this.select(target);
                }
            },
            "mouseenter [data-role=item]": function(e) {
                var target = $(e.currentTarget);
                if (!target.data("disabled")) {
                    target.addClass(getClassName(this.get("classPrefix"), "hover"));
                }
            },
            "mouseleave [data-role=item]": function(e) {
                var target = $(e.currentTarget);
                if (!target.data("disabled")) {
                    target.removeClass(getClassName(this.get("classPrefix"), "hover"));
                }
            }
        },
        templateHelpers: {
            output: function(data) {
                return data + "";
            }
        },
        // 覆盖父类
        // --------
        initAttrs: function(config, dataAttrsConfig) {
            Select.superclass.initAttrs.call(this, config, dataAttrsConfig);
            var selectName, trigger = this.get("trigger");
            trigger.addClass(getClassName(this.get("classPrefix"), "trigger"));
            if (trigger[0].tagName.toLowerCase() === "select") {
                // 初始化 name
                // 如果 select 的 name 存在则覆盖 name 属性
                selectName = trigger.attr("name");
                if (selectName) {
                    this.set("name", selectName);
                }
                // 替换之前把 select 保存起来
                this.set("selectSource", trigger);
                // 替换 trigger
                var newTrigger = $(this.get("triggerTpl")).addClass(getClassName(this.get("classPrefix"), "trigger"));
                this.set("trigger", newTrigger);
                this._initFromSelect = true;
                // 隐藏原生控件
                // 不用 hide() 的原因是需要和 arale/validator 的 skipHidden 来配合
                trigger.after(newTrigger).css({
                    position: "absolute",
                    left: "-99999px",
                    zIndex: -100
                });
                // trigger 如果为 select 则根据 select 的结构生成
                this.set("model", convertSelect(trigger[0], this.get("classPrefix")));
            } else {
                // 如果 name 存在则创建隐藏域
                selectName = this.get("name");
                if (selectName) {
                    var input = $('input[name="' + selectName + '"]').eq(0);
                    if (!input[0]) {
                        input = $('<input type="text" id="select-' + selectName.replace(/\./g, "-") + '" name="' + selectName + '" />').css({
                            position: "absolute",
                            left: "-99999px",
                            zIndex: -100
                        }).insertAfter(trigger);
                    }
                    this.set("selectSource", input);
                }
                // trigger 如果为其他 DOM，则由用户提供 model
                this.set("model", completeModel(this.get("model"), this.get("classPrefix")));
            }
        },
        setup: function() {
            this._bindEvents();
            this._initOptions();
            this._initHeight();
            this._tweakAlignDefaultValue();
            // 调用 overlay，点击 body 隐藏
            this._blurHide(this.get("trigger"));
            Select.superclass.setup.call(this);
        },
        render: function() {
            Select.superclass.render.call(this);
            this._setTriggerWidth();
            return this;
        },
        destroy: function() {
            if (this._initFromSelect) {
                this.get("trigger").remove();
            }
            this.get("selectSource") && this.get("selectSource").remove();
            this.element.remove();
            Select.superclass.destroy.call(this);
        },
        // 方法接口
        // --------
        select: function(option) {
            var selectIndex = getOptionIndex(option, this.options);
            var oldSelectIndex = this.get("selectedIndex");
            this.set("selectedIndex", selectIndex);
            // 同步 html 到 model
            var model = this.get("model");
            if (oldSelectIndex >= 0) {
                model.select[oldSelectIndex].selected = false;
            }
            if (selectIndex >= 0) {
                model.select[selectIndex].selected = true;
            }
            this.set("model", model);
            // 如果不是原来选中的则触发 change 事件
            if (oldSelectIndex !== selectIndex) {
                var current = this.options.eq(selectIndex);
                var previous = this.options.eq(oldSelectIndex);
                this.trigger("change", current, previous);
            }
            this.hide();
            return this;
        },
        syncModel: function(model) {
            this.set("model", completeModel(model, this.get("classPrefix")));
            this.renderPartial("[data-role=content]");
            // 同步原来的 select
            syncSelect(this.get("selectSource"), model);
            // 渲染后重置 select 的属性
            this.options = this.$("[data-role=content]").children();
            this.set("length", this.options.length);
            this.set("selectedIndex", -1);
            this.set("value", "");
            var selectIndex = getOptionIndex("[data-selected=true]", this.options);
            var oldSelectIndex = this.get("selectedIndex");
            this.set("selectedIndex", selectIndex);
            // 重新设置 trigger 宽度
            this._setTriggerWidth();
            return this;
        },
        getOption: function(option) {
            var index = getOptionIndex(option, this.options);
            return this.options.eq(index);
        },
        addOption: function(option) {
            var model = this.get("model").select;
            model.push(option);
            this.syncModel(model);
            return this;
        },
        removeOption: function(option) {
            var removedIndex = getOptionIndex(option, this.options), oldIndex = this.get("selectedIndex"), removedOption = this.options.eq(removedIndex);
            // 删除 option，更新属性
            removedOption.remove();
            this.options = this.$("[data-role=content]").children();
            this.set("length", this.options.length);
            // 如果被删除的是当前选中的，则选中第一个
            if (removedIndex === oldIndex) {
                this.set("selectedIndex", 0);
            } else if (removedIndex < oldIndex) {
                this.set("selectedIndex", oldIndex - 1);
            }
            return this;
        },
        enableOption: function(option) {
            var index = getOptionIndex(option, this.options);
            var model = this.get("model").select;
            model[index].disabled = false;
            this.syncModel(model);
            return this;
        },
        disableOption: function(option) {
            var index = getOptionIndex(option, this.options);
            var model = this.get("model").select;
            model[index].disabled = true;
            this.syncModel(model);
            return this;
        },
        // set 后的回调
        // ------------
        _onRenderSelectedIndex: function(index) {
            if (index === -1) return;
            var selected = this.options.eq(index), currentItem = this.currentItem, value = selected.attr("data-value");
            // 如果两个 DOM 相同则不再处理
            if (currentItem && selected[0] === currentItem[0]) {
                return;
            }
            // 设置原来的表单项
            var source = this.get("selectSource");
            if (source) {
                if (source[0].tagName.toLowerCase() === "select") {
                    source[0].selectedIndex = index;
                } else {
                    source[0].value = value;
                }
            }
            // 处理之前选中的元素
            if (currentItem) {
                currentItem.attr("data-selected", "false").removeClass(getClassName(this.get("classPrefix"), "selected"));
            }
            // 处理当前选中的元素
            selected.attr("data-selected", "true").addClass(getClassName(this.get("classPrefix"), "selected"));
            this.set("value", value);
            // 填入选中内容，位置先找 "data-role"="trigger-content"，再找 trigger
            var trigger = this.get("trigger");
            var triggerContent = trigger.find("[data-role=trigger-content]");
            if (triggerContent.length) {
                triggerContent.html(selected.html());
            } else {
                trigger.html(selected.html());
            }
            this.currentItem = selected;
        },
        _onRenderDisabled: function(val) {
            var className = getClassName(this.get("classPrefix"), "disabled");
            var trigger = this.get("trigger");
            trigger[val ? "addClass" : "removeClass"](className);
            // trigger event
            var selected = this.options.eq(this.get("selectedIndex"));
            this.trigger("disabledChange", selected, val);
        },
        // 私有方法
        // ------------
        _bindEvents: function() {
            var trigger = this.get("trigger");
            this.delegateEvents(trigger, "mousedown", this._triggerHandle);
            this.delegateEvents(trigger, "click", function(e) {
                e.preventDefault();
            });
            this.delegateEvents(trigger, "mouseenter", function(e) {
                trigger.addClass(getClassName(this.get("classPrefix"), "trigger-hover"));
            });
            this.delegateEvents(trigger, "mouseleave", function(e) {
                trigger.removeClass(getClassName(this.get("classPrefix"), "trigger-hover"));
            });
        },
        _initOptions: function() {
            this.options = this.$("[data-role=content]").children();
            // 初始化 select 的参数
            // 必须在插入文档流后操作
            this.select("[data-selected=true]");
            this.set("length", this.options.length);
        },
        // trigger 的宽度和浮层保持一致
        _setTriggerWidth: function() {
            var trigger = this.get("trigger");
            var width = this.element.outerWidth();
            var pl = parseInt(trigger.css("padding-left"), 10);
            var pr = parseInt(trigger.css("padding-right"), 10);
            // maybe 'thin|medium|thick' in IE
            // just give a 0
            var bl = parseInt(trigger.css("border-left-width"), 10) || 0;
            var br = parseInt(trigger.css("border-right-width"), 10) || 0;
            trigger.css("width", width - pl - pr - bl - br);
        },
        // borrow from dropdown
        // 调整 align 属性的默认值, 在 trigger 下方
        _tweakAlignDefaultValue: function() {
            var align = this.get("align");
            // 默认基准定位元素为 trigger
            if (align.baseElement._id === "VIEWPORT") {
                align.baseElement = this.get("trigger");
            }
            this.set("align", align);
        },
        _triggerHandle: function(e) {
            e.preventDefault();
            if (!this.get("disabled")) {
                this.get("visible") ? this.hide() : this.show();
            }
        },
        _initHeight: function() {
            this.after("show", function() {
                var maxHeight = this.get("maxHeight");
                if (maxHeight) {
                    var ul = this.$("[data-role=content]");
                    var height = getLiHeight(ul);
                    this.set("height", height > maxHeight ? maxHeight : "");
                    ul.scrollTop(0);
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
    //   <option value='value3' disabled>text3</option>
    // </select>
    //
    // ------->
    //
    // [
    //   {value: 'value1', text: 'text1',
    //      defaultSelected: false, selected: false, disabled: false}
    //   {value: 'value2', text: 'text2',
    //      defaultSelected: true, selected: true, disabled: false}
    //   {value: 'value3', text: 'text3',
    //      defaultSelected: false, selected: false, disabled: true}
    // ]
    function convertSelect(select, classPrefix) {
        var i, model = [], options = select.options, l = options.length, hasDefaultSelect = false;
        for (i = 0; i < l; i++) {
            var j, o = {}, option = options[i];
            var fields = [ "text", "value", "defaultSelected", "selected", "disabled" ];
            for (j in fields) {
                var field = fields[j];
                o[field] = option[field];
            }
            if (option.selected) hasDefaultSelect = true;
            model.push(o);
        }
        // 当所有都没有设置 selected，默认设置第一个
        if (!hasDefaultSelect && model.length) {
            model[0].selected = "true";
        }
        return {
            select: model,
            classPrefix: classPrefix
        };
    }
    // 补全 model 对象
    function completeModel(model, classPrefix) {
        var i, j, l, ll, newModel = [], selectIndexArray = [];
        for (i = 0, l = model.length; i < l; i++) {
            var o = $.extend({}, model[i]);
            if (o.selected) selectIndexArray.push(i);
            o.selected = o.defaultSelected = !!o.selected;
            o.disabled = !!o.disabled;
            newModel.push(o);
        }
        if (selectIndexArray.length > 0) {
            // 如果有多个 selected 则选中最后一个
            selectIndexArray.pop();
            for (j = 0, ll = selectIndexArray.length; j < ll; j++) {
                newModel[j].selected = false;
            }
        } else {
            //当所有都没有设置 selected 则默认设置第一个
            newModel[0].selected = true;
        }
        return {
            select: newModel,
            classPrefix: classPrefix
        };
    }
    function getOptionIndex(option, options) {
        var index;
        if ($.isNumeric(option)) {
            // 如果是索引
            index = option;
        } else if (typeof option === "string") {
            // 如果是选择器
            index = options.index(options.parent().find(option));
        } else {
            // 如果是 DOM
            index = options.index(option);
        }
        return index;
    }
    function syncSelect(select, model) {
        if (!(select && select[0])) return;
        select = select[0];
        if (select.tagName.toLowerCase() === "select") {
            $(select).find("option").remove();
            for (var i in model) {
                var m = model[i];
                var option = document.createElement("option");
                option.text = m.text;
                option.value = m.value;
                select.add(option);
            }
        }
    }
    // 获取 className ，如果 classPrefix 不设置，就返回 ''
    function getClassName(classPrefix, className) {
        if (!classPrefix) return "";
        return classPrefix + "-" + className;
    }
    // 获取 ul 中所有 li 的高度
    function getLiHeight(ul) {
        var height = 0;
        ul.find("li").each(function(index, item) {
            height += $(item).outerHeight();
        });
        return height;
    }
});

define("arale/select/0.9.9/select-debug.handlebars", [ "gallery/handlebars/1.0.2/runtime-debug" ], function(require, exports, module) {
    var Handlebars = require("gallery/handlebars/1.0.2/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [ 3, ">= 1.0.0-rc.4" ];
        helpers = helpers || {};
        for (var key in Handlebars.helpers) {
            helpers[key] = helpers[key] || Handlebars.helpers[key];
        }
        data = data || {};
        var buffer = "", stack1, functionType = "function", escapeExpression = this.escapeExpression, self = this, helperMissing = helpers.helperMissing;
        function program1(depth0, data, depth1) {
            var buffer = "", stack1, stack2, options;
            buffer += '\n        <li data-role="item"\n          class="' + escapeExpression((stack1 = depth1.classPrefix, 
            typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + "-item ";
            stack2 = helpers["if"].call(depth0, depth0.disabled, {
                hash: {},
                inverse: self.noop,
                fn: self.programWithDepth(2, program2, data, depth1),
                data: data
            });
            if (stack2 || stack2 === 0) {
                buffer += stack2;
            }
            buffer += '"\n          data-value="';
            if (stack2 = helpers.value) {
                stack2 = stack2.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack2 = depth0.value;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            buffer += escapeExpression(stack2) + '"\n          data-defaultSelected="';
            options = {
                hash: {},
                data: data
            };
            buffer += escapeExpression((stack1 = helpers.output, stack1 ? stack1.call(depth0, depth0.defaultSelected, options) : helperMissing.call(depth0, "output", depth0.defaultSelected, options))) + '"\n          data-selected="';
            options = {
                hash: {},
                data: data
            };
            buffer += escapeExpression((stack1 = helpers.output, stack1 ? stack1.call(depth0, depth0.selected, options) : helperMissing.call(depth0, "output", depth0.selected, options))) + '"\n          data-disabled="';
            options = {
                hash: {},
                data: data
            };
            buffer += escapeExpression((stack1 = helpers.output, stack1 ? stack1.call(depth0, depth0.disabled, options) : helperMissing.call(depth0, "output", depth0.disabled, options))) + '">';
            if (stack2 = helpers.text) {
                stack2 = stack2.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack2 = depth0.text;
                stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2;
            }
            if (stack2 || stack2 === 0) {
                buffer += stack2;
            }
            buffer += "</li>\n        ";
            return buffer;
        }
        function program2(depth0, data, depth2) {
            var buffer = "", stack1;
            buffer += escapeExpression((stack1 = depth2.classPrefix, typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + "-item-disabled";
            return buffer;
        }
        buffer += '<div class="';
        if (stack1 = helpers.classPrefix) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.classPrefix;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + '">\n    <ul class="';
        if (stack1 = helpers.classPrefix) {
            stack1 = stack1.call(depth0, {
                hash: {},
                data: data
            });
        } else {
            stack1 = depth0.classPrefix;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        buffer += escapeExpression(stack1) + '-content" data-role="content">\n        ';
        stack1 = helpers.each.call(depth0, depth0.select, {
            hash: {},
            inverse: self.noop,
            fn: self.programWithDepth(1, program1, data, depth0),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "\n    </ul>\n</div>\n";
        return buffer;
    });
});
