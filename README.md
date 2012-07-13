
# Select

模拟 select 的组件

---


## 模块依赖

* jquery
* popup


## Attribute & Property

### trigger

trigger 可以为 select 或 其他任何 DOM。

* 如果为 select，会将其隐藏并生成一个 a 标签放在原来的位置。
* 如果为 DOM，则不做处理。

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

### value

模拟 select 的值，获取被选中 option 的 value 值，等同于 `select.value`

### length

模拟 select 的值，获取 option 的个数，等同于 `select.length`

### selectIndex

模拟 select 的值，获取被选中 option 的索引值，等同于 `select.selectIndex`

### multiple

// TODO

### disabled

模拟 select 的值，设置 select 是否可点，等同于 `select.disabled`

## Method

### select(item)

选中某项，`item` 支持三种

1. 列表索引，为 Number
2. 选择器，为 String
3. DOM，支持 DOM Element 和 jQuery 对象

### syncModel(model)

重新渲染 select，model 为数据源，和上面的格式一致

### addOption(item)

// TODO

### getOption(item)

// TODO

### removeOption(item)

// TODO

