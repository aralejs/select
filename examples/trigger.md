# trigger

- order: 4

----

<link rel="stylesheet" href="../src/select.css" />

## trigger 的宽度和浮层的宽度保持一致

<a href="#" id="example7-1" class="ui-select-trigger">请选择</a>
<a href="#" id="example7-2" class="ui-select-trigger">请选择</a>

````javascript
seajs.use(['select','jquery'], function(Select, $) {
    new Select({
        trigger: '#example7-1',
        model: [
            {value:'option1', text:'aaaaaaaaaaaaaaaa'},
            {value:'option2', text:'字比较少'},
            {value:'option3', text:'字比较少'}
        ]
    }).render();

    new Select({
        trigger: '#example7-2',
        model: [
            {value:'option1', text:'字好多多aaa多多多多多'},
            {value:'option2', text:'字比较多'},
            {value:'option3', text:'字比较多'}
        ]
    }).render();
});
````

