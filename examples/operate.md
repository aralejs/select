# 其他操作

- order: 2

----

<link rel="stylesheet" href="../spm_modules/alice-select/1.1.0/dist/select-debug.css" />

## 设置 select 为 disabled

<select id="example3">
    <option value="option1">option1</option>
    <option value="option2" selected="selected">option2</option>
</select>
<a href="#" id="example3-abled" style="margin-left:20px;">设置 disabled=false</a>
<a href="#" id="example3-disabled" style="margin-left:20px;">设置 disabled=true</a>

````javascript
var Select = require('arale-select');
var $ = require('jquery');

var example3 = new Select({
    trigger: '#example3',
    disabled: true
}).render();

$('#example3-disabled').click(function(e) {
    e.preventDefault();
    example3.set('disabled', true);
});

$('#example3-abled').click(function(e) {
    e.preventDefault();
    example3.set('disabled', false);
});
````

## 可以通过 select 接口去选择

<a href="#" id="example4" class="ui-select-trigger">请选择</a>
<a href="#" class="example4-select" data-value="1">选择1</a>
<a href="#" class="example4-select" data-value="2">选择2</a>
<a href="#" class="example4-select" data-value="3">选择3</a>
<a href="#" class="example4-select" data-value="4">选择4</a>


````javascript
var Select = require('arale-select');
var $ = require('jquery');

var example4 = new Select({
    trigger: '#example4',
    name: 'example4',
    model: [
        {value:'option1', text:'option1'},
        {value:'option2', text:'option2'},
        {value:'option3', text:'option3'},
        {value:'option4', text:'option4'}
    ]
}).render();

$('.example4-select').click(function(e) {
    e.preventDefault();
    var index = $(e.currentTarget).attr('data-value');
    example4.select(index - 1);
});
````

## 提供 change 的事件

<a href="#" id="example5" class="ui-select-trigger">请选择</a>
<span id="example5-log"></span>

````javascript
var Select = require('arale-select');
var $ = require('jquery');

var log = $('#example5-log');
new Select({
    trigger: '#example5',
    model: [
        {value:'option1', text:'option1'},
        {value:'option2', text:'option2'},
        {value:'option3', text:'option3'},
        {value:'option4', text:'option4'}
    ]
}).on('change', function(target) {
    log.html(
        '已选择: value -> ' + 
        target.attr('data-value') +
        '; text -> ' +
        target.html()
    );
}).render();
````

## 设置最大高度

````html
<select id="example6">
    <option value="option1">option1</option>
    <option value="option2" selected="selected">option2</option>
    <option value="option3">option3</option>
    <option value="option4">option4</option>
    <option value="option5">option5</option>
    <option value="option6">option6</option>
    <option value="option7">option7</option>
    <option value="option8">option8</option>
    <option value="option9">option9</option>
    <option value="option10">option10</option>
    <option value="option11">option11</option>
    <option value="option12">option12</option>
    <option value="option13">option13</option>
    <option value="option14">option14</option>
</select>
````

````javascript
var Select = require('arale-select');
new Select({
    trigger: '#example6',
    maxHeight: 100
}).render();
````

## 设置某项为不可选

<select id="example7">
    <option value="option1">option1</option>
    <option value="option2" selected="selected">option2</option>
    <option value="option3">option3</option>
</select>
<a href="javascript:;" id="example7-disable" style="margin-left:20px;">disable 第三项</a>
<a href="javascript:;" id="example7-enable" style="margin-left:20px;">enable 第三项</a>

````javascript
var Select = require('arale-select');
var $ = require('jquery');

var example7 = new Select({
    trigger: '#example7'
}).render();

$('#example7-enable').click(function() {
    example7.enableOption(2);
});

$('#example7-disable').click(function() {
    example7.disableOption(2);
});
````
