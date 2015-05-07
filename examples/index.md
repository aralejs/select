# 初始化

- order: 1

----

<link rel="stylesheet" href="../spm_modules/alice-select/1.1.0/dist/select-debug.css" />

## 可以根据原生的 select 初始化

trigger 为 select，并默认选中 option2

````html
<select id="example1">
    <option value="option1">option1</option>
    <option value="option2" selected="selected">option2</option>
    <option value="option3">option3</option>
</select>
````

````javascript
var Select = require('arale-select');
new Select({
    trigger: '#example1'
}).render();
````

## 可直接传入 DOM 初始化

trigger 为任意 DOM，但必须传入 model 数据

````html
<a href="#" id="example2" class="ui-select-trigger">请选择</a>
````

````javascript
var Select = require('arale-select');
new Select({
    trigger: '#example2',
    model: [
        {value:'option1', text:'option1'},
        {value:'option2', text:'option2', selected: true},
        {value:'option3', text:'option3', disabled: true}
    ]
}).render();
````

