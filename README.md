
# Select

模拟 select 的组件

---

## 模块依赖

* jquery
* popup

## 使用方法

### trigger 为 select

html 片段

```
<select id="city" name="city">
    <option value="value1">text1</option>
    <option value="value2">text2</option>
</select>
```

javascript 片段

```
new Select({
    trigger: '#city'
}).render()
```

### trigger 为其他 DOM

html 片段

```
<a href="#" id="city"></a>
```

javascript 片段

```
new Select({
    trigger: '#city',
    name: 'city',
    model: [
        {value:'value1', text: 'text1'},
        {value:'value2', text: 'text2'}
    ]
}).render();
```


## 属性

### trigger

trigger 可以为 select 或 其他任何 DOM。

**注意：**trigger只能为一个 DOM，如果选出来多个会取第一个

* 如果为 select，会将其隐藏并生成一个 a 标签放在原来的位置。
* 如果为 DOM，实例化的时候则需要提供 model 作为数据源

### model

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

### template

生成组件的模版，数据源为 model。

### prefix

样式前缀，默认为 `ui-select`

### name

模拟 select 的属性，表单项需要的 name 值，等同于 `select.name`

**注意**：如果 trigger 不是 select，那么会先在页面找 name 的 input，找不到再创建一个。

### value

模拟 select 的属性，获取被选中 option 的 value 值，等同于 `select.value`

### length

模拟 select 的属性，获取 option 的个数，等同于 `select.length`

### selectedIndex

模拟 select 的属性，获取被选中 option 的索引值，等同于 `select.selectedIndex`

### multiple

// TODO

### disabled

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

## 事件

### change

当选择某项的时候会触发，组件初始化不会触发此事件

回调传回的参数为当前选中的项，为 jQuery 对象

```
new Select({
    trigger: ''
}).on('change', function(target) {
    console.log(target.html());
})
```

