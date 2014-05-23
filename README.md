# Select

---

[![spm package](http://spmjs.io/badge/arale-select)](http://spmjs.io/package/arale-select)
[![Build Status](https://secure.travis-ci.org/aralejs/select.png)](https://travis-ci.org/aralejs/select)
[![Coverage Status](https://coveralls.io/repos/aralejs/select/badge.png?branch=master)](https://coveralls.io/r/aralejs/select)

模拟 select 的组件。

---

## 使用方法

Select 继承了 [overlay](http://aralejs.org/overlay/)，可使用其中包括 [widget](http://aralejs.org/widget/)、[base](http://aralejs.org/base/)、[class](http://aralejs.org/class/)、[events](http://aralejs.org/events/)、[attribute](http://aralejs.org/base/docs/attribute.html)、[aspect](http://aralejs.org/base/docs/aspect.html) 的属性和方法。

### trigger 为 select

html 片段

```html
<select id="city" name="city">
    <option value="value1">text1</option>
    <option value="value2">text2</option>
</select>
```

javascript 片段

```js
new Select({
    trigger: '#city'
}).render()
```

### trigger 为其他 DOM

html 片段

```html
<a href="#" id="city"></a>
```

javascript 片段

```js
new Select({
    trigger: '#city',
    name: 'city',
    model: [
        {value:'value1', text: 'text1'},
        {value:'value2', text: 'text2'}
    ]
}).render();
```


## 配置说明

### trigger *element*

trigger 可以为 select 或 其他任何 DOM。

**注意：**trigger只能为一个 DOM，如果选出来多个会取第一个

* 如果为 select，会将其隐藏并生成一个 a 标签放在原来的位置。
* 如果为 DOM，实例化的时候则需要提供 model 作为数据源

如果 trigger 比较复杂，可以选择 DOM 自定义结构，而且需要设置 `data-role="trigger-content"` 来指定填入内容的位置。

### model *object*

model 的来源有两处

1. 初始化传入
2. 如果 trigger 为 select，则会根据结构生成 model

model 的格式为

```javascript
[
    {value:'value1', text: 'text1', selected: true},
    {value:'value2', text: 'text2'}
]
```

`value` `text` `selected` 均为 option 的属性

### template *string*

生成组件的模版，数据源为 model。

### triggerTpl *string*

可以指定触发器的 DOM 结构，默认就是个 a 标签。

### classPrefix *string* _(0.9.0 修改，之前为 prefix)_

样式前缀，默认为 `ui-select`

### name *string*

模拟 select 的属性，表单项需要的 name 值，等同于 `select.name`

**注意**：如果 trigger 不是 select，那么会先在页面找 name 的 input，找不到再创建一个。

### value *string*

模拟 select 的属性，获取被选中 option 的 value 值，等同于 `select.value`

### length *number*

模拟 select 的属性，获取 option 的个数，等同于 `select.length`

### selectedIndex *number*

模拟 select 的属性，获取被选中 option 的索引值，等同于 `select.selectedIndex`

### multiple *boolean*

// TODO

### disabled *boolean*

模拟 select 的属性，设置 select 是否可点，等同于 `select.disabled`

## 方法

### .select(option)

选中某项，`option` 支持三种

1. 列表索引，为 Number
2. 选择器，为 String
3. DOM，支持 DOM Element 和 jQuery 对象

### .syncModel(model)

重新跟进给定的 demo 渲染 select

model 为数据源，和上面提到的 model 格式保持一致

### .addOption(option)

将一个选项添加到最后，option 的格式为

```
{value: 'value1', text: 'text1'}
```

### .getOption(option)

获取某个选项，参数和 `.select` 方法一致

### .removeOption(option)

删除某个选项，参数和 `.select` 方法一致

### .enableOption(option)

使某个选项可选，参数和 `.select` 方法一致

### .disableOption(option)

使某个选项不可选，参数和 `.select` 方法一致

## 事件

### change

当选择某项的时候会触发，组件**初始化不会触发此事件**

回调传回的参数为当前选中的项，为 jQuery 对象

```
new Select({
    trigger: ''
}).on('change', function(target, prev) {
    console.log(target.html());
})
```

### disabledChange

在 disabled 状态变化时会触发这个事件，在初始化的时候也会触发此事件。

```
.on('disabledChange', function(target, status) {
    console.log(target.html());
})
```

target 为当前选中的项，status 为变化后的 disabled 状态

## 问题讨论

- `ui-select-item` 避免设置 height [#13](https://github.com/aralejs/select/issues/13)
- trigger 和 template 的字体保持一致，不然宽度可能有不对齐的情况
